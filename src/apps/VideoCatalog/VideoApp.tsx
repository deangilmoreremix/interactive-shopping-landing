import React, { useState, useCallback } from 'react';
import { Play, Upload, Plus, Settings, BarChart, Edit, Sparkles } from 'lucide-react';
import VideoPlayer from '../../components/VideoPlayer';
import MediaUploader from '../../components/MediaUploader';
import VideoAnalytics from '../../components/VideoAnalytics';
import ProductHotspotEditor from './components/ProductHotspotEditor';
import VideoTransformations from './components/VideoTransformations';
import { useVideoStore } from '../../store/videoStore';
import { VideoSource, Product } from '../../types';
import { Cloudinary } from "@cloudinary/url-gen";
import { CLOUDINARY_CONFIG } from '../../config/cloudinary';

export default function VideoApp() {
  const [selectedVideo, setSelectedVideo] = useState<VideoSource | null>(null);
  const [showUploader, setShowUploader] = useState(false);
  const [showHotspotEditor, setShowHotspotEditor] = useState(false);
  const [showTransformations, setShowTransformations] = useState(false);
  const [analyticsData, setAnalyticsData] = useState<any>({});
  const { videos, products, interactionAreas, addVideo, addInteractionArea } = useVideoStore();

  const cld = new Cloudinary({
    cloud: {
      cloudName: CLOUDINARY_CONFIG.cloudName
    }
  });

  const handleProductClick = useCallback((product: Product) => {
    console.log('Product clicked:', product);
  }, []);

  const handleAnalyticsEvent = useCallback((eventName: string, data: any) => {
    setAnalyticsData(prev => ({
      ...prev,
      [eventName]: data
    }));
  }, []);

  const handleUpload = async (result: any) => {
    try {
      const newVideo: VideoSource = {
        id: result.public_id,
        title: 'New Video',
        description: 'Video description',
        thumbnail: result.secure_url.replace(/\.[^/.]+$/, ".jpg"),
        publicId: result.public_id,
        views: 0,
        duration: result.duration || '0:00'
      };

      addVideo(newVideo);
      setSelectedVideo(newVideo);
      setShowUploader(false);
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Play className="text-indigo-600" size={24} />
              <span className="text-xl font-bold text-gray-800">Video Catalog</span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowTransformations(true)}
                className="flex items-center gap-2 bg-indigo-100 text-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-200"
              >
                <Sparkles size={20} />
                AI Enhance
              </button>
              <button
                onClick={() => setShowHotspotEditor(true)}
                className="flex items-center gap-2 bg-indigo-100 text-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-200"
              >
                <Edit size={20} />
                Add Hotspots
              </button>
              <button
                onClick={() => setShowUploader(true)}
                className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
              >
                <Plus size={20} />
                Add Video
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {selectedVideo ? (
              <VideoPlayer
                publicId={selectedVideo.publicId}
                onProductClick={handleProductClick}
                onAnalyticsEvent={handleAnalyticsEvent}
                options={{
                  shoppable: {
                    enabled: true,
                    hotspots: interactionAreas,
                    products: products
                  },
                  analytics: {
                    events: ['play', 'pause', 'ended', 'timeupdate', 'percentsplayed'],
                    trackPlayback: true,
                    trackSeek: true,
                    generateHeatmap: true
                  },
                  ai: {
                    autoSubtitles: true,
                    contentModeration: true,
                    objectDetection: true
                  }
                }}
              />
            ) : (
              <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <Play size={48} className="mx-auto mb-2" />
                  <p>Select a video to play</p>
                </div>
              </div>
            )}

            {selectedVideo && (
              <VideoAnalytics
                videoId={selectedVideo.id}
              />
            )}
          </div>

          <div className="space-y-4">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h3 className="font-semibold mb-4">Your Videos</h3>
              <div className="space-y-4">
                {videos.map((video) => (
                  <div
                    key={video.id}
                    onClick={() => setSelectedVideo(video)}
                    className={`bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer transition-shadow hover:shadow-md ${
                      selectedVideo?.id === video.id ? 'ring-2 ring-indigo-600' : ''
                    }`}
                  >
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-32 object-cover"
                    />
                    <div className="p-4">
                      <h4 className="font-semibold text-gray-800">{video.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{video.description}</p>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                        <span>{video.views.toLocaleString()} views</span>
                        <span>{video.duration}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {showUploader && (
        <MediaUploader
          type="video"
          onUpload={handleUpload}
          onClose={() => setShowUploader(false)}
        />
      )}

      {showHotspotEditor && selectedVideo && (
        <ProductHotspotEditor
          video={selectedVideo}
          products={products}
          interactionAreas={interactionAreas}
          onAddHotspot={addInteractionArea}
          onClose={() => setShowHotspotEditor(false)}
        />
      )}

      {showTransformations && selectedVideo && (
        <VideoTransformations
          video={selectedVideo}
          cloudinary={cld}
          onClose={() => setShowTransformations(false)}
        />
      )}
    </div>
  );
}