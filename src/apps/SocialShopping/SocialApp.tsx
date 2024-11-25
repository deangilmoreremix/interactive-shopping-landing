import React, { useState } from 'react';
import { Users, Plus, Video, Trophy, TrendingUp } from 'lucide-react';
import { useUGCStore } from '../../store/ugcStore';
import { useSocialStore } from '../../store/socialStore';
import SocialFeed from './components/SocialFeed';
import LiveStream from './components/LiveStream';
import Challenges from './components/Challenges';
import Rewards from './components/Rewards';
import TrendingStyles from './components/TrendingStyles';
import ContentEditor from './components/ContentEditor';
import ARFilterEditor from './components/ARFilterEditor';
import { Cloudinary } from "@cloudinary/url-gen";
import { CLOUDINARY_CONFIG } from '../../config/cloudinary';

export default function SocialApp() {
  const [showContentEditor, setShowContentEditor] = useState(false);
  const [showARFilters, setShowARFilters] = useState(false);
  const { addPost } = useUGCStore();
  const [activeTab, setActiveTab] = useState<'feed' | 'live' | 'challenges'>('feed');

  // Initialize Cloudinary
  const cld = new Cloudinary({
    cloud: {
      cloudName: CLOUDINARY_CONFIG.cloudName
    }
  });

  const handleContentSave = (content: any) => {
    addPost({
      id: Date.now().toString(),
      userId: '1',
      username: 'John Doe',
      userAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
      mediaUrl: content.media,
      mediaType: content.mediaType,
      caption: content.caption,
      likes: 0,
      comments: 0,
      shares: 0,
      products: content.products,
      createdAt: new Date().toISOString(),
      tags: content.tags
    });
    setShowContentEditor(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="text-pink-600" size={24} />
              <span className="text-xl font-bold text-gray-800">Social Shopping</span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowARFilters(true)}
                className="flex items-center gap-2 bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700"
              >
                <Video size={20} />
                Go Live
              </button>
              <button
                onClick={() => setShowContentEditor(true)}
                className="flex items-center gap-2 bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700"
              >
                <Plus size={20} />
                Create Post
              </button>
            </div>
          </div>

          <div className="flex gap-4 mt-4">
            <button
              onClick={() => setActiveTab('feed')}
              className={`px-4 py-2 rounded-lg ${
                activeTab === 'feed'
                  ? 'bg-pink-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Feed
            </button>
            <button
              onClick={() => setActiveTab('live')}
              className={`px-4 py-2 rounded-lg ${
                activeTab === 'live'
                  ? 'bg-pink-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Live
            </button>
            <button
              onClick={() => setActiveTab('challenges')}
              className={`px-4 py-2 rounded-lg ${
                activeTab === 'challenges'
                  ? 'bg-pink-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Challenges
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-12 gap-6">
          {/* Main Content */}
          <div className="col-span-8">
            {activeTab === 'feed' && <SocialFeed />}
            {activeTab === 'live' && (
              <LiveStream
                streamId="demo-stream"
                onViewerJoin={() => console.log('Viewer joined')}
                onViewerLeave={() => console.log('Viewer left')}
              />
            )}
            {activeTab === 'challenges' && <Challenges />}
          </div>

          {/* Sidebar */}
          <div className="col-span-4 space-y-6">
            <Rewards />
            <TrendingStyles />
          </div>
        </div>
      </main>

      {/* Modals */}
      {showContentEditor && (
        <ContentEditor
          onSave={handleContentSave}
          onClose={() => setShowContentEditor(false)}
        />
      )}

      {showARFilters && (
        <ARFilterEditor
          onApply={(filter) => {
            console.log('Applied filter:', filter);
            setShowARFilters(false);
          }}
          onClose={() => setShowARFilters(false)}
        />
      )}
    </div>
  );
}