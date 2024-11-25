import React, { useState } from 'react';
import { X, Plus, Image as ImageIcon, Video, ShoppingBag } from 'lucide-react';
import { Cloudinary } from "@cloudinary/url-gen";
import { CLOUDINARY_CONFIG } from '../../../config/cloudinary';

interface StoryEditorProps {
  onClose: () => void;
  onSave: (story: any) => void;
}

export default function StoryEditor({ onClose, onSave }: StoryEditorProps) {
  const [title, setTitle] = useState('');
  const [slides, setSlides] = useState<any[]>([]);
  const [currentSlide, setCurrentSlide] = useState<number | null>(null);

  // Initialize Cloudinary
  const cld = new Cloudinary({
    cloud: {
      cloudName: CLOUDINARY_CONFIG.cloudName
    }
  });

  const handleMediaUpload = async (file: File, type: 'image' | 'video') => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_CONFIG.uploadConfig.uploadPreset);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CONFIG.cloudName}/${type}/upload`,
        {
          method: 'POST',
          body: formData
        }
      );

      const result = await response.json();
      
      const newSlide = {
        id: Date.now().toString(),
        type,
        mediaId: result.public_id,
        duration: type === 'image' ? 5 : Math.min(15, result.duration),
        products: []
      };

      setSlides(prev => [...prev, newSlide]);
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };

  const handleSave = () => {
    if (!title || slides.length === 0) return;

    const story = {
      id: Date.now().toString(),
      title,
      thumbnail: slides[0].mediaId,
      slides,
      products: slides.reduce((acc, slide) => acc + (slide.products?.length || 0), 0),
      views: 0
    };

    onSave(story);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold">Create Story</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Story Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Enter story title..."
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-medium">Slides</h4>
              <div className="flex gap-2">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleMediaUpload(file, 'image');
                  }}
                  className="hidden"
                  id="image-upload"
                />
                <input
                  type="file"
                  accept="video/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleMediaUpload(file, 'video');
                  }}
                  className="hidden"
                  id="video-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="flex items-center gap-2 bg-gray-100 text-gray-600 px-3 py-1.5 rounded-lg hover:bg-gray-200 cursor-pointer"
                >
                  <ImageIcon size={16} />
                  Add Image
                </label>
                <label
                  htmlFor="video-upload"
                  className="flex items-center gap-2 bg-gray-100 text-gray-600 px-3 py-1.5 rounded-lg hover:bg-gray-200 cursor-pointer"
                >
                  <Video size={16} />
                  Add Video
                </label>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4">
              {slides.map((slide, index) => (
                <div
                  key={slide.id}
                  onClick={() => setCurrentSlide(index)}
                  className={`relative aspect-[9/16] rounded-lg overflow-hidden cursor-pointer ${
                    currentSlide === index ? 'ring-2 ring-teal-600' : ''
                  }`}
                >
                  {slide.type === 'image' ? (
                    <img
                      src={cld.image(slide.mediaId).format('auto').quality('auto').toURL()}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <video
                      src={cld.video(slide.mediaId).format('auto').quality('auto').toURL()}
                      className="w-full h-full object-cover"
                    />
                  )}
                  <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                    {slide.duration}s
                  </div>
                  {slide.products?.length > 0 && (
                    <div className="absolute top-2 right-2 bg-white/90 text-gray-800 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                      <ShoppingBag size={12} />
                      {slide.products.length}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={!title || slides.length === 0}
              className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 disabled:opacity-50"
            >
              Create Story
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}