import React, { useState } from 'react';
import { X, Sparkles, Wand2 } from 'lucide-react';
import { Cloudinary } from "@cloudinary/url-gen";
import { Effect } from "@cloudinary/url-gen/actions/effect";
import { VideoSource } from '../../../types';

interface VideoTransformationsProps {
  video: VideoSource;
  cloudinary: Cloudinary;
  onClose: () => void;
}

export default function VideoTransformations({
  video,
  cloudinary,
  onClose
}: VideoTransformationsProps) {
  const [processing, setProcessing] = useState(false);
  const [settings, setSettings] = useState({
    aiEnhance: true,
    colorCorrection: true,
    noiseReduction: true,
    stabilization: true,
    autoSubtitles: true,
    contentModeration: true
  });

  const handleApplyTransformations = async () => {
    setProcessing(true);
    try {
      const transformation = cloudinary.video(video.publicId)
        .effect(Effect.improve())
        .effect(Effect.denoise())
        .effect(Effect.deshake());

      // Apply transformations
      console.log('Applying transformations:', transformation.toURL());
      
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 2000));
      
    } catch (error) {
      console.error('Transformation failed:', error);
    } finally {
      setProcessing(false);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-lg w-full mx-4">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold">AI Video Enhancement</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        <div className="space-y-6">
          <div className="space-y-4">
            <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <input
                type="checkbox"
                checked={settings.aiEnhance}
                onChange={(e) => setSettings({ ...settings, aiEnhance: e.target.checked })}
              />
              <div>
                <p className="font-medium">AI Enhancement</p>
                <p className="text-sm text-gray-500">
                  Automatically enhance video quality using AI
                </p>
              </div>
            </label>

            <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <input
                type="checkbox"
                checked={settings.colorCorrection}
                onChange={(e) => setSettings({ ...settings, colorCorrection: e.target.checked })}
              />
              <div>
                <p className="font-medium">Color Correction</p>
                <p className="text-sm text-gray-500">
                  Optimize color balance and contrast
                </p>
              </div>
            </label>

            <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <input
                type="checkbox"
                checked={settings.noiseReduction}
                onChange={(e) => setSettings({ ...settings, noiseReduction: e.target.checked })}
              />
              <div>
                <p className="font-medium">Noise Reduction</p>
                <p className="text-sm text-gray-500">
                  Remove video noise and artifacts
                </p>
              </div>
            </label>

            <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <input
                type="checkbox"
                checked={settings.stabilization}
                onChange={(e) => setSettings({ ...settings, stabilization: e.target.checked })}
              />
              <div>
                <p className="font-medium">Video Stabilization</p>
                <p className="text-sm text-gray-500">
                  Reduce camera shake and jitter
                </p>
              </div>
            </label>

            <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <input
                type="checkbox"
                checked={settings.autoSubtitles}
                onChange={(e) => setSettings({ ...settings, autoSubtitles: e.target.checked })}
              />
              <div>
                <p className="font-medium">Auto-generate Subtitles</p>
                <p className="text-sm text-gray-500">
                  Create subtitles using AI speech recognition
                </p>
              </div>
            </label>

            <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <input
                type="checkbox"
                checked={settings.contentModeration}
                onChange={(e) => setSettings({ ...settings, contentModeration: e.target.checked })}
              />
              <div>
                <p className="font-medium">Content Moderation</p>
                <p className="text-sm text-gray-500">
                  Automatically detect and flag inappropriate content
                </p>
              </div>
            </label>
          </div>

          <button
            onClick={handleApplyTransformations}
            disabled={processing}
            className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 disabled:opacity-50"
          >
            {processing ? (
              <>
                <Wand2 className="animate-spin" size={20} />
                Processing...
              </>
            ) : (
              <>
                <Sparkles size={20} />
                Apply Enhancements
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}