import React, { useEffect, useRef } from 'react';
import { Cloudinary } from "@cloudinary/url-gen";
import { CLOUDINARY_CONFIG } from '../../../config/cloudinary';

interface LivePlayerProps {
  cloudinary: Cloudinary;
  config: {
    streaming: {
      profiles: {
        hd: { format: string; quality: string };
        sd: { format: string; quality: number };
      };
      protocols: string[];
      dvr: boolean;
      lowLatency: boolean;
      adaptiveBitrate: boolean;
    };
  };
  onViewerJoin?: () => void;
  onViewerLeave?: () => void;
}

export default function LivePlayer({
  cloudinary,
  config,
  onViewerJoin,
  onViewerLeave
}: LivePlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<any>(null);

  useEffect(() => {
    if (!videoRef.current || typeof window === 'undefined') return;

    const cld = window.cloudinary;
    if (!cld) return;

    // Initialize player with streaming configuration
    playerRef.current = cld.videoPlayer(videoRef.current, {
      cloud_name: CLOUDINARY_CONFIG.cloudName,
      sourceTypes: config.streaming.protocols,
      transformation: {
        streaming_profile: 'hd',
        format: 'auto',
        quality: 'auto'
      },
      fluid: true,
      controls: true,
      bigPlayButton: false,
      autoplayMode: 'always',
      posterOptions: {
        transformation: {
          width: 1920,
          height: 1080,
          crop: 'fill',
          quality: 'auto'
        }
      },
      plugins: {
        // Add streaming plugins
        streaming: {
          lowLatencyMode: config.streaming.lowLatency,
          dvrEnabled: config.streaming.dvr,
          adaptiveBitrate: config.streaming.adaptiveBitrate,
          hlsConfig: {
            enableWorker: true,
            startLevel: -1,
            debug: false
          }
        }
      }
    });

    // Add event listeners
    playerRef.current.on('streamstart', () => {
      console.log('Stream started');
      onViewerJoin?.();
    });

    playerRef.current.on('streamend', () => {
      console.log('Stream ended');
      onViewerLeave?.();
    });

    playerRef.current.on('error', (error: any) => {
      console.error('Stream error:', error);
    });

    // Quality switching
    playerRef.current.on('qualitychange', (quality: string) => {
      console.log('Quality changed to:', quality);
    });

    // Cleanup
    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
      }
    };
  }, [config, onViewerJoin, onViewerLeave]);

  return (
    <div className="relative rounded-lg overflow-hidden bg-black">
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        playsInline
        crossOrigin="anonymous"
      />
    </div>
  );
}