import React from 'react';
import { Clip, Transition } from '../types';

interface TimelineProps {
  clips: Clip[];
  currentTime: number;
  duration: number;
  selectedClipId: string | null;
  transitions: Transition[];
  onClipSelect: (clipId: string) => void;
  onClipUpdate: (clipId: string, updates: Partial<Clip>) => void;
  onClipRemove: (clipId: string) => void;
}

const Timeline: React.FC<TimelineProps> = ({
  clips,
  currentTime,
  duration,
  selectedClipId,
  transitions,
  onClipSelect,
  onClipUpdate,
  onClipRemove
}) => {
  const timelineRef = React.useRef<HTMLDivElement>(null);

  const handleClipDrag = (clipId: string, newStartTime: number) => {
    onClipUpdate(clipId, { startTime: Math.max(0, newStartTime) });
  };

  const handleClipResize = (clipId: string, newDuration: number) => {
    onClipUpdate(clipId, { duration: Math.max(0.1, newDuration) });
  };

  return (
    <div className="bg-gray-900 rounded-lg p-4 mt-4">
      {/* Timeline Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="text-white">
          <span className="font-medium">
            {Math.floor(currentTime / 60)}:{(currentTime % 60).toFixed(2).padStart(5, '0')}
          </span>
          <span className="text-gray-400 mx-2">/</span>
          <span className="text-gray-400">
            {Math.floor(duration / 60)}:{(duration % 60).toFixed(2).padStart(5, '0')}
          </span>
        </div>
        <div className="flex gap-2">
          <button className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm">
            Add Track
          </button>
          <select className="bg-gray-800 text-white rounded-md text-sm px-2">
            <option value="100">100%</option>
            <option value="75">75%</option>
            <option value="50">50%</option>
          </select>
        </div>
      </div>

      {/* Timeline Content */}
      <div
        ref={timelineRef}
        className="relative h-32 bg-gray-800 rounded-lg overflow-hidden"
      >
        {/* Time Markers */}
        <div className="absolute top-0 left-0 right-0 h-6 border-b border-gray-700">
          {Array.from({ length: Math.ceil(duration) }).map((_, i) => (
            <div
              key={i}
              className="absolute top-0 bottom-0 border-l border-gray-700"
              style={{ left: `${(i / duration) * 100}%` }}
            >
              <span className="text-xs text-gray-500 ml-1">{i}s</span>
            </div>
          ))}
        </div>

        {/* Clips */}
        <div className="absolute top-6 left-0 right-0 bottom-0">
          {clips.map((clip) => (
            <div
              key={clip.id}
              onClick={() => onClipSelect(clip.id)}
              className={`absolute h-12 rounded-md cursor-pointer transition-all ${
                selectedClipId === clip.id
                  ? 'ring-2 ring-blue-500'
                  : 'hover:ring-2 hover:ring-blue-400'
              }`}
              style={{
                left: `${(clip.startTime / duration) * 100}%`,
                width: `${(clip.duration / duration) * 100}%`,
                top: '8px',
                backgroundColor: clip.color || '#4F46E5'
              }}
            >
              <div className="px-2 py-1 text-xs text-white truncate">
                {clip.name}
              </div>
              {/* Resize Handles */}
              <div
                className="absolute left-0 top-0 bottom-0 w-1 cursor-w-resize"
                onMouseDown={(e) => {
                  // Implement resize logic
                }}
              />
              <div
                className="absolute right-0 top-0 bottom-0 w-1 cursor-e-resize"
                onMouseDown={(e) => {
                  // Implement resize logic
                }}
              />
            </div>
          ))}

          {/* Transitions */}
          {transitions.map((transition) => (
            <div
              key={transition.id}
              className="absolute h-4 bg-gradient-to-r from-purple-500 to-transparent opacity-50 rounded-sm"
              style={{
                left: `${(transition.startTime / duration) * 100}%`,
                width: `${(transition.duration / duration) * 100}%`,
                bottom: '4px'
              }}
            />
          ))}

          {/* Playhead */}
          <div
            className="absolute top-0 bottom-0 w-px bg-red-500 pointer-events-none"
            style={{ left: `${(currentTime / duration) * 100}%` }}
          >
            <div className="w-3 h-3 bg-red-500 rounded-full -translate-x-1/2" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timeline;