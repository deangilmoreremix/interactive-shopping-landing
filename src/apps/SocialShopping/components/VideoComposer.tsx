import React, { useState } from 'react';
import { Video, Music, Sticker, Sparkles, X } from 'lucide-react';
import { Cloudinary } from "@cloudinary/url-gen";
import { CLOUDINARY_CONFIG } from '../../../config/cloudinary';
import { artisticFilter } from "@cloudinary/url-gen/actions/effect";
import { quality, format } from "@cloudinary/url-gen/actions/delivery";
import { auto } from "@cloudinary/url-gen/qualifiers/quality";

interface VideoComposerProps {
  onClose: () => void;
  onSave: (transformedUrl: string) => void;
}

export default function VideoComposer({ onClose, onSave }: VideoComposerProps) {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [filters, setFilters] = useState<string[]>([]);
  const [music, setMusic] = useState<string | null>(null);
  const [stickers, setStickers] = useState<Array<{ id: string; url: string; position: { x: number; y: number } }>>([]);

  // Initialize Cloudinary
  const cld = new Cloudinary({
    cloud: {
      cloudName: CLOUDINARY_CONFIG.cloudName
    }
  });

  const handleVideoUpload = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_CONFIG.uploadConfig.uploadPreset);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CONFIG.cloudName}/video/upload`,
        {
          method: 'POST',
          body: formData
        }
      );

      const data = await response.json();
      setSelectedVideo(data.public_id);
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };

  const applyTransformations = () => {
    if (!selectedVideo) return;

    const video = cld.video(selectedVideo);

    // Apply filters
    filters.forEach(filterName => {
      video.effect(artisticFilter(filterName));
    });

    // Apply optimizations
    video
      .quality(auto())
      .format(format('auto'));

    // Apply music if selected
    if (music) {
      video.overlay(
        cld.video(music)
          .quality(auto())
      );
    }

    // Apply stickers
    stickers.forEach(sticker => {
      video.overlay(
        cld.image(sticker.url)
          .position({
            x: sticker.position.x,
            y: sticker.position.y,
            gravity: 'center'
          })
      );
    });

    onSave(video.toURL());
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold">Video Editor</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <button className="flex flex-col items-center gap-2 p-4 bg-gray-50 rounded-lg hover:bg-gray-100">
            <Video size={24} />
            <span className="text-sm">Filters</span>
          </button>
          <button className="flex flex-col items-center gap-2 p-4 bg-gray-50 rounded-lg hover:bg-gray-100">
            <Music size={24} />
            <span className="text-sm">Music</span>
          </button>
          <button className="flex flex-col items-center gap-2 p-4 bg-gray-50 rounded-lg hover:bg-gray-100">
            <Sticker size={24} />
            <span className="text-sm">Stickers</span>
          </button>
        </div>

        <div className="space-y-6">
          {/* Video Preview */}
          <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden">
            {selectedVideo ? (
              <video
                src={cld.video(selectedVideo).toURL()}
                className="w-full h-full object-contain"
                controls
              />
            ) : (
              <div className="h-full flex items-center justify-center">
                <input
                  type="file"
                  accept="video/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleVideoUpload(file);
                  }}
                  className="hidden"
                  id="video-upload"
                />
                <label
                  htmlFor="video-upload"
                  className="cursor-pointer text-gray-400 hover:text-gray-300"
                >
                  <Video size={48} className="mx-auto mb-2" />
                  <p>Upload video</p>
                </label>
              </div>
            )}
          </div>

          {/* Filters */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">Filters</h4>
            <div className="grid grid-cols-4 gap-2">
              {['athena', 'audrey', 'daguerre', 'eucalyptus'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setFilters([...filters, filter])}
                  className={`p-2 text-sm rounded-lg ${
                    filters.includes(filter)
                      ? 'bg-pink-100 text-pink-600'
                      : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* Save Button */}
          <button
            onClick={applyTransformations}
            disabled={!selectedVideo}
            className="w-full flex items-center justify-center gap-2 bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 disabled:opacity-50"
          >
            <Sparkles size={20} />
            Save Video
          </button>
        </div>
      </div>
    </div>
  );
}