import React, { useEffect, useRef } from 'react';
import { CLOUDINARY_CONFIG } from '../../../config/cloudinary';

interface SocialVideoPlayerProps {
  publicId: string;
  onPlay?: () => void;
  onPause?: () => void;
  onEnded?: () => void;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
}

export default function SocialVideoPlayer({
  publicId,
  onPlay,
  onPause,
  onEnded,
  autoPlay = false,
  muted = true,
  loop = true
}: SocialVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<any>(null);

  useEffect(() => {
    if (!videoRef.current || typeof window === 'undefined') return;

    const cld = window.cloudinary;
    if (!cld) return;

    // Initialize player with social media optimizations
    playerRef.current = cld.videoPlayer(videoRef.current, {
      cloud_name: CLOUDINARY_CONFIG.cloudName,
      publicId,
      fluid: true,
      controls: true,
      preload: 'auto',
      muted,
      loop,
      autoplay: autoPlay,
      playsinline: true,
      sourceTypes: ['hls', 'dash', 'mp4'],
      transformation: {
        quality: 'auto',
        fetchFormat: 'auto',
        streaming_profile: 'social_media'
      }
    });

    // Add event listeners
    if (onPlay) playerRef.current.on('play', onPlay);
    if (onPause) playerRef.current.on('pause', onPause);
    if (onEnded) playerRef.current.on('ended', onEnded);

    return () => {
      if (playerRef.current) {
        if (onPlay) playerRef.current.off('play', onPlay);
        if (onPause) playerRef.current.off('pause', onPause);
        if (onEnded) playerRef.current.off('ended', onEnded);
        playerRef.current.dispose();
      }
    };
  }, [publicId, onPlay, onPause, onEnded, autoPlay, muted, loop]);

  return (
    <div className="relative rounded-lg overflow-hidden bg-black aspect-video">
      <video
        ref={videoRef}
        className="w-full h-full"
        crossOrigin="anonymous"
        playsInline
      />
    </div>
  );
}