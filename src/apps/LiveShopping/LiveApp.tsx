import React, { useState, useEffect, useCallback } from 'react';
import { Video, MessageCircle, Users, ShoppingBag, Play, Pause, Settings, BarChart } from 'lucide-react';
import { Cloudinary } from "@cloudinary/url-gen";
import { CLOUDINARY_CONFIG } from '../../config/cloudinary';
import LivePlayer from './components/LivePlayer';
import ChatPanel from './components/ChatPanel';
import ProductPanel from './components/ProductPanel';
import StreamControls from './components/StreamControls';
import AnalyticsPanel from './components/AnalyticsPanel';
import StreamSettings from './components/StreamSettings';

// Enhanced stream configuration
const STREAM_CONFIG = {
  streaming: {
    profiles: {
      hd: { format: 'auto', quality: 'auto' },
      sd: { format: 'auto', quality: 80 }
    },
    protocols: ['hls', 'dash'],
    dvr: true,
    lowLatency: true,
    adaptiveBitrate: true
  },
  chat: {
    enabled: true,
    moderationEnabled: true,
    userLimit: 1000,
    messageRateLimit: 2
  },
  analytics: {
    enabled: true,
    trackViewers: true,
    trackEngagement: true,
    trackProducts: true
  }
};

export default function LiveApp() {
  const [isLive, setIsLive] = useState(false);
  const [viewers, setViewers] = useState(0);
  const [messages, setMessages] = useState([]);
  const [showSettings, setShowSettings] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [streamStats, setStreamStats] = useState({
    duration: 0,
    bitrate: 0,
    fps: 0,
    quality: 'HD'
  });

  // Initialize Cloudinary
  const cld = new Cloudinary({
    cloud: {
      cloudName: CLOUDINARY_CONFIG.cloudName
    }
  });

  // Featured products with enhanced data
  const [featuredProducts, setFeaturedProducts] = useState([
    {
      id: '1',
      name: 'Premium Headphones',
      price: 199.99,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
      description: 'High-quality wireless headphones with noise cancellation',
      stock: 45,
      discount: 15,
      highlights: ['Noise Cancellation', '30h Battery', 'Premium Sound'],
      reviews: { rating: 4.8, count: 156 }
    },
    {
      id: '2',
      name: 'Smart Watch',
      price: 299.99,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30',
      description: 'Next-gen smartwatch with health tracking features',
      stock: 28,
      discount: 0,
      highlights: ['Heart Rate Monitor', 'GPS', 'Water Resistant'],
      reviews: { rating: 4.6, count: 98 }
    }
  ]);

  // Enhanced viewer tracking
  useEffect(() => {
    if (isLive) {
      const interval = setInterval(() => {
        setViewers(prev => {
          const change = Math.floor(Math.random() * 5);
          return Math.min(prev + change, 9999);
        });
        
        // Update stream stats
        setStreamStats(prev => ({
          ...prev,
          duration: prev.duration + 1,
          bitrate: Math.floor(Math.random() * 1000) + 3000,
          fps: 30,
          quality: prev.bitrate > 3500 ? 'HD' : 'SD'
        }));
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [isLive]);

  const startLiveStream = async () => {
    try {
      // Initialize stream with Cloudinary
      const streamResponse = await fetch('/api/stream/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(STREAM_CONFIG)
      });

      if (streamResponse.ok) {
        setIsLive(true);
        // Additional stream initialization logic
      }
    } catch (error) {
      console.error('Failed to start stream:', error);
    }
  };

  const stopLiveStream = async () => {
    try {
      await fetch('/api/stream/stop', { method: 'POST' });
      setIsLive(false);
      setViewers(0);
    } catch (error) {
      console.error('Failed to stop stream:', error);
    }
  };

  const handleProductFeature = useCallback((product) => {
    // Product featuring logic
    console.log('Featuring product:', product);
  }, []);

  const handleStreamQualityChange = useCallback((quality) => {
    // Stream quality adjustment logic
    console.log('Changing stream quality to:', quality);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Video className="text-red-600" size={24} />
              <span className="text-xl font-bold text-gray-800">Live Shopping</span>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowAnalytics(!showAnalytics)}
                className="p-2 text-gray-600 hover:text-gray-800"
              >
                <BarChart size={20} />
              </button>
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="p-2 text-gray-600 hover:text-gray-800"
              >
                <Settings size={20} />
              </button>
              <span className={`flex items-center gap-2 px-3 py-1 rounded-full ${
                isLive ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'
              }`}>
                <span className={`w-2 h-2 rounded-full ${
                  isLive ? 'bg-red-600 animate-pulse' : 'bg-gray-400'
                }`} />
                {isLive ? 'Live' : 'Offline'}
              </span>
              <button
                onClick={isLive ? stopLiveStream : startLiveStream}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                  isLive 
                    ? 'bg-gray-600 hover:bg-gray-700' 
                    : 'bg-red-600 hover:bg-red-700'
                } text-white transition-colors`}
              >
                {isLive ? (
                  <>
                    <Pause size={20} />
                    End Stream
                  </>
                ) : (
                  <>
                    <Play size={20} />
                    Go Live
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Stream View */}
          <div className="lg:col-span-2 space-y-4">
            <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden relative">
              {isLive ? (
                <LivePlayer
                  cloudinary={cld}
                  config={STREAM_CONFIG}
                  onViewerJoin={() => {}}
                  onViewerLeave={() => {}}
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-gray-400">
                    <Video size={48} className="mx-auto mb-2" />
                    <p>Stream preview will appear here</p>
                  </div>
                </div>
              )}
              
              {isLive && (
                <div className="absolute top-4 left-4 flex items-center gap-4">
                  <span className="bg-red-600 text-white px-2 py-1 rounded-lg text-sm font-medium">
                    LIVE
                  </span>
                  <span className="bg-black/50 text-white px-2 py-1 rounded-lg text-sm">
                    <Users className="inline-block mr-1" size={16} />
                    {viewers.toLocaleString()}
                  </span>
                </div>
              )}
            </div>

            <StreamControls
              isLive={isLive}
              stats={streamStats}
              onQualityChange={handleStreamQualityChange}
            />

            <ProductPanel
              products={featuredProducts}
              onFeature={handleProductFeature}
            />
          </div>

          {/* Chat and Analytics */}
          <div className="space-y-4">
            <ChatPanel
              messages={messages}
              isLive={isLive}
              config={STREAM_CONFIG.chat}
            />

            {showAnalytics && (
              <AnalyticsPanel
                viewers={viewers}
                duration={streamStats.duration}
                engagement={{
                  likes: 156,
                  comments: 89,
                  shares: 34
                }}
                products={featuredProducts}
              />
            )}
          </div>
        </div>
      </main>

      {showSettings && (
        <StreamSettings
          config={STREAM_CONFIG}
          onClose={() => setShowSettings(false)}
          onSave={(newConfig) => {
            // Handle config updates
            console.log('Updated config:', newConfig);
            setShowSettings(false);
          }}
        />
      )}
    </div>
  );
}