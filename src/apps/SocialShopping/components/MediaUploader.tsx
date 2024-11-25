import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { X, Upload, Image as ImageIcon, Video, Camera } from 'lucide-react';
import { Cloudinary } from "@cloudinary/url-gen";
import { CLOUDINARY_CONFIG } from '../../../config/cloudinary';

interface MediaUploaderProps {
  onClose: () => void;
  onUpload: (result: any) => void;
}

export default function MediaUploader({ onClose, onUpload }: MediaUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Initialize Cloudinary
  const cld = new Cloudinary({
    cloud: {
      cloudName: CLOUDINARY_CONFIG.cloudName
    }
  });

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;
    
    const file = acceptedFiles[0];
    setPreview(URL.createObjectURL(file));
    setUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', CLOUDINARY_CONFIG.uploadConfig.uploadPreset);
      formData.append('cloud_name', CLOUDINARY_CONFIG.cloudName);

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CONFIG.cloudName}/auto/upload`,
        {
          method: 'POST',
          body: formData
        }
      );

      const result = await response.json();
      
      if (result.error) {
        throw new Error(result.error.message);
      }

      onUpload(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setUploading(false);
    }
  }, [onUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpg', '.jpeg', '.png', '.gif'],
      'video/*': ['.mp4', '.webm', '.mov']
    },
    maxSize: 100 * 1024 * 1024, // 100MB
    multiple: false
  });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-lg w-full mx-4">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold">Create New Post</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>

        {preview ? (
          <div className="space-y-4">
            <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
              <img
                src={preview}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setPreview(null)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={() => {/* Handle post creation */}}
                disabled={uploading}
                className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 disabled:opacity-50"
              >
                {uploading ? 'Uploading...' : 'Share Post'}
              </button>
            </div>
          </div>
        ) : (
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-8 text-center ${
              isDragActive ? 'border-pink-500 bg-pink-50' : 'border-gray-300'
            } ${uploading ? 'pointer-events-none opacity-50' : ''}`}
          >
            <input {...getInputProps()} />
            <div className="flex justify-center gap-4 mb-4">
              <ImageIcon className="text-gray-400" size={32} />
              <Video className="text-gray-400" size={32} />
            </div>
            <p className="text-gray-600 mb-2">
              Drag and drop your media here, or click to browse
            </p>
            <p className="text-sm text-gray-500">
              Supported formats: JPG, PNG, GIF, MP4, WEBM (max 100MB)
            </p>
          </div>
        )}

        {error && (
          <div className="mt-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">
            {error}
          </div>
        )}

        <div className="mt-6 flex justify-center">
          <button
            onClick={() => {/* Handle camera capture */}}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
          >
            <Camera size={20} />
            Take Photo/Video
          </button>
        </div>
      </div>
    </div>
  );
}