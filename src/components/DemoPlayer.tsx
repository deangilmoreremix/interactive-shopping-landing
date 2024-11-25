import React, { useEffect, useRef } from 'react';
import { CLOUDINARY_CONFIG } from '../config/cloudinary';

interface DemoPlayerProps {
  cloudName?: string;
  publicId: string;
  onProductClick?: (product: any) => void;
  onHotspotClick?: (hotspot: any) => void;
  textTracks?: {
    fontFace?: string;
    fontSize?: string;
    gravity?: string;
    wordHighlight?: boolean;
    maxWords?: number;
    language?: string;
    label?: string;
  };
}

const DemoPlayer: React.FC<DemoPlayerProps> = ({ 
  cloudName = CLOUDINARY_CONFIG.cloudName,
  publicId,
  onProductClick,
  onHotspotClick,
  textTracks = {
    fontFace: "Palatino",
    fontSize: "90%",
    gravity: "bottom",
    wordHighlight: true,
    maxWords: 3,
    language: 'en',
    label: 'English'
  }
}) => {
  const playerRef = useRef<any>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!videoRef.current || typeof window === 'undefined') return;

    const cld = window.cloudinary;
    if (!cld) return;

    // Initialize player with demo configuration
    playerRef.current = cld.videoPlayer(videoRef.current, {
      cloud_name: cloudName,
      publicId,
      ...CLOUDINARY_CONFIG.playerConfig,
      shoppable: {
        ...CLOUDINARY_CONFIG.shoppableConfig,
        products: [
          {
            productId: 1,
            productName: "Sunglasses",
            startTime: 0,
            endTime: 2,
            publicId: "docs/shoppable_sunglasses",
            hotspots: [
              {
                time: "00:02",
                x: "50%",
                y: "50%",
                tooltipPosition: "left",
                clickUrl: "https://cloudinary.com/blog"
              }
            ],
            onHover: {
              action: "overlay",
              args: "Click to see this product in the video"
            },
            onClick: {
              action: "seek",
              pause: 5,
              args: {
                time: "00:01"
              }
            }
          }
        ]
      }
    });

    // Configure text tracks and subtitles
    playerRef.current.source(publicId, {
      textTracks: {
        options: {
          fontFace: textTracks.fontFace,
          fontSize: textTracks.fontSize,
          gravity: textTracks.gravity,
          wordHighlightStyle: {
            color: "royalblue"
          }
        },
        subtitles: {
          label: textTracks.label,
          language: textTracks.language,
          default: true,
          maxWords: textTracks.maxWords,
          wordHighlight: textTracks.wordHighlight
        }
      }
    });

    // Add event listeners
    if (onProductClick) {
      playerRef.current.on('productClick', onProductClick);
    }

    if (onHotspotClick) {
      playerRef.current.on('hotspotClick', onHotspotClick);
    }

    return () => {
      if (playerRef.current) {
        // Remove event listeners
        if (onProductClick) {
          playerRef.current.off('productClick', onProductClick);
        }
        if (onHotspotClick) {
          playerRef.current.off('hotspotClick', onHotspotClick);
        }
        playerRef.current.dispose();
      }
    };
  }, [cloudName, publicId, onProductClick, onHotspotClick, textTracks]);

  return (
    <div className="relative rounded-lg overflow-hidden">
      <video
        ref={videoRef}
        className="w-full aspect-video"
        crossOrigin="anonymous"
      />
    </div>
  );
};

export default DemoPlayer;