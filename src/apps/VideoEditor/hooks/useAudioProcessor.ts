import { useCallback, useRef } from 'react';

interface AudioEffect {
  type: 'reverb' | 'echo' | 'eq' | 'compression';
  params: any;
}

export function useAudioProcessor() {
  const audioContextRef = useRef<AudioContext | null>(null);
  const effectsChainRef = useRef<AudioNode[]>([]);

  const initializeAudioContext = useCallback(() => {
    audioContextRef.current = new AudioContext();
  }, []);

  const createAudioEffect = useCallback((effect: AudioEffect) => {
    if (!audioContextRef.current) return null;

    switch (effect.type) {
      case 'reverb':
        return createReverb(effect.params);
      case 'echo':
        return createEcho(effect.params);
      case 'eq':
        return createEQ(effect.params);
      case 'compression':
        return createCompressor(effect.params);
      default:
        return null;
    }
  }, []);

  const createReverb = (params: any) => {
    if (!audioContextRef.current) return null;

    const convolver = audioContextRef.current.createConvolver();
    // Create impulse response
    const rate = audioContextRef.current.sampleRate;
    const length = rate * params.duration;
    const decay = params.decay;
    const impulse = audioContextRef.current.createBuffer(2, length, rate);

    for (let channel = 0; channel < 2; channel++) {
      const channelData = impulse.getChannelData(channel);
      for (let i = 0; i < length; i++) {
        channelData[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, decay);
      }
    }

    convolver.buffer = impulse;
    return convolver;
  };

  const createEcho = (params: any) => {
    if (!audioContextRef.current) return null;

    const delay = audioContextRef.current.createDelay();
    delay.delayTime.value = params.delayTime;

    const feedback = audioContextRef.current.createGain();
    feedback.gain.value = params.feedback;

    delay.connect(feedback);
    feedback.connect(delay);

    return delay;
  };

  const createEQ = (params: any) => {
    if (!audioContextRef.current) return null;

    const bands = [60, 170, 350, 1000, 3500, 10000];
    const filters = bands.map(frequency => {
      const filter = audioContextRef.current!.createBiquadFilter();
      filter.type = 'peaking';
      filter.frequency.value = frequency;
      filter.Q.value = 1;
      filter.gain.value = params[`${frequency}Hz`] || 0;
      return filter;
    });

    // Connect filters in series
    filters.reduce((prev, curr) => {
      prev.connect(curr);
      return curr;
    });

    return filters[0];
  };

  const createCompressor = (params: any) => {
    if (!audioContextRef.current) return null;

    const compressor = audioContextRef.current.createDynamicsCompressor();
    compressor.threshold.value = params.threshold;
    compressor.knee.value = params.knee;
    compressor.ratio.value = params.ratio;
    compressor.attack.value = params.attack;
    compressor.release.value = params.release;

    return compressor;
  };

  const applyEffects = useCallback((audioBuffer: AudioBuffer, effects: AudioEffect[]) => {
    if (!audioContextRef.current) return null;

    const source = audioContextRef.current.createBufferSource();
    source.buffer = audioBuffer;

    // Create and connect effects chain
    const effectNodes = effects
      .map(effect => createAudioEffect(effect))
      .filter(node => node !== null) as AudioNode[];

    effectsChainRef.current = effectNodes;

    // Connect nodes in series
    if (effectNodes.length > 0) {
      source.connect(effectNodes[0]);
      effectNodes.reduce((prev, curr) => {
        prev.connect(curr);
        return curr;
      });
      effectNodes[effectNodes.length - 1].connect(audioContextRef.current!.destination);
    } else {
      source.connect(audioContextRef.current.destination);
    }

    return source;
  }, [createAudioEffect]);

  return {
    initializeAudioContext,
    createAudioEffect,
    applyEffects
  };
}