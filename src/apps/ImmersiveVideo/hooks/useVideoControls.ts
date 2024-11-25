import { useCallback } from 'react';
import { MutableRefObject } from 'react';

export function useVideoControls(playerRef: MutableRefObject<any>) {
  const handlePlay = useCallback(() => {
    if (!playerRef.current) return;
    playerRef.current.play();
  }, []);

  const handlePause = useCallback(() => {
    if (!playerRef.current) return;
    playerRef.current.pause();
  }, []);

  const handleSeek = useCallback((time: number) => {
    if (!playerRef.current) return;
    playerRef.current.currentTime(time);
  }, []);

  const handleQualityChange = useCallback((quality: string) => {
    if (!playerRef.current) return;
    playerRef.current.videoQuality(quality);
  }, []);

  return {
    handlePlay,
    handlePause,
    handleSeek,
    handleQualityChange
  };
}