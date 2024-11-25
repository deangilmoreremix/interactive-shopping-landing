import React from 'react';
import { Camera, Download, RefreshCw } from 'lucide-react';

interface CameraControlsProps {
  cameraActive: boolean;
  onCameraToggle: () => void;
  onTakePhoto: () => void;
  isProcessing: boolean;
}

export default function CameraControls({
  cameraActive,
  onCameraToggle,
  onTakePhoto,
  isProcessing
}: CameraControlsProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex items-center justify-center gap-4">
        <button
          onClick={onCameraToggle}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
            cameraActive
              ? 'bg-gray-600 hover:bg-gray-700'
              : 'bg-emerald-600 hover:bg-emerald-700'
          } text-white transition-colors`}
        >
          <Camera size={20} />
          {cameraActive ? 'Stop Camera' : 'Start Camera'}
        </button>

        {cameraActive && (
          <>
            <button
              onClick={onTakePhoto}
              disabled={isProcessing}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? (
                <>
                  <RefreshCw className="animate-spin" size={20} />
                  Processing...
                </>
              ) : (
                <>
                  <Camera size={20} />
                  Take Photo
                </>
              )}
            </button>

            <button
              disabled={isProcessing}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Download size={20} />
              Save Image
            </button>
          </>
        )}
      </div>
    </div>
  );
}