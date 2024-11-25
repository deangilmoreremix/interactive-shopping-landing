import React, { useState } from 'react';
import { Plus, X, Settings } from 'lucide-react';
import { Transition } from '../types';

interface TransitionEditorProps {
  transitions: Transition[];
  selectedClipId: string | null;
  onAddTransition: (transition: Omit<Transition, 'id'>) => void;
  onRemoveTransition: (transitionId: string) => void;
}

const TransitionEditor: React.FC<TransitionEditorProps> = ({
  transitions,
  selectedClipId,
  onAddTransition,
  onRemoveTransition
}) => {
  const [selectedType, setSelectedType] = useState('fade');
  const [duration, setDuration] = useState(1);

  const transitionTypes = [
    { id: 'fade', label: 'Fade' },
    { id: 'dissolve', label: 'Dissolve' },
    { id: 'wipe', label: 'Wipe' },
    { id: 'slide', label: 'Slide' },
    { id: 'zoom', label: 'Zoom' }
  ];

  const handleAddTransition = () => {
    if (!selectedClipId) return;

    onAddTransition({
      clipId: selectedClipId,
      type: selectedType,
      duration,
      options: {}
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">Transitions</h3>
        <button
          onClick={handleAddTransition}
          disabled={!selectedClipId}
          className="flex items-center gap-2 bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Plus size={16} />
          Add Transition
        </button>
      </div>

      {/* Transition Type Selection */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Transition Type
        </label>
        <div className="grid grid-cols-2 gap-2">
          {transitionTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setSelectedType(type.id)}
              className={`p-2 rounded-lg text-sm ${
                selectedType === type.id
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {type.label}
            </button>
          ))}
        </div>
      </div>

      {/* Duration Slider */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Duration: {duration}s
        </label>
        <input
          type="range"
          min="0.1"
          max="5"
          step="0.1"
          value={duration}
          onChange={(e) => setDuration(Number(e.target.value))}
          className="w-full"
        />
      </div>

      {/* Active Transitions */}
      <div className="space-y-2">
        <h4 className="text-sm font-medium text-gray-700">Active Transitions</h4>
        {transitions.map((transition) => (
          <div
            key={transition.id}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
          >
            <div>
              <p className="font-medium capitalize">{transition.type}</p>
              <p className="text-sm text-gray-500">{transition.duration}s</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                className="p-1 hover:bg-gray-200 rounded"
                title="Settings"
              >
                <Settings size={16} />
              </button>
              <button
                onClick={() => onRemoveTransition(transition.id)}
                className="p-1 hover:bg-gray-200 rounded text-red-600"
                title="Remove"
              >
                <X size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {!selectedClipId && (
        <div className="text-center text-gray-500 py-4">
          Select a clip to add transitions
        </div>
      )}
    </div>
  );
};

export default TransitionEditor;