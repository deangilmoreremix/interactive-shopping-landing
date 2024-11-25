import { useEffect, useRef } from 'react';
import { connectCloudinaryAnalytics } from 'cloudinary-video-analytics';
import { CLOUDINARY_CONFIG } from '../config/cloudinary';

interface UseVideoAnalyticsProps {
  videoElement: HTMLVideoElement | null;
  publicId: string;
  onAnalyticsEvent?: (eventName: string, data: any) => void;
}

export function useVideoAnalytics({ 
  videoElement, 
  publicId,
  onAnalyticsEvent 
}: UseVideoAnalyticsProps) {
  const analyticsRef = useRef<any>(null);

  useEffect(() => {
    if (!videoElement || !publicId) return;

    // Initialize analytics
    analyticsRef.current = connectCloudinaryAnalytics(videoElement);

    // Configure analytics
    analyticsRef.current.startManualTracking({
      cloudName: CLOUDINARY_CONFIG.cloudName,
      publicId,
      events: {
        play: true,
        pause: true,
        ended: true,
        timeupdate: true,
        progress: true,
        volumechange: true,
        error: true,
        qualitychange: true,
        seeked: true
      }
    });

    // Add event listeners
    const handleAnalyticsEvent = (event: any) => {
      onAnalyticsEvent?.(event.type, event.detail);
    };

    videoElement.addEventListener('cloudinaryAnalytics', handleAnalyticsEvent);

    // Start auto-tracking
    analyticsRef.current.startAutoTracking();

    return () => {
      if (analyticsRef.current) {
        analyticsRef.current.stopTracking();
      }
      videoElement.removeEventListener('cloudinaryAnalytics', handleAnalyticsEvent);
    };
  }, [videoElement, publicId, onAnalyticsEvent]);

  return analyticsRef.current;
}