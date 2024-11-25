import React from 'react';
import { Sliders, Image as ImageIcon, Video, Sparkles } from 'lucide-react';

interface TransformationControlsProps {
  type: 'image' | 'video';
  onTransform: (options: any) => void;
  options: {
    width?: number;
    height?: number;
    crop?: string;
    quality?: string;
    format?: string;
    effect?: string;
    focusOnFaces?: boolean;
    streaming?: {
      profile?: string;
      bitRate?: string;
    };
  };
  setOptions: (options: any) => void;
}

export default function TransformationControls({
  type,
  onTransform,
  options,
  setOptions
}: TransformationControlsProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex items-center gap-2 mb-4">
        {type === 'image' ? <ImageIcon size={20} /> : <Video size={20} />}
        <h3 className="font-semibold">Transformation Controls</h3>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Width
            </label>
            <input
              type="number"
              value={options.width || ''}
              onChange={(e) => setOptions({ ...options, width: Number(e.target.value) })}
              className="w-full rounded-lg border-gray-300 shadow-sm"
              placeholder="Auto"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Height
            </label>
            <input
              type="number"
              value={options.height || ''}
              onChange={(e) => setOptions({ ...options, height: Number(e.target.value) })}
              className="w-full rounded-lg border-gray-300 shadow-sm"
              placeholder="Auto"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Crop Mode
          </label>
          <select
            value={options.crop || 'scale'}
            onChange={(e) => setOptions({ ...options, crop: e.target.value })}
            className="w-full rounded-lg border-gray-300 shadow-sm"
          >
            <option value="scale">Scale</option>
            <option value="fill">Fill</option>
            <option value="thumb">Thumbnail</option>
            <option value="crop">Crop</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Quality
          </label>
          <select
            value={options.quality || 'auto'}
            onChange={(e) => setOptions({ ...options, quality: e.target.value })}
            className="w-full rounded-lg border-gray-300 shadow-sm"
          >
            <option value="auto">Auto</option>
            <option value="90">High (90)</option>
            <option value="80">Medium (80)</option>
            <option value="70">Low (70)</option>
          </select>
        </div>

        {type === 'image' && (
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="focusOnFaces"
              checked={options.focusOnFaces || false}
              onChange={(e) => setOptions({ ...options, focusOnFaces: e.target.checked })}
              className="rounded border-gray-300"
            />
            <label htmlFor="focusOnFaces" className="text-sm text-gray-700">
              Focus on Faces
            </label>
          </div>
        )}

        {type === 'video' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Streaming Profile
            </label>
            <select
              value={options.streaming?.profile || 'auto'}
              onChange={(e) => setOptions({
                ...options,
                streaming: { ...options.streaming, profile: e.target.value }
              })}
              className="w-full rounded-lg border-gray-300 shadow-sm"
            >
              <option value="auto">Auto</option>
              <option value="full_hd">Full HD</option>
              <option value="hd">HD</option>
              <option value="sd">SD</option>
            </select>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Effect
          </label>
          <select
            value={options.effect || ''}
            onChange={(e) => setOptions({ ...options, effect: e.target.value })}
            className="w-full rounded-lg border-gray-300 shadow-sm"
          >
            <option value="">None</option>
            <option value="art:athena">Athena</option>
            <option value="art:audrey">Audrey</option>
            <option value="art:daguerre">Daguerre</option>
            <option value="art:eucalyptus">Eucalyptus</option>
            <option value="art:fes">Fes</option>
          </select>
        </div>

        <button
          onClick={() => onTransform(options)}
          className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
        >
          <Sparkles size={20} />
          Apply Transformation
        </button>
      </div>
    </div>
  );
}