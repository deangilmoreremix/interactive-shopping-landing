import React from 'react';
import { Camera, Crosshair, Maximize2 } from 'lucide-react';

interface ScannerOverlayProps {
  scanning: boolean;
  mode: 'object' | 'barcode' | 'size';
  onModeChange: (mode: 'object' | 'barcode' | 'size') => void;
}

export default function ScannerOverlay({ scanning, mode, onModeChange }: ScannerOverlayProps) {
  return (
    <div className="absolute inset-0">
      {/* Scanning Frame */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className={`
          w-64 h-64 border-2 rounded-lg
          ${scanning ? 'border-purple-500 animate-pulse' : 'border-white/50'}
          ${mode === 'barcode' ? 'w-96 h-32' : ''}
          ${mode === 'size' ? 'w-96 h-96' : ''}
        `}>
          <Crosshair 
            className={`
              absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
              ${scanning ? 'text-purple-500' : 'text-white/50'}
            `}
            size={24}
          />
        </div>
      </div>

      {/* Mode Selector */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 rounded-full p-1">
        <div className="flex gap-2">
          <button
            onClick={() => onModeChange('object')}
            className={`p-2 rounded-full ${mode === 'object' ? 'bg-purple-500 text-white' : 'text-white/70'}`}
            title="Object Detection"
          >
            <Camera size={20} />
          </button>
          <button
            onClick={() => onModeChange('barcode')}
            className={`p-2 rounded-full ${mode === 'barcode' ? 'bg-purple-500 text-white' : 'text-white/70'}`}
            title="Barcode Scanner"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
          <button
            onClick={() => onModeChange('size')}
            className={`p-2 rounded-full ${mode === 'size' ? 'bg-purple-500 text-white' : 'text-white/70'}`}
            title="Size Estimation"
          >
            <Maximize2 size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}