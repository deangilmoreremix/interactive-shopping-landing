import { useCallback } from 'react';
import { MutableRefObject } from 'react';

export function useVideoAnalytics(playerRef: MutableRefObject<any>) {
  const trackViewingTime = useCallback(() => {
    if (!playerRef.current) return;

    let startTime = 0;
    let totalViewingTime = 0;

    playerRef.current.on('play', () => {
      startTime = Date.now();
    });

    playerRef.current.on('pause', () => {
      if (startTime > 0) {
        totalViewingTime += Date.now() - startTime;
      }
    });

    playerRef.current.on('ended', () => {
      if (startTime > 0) {
        totalViewingTime += Date.now() - startTime;
      }
    });
  }, []);

  const trackInteractions = useCallback(() => {
    if (!playerRef.current) return;

    const interactions: any[] = [];

    playerRef.current.on('seeked', (data: any) => {
      interactions.push({
        type: 'seek',
        time: data.time,
        timestamp: Date.now()
      });
    });

    playerRef.current.on('qualitychange', (data: any) => {
      interactions.push({
        type: 'quality',
        quality: data.quality,
        timestamp: Date.now()
      });
    });

    if (playerRef.current.video360) {
      playerRef.current.on('viewchange', (data: any) => {
        interactions.push({
          type: 'view',
          yaw: data.yaw,
          pitch: data.pitch,
          timestamp: Date.now()
        });
      });
    }
  }, []);

  const getAnalytics = useCallback(() => {
    if (!playerRef.current) return null;

    return {
      playbackTime: playerRef.current.currentTime(),
      duration: playerRef.current.duration(),
      quality: playerRef.current.videoQuality(),
      buffered: playerRef.current.buffered(),
      volume: playerRef.current.volume(),
      view: playerRef.current.video360 ? {
        yaw: playerRef.current.video360.yaw(),
        pitch: playerRef.current.video360.pitch()
      } : null
    };
  }, []);

  return {
    trackViewingTime,
    trackInteractions,
    getAnalytics
  };
}