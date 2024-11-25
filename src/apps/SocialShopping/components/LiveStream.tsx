import React, { useState, useEffect } from 'react';
import { Play, Users, MessageCircle, ShoppingBag, Gift, Heart } from 'lucide-react';
import { Cloudinary } from "@cloudinary/url-gen";
import { CLOUDINARY_CONFIG } from '../../../config/cloudinary';

interface LiveStreamProps {
  streamId: string;
  onViewerJoin?: () => void;
  onViewerLeave?: () => void;
}

export default function LiveStream({ streamId, onViewerJoin, onViewerLeave }: LiveStreamProps) {
  const [viewers, setViewers] = useState(0);
  const [isLive, setIsLive] = useState(false);
  const [reactions, setReactions] = useState<string[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState([
    {
      id: '1',
      name: 'Premium Headphones',
      price: 199.99,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
      discount: 15
    },
    {
      id: '2',
      name: 'Smart Watch',
      price: 299.99,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30',
      discount: 0
    }
  ]);

  // Initialize Cloudinary
  const cld = new Cloudinary({
    cloud: {
      cloudName: CLOUDINARY_CONFIG.cloudName
    }
  });

  useEffect(() => {
    // Initialize live stream
    if (typeof window.cloudinary !== 'undefined') {
      const player = window.cloudinary.videoPlayer('live-player', {
        cloud_name: CLOUDINARY_CONFIG.cloudName,
        sourceTypes: ['hls'],
        autoplayMode: 'always',
        muted: false,
        controls: true,
        fluid: true,
        bigPlayButton: false,
        plugins: {
          // Add streaming plugins
          streaming: {
            lowLatencyMode: true,
            dvrEnabled: true,
            adaptiveBitrate: true,
            hlsConfig: {
              enableWorker: true,
              startLevel: -1,
              debug: false
            }
          }
        }
      });

      player.source(streamId, {
        sourceTypes: ['hls'],
        transformation: {
          streaming_profile: 'hd'
        }
      });

      // Add event listeners
      player.on('streamstart', () => {
        setIsLive(true);
        onViewerJoin?.();
      });

      player.on('streamend', () => {
        setIsLive(false);
        onViewerLeave?.();
      });

      // Simulate viewer count updates
      const interval = setInterval(() => {
        if (isLive) {
          setViewers(prev => Math.min(prev + Math.floor(Math.random() * 5), 9999));
          // Add random reactions
          if (Math.random() > 0.7) {
            setReactions(prev => [...prev, '❤️', '👍', '🎉'][Math.floor(Math.random() * 3)]);
          }
        }
      }, 2000);

      // Clean up reactions
      const cleanupInterval = setInterval(() => {
        setReactions(prev => prev.slice(-10));
      }, 3000);

      return () => {
        clearInterval(interval);
        clearInterval(cleanupInterval);
        player.dispose();
      };
    }
  }, [streamId, onViewerJoin, onViewerLeave, isLive]);

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="aspect-video bg-gray-900 relative">
        <video
          id="live-player"
          className="w-full h-full object-cover"
          playsInline
          crossOrigin="anonymous"
        />
        
        {isLive && (
          <>
            <div className="absolute top-4 left-4 flex items-center gap-4">
              <span className="bg-red-600 text-white px-2 py-1 rounded-lg text-sm font-medium">
                LIVE
              </span>
              <span className="bg-black/50 text-white px-2 py-1 rounded-lg text-sm">
                <Users className="inline-block mr-1" size={16} />
                {viewers.toLocaleString()}
              </span>
            </div>

            {/* Floating Reactions */}
            <div className="absolute bottom-20 right-4 pointer-events-none">
              {reactions.map((reaction, index) => (
                <div
                  key={index}
                  className="absolute bottom-0 right-0 animate-float-up text-2xl"
                  style={{
                    animationDelay: `${index * 100}ms`
                  }}
                >
                  {reaction}
                </div>
              ))}
            </div>

            {/* Featured Products */}
            <div className="absolute bottom-4 left-4 right-4">
              <div className="flex gap-2 overflow-x-auto pb-2">
                {featuredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="flex-shrink-0 bg-white/90 rounded-lg p-2 flex items-center gap-2"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-12 h-12 rounded object-cover"
                    />
                    <div>
                      <p className="font-medium text-sm">{product.name}</p>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold">
                          ${product.price}
                        </span>
                        {product.discount > 0 && (
                          <span className="text-xs text-red-600">
                            -{product.discount}%
                          </span>
                        )}
                      </div>
                    </div>
                    <button className="ml-2 bg-pink-600 text-white px-3 py-1 rounded text-sm hover:bg-pink-700">
                      Buy
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
              alt="Host"
              className="w-10 h-10 rounded-full"
            />
            <div>
              <h3 className="font-semibold">Fashion Show Live</h3>
              <p className="text-sm text-gray-500">John Doe</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setReactions(prev => [...prev, '❤️'])}
              className="p-2 text-gray-600 hover:text-pink-600"
            >
              <Heart size={20} />
            </button>
            <button className="p-2 text-gray-600 hover:text-gray-800">
              <MessageCircle size={20} />
            </button>
            <button className="p-2 text-gray-600 hover:text-gray-800">
              <Gift size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}