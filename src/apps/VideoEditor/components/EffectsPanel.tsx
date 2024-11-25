import React, { useState } from 'react';
import { Plus, X, Settings, Sliders } from 'lucide-react';
import { Effect } from '../types';

interface EffectsPanelProps {
  effects: Effect[];
  selectedClipId: string | null;
  onAddEffect: (clipId: string, effect: Omit<Effect, 'id'>) => void;
  onRemoveEffect: (clipId: string, effectId: string) => void;
}

const effectPresets = {
  filters: [
    { name: 'LUT', type: 'color', params: { table: 'custom_lut.cube' } },
    { name: 'Color Grading', type: 'color', params: { 
      lift: [1,1,1], gamma: [1,1,1], gain: [1,1,1] 
    }},
    { name: 'Chroma Key', type: 'key', params: { 
      color: '#00ff00', tolerance: 40, blur: 4 
    }}
  ],
  
  distortions: [
    { name: 'Lens Distortion', type: 'distort', params: { amount: 0, centerX: 0.5, centerY: 0.5 }},
    { name: 'Displacement Map', type: 'distort', params: { map: null, amount: 1 }},
    { name: 'Ripple', type: 'distort', params: { frequency: 5, amplitude: 0.5, phase: 0 }}
  ],

  animations: [
    { name: 'Ken Burns', type: 'animation', params: { start: {x:0,y:0,scale:1}, end: {x:0.1,y:0.1,scale:1.2}}},
    { name: 'Camera Shake', type: 'animation', params: { intensity: 5, frequency: 2 }},
    { name: 'Motion Blur', type: 'animation', params: { samples: 8, intensity: 1 }}
  ]
};

export default function EffectsPanel({ effects, selectedClipId, onAddEffect, onRemoveEffect }: EffectsPanelProps) {
  const [activeCategory, setActiveCategory] = useState<'filters' | 'distortions' | 'animations'>('filters');
  const [showEffectSettings, setShowEffectSettings] = useState<string | null>(null);

  const handleAddEffect = (effectPreset: any) => {
    if (!selectedClipId) return;

    onAddEffect(selectedClipId, {
      name: effectPreset.name,
      type: effectPreset.type,
      params: { ...effectPreset.params }
    });
  };

  const getEffectPresets = () => {
    switch (activeCategory) {
      case 'filters':
        return effectPresets.filters;
      case 'distortions':
        return effectPresets.distortions;
      case 'animations':
        return effectPresets.animations;
      default:
        return [];
    }
  };

  return (
    <div className="space-y-4">
      {/* Category Tabs */}
      <div className="flex gap-2">
        {(['filters', 'distortions', 'animations'] as const).map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`flex-1 py-2 px-3 rounded-lg text-sm ${
              activeCategory === category
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      {/* Effect Presets */}
      <div className="space-y-2">
        {getEffectPresets().map((preset, index) => (
          <div
            key={`${preset.name}-${index}`}
            className="bg-gray-50 rounded-lg p-3 hover:bg-gray-100"
          >
            <div className="flex items-center justify-between">
              <span className="font-medium">{preset.name}</span>
              <button
                onClick={() => handleAddEffect(preset)}
                className="p-1 hover:bg-gray-200 rounded"
                disabled={!selectedClipId}
              >
                <Plus size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Active Effects */}
      {selectedClipId && (
        <div className="mt-6">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Active Effects</h4>
          <div className="space-y-2">
            {effects
              .filter(effect => effect.clipId === selectedClipId)
              .map(effect => (
                <div
                  key={effect.id}
                  className="bg-gray-50 rounded-lg p-3"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{effect.name}</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setShowEffectSettings(effect.id)}
                        className="p-1 hover:bg-gray-200 rounded"
                      >
                        <Settings size={16} />
                      </button>
                      <button
                        onClick={() => onRemoveEffect(selectedClipId, effect.id)}
                        className="p-1 hover:bg-gray-200 rounded text-red-600"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </div>

                  {showEffectSettings === effect.id && (
                    <div className="mt-2 pt-2 border-t">
                      {Object.entries(effect.params).map(([key, value]) => (
                        <div key={key} className="flex items-center gap-2 mt-2">
                          <label className="text-sm text-gray-600 flex-1">
                            {key}
                          </label>
                          {typeof value === 'number' ? (
                            <input
                              type="range"
                              min="0"
                              max="100"
                              value={value}
                              onChange={(e) => {
                                // Handle parameter update
                              }}
                              className="w-24"
                            />
                          ) : (
                            <input
                              type="text"
                              value={value}
                              onChange={(e) => {
                                // Handle parameter update
                              }}
                              className="w-24 px-2 py-1 border rounded"
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>
      )}

      {!selectedClipId && (
        <div className="text-center text-gray-500 py-4">
          Select a clip to add effects
        </div>
      )}
    </div>
  );
}