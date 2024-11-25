import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, Image, Video, Loader } from 'lucide-react';
import { uploadToCloudinary } from '../utils/cloudinary';
import MediaEditor from './MediaEditor';

interface MediaUploaderProps {
  type?: 'image' | 'video' | 'both';
  onUpload: (result: any) => void;
  onClose: () => void;
}

const MediaUploader: React.FC<MediaUploaderProps> = ({
  type = 'both',
  onUpload,
  onClose
}) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showEditor, setShowEditor] = useState(false);
  const [uploadedMedia, setUploadedMedia] = useState<any>(null);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;
    
    setUploading(true);
    setError(null);
    
    try {
      const file = acceptedFiles[0];
      const result = await uploadToCloudinary(file);
      setUploadedMedia(result);
      setShowEditor(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setUploading(false);
    }
  }, []);

  const handleEditorSave = (result: any) => {
    setShowEditor(false);
    onUpload(result);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      ...(type === 'image' || type === 'both' ? {
        'image/*': ['.jpg', '.jpeg', '.png', '.gif', '.webp']
      } : {}),
      ...(type === 'video' || type === 'both' ? {
        'video/*': ['.mp4', '.webm', '.mov']
      } : {})
    },
    maxSize: 100000000, // 100MB
    multiple: false
  });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      {showEditor && uploadedMedia ? (
        <MediaEditor
          publicId={uploadedMedia.public_id}
          resourceType={uploadedMedia.resource_type}
          onSave={handleEditorSave}
          onCancel={() => setShowEditor(false)}
        />
      ) : (
        <div className="bg-white rounded-lg p-6 max-w-lg w-full">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Upload Media</h3>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
          </div>

          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-8 text-center ${
              isDragActive ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300'
            } ${uploading ? 'pointer-events-none opacity-50' : ''}`}
          >
            <input {...getInputProps()} />
            {uploading ? (
              <div className="flex flex-col items-center">
                <Loader className="animate-spin text-indigo-600 mb-4" size={48} />
                <p className="text-gray-600">Uploading...</p>
              </div>
            ) : (
              <>
                <div className="flex justify-center mb-4">
                  {type === 'both' ? (
                    <div className="flex gap-4">
                      <Image className="text-gray-400" size={32} />
                      <Video className="text-gray-400" size={32} />
                    </div>
                  ) : type === 'image' ? (
                    <Image className="text-gray-400" size={48} />
                  ) : (
                    <Video className="text-gray-400" size={48} />
                  )}
                </div>
                <p className="text-gray-600 mb-2">
                  Drag and drop your {type === 'both' ? 'media' : type} here, or click to browse
                </p>
                <p className="text-sm text-gray-500">
                  {type === 'both' ? (
                    'Supported formats: JPG, PNG, GIF, WEBP, MP4, WEBM, MOV'
                  ) : type === 'image' ? (
                    'Supported formats: JPG, PNG, GIF, WEBP'
                  ) : (
                    'Supported formats: MP4, WEBM, MOV'
                  )}
                  {' '}(max 100MB)
                </p>
              </>
            )}
          </div>

          {error && (
            <div className="mt-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">
              {error}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MediaUploader;