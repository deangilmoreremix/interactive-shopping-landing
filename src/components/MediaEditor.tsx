import React from 'react';
import { transformImage, transformVideo } from '../utils/cloudinary';
import TransformationControls from './TransformationControls';
import MediaPreview from './MediaPreview';

interface MediaEditorProps {
  publicId: string;
  resourceType: 'image' | 'video';
  onSave: (result: any) => void;
  onCancel: () => void;
}

export default function MediaEditor({
  publicId,
  resourceType,
  onSave,
  onCancel
}: MediaEditorProps) {
  const [transformation, setTransformation] = React.useState({});

  const handleTransform = (options: any) => {
    const transformed = resourceType === 'image' 
      ? transformImage(publicId, options)
      : transformVideo(publicId, options);
    
    onSave({ 
      public_id: publicId,
      secure_url: transformed.toURL(),
      resource_type: resourceType,
      transformation: options
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl h-[80vh] flex">
        <div className="flex-1 p-6 flex flex-col">
          <div className="mb-6">
            <h2 className="text-xl font-semibold">Edit Media</h2>
          </div>
          
          <div className="flex-1">
            <MediaPreview
              publicId={publicId}
              type={resourceType}
              transformation={transformation}
            />
          </div>
        </div>
        
        <div className="w-80 border-l p-6">
          <TransformationControls
            type={resourceType}
            onTransform={handleTransform}
            options={transformation}
            setOptions={setTransformation}
          />
          
          <div className="mt-4 flex gap-2">
            <button
              onClick={onCancel}
              className="flex-1 px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              onClick={() => handleTransform(transformation)}
              className="flex-1 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}