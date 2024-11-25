import React from 'react';
import { Play, Eye, Clock } from 'lucide-react';
import { VideoSource } from '../../../types';

interface VideoGridProps {
  videos: VideoSource[];
  onVideoSelect: (video: VideoSource) => void;
  selectedVideoId?: string;
}

const VideoGrid: React.FC<VideoGridProps> = ({ videos, onVideoSelect, selectedVideoId }) => {
  return (
    <div className="grid gap-4">
      {videos.map((video) => (
        <div
          key={video.id}
          onClick={() => onVideoSelect(video)}
          className={`bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer transition-all hover:shadow-md ${
            selectedVideoId === video.id ? 'ring-2 ring-indigo-600' : ''
          }`}
        >
          <div className="relative">
            <img
              src={video.thumbnail}
              alt={video.title}
              className="w-full h-32 object-cover"
            />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
              <Play className="text-white" size={40} />
            </div>
            <span className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-sm">
              {video.duration}
            </span>
          </div>
          <div className="p-4">
            <h4 className="font-semibold text-gray-800 line-clamp-1">{video.title}</h4>
            <p className="text-sm text-gray-600 mt-1 line-clamp-2">{video.description}</p>
            <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <Eye size={16} />
                {video.views.toLocaleString()}
              </span>
              <span className="flex items-center gap-1">
                <Clock size={16} />
                {video.duration}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VideoGrid;