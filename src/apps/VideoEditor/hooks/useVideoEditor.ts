import { useState, useCallback } from 'react';
import { Clip, Effect, Transition, AudioTrack } from '../types';

interface VideoEditorState {
  currentTime: number;
  duration: number;
  isPlaying: boolean;
  clips: Clip[];
  selectedClipId: string | null;
  effects: Effect[];
  transitions: Transition[];
  audioTracks: AudioTrack[];
  history: {
    past: any[];
    present: any;
    future: any[];
    canUndo: boolean;
    canRedo: boolean;
  };
}

export function useVideoEditor() {
  const [state, setState] = useState<VideoEditorState>({
    currentTime: 0,
    duration: 0,
    isPlaying: false,
    clips: [],
    selectedClipId: null,
    effects: [],
    transitions: [],
    audioTracks: [],
    history: {
      past: [],
      present: null,
      future: [],
      canUndo: false,
      canRedo: false
    }
  });

  // Playback controls
  const playVideo = useCallback(() => {
    setState(prev => ({ ...prev, isPlaying: true }));
  }, []);

  const pauseVideo = useCallback(() => {
    setState(prev => ({ ...prev, isPlaying: false }));
  }, []);

  // Clip management
  const addClip = useCallback((media: { url: string; name: string }) => {
    setState(prev => ({
      ...prev,
      clips: [
        ...prev.clips,
        {
          id: Date.now().toString(),
          name: media.name,
          url: media.url,
          startTime: 0,
          duration: 5, // Default duration
          color: `#${Math.floor(Math.random()*16777215).toString(16)}` // Random color
        }
      ]
    }));
  }, []);

  const removeClip = useCallback((clipId: string) => {
    setState(prev => ({
      ...prev,
      clips: prev.clips.filter(clip => clip.id !== clipId),
      selectedClipId: prev.selectedClipId === clipId ? null : prev.selectedClipId
    }));
  }, []);

  const updateClip = useCallback((clipId: string, updates: Partial<Clip>) => {
    setState(prev => ({
      ...prev,
      clips: prev.clips.map(clip => 
        clip.id === clipId ? { ...clip, ...updates } : clip
      )
    }));
  }, []);

  const selectClip = useCallback((clipId: string) => {
    setState(prev => ({ ...prev, selectedClipId: clipId }));
  }, []);

  // Effect management
  const addEffect = useCallback((clipId: string, effect: Omit<Effect, 'id'>) => {
    setState(prev => ({
      ...prev,
      effects: [
        ...prev.effects,
        {
          id: Date.now().toString(),
          clipId,
          ...effect
        }
      ]
    }));
  }, []);

  const removeEffect = useCallback((clipId: string, effectId: string) => {
    setState(prev => ({
      ...prev,
      effects: prev.effects.filter(effect => effect.id !== effectId)
    }));
  }, []);

  // Transition management
  const addTransition = useCallback((transition: Omit<Transition, 'id'>) => {
    setState(prev => ({
      ...prev,
      transitions: [
        ...prev.transitions,
        {
          id: Date.now().toString(),
          ...transition
        }
      ]
    }));
  }, []);

  const removeTransition = useCallback((transitionId: string) => {
    setState(prev => ({
      ...prev,
      transitions: prev.transitions.filter(t => t.id !== transitionId)
    }));
  }, []);

  // History management
  const undo = useCallback(() => {
    setState(prev => {
      if (!prev.history.canUndo) return prev;
      const newPast = [...prev.history.past];
      const previousState = newPast.pop();
      return {
        ...previousState,
        history: {
          past: newPast,
          present: previousState,
          future: [prev.history.present, ...prev.history.future],
          canUndo: newPast.length > 0,
          canRedo: true
        }
      };
    });
  }, []);

  const redo = useCallback(() => {
    setState(prev => {
      if (!prev.history.canRedo) return prev;
      const newFuture = [...prev.history.future];
      const nextState = newFuture.shift();
      return {
        ...nextState,
        history: {
          past: [...prev.history.past, prev.history.present],
          present: nextState,
          future: newFuture,
          canUndo: true,
          canRedo: newFuture.length > 0
        }
      };
    });
  }, []);

  // Export functionality
  const exportVideo = useCallback(async (options: {
    format: string;
    quality: string;
    resolution: string;
  }) => {
    // In a real implementation, this would handle video rendering and export
    console.log('Exporting video with options:', options);
    return new Promise<string>((resolve) => {
      setTimeout(() => {
        resolve('https://example.com/exported-video.mp4');
      }, 2000);
    });
  }, []);

  return {
    ...state,
    playVideo,
    pauseVideo,
    addClip,
    removeClip,
    updateClip,
    selectClip,
    addEffect,
    removeEffect,
    addTransition,
    removeTransition,
    undo,
    redo,
    exportVideo
  };
}