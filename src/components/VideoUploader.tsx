import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X } from 'lucide-react';
import { uploadToCloudinary } from '../utils/cloudinary';

interface VideoUploaderProps {
  onUpload: (result: any) => void;
  onClose: () => void;
}

const VideoUploader: React.FC<VideoUploaderProps> = ({ onUpload, onClose }) => {
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;
    
    try {
      const result = await uploadToCloudinary(acceptedFiles[0]);
      onUpload(result);
    } catch (error) {
      console.error('Upload failed:', error);
    }
  }, [onUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'video/*': ['.mp4', '.webm', '.ogg']
    },
    maxSize: 100 * 1024 * 1024, // 100MB
    multiple: false
  });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 max-w-lg w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Upload Video</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center ${
            isDragActive ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300'
          }`}
        >
          <input {...getInputProps()} />
          <Upload className="mx-auto text-gray-400 mb-4" size={48} />
          <p className="text-gray-600 mb-2">
            Drag and drop your video file here, or click to browse
          </p>
          <p className="text-sm text-gray-500">
            Supported formats: MP4, WebM, OGG (max 100MB)
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoUploader;