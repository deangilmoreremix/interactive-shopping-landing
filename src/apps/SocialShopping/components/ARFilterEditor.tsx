import React, { useState } from 'react';
import { Sparkles, Sliders, Camera, Download, X } from 'lucide-react';
import { Cloudinary } from "@cloudinary/url-gen";
import { Effect } from "@cloudinary/url-gen/actions/effect";
import { Transformation } from "@cloudinary/url-gen";
import { CLOUDINARY_CONFIG } from '../../../config/cloudinary';

interface ARFilterEditorProps {
  onApply: (filter: any) => void;
  onClose: () => void;
}

export default function ARFilterEditor({ onApply, onClose }: ARFilterEditorProps) {
  const [selectedFilter, setSelectedFilter] = useState('');
  const [intensity, setIntensity] = useState(50);

  const filters = [
    {
      id: 'cartoonify',
      name: 'Cartoon',
      preview: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2'
    },
    {
      id: 'art:athena',
      name: 'Athena',
      preview: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04'
    },
    {
      id: 'art:audrey',
      name: 'Audrey',
      preview: 'https://images.unsplash.com/photo-1517841905240-472988babdf9'
    },
    {
      id: 'art:daguerre',
      name: 'Vintage',
      preview: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb'
    }
  ];

  // Initialize Cloudinary
  const cld = new Cloudinary({
    cloud: {
      cloudName: CLOUDINARY_CONFIG.cloudName
    }
  });

  const handleApplyFilter = () => {
    const transformation = new Transformation()
      .effect(Effect.artisticFilter(selectedFilter))
      .effect(Effect.intensity(intensity));

    onApply({
      id: selectedFilter,
      intensity,
      transformation: transformation.toString()
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-xl w-full mx-4">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold">AR Filters</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setSelectedFilter(filter.id)}
              className={`relative aspect-square rounded-lg overflow-hidden ${
                selectedFilter === filter.id ? 'ring-2 ring-pink-500' : ''
              }`}
            >
              <img
                src={cld.image(filter.preview)
                  .effect(Effect.artisticFilter(filter.id))
                  .toURL()}
                alt={filter.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent">
                <span className="absolute bottom-2 left-2 text-white text-sm">
                  {filter.name}
                </span>
              </div>
            </button>
          ))}
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Filter Intensity
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={intensity}
            onChange={(e) => setIntensity(Number(e.target.value))}
            className="w-full"
          />
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
          <button
            onClick={handleApplyFilter}
            disabled={!selectedFilter}
            className="flex items-center gap-2 bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 disabled:opacity-50"
          >
            <Sparkles size={20} />
            Apply Filter
          </button>
        </div>
      </div>
    </div>
  );
}