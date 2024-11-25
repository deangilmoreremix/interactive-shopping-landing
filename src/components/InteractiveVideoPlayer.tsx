import React, { useEffect, useRef } from 'react';
import { CLOUDINARY_CONFIG } from '../config/cloudinary';

interface InteractiveVideoProps {
  publicId: string;
  onProductClick?: (product: any) => void;
  onHotspotClick?: (hotspot: any) => void;
  interactiveConfig?: {
    mode?: 'shoppable' | '360' | 'chapters';
    startState?: 'openOnPlay' | 'closed' | 'open';
    autoClose?: number;
    showPostPlayOverlay?: boolean;
    width?: string;
    products?: Array<{
      productId: string;
      productName: string;
      startTime: number;
      endTime: number;
      hotspots?: Array<{
        time: string;
        x: string;
        y: string;
        tooltipPosition: string;
        clickUrl?: string;
      }>;
    }>;
  };
}

export default function InteractiveVideoPlayer({
  publicId,
  onProductClick,
  onHotspotClick,
  interactiveConfig = {
    mode: 'shoppable',
    startState: 'openOnPlay',
    autoClose: 2,
    showPostPlayOverlay: true,
    width: '15%'
  }
}: InteractiveVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<any>(null);

  useEffect(() => {
    if (!videoRef.current || typeof window === 'undefined') return;

    const cld = window.cloudinary;
    if (!cld) return;

    // Initialize player with interactive features
    playerRef.current = cld.videoPlayer(videoRef.current, {
      cloud_name: CLOUDINARY_CONFIG.cloudName,
      sourceTypes: ['hls', 'dash', 'mp4'],
      transformation: { 
        quality: 'auto',
        streaming_profile: 'hd'
      },
      ...CLOUDINARY_CONFIG.playerConfig,
      shoppable: {
        enabled: interactiveConfig.mode === 'shoppable',
        startState: interactiveConfig.startState,
        autoClose: interactiveConfig.autoClose,
        showPostPlayOverlay: interactiveConfig.showPostPlayOverlay,
        width: interactiveConfig.width,
        products: interactiveConfig.products
      },
      interactive: {
        mode: interactiveConfig.mode,
        hotspots: {
          enabled: true,
          template: 'default',
          onClick: onHotspotClick
        }
      }
    });

    // Configure video source with proper transformation
    playerRef.current.source(publicId, {
      transformation: [
        { streaming_profile: 'hd' },
        { fetch_format: 'auto' },
        { quality: 'auto' }
      ],
      sourceTypes: ['hls', 'dash', 'mp4'],
      sourceTransformation: {
        'hls': { streaming_profile: 'hd' },
        'dash': { streaming_profile: 'hd' }
      }
    });

    // Add event listeners
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
  }, [publicId, onProductClick, onHotspotClick, interactiveConfig]);

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
}