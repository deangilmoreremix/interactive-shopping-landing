import React from 'react';
import { Box, Tag } from 'lucide-react';

interface DetectedObject {
  label: string;
  confidence: number;
  bbox: { x: number; y: number; width: number; height: number };
}

interface ObjectDetectionProps {
  detectedObjects: DetectedObject[];
  canvasWidth: number;
  canvasHeight: number;
}

export default function ObjectDetection({ detectedObjects, canvasWidth, canvasHeight }: ObjectDetectionProps) {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {detectedObjects.map((obj, index) => (
        <div
          key={index}
          className="absolute border-2 border-purple-500"
          style={{
            left: `${obj.bbox.x * 100}%`,
            top: `${obj.bbox.y * 100}%`,
            width: `${obj.bbox.width * 100}%`,
            height: `${obj.bbox.height * 100}%`
          }}
        >
          <div className="absolute -top-6 left-0 bg-purple-500 text-white px-2 py-0.5 rounded text-xs flex items-center gap-1">
            <Tag size={12} />
            {obj.label} ({Math.round(obj.confidence * 100)}%)
          </div>
        </div>
      ))}
    </div>
  );
}