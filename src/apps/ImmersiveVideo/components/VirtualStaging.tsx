import React, { useState } from 'react';
import { X, Palette, Sun, Box, Save } from 'lucide-react';
import { Cloudinary } from "@cloudinary/url-gen";

interface VirtualStagingProps {
  scene: any;
  onClose: () => void;
  cloudinary: Cloudinary;
}

export default function VirtualStaging({
  scene,
  onClose,
  cloudinary
}: VirtualStagingProps) {
  const [selectedFurniture, setSelectedFurniture] = useState<string | null>(null);
  const [lighting, setLighting] = useState({
    intensity: 0.5,
    color: '#ffffff',
    position: { x: 0, y: 5, z: 0 }
  });
  const [materials, setMaterials] = useState<any[]>([]);

  const furnitureItems = [
    { id: 'sofa', name: 'Modern Sofa', preview: 'samples/furniture/sofa' },
    { id: 'chair', name: 'Accent Chair', preview: 'samples/furniture/chair' },
    { id: 'table', name: 'Coffee Table', preview: 'samples/furniture/table' }
  ];

  const materialOptions = [
    { id: 'wood', name: 'Oak Wood', color: '#8B4513' },
    { id: 'metal', name: 'Brushed Steel', color: '#C0C0C0' },
    { id: 'fabric', name: 'Linen', color: '#FAF0E6' }
  ];

  const handleSave = () => {
    // Save staging configuration
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold">Virtual Staging</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* Furniture Selection */}
          <div>
            <h4 className="font-medium flex items-center gap-2 mb-4">
              <Box size={20} />
              Furniture
            </h4>
            <div className="grid gap-4">
              {furnitureItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSelectedFurniture(item.id)}
                  className={`p-4 rounded-lg ${
                    selectedFurniture === item.id
                      ? 'bg-violet-50 border border-violet-200'
                      : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  <img
                    src={cloudinary.image(item.preview).toURL()}
                    alt={item.name}
                    className="w-full h-32 object-cover rounded mb-2"
                  />
                  <span className="font-medium">{item.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Material Selection */}
          <div>
            <h4 className="font-medium flex items-center gap-2 mb-4">
              <Palette size={20} />
              Materials
            </h4>
            <div className="space-y-4">
              {materialOptions.map((material) => (
                <button
                  key={material.id}
                  onClick={() => setMaterials([...materials, material])}
                  className="w-full flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100"
                >
                  <div
                    className="w-8 h-8 rounded"
                    style={{ backgroundColor: material.color }}
                  />
                  <span>{material.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Lighting Controls */}
          <div>
            <h4 className="font-medium flex items-center gap-2 mb-4">
              <Sun size={20} />
              Lighting
            </h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Intensity
                </label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={lighting.intensity}
                  onChange={(e) => setLighting({
                    ...lighting,
                    intensity: Number(e.target.value)
                  })}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Color
                </label>
                <input
                  type="color"
                  value={lighting.color}
                  onChange={(e) => setLighting({
                    ...lighting,
                    color: e.target.value
                  })}
                  className="w-full h-10 rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 bg-violet-600 text-white px-4 py-2 rounded-lg hover:bg-violet-700"
          >
            <Save size={20} />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}