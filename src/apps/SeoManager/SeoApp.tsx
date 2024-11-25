import React, { useState, useEffect } from 'react';
import { Search, TrendingUp, Globe, AlertCircle, Video, Image as ImageIcon } from 'lucide-react';
import { Cloudinary } from "@cloudinary/url-gen";
import { CLOUDINARY_CONFIG } from '../../config/cloudinary';
import VideoSeoOptimizer from './components/VideoSeoOptimizer';
import SeoHealthCheck from './components/SeoHealthCheck';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import AutomationTools from './components/AutomationTools';

export default function SeoApp() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  // Initialize Cloudinary
  const cld = new Cloudinary({
    cloud: {
      cloudName: CLOUDINARY_CONFIG.cloudName
    }
  });

  const [seoMetrics, setSeoMetrics] = useState({
    indexedPages: 1234,
    organicTraffic: 45200,
    avgPosition: 2.4,
    issues: {
      missingMeta: 12,
      noTranscripts: 8,
      duplicateTitles: 3
    }
  });

  const handleOptimizeVideo = async (publicId: string) => {
    try {
      // Generate optimized video transformations
      const optimizedVideo = cld.video(publicId)
        .quality('auto')
        .format('auto');

      // Generate video sitemap entry
      const sitemapEntry = {
        loc: optimizedVideo.toURL(),
        title: 'Video Title',
        description: 'Video Description',
        thumbnailLoc: cld.image(publicId)
          .format('jpg')
          .quality('auto')
          .toURL(),
        duration: '300',
        publicationDate: new Date().toISOString()
      };

      console.log('Video optimized:', sitemapEntry);
      return sitemapEntry;
    } catch (error) {
      console.error('Video optimization failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Search className="text-cyan-600" size={24} />
              <span className="text-xl font-bold text-gray-800">SEO Manager</span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setActiveTab('videos')}
                className={`px-4 py-2 rounded-lg ${
                  activeTab === 'videos'
                    ? 'bg-cyan-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Video size={20} />
              </button>
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-4 py-2 rounded-lg ${
                  activeTab === 'overview'
                    ? 'bg-cyan-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Overview
              </button>
              <button className="bg-cyan-600 text-white px-4 py-2 rounded-lg hover:bg-cyan-700">
                Generate Report
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-12 gap-6">
          {/* Main Content */}
          <div className="col-span-8 space-y-6">
            {/* Overview Cards */}
            <div className="grid grid-cols-3 gap-4">
              <MetricCard
                icon={<Globe className="text-cyan-600" size={20} />}
                label="Video Pages Indexed"
                value={seoMetrics.indexedPages.toLocaleString()}
                trend="+12%"
              />
              <MetricCard
                icon={<TrendingUp className="text-cyan-600" size={20} />}
                label="Organic Traffic"
                value={`${(seoMetrics.organicTraffic / 1000).toFixed(1)}K`}
                trend="+8%"
              />
              <MetricCard
                icon={<Search className="text-cyan-600" size={20} />}
                label="Avg. Position"
                value={seoMetrics.avgPosition.toString()}
                trend="+0.3"
              />
            </div>

            {activeTab === 'overview' ? (
              <>
                <SeoHealthCheck issues={seoMetrics.issues} />
                <AnalyticsDashboard />
              </>
            ) : (
              <VideoSeoOptimizer
                onOptimize={handleOptimizeVideo}
                cloudinary={cld}
              />
            )}
          </div>

          {/* Sidebar */}
          <div className="col-span-4 space-y-4">
            <AutomationTools onRun={handleOptimizeVideo} />

            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="font-semibold mb-4">Top Performing Videos</h3>
              <div className="space-y-3">
                {[
                  {
                    title: 'Summer Collection Preview',
                    views: '12.4K',
                    position: 1,
                  },
                  {
                    title: 'Tech Gadget Review',
                    views: '8.9K',
                    position: 2,
                  },
                  {
                    title: 'Lifestyle Essentials',
                    views: '6.2K',
                    position: 3,
                  },
                ].map((video, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <p className="font-medium">{video.title}</p>
                      <p className="text-sm text-gray-500">{video.views} views</p>
                    </div>
                    <span className="text-green-600">#{video.position}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

interface MetricCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  trend: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ icon, label, value, trend }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <span className="text-sm text-gray-600">{label}</span>
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-semibold text-gray-800">{value}</span>
        <span className="text-sm text-green-600">{trend}</span>
      </div>
    </div>
  );
};