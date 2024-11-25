import React from 'react';
import { BarChart, Clock, Users, MousePointer } from 'lucide-react';

interface VideoAnalyticsProps {
  videoId: string;
}

const VideoAnalytics: React.FC<VideoAnalyticsProps> = ({ videoId }) => {
  // Mock analytics data
  const analytics = {
    views: 1234,
    avgWatchTime: '2:45',
    clickRate: '4.2%',
    engagement: '78%',
    viewsOverTime: [
      { date: '2024-01', views: 300 },
      { date: '2024-02', views: 450 },
      { date: '2024-03', views: 600 },
    ],
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-6">Video Analytics</h3>
      
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <MetricCard
            icon={<Users className="text-indigo-600" size={20} />}
            label="Total Views"
            value={analytics.views.toLocaleString()}
          />
          <MetricCard
            icon={<Clock className="text-green-600" size={20} />}
            label="Avg. Watch Time"
            value={analytics.avgWatchTime}
          />
          <MetricCard
            icon={<MousePointer className="text-blue-600" size={20} />}
            label="Click Rate"
            value={analytics.clickRate}
          />
          <MetricCard
            icon={<BarChart className="text-purple-600" size={20} />}
            label="Engagement"
            value={analytics.engagement}
          />
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-600 mb-4">Views Over Time</h4>
          <div className="h-40 flex items-end gap-2">
            {analytics.viewsOverTime.map((data, index) => (
              <div
                key={data.date}
                className="flex-1 bg-indigo-100 rounded-t hover:bg-indigo-200 transition-colors relative group"
                style={{
                  height: `${(data.views / 600) * 100}%`,
                }}
              >
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  {data.views} views
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-xs text-gray-500">
            {analytics.viewsOverTime.map((data) => (
              <span key={data.date}>{data.date}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

interface MetricCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ icon, label, value }) => {
  return (
    <div className="p-4 bg-gray-50 rounded-lg">
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <span className="text-sm text-gray-600">{label}</span>
      </div>
      <span className="text-xl font-semibold text-gray-800">{value}</span>
    </div>
  );
};

export default VideoAnalytics;