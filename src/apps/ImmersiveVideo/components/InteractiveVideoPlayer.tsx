import React, { useEffect, useRef, useState } from 'react';
import { CLOUDINARY_CONFIG } from '../../../config/cloudinary';
import { useVideoControls } from '../hooks/useVideoControls';
import { useVideoAnalytics } from '../hooks/useVideoAnalytics';
import { useHotspots } from '../hooks/useHotspots';

interface InteractiveVideoProps {
  publicId: string;
  onHotspotClick?: (hotspot: any) => void;
  hotspots?: Array<{
    id: string;
    time: string;
    content: {
      title: string;
      description: string;
    };
    position?: {
      x: number;
      y: number;
    };
  }>;
  mode?: '360' | 'standard';
  onViewChange?: (view: { x: number; y: number }) => void;
  initialView?: { x: number; y: number };
  options?: {
    autorotate?: boolean;
    autorotateSpeed?: number;
    compass?: boolean;
    mouseZoom?: boolean;
    keyboardControls?: boolean;
    gyroscope?: boolean;
  };
}

export default function InteractiveVideoPlayer({
  publicId,
  onHotspotClick,
  hotspots = [],
  mode = '360',
  onViewChange,
  initialView,
  options = {
    autorotate: true,
    autorotateSpeed: 2,
    compass: true,
    mouseZoom: true,
    keyboardControls: true,
    gyroscope: true
  }
}: InteractiveVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<any>(null);
  const [isReady, setIsReady] = useState(false);
  const [currentView, setCurrentView] = useState(initialView);

  const { 
    handlePlay, 
    handlePause, 
    handleSeek,
    handleQualityChange 
  } = useVideoControls(playerRef);

  const { 
    trackViewingTime, 
    trackInteractions,
    getAnalytics 
  } = useVideoAnalytics(playerRef);

  const {
    addHotspot,
    removeHotspot,
    updateHotspot,
    getVisibleHotspots
  } = useHotspots(playerRef);

  useEffect(() => {
    if (!videoRef.current || typeof window === 'undefined') return;

    const cld = window.cloudinary;
    if (!cld) return;

    // Initialize the player with enhanced features
    const playerOptions = {
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
      plugins: {
        analytics: {
          events: ['play', 'pause', 'ended', 'timeupdate', 'percentsplayed'],
          trackPlayback: true,
          trackSeek: true,
          generateHeatmap: true
        }
      }
    };

    // Initialize player
    playerRef.current = cld.videoPlayer(videoRef.current, playerOptions);

    // Configure hotspots
    if (hotspots.length > 0) {
      playerRef.current.hotspots({
        hotspots: hotspots.map(hotspot => ({
          time: hotspot.time,
          content: hotspot.content,
          position: hotspot.position,
          onClick: () => onHotspotClick?.(hotspot)
        }))
      });
    }

    // Add event listeners
    playerRef.current.on('ready', () => {
      setIsReady(true);
    });

    if (mode === '360') {
      playerRef.current.on('viewchange', (view: { x: number; y: number }) => {
        setCurrentView(view);
        onViewChange?.(view);
      });
    }

    // Start analytics tracking
    trackViewingTime();
    trackInteractions();

    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
      }
    };
  }, [
    publicId, 
    hotspots, 
    mode, 
    options, 
    initialView, 
    onHotspotClick, 
    onViewChange,
    trackViewingTime,
    trackInteractions
  ]);

  return (
    <div className="relative rounded-lg overflow-hidden bg-black">
      <video
        ref={videoRef}
        className="w-full aspect-video"
        crossOrigin="anonymous"
        playsInline
      />
      
      {/* Compass Overlay */}
      {mode === '360' && options.compass && currentView && (
        <div className="absolute top-4 right-4 bg-black/50 text-white px-2 py-1 rounded text-sm">
          {Math.round(currentView.x)}° / {Math.round(currentView.y)}°
        </div>
      )}

      {/* Loading Indicator */}
      {!isReady && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent" />
        </div>
      )}
    </div>
  );
}