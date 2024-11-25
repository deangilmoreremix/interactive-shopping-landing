import React, { useEffect, useRef } from 'react';
import { CLOUDINARY_CONFIG } from '../config/cloudinary';

interface LivePlayerProps {
  streamUrl: string;
  onStreamStart?: () => void;
  onStreamEnd?: () => void;
}

const LivePlayer: React.FC<LivePlayerProps> = ({
  streamUrl,
  onStreamStart,
  onStreamEnd
}) => {
  const playerRef = useRef<any>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!videoRef.current || typeof window === 'undefined') return;

    const cld = window.cloudinary;
    if (!cld) return;

    // Initialize player with live stream configuration
    playerRef.current = cld.videoPlayer(videoRef.current, {
      cloud_name: CLOUDINARY_CONFIG.cloudName,
      sourceTypes: ['hls'],
      autoplayMode: 'always',
      muted: false,
      controls: true,
      fluid: true,
      bigPlayButton: false,
      posterOptions: {
        transformation: {
          width: 1920,
          height: 1080,
          crop: 'fill',
          quality: 'auto'
        }
      }
    });

    // Set the live stream source
    playerRef.current.source(streamUrl);

    // Add event listeners
    if (onStreamStart) {
      playerRef.current.on('streamstart', onStreamStart);
    }

    if (onStreamEnd) {
      playerRef.current.on('streamend', onStreamEnd);
    }

    return () => {
      if (playerRef.current) {
        if (onStreamStart) {
          playerRef.current.off('streamstart', onStreamStart);
        }
        if (onStreamEnd) {
          playerRef.current.off('streamend', onStreamEnd);
        }
        playerRef.current.dispose();
      }
    };
  }, [streamUrl, onStreamStart, onStreamEnd]);

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

export default LivePlayer;