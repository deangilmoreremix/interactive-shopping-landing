import React, { useState, useCallback } from 'react';
import { Plus, Upload, Play, Pause } from 'lucide-react';
import { usePersonalizationStore } from '../store/personalizationStore';
import PersonalizedVideo from './PersonalizedVideo';
import MediaUploader from '../../../components/MediaUploader';
import { Cloudinary } from "@cloudinary/url-gen";
import { CLOUDINARY_CONFIG } from '../../../config/cloudinary';

const DEMO_VIDEOS = [
  {
    publicId: 'samples/ecommerce/fashion-show',
    title: 'Fashion Show'
  },
  {
    publicId: 'samples/ecommerce/accessories-bag',
    title: 'Accessories'
  }
];

export default function VideoPersonalizationDemo() {
  const { segments } = usePersonalizationStore();
  const [selectedSegment, setSelectedSegment] = useState('');
  const [selectedVideo, setSelectedVideo] = useState(DEMO_VIDEOS[0]);
  const [showUploader, setShowUploader] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleEngagement = useCallback((data: any) => {
    console.log('Engagement data:', data);
  }, []);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-4">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Video Selection</h3>
              <button
                onClick={() => setShowUploader(true)}
                className="flex items-center gap-2 bg-orange-600 text-white px-3 py-1.5 rounded-lg hover:bg-orange-700"
              >
                <Upload size={16} />
                Upload Video
              </button>
            </div>
            <div className="flex gap-4">
              {DEMO_VIDEOS.map((video) => (
                <button
                  key={video.publicId}
                  onClick={() => setSelectedVideo(video)}
                  className={`px-4 py-2 rounded-lg ${
                    selectedVideo.publicId === video.publicId
                      ? 'bg-orange-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {video.title}
                </button>
              ))}
            </div>
          </div>

          <PersonalizedVideo
            publicId={selectedVideo.publicId}
            segmentId={selectedSegment}
            options={{
              streaming: {
                type: 'auto',
                quality: 'auto',
                playbackRates: [0.5, 1, 1.5, 2],
                adaptiveBitrate: true
              },
              interactive: {
                chapters: {
                  enabled: true,
                  navigation: true,
                  data: [
                    { time: 0, title: 'Introduction' },
                    { time: 30, title: 'Features' },
                    { time: 60, title: 'Conclusion' }
                  ]
                },
                hotspots: {
                  enabled: true,
                  template: 'default'
                }
              },
              analytics: {
                trackQuality: true,
                trackInteractions: true,
                trackSegments: true,
                detailedPlayback: true,
                heatmap: true
              },
              ai: {
                autoSubtitles: true,
                contentModeration: true,
                objectDetection: true,
                faceDetection: true
              }
            }}
            onEngagement={handleEngagement}
          />

          <div className="flex justify-center gap-4">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex items-center gap-2 bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700"
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
              {isPlaying ? 'Pause' : 'Play'}
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="font-semibold mb-4">Target Segment</h3>
            <select
              value={selectedSegment}
              onChange={(e) => setSelectedSegment(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
            >
              <option value="">Select a segment...</option>
              {segments.map((segment) => (
                <option key={segment.id} value={segment.id}>
                  {segment.name}
                </option>
              ))}
            </select>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="font-semibold mb-4">Personalization Settings</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Color Effect
                </label>
                <select
                  className="w-full px-3 py-2 border rounded-lg"
                  defaultValue=""
                >
                  <option value="">None</option>
                  <option value="art:athena">Athena</option>
                  <option value="art:audrey">Audrey</option>
                  <option value="art:daguerre">Daguerre</option>
                  <option value="art:eucalyptus">Eucalyptus</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="rounded border-gray-300"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Auto-generate Subtitles
                  </span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showUploader && (
        <MediaUploader
          type="video"
          onUpload={(result) => {
            const newVideo = {
              publicId: result.public_id,
              title: `Video ${DEMO_VIDEOS.length + 1}`
            };
            DEMO_VIDEOS.push(newVideo);
            setSelectedVideo(newVideo);
            setShowUploader(false);
          }}
          onClose={() => setShowUploader(false)}
        />
      )}
    </div>
  );
}