import { useCallback } from 'react';
import { MutableRefObject } from 'react';

interface Hotspot {
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
}

export function useHotspots(playerRef: MutableRefObject<any>) {
  const addHotspot = useCallback((hotspot: Hotspot) => {
    if (!playerRef.current) return;

    playerRef.current.hotspots().add({
      time: hotspot.time,
      content: hotspot.content,
      position: hotspot.position
    });
  }, []);

  const removeHotspot = useCallback((hotspotId: string) => {
    if (!playerRef.current) return;

    playerRef.current.hotspots().remove(hotspotId);
  }, []);

  const updateHotspot = useCallback((hotspotId: string, updates: Partial<Hotspot>) => {
    if (!playerRef.current) return;

    playerRef.current.hotspots().update(hotspotId, updates);
  }, []);

  const getVisibleHotspots = useCallback(() => {
    if (!playerRef.current) return [];

    const currentTime = playerRef.current.currentTime();
    return playerRef.current.hotspots().getVisible(currentTime);
  }, []);

  return {
    addHotspot,
    removeHotspot,
    updateHotspot,
    getVisibleHotspots
  };
}