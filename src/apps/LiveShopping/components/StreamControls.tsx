import React from 'react';
import { Settings, Signal, Clock } from 'lucide-react';

interface StreamControlsProps {
  isLive: boolean;
  stats: {
    duration: number;
    bitrate: number;
    fps: number;
    quality: string;
  };
  onQualityChange: (quality: string) => void;
}

export default function StreamControls({
  isLive,
  stats,
  onQualityChange
}: StreamControlsProps) {
  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Clock size={20} className="text-gray-400" />
            <span className="text-sm">
              Duration: {formatDuration(stats.duration)}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Signal size={20} className="text-gray-400" />
            <span className="text-sm">
              {(stats.bitrate / 1000).toFixed(1)} Mbps
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Settings size={20} className="text-gray-400" />
            <span className="text-sm">
              {stats.quality} ({stats.fps} FPS)
            </span>
          </div>
        </div>

        <select
          onChange={(e) => onQualityChange(e.target.value)}
          className="px-3 py-1 border rounded-lg text-sm"
          disabled={!isLive}
        >
          <option value="auto">Auto Quality</option>
          <option value="1080p">1080p</option>
          <option value="720p">720p</option>
          <option value="480p">480p</option>
        </select>
      </div>
    </div>
  );
}