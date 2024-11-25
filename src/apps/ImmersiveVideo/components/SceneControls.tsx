import React from 'react';
import { Eye } from 'lucide-react';

interface SceneControlsProps {
  viewMode: '360' | 'standard';
}

export default function SceneControls({
  viewMode
}: SceneControlsProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <h3 className="font-semibold mb-4">View Controls</h3>
      <div className="space-y-2">
        <div className="p-3 bg-violet-50 text-violet-700 rounded-lg">
          <p className="text-sm font-medium">Current Mode: {viewMode === '360' ? '360° View' : 'Standard View'}</p>
          {viewMode === '360' && (
            <p className="text-xs mt-1">
              Use mouse or arrow keys to look around
            </p>
          )}
        </div>
      </div>
    </div>
  );
}