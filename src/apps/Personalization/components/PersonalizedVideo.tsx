import React, { useEffect, useRef, useState } from 'react';
import { CLOUDINARY_CONFIG } from '../../../config/cloudinary';
import { usePersonalizationStore } from '../store/personalizationStore';

interface PersonalizedVideoProps {
  publicId: string;
  segmentId?: string;
  options?: {
    quality?: 'auto' | 'best' | 'good' | 'eco';
    format?: 'auto' | 'mp4' | 'webm';
    streaming?: {
      type: string;
      quality: string;
      playbackRates: number[];
      adaptiveBitrate: boolean;
    };
    transformations?: {
      colorEffect?: string;
      textStyle?: {
        font: string;
        size: number;
        color: string;
        background: string;
      };
      watermark?: {
        enabled: boolean;
        position: string;
        opacity: number;
      };
      videoFilters?: {
        blur?: number;
        brightness?: number;
        contrast?: number;
        saturation?: number;
        noise?: number;
      };
      overlay?: {
        text?: string;
        image?: string;
        position?: string;
        blendMode?: string;
        timing?: {
          start: number;
          end: number;
        };
      }[];
      trim?: {
        startOffset: number;
        endOffset: number;
      };
      loop?: boolean;
      speed?: number;
    };
    interactive?: {
      chapters?: {
        enabled: boolean;
        navigation: boolean;
        data?: Array<{
          time: number;
          title: string;
          description?: string;
        }>;
      };
      hotspots?: {
        enabled: boolean;
        template: string;
        data?: Array<{
          time: number;
          position: { x: number; y: number };
          content: string;
          action?: () => void;
        }>;
      };
      annotations?: {
        enabled: boolean;
        data?: Array<{
          time: number;
          text: string;
          position: { x: number; y: number };
          style?: object;
        }>;
      };
    };
    analytics?: {
      trackQuality: boolean;
      trackInteractions: boolean;
      trackSegments: boolean;
      detailedPlayback: boolean;
      customEvents?: string[];
      heatmap?: boolean;
    };
    ai?: {
      autoSubtitles?: boolean;
      contentModeration?: boolean;
      objectDetection?: boolean;
      transcription?: boolean;
      faceDetection?: boolean;
    };
  };
  onEngagement?: (data: any) => void;
}

export default function PersonalizedVideo({ 
  publicId, 
  segmentId, 
  options = {},
  onEngagement 
}: PersonalizedVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<any>(null);
  const [error, setError] = useState<string | null>(null);
  const { addEngagementMetric } = usePersonalizationStore();

  useEffect(() => {
    if (!videoRef.current || !publicId || typeof window === 'undefined') return;

    const cld = window.cloudinary;
    if (!cld) {
      setError('Cloudinary player not loaded');
      return;
    }

    try {
      // Initialize player with advanced configuration
      playerRef.current = cld.videoPlayer(videoRef.current, {
        cloud_name: CLOUDINARY_CONFIG.cloudName,
        publicId,
        controls: true,
        fluid: true,
        muted: true,
        preload: 'auto',
        playsinline: true,
        sourceTypes: ['dash', 'hls', 'mp4'],
        playbackRates: options.streaming?.playbackRates || [0.5, 1, 1.5, 2],
        posterOptions: {
          transformation: {
            width: 1920,
            height: 1080,
            crop: 'fill',
            quality: 'auto'
          }
        }
      });

      // Configure video source with advanced transformations
      const sourceConfig: any = {
        transformation: [
          { fetch_format: 'auto', quality: 'auto' }
        ],
        sourceTypes: ['dash', 'hls', 'mp4'],
        sourceTransformation: {
          'dash': { streaming_profile: 'full_hd' },
          'hls': { streaming_profile: 'full_hd' }
        }
      };

      // Add video filters
      if (options.transformations?.videoFilters) {
        const { blur, brightness, contrast, saturation, noise } = options.transformations.videoFilters;
        if (blur) sourceConfig.transformation.push({ effect: `blur:${blur}` });
        if (brightness) sourceConfig.transformation.push({ effect: `brightness:${brightness}` });
        if (contrast) sourceConfig.transformation.push({ effect: `contrast:${contrast}` });
        if (saturation) sourceConfig.transformation.push({ effect: `saturation:${saturation}` });
        if (noise) sourceConfig.transformation.push({ effect: `noise:${noise}` });
      }

      // Add overlays
      if (options.transformations?.overlay) {
        options.transformations.overlay.forEach(overlay => {
          if (overlay.text) {
            sourceConfig.transformation.push({
              overlay: { text: overlay.text },
              gravity: overlay.position || 'center',
              start_offset: overlay.timing?.start,
              end_offset: overlay.timing?.end,
              blending: overlay.blendMode
            });
          } else if (overlay.image) {
            sourceConfig.transformation.push({
              overlay: overlay.image,
              gravity: overlay.position || 'center',
              start_offset: overlay.timing?.start,
              end_offset: overlay.timing?.end,
              blending: overlay.blendMode
            });
          }
        });
      }

      // Add trim if specified
      if (options.transformations?.trim) {
        sourceConfig.transformation.push({
          start_offset: options.transformations.trim.startOffset,
          end_offset: options.transformations.trim.endOffset
        });
      }

      // Configure AI features
      if (options.ai) {
        if (options.ai.autoSubtitles) {
          sourceConfig.transformation.push({ subtitles: 'auto' });
        }
        if (options.ai.contentModeration) {
          sourceConfig.transformation.push({ moderation: 'aws_rek' });
        }
        if (options.ai.objectDetection) {
          sourceConfig.transformation.push({ detection: 'object' });
        }
        if (options.ai.faceDetection) {
          sourceConfig.transformation.push({ detection: 'face' });
        }
      }

      // Set up chapters if enabled
      if (options.interactive?.chapters?.enabled && options.interactive.chapters.data) {
        playerRef.current.chapters({
          chapters: options.interactive.chapters.data,
          showMarkers: true,
          onChapterChange: (chapter: any) => {
            onEngagement?.({
              type: 'chapterChange',
              data: chapter,
              timestamp: Date.now(),
              segmentId
            });
            addEngagementMetric({
              eventName: 'chapterChange',
              segmentId: segmentId || '',
              data: chapter
            });
          }
        });
      }

      // Set up hotspots if enabled
      if (options.interactive?.hotspots?.enabled && options.interactive.hotspots.data) {
        playerRef.current.hotspots({
          hotspots: options.interactive.hotspots.data,
          template: options.interactive.hotspots.template
        });
      }

      // Set up advanced analytics
      if (options.analytics) {
        const events = [
          'play', 'pause', 'ended', 'timeupdate', 'percentsplayed',
          'qualitychange', 'error', 'fullscreenchange'
        ];

        if (options.analytics.customEvents) {
          events.push(...options.analytics.customEvents);
        }

        events.forEach(event => {
          playerRef.current.on(event, (data: any) => {
            const engagementData = {
              type: event,
              data,
              timestamp: Date.now(),
              segmentId,
              videoId: publicId
            };
            
            onEngagement?.(engagementData);
            addEngagementMetric({
              eventName: event,
              segmentId: segmentId || '',
              data: engagementData
            });
          });
        });

        if (options.analytics.heatmap) {
          playerRef.current.analytics({
            events: ['play', 'pause', 'seek'],
            trackPlayback: true,
            trackSeek: true,
            generateHeatmap: true
          });
        }
      }

      // Set the source with all configurations
      playerRef.current.source(publicId, sourceConfig);

      // Clear any previous errors
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to initialize video player');
      console.error('Video player error:', err);
    }

    return () => {
      if (playerRef.current) {
        try {
          playerRef.current.dispose();
        } catch (err) {
          console.error('Error disposing video player:', err);
        }
      }
    };
  }, [publicId, segmentId, options, onEngagement, addEngagementMetric]);

  return (
    <div className="relative rounded-lg overflow-hidden bg-gray-900">
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 text-white p-4 text-center">
          <p>{error}</p>
        </div>
      )}
      <video
        ref={videoRef}
        className="w-full aspect-video"
        crossOrigin="anonymous"
        playsInline
      />
    </div>
  );
}