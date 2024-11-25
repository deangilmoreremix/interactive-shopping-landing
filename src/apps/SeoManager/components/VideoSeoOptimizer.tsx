import React, { useState } from 'react';
import { Upload, Play, Settings, FileText } from 'lucide-react';
import { Cloudinary } from "@cloudinary/url-gen";

interface VideoSeoOptimizerProps {
  onOptimize: (publicId: string) => Promise<any>;
  cloudinary: Cloudinary;
}

export default function VideoSeoOptimizer({ onOptimize, cloudinary }: VideoSeoOptimizerProps) {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [optimizing, setOptimizing] = useState(false);
  const [metadata, setMetadata] = useState({
    title: '',
    description: '',
    tags: '',
    transcript: ''
  });

  const handleVideoUpload = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'ml_default');

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudinary.config().cloud.cloudName}/video/upload`,
        {
          method: 'POST',
          body: formData
        }
      );

      const result = await response.json();
      setSelectedVideo(result.public_id);
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };

  const handleOptimize = async () => {
    if (!selectedVideo) return;

    setOptimizing(true);
    try {
      await onOptimize(selectedVideo);
      // Handle success
    } catch (error) {
      console.error('Optimization failed:', error);
    } finally {
      setOptimizing(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Video SEO Optimizer</h3>
        <p className="text-gray-600">
          Optimize your video content for better search engine visibility
        </p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          {/* Video Upload/Preview */}
          <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden mb-4">
            {selectedVideo ? (
              <video
                src={cloudinary.video(selectedVideo).toURL()}
                className="w-full h-full object-cover"
                controls
              />
            ) : (
              <div className="h-full flex items-center justify-center">
                <input
                  type="file"
                  accept="video/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleVideoUpload(file);
                  }}
                  className="hidden"
                  id="video-upload"
                />
                <label
                  htmlFor="video-upload"
                  className="cursor-pointer text-gray-400 hover:text-gray-500"
                >
                  <Upload size={48} className="mx-auto mb-2" />
                  <p>Upload video to optimize</p>
                </label>
              </div>
            )}
          </div>

          {/* Optimization Settings */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Video Title
              </label>
              <input
                type="text"
                value={metadata.title}
                onChange={(e) => setMetadata({ ...metadata, title: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="Enter SEO-friendly title..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                value={metadata.description}
                onChange={(e) => setMetadata({ ...metadata, description: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
                rows={3}
                placeholder="Enter video description..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tags
              </label>
              <input
                type="text"
                value={metadata.tags}
                onChange={(e) => setMetadata({ ...metadata, tags: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="Enter tags separated by commas..."
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {/* Optimization Tools */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium mb-4">Optimization Tools</h4>
            <div className="space-y-2">
              <button className="w-full flex items-center gap-2 p-3 bg-white rounded-lg hover:bg-gray-50">
                <FileText size={20} />
                Generate Transcript
              </button>
              <button className="w-full flex items-center gap-2 p-3 bg-white rounded-lg hover:bg-gray-50">
                <Settings size={20} />
                Auto-optimize Quality
              </button>
              <button className="w-full flex items-center gap-2 p-3 bg-white rounded-lg hover:bg-gray-50">
                <Play size={20} />
                Generate Preview
              </button>
            </div>
          </div>

          {/* Transcript */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Video Transcript
            </label>
            <textarea
              value={metadata.transcript}
              onChange={(e) => setMetadata({ ...metadata, transcript: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
              rows={8}
              placeholder="Enter or generate video transcript..."
            />
          </div>

          <button
            onClick={handleOptimize}
            disabled={!selectedVideo || optimizing}
            className="w-full bg-cyan-600 text-white px-4 py-2 rounded-lg hover:bg-cyan-700 disabled:opacity-50"
          >
            {optimizing ? 'Optimizing...' : 'Optimize Video'}
          </button>
        </div>
      </div>
    </div>
  );
}