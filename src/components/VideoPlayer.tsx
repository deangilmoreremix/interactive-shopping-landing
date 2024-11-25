import React, { useEffect, useRef } from 'react';
import { CLOUDINARY_CONFIG } from '../config/cloudinary';

interface VideoPlayerProps {
  publicId: string;
  onProductClick?: (product: any) => void;
  onAnalyticsEvent?: (eventName: string, data: any) => void;
  options?: {
    shoppable?: {
      enabled: boolean;
      hotspots?: any[];
      products?: any[];
    };
    analytics?: {
      events?: string[];
      trackPlayback?: boolean;
      trackSeek?: boolean;
      generateHeatmap?: boolean;
    };
    ai?: {
      autoSubtitles?: boolean;
      contentModeration?: boolean;
      objectDetection?: boolean;
    };
  };
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  publicId,
  onProductClick,
  onAnalyticsEvent,
  options = {}
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<any>(null);

  useEffect(() => {
    if (!videoRef.current || !publicId || typeof window === 'undefined') return;

    const cld = window.cloudinary;
    if (!cld) return;

    // Initialize player with advanced configuration
    playerRef.current = cld.videoPlayer(videoRef.current, {
      cloud_name: CLOUDINARY_CONFIG.cloudName,
      publicId,
      controls: true,
      fluid: true,
      muted: true,
      preload: 'auto',
      playsinline: true,
      sourceTypes: ['hls', 'dash', 'mp4'],
      transformation: {
        quality: 'auto',
        streaming_profile: 'hd'
      },
      ...options.shoppable?.enabled && {
        shoppable: {
          enabled: true,
          hotspots: options.shoppable.hotspots,
          products: options.shoppable.products
        }
      }
    });

    // Configure analytics
    if (options.analytics) {
      const events = options.analytics.events || [
        'play',
        'pause',
        'ended',
        'timeupdate',
        'percentsplayed'
      ];

      events.forEach(event => {
        playerRef.current.on(event, (data: any) => {
          onAnalyticsEvent?.(event, data);
        });
      });

      if (options.analytics.generateHeatmap) {
        playerRef.current.analytics({
          events: ['play', 'pause', 'seek'],
          trackPlayback: true,
          trackSeek: true,
          generateHeatmap: true
        });
      }
    }

    // Configure AI features
    if (options.ai) {
      const transformation: any[] = [];
      
      if (options.ai.autoSubtitles) {
        transformation.push({ subtitles: 'auto' });
      }
      if (options.ai.contentModeration) {
        transformation.push({ moderation: 'aws_rek' });
      }
      if (options.ai.objectDetection) {
        transformation.push({ detection: 'object' });
      }

      playerRef.current.source(publicId, { transformation });
    }

    // Add product click handler
    if (onProductClick) {
      playerRef.current.on('productClick', onProductClick);
    }

    return () => {
      if (playerRef.current) {
        if (onProductClick) {
          playerRef.current.off('productClick', onProductClick);
        }
        playerRef.current.dispose();
      }
    };
  }, [publicId, options, onProductClick, onAnalyticsEvent]);

  return (
    <div className="relative rounded-lg overflow-hidden bg-black">
      <video
        ref={videoRef}
        className="w-full aspect-video"
        crossOrigin="anonymous"
        playsInline
      />
    </div>
  );
};

export default VideoPlayer;