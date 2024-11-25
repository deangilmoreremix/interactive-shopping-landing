import React from 'react';
import { transformImage, transformVideo } from '../utils/cloudinary';

interface MediaPreviewProps {
  publicId: string;
  type: 'image' | 'video';
  transformation?: {
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
}

export default function MediaPreview({ publicId, type, transformation }: MediaPreviewProps) {
  if (type === 'image') {
    const cldImage = transformImage(publicId, transformation || {});
    return (
      <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-100">
        <img
          src={cldImage.toURL()}
          alt="Preview"
          className="w-full h-full object-contain"
        />
      </div>
    );
  }

  const cldVideo = transformVideo(publicId, transformation || {});
  return (
    <div className="relative aspect-video rounded-lg overflow-hidden bg-black">
      <video
        src={cldVideo.toURL()}
        className="w-full h-full"
        controls
        crossOrigin="anonymous"
        playsInline
      />
    </div>
  );
}