import React, { useState, useCallback } from 'react';
import { Camera, Image as ImageIcon, Video, Sparkles, Tag, Users, Upload, X } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { Cloudinary } from "@cloudinary/url-gen";
import { Effect } from "@cloudinary/url-gen/actions/effect";
import { Transformation } from "@cloudinary/url-gen";
import ARFilterEditor from './ARFilterEditor';
import ProductTagger from './ProductTagger';
import CollaboratorSelector from './CollaboratorSelector';
import { CLOUDINARY_CONFIG } from '../../../config/cloudinary';

interface ContentEditorProps {
  onSave: (content: any) => void;
  onClose: () => void;
}

export default function ContentEditor({ onSave, onClose }: ContentEditorProps) {
  const [content, setContent] = useState<any>({
    media: null,
    filter: null,
    products: [],
    collaborators: []
  });
  const [caption, setCaption] = useState('');
  const [uploading, setUploading] = useState(false);
  const [showARFilters, setShowARFilters] = useState(false);
  const [showProductTagger, setShowProductTagger] = useState(false);
  const [showCollaborators, setShowCollaborators] = useState(false);

  // Initialize Cloudinary
  const cld = new Cloudinary({
    cloud: {
      cloudName: CLOUDINARY_CONFIG.cloudName
    }
  });

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;
    
    const file = acceptedFiles[0];
    setUploading(true);

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

      setContent({
        ...content,
        media: result.secure_url,
        mediaType: result.resource_type
      });
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setUploading(false);
    }
  }, [content]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpg', '.jpeg', '.png', '.gif'],
      'video/*': ['.mp4', '.webm', '.mov']
    },
    maxSize: 100000000, // 100MB
    multiple: false
  });

  const handleCapture = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false
      });
      // Handle camera capture
      console.log('Camera stream:', stream);
    } catch (error) {
      console.error('Camera access failed:', error);
    }
  };

  const handleSave = () => {
    onSave({
      ...content,
      caption,
      timestamp: new Date().toISOString()
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold">Create Post</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {/* Media Preview */}
          <div>
            {content.media ? (
              <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                {content.mediaType === 'video' ? (
                  <video
                    src={content.media}
                    className="w-full h-full object-cover"
                    controls
                    autoPlay
                    muted
                    loop
                  />
                ) : (
                  <img
                    src={content.media}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
            ) : (
              <div
                {...getRootProps()}
                className={`aspect-square rounded-lg border-2 border-dashed flex flex-col items-center justify-center cursor-pointer ${
                  isDragActive ? 'border-pink-500 bg-pink-50' : 'border-gray-300'
                } ${uploading ? 'pointer-events-none opacity-50' : ''}`}
              >
                <input {...getInputProps()} />
                <Upload size={48} className="text-gray-400 mb-4" />
                <p className="text-gray-600 text-center mb-2">
                  Drag and drop your media here, or click to browse
                </p>
                <p className="text-sm text-gray-500">
                  Supports JPG, PNG, GIF, MP4, WEBM (max 100MB)
                </p>
              </div>
            )}

            <div className="mt-4">
              <textarea
                placeholder="Write a caption..."
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg resize-none h-24"
              />
            </div>
          </div>

          {/* Controls */}
          <div className="space-y-6">
            {/* Media Type Selection */}
            <div className="flex gap-2">
              <button
                onClick={() => setContent({ ...content, mediaType: 'photo' })}
                className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-lg ${
                  content.mediaType === 'photo'
                    ? 'bg-pink-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <ImageIcon size={20} />
                Photo
              </button>
              <button
                onClick={() => setContent({ ...content, mediaType: 'video' })}
                className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-lg ${
                  content.mediaType === 'video'
                    ? 'bg-pink-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Video size={20} />
                Video
              </button>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={handleCapture}
                className="flex items-center justify-center gap-2 p-3 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                <Camera size={20} />
                Capture
              </button>
              <button
                onClick={() => setShowARFilters(true)}
                className="flex items-center justify-center gap-2 p-3 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                <Sparkles size={20} />
                AR Filters
              </button>
              <button
                onClick={() => setShowProductTagger(true)}
                className="flex items-center justify-center gap-2 p-3 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                <Tag size={20} />
                Tag Products
              </button>
              <button
                onClick={() => setShowCollaborators(true)}
                className="flex items-center justify-center gap-2 p-3 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                <Users size={20} />
                Collaborators
              </button>
            </div>

            {/* Save Button */}
            <button
              onClick={handleSave}
              disabled={!content.media || uploading}
              className="w-full bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 disabled:opacity-50"
            >
              {uploading ? 'Uploading...' : 'Share Post'}
            </button>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showARFilters && (
        <ARFilterEditor
          onApply={(filter) => {
            setContent({ ...content, filter });
            setShowARFilters(false);
          }}
          onClose={() => setShowARFilters(false)}
        />
      )}
      {showProductTagger && (
        <ProductTagger
          products={content.products}
          onUpdate={(products) => {
            setContent({ ...content, products });
            setShowProductTagger(false);
          }}
          onClose={() => setShowProductTagger(false)}
        />
      )}
      {showCollaborators && (
        <CollaboratorSelector
          selected={content.collaborators}
          onUpdate={(collaborators) => {
            setContent({ ...content, collaborators });
            setShowCollaborators(false);
          }}
          onClose={() => setShowCollaborators(false)}
        />
      )}
    </div>
  );
}