import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { AudioTrack } from '../types';

interface AudioMixerProps {
  tracks: AudioTrack[];
  selectedClipId: string | null;
}

export default function AudioMixer({ tracks, selectedClipId }: AudioMixerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Initialize Audio Context
    audioContextRef.current = new AudioContext();
    analyserRef.current = audioContextRef.current.createAnalyser();
    const audioData = new Uint8Array(analyserRef.current.frequencyBinCount);

    // Create audio effects
    const effects = {
      equalizer: audioContextRef.current.createBiquadFilter(),
      compressor: audioContextRef.current.createDynamicsCompressor(),
      reverb: audioContextRef.current.createConvolver()
    };

    // Set up audio processing chain
    if (tracks.length > 0) {
      tracks.forEach(track => {
        const audioElement = new Audio(track.url);
        const source = audioContextRef.current!.createMediaElementSource(audioElement);
        
        // Connect through effects chain
        source
          .connect(effects.equalizer)
          .connect(effects.compressor)
          .connect(effects.reverb)
          .connect(analyserRef.current!)
          .connect(audioContextRef.current!.destination);

        // Set initial volume
        audioElement.volume = track.volume;
      });
    }

    // Render waveform visualization
    const ctx = canvasRef.current.getContext('2d')!;
    const draw = () => {
      if (!analyserRef.current) return;
      
      requestAnimationFrame(draw);
      analyserRef.current.getByteTimeDomainData(audioData);

      ctx.fillStyle = 'rgb(20, 20, 20)';
      ctx.fillRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);

      ctx.lineWidth = 2;
      ctx.strokeStyle = 'rgb(79, 70, 229)';
      ctx.beginPath();

      const sliceWidth = canvasRef.current!.width / audioData.length;
      let x = 0;

      for (let i = 0; i < audioData.length; i++) {
        const v = audioData[i] / 128.0;
        const y = v * canvasRef.current!.height / 2;

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }

        x += sliceWidth;
      }

      ctx.lineTo(canvasRef.current!.width, canvasRef.current!.height / 2);
      ctx.stroke();
    };

    draw();

    return () => {
      if (audioContextRef.current?.state !== 'closed') {
        audioContextRef.current?.close();
      }
    };
  }, [tracks]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">Audio Mixer</h3>
        <button
          onClick={() => setIsMuted(!isMuted)}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>
      </div>

      {/* Master Volume */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Master Volume</label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
          className="w-full"
        />
      </div>

      {/* Waveform Visualization */}
      <canvas
        ref={canvasRef}
        width="320"
        height="80"
        className="w-full bg-gray-900 rounded-lg"
      />

      {/* Audio Tracks */}
      <div className="space-y-2">
        {tracks.map((track) => (
          <div
            key={track.id}
            className={`p-3 rounded-lg ${
              track.clipId === selectedClipId
                ? 'bg-indigo-50 border border-indigo-200'
                : 'bg-gray-50'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Music size={16} />
                <span className="text-sm font-medium">{track.id}</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={track.volume}
                className="w-24"
              />
            </div>
            <div className="flex gap-2 text-xs text-gray-500">
              <span>{track.startTime}s</span>
              <span>-</span>
              <span>{track.duration}s</span>
            </div>
          </div>
        ))}
      </div>

      {/* Add Track Button */}
      <button className="w-full py-2 px-4 border-2 border-dashed rounded-lg text-gray-500 hover:text-indigo-600 hover:border-indigo-600">
        Add Audio Track
      </button>
    </div>
  );
}