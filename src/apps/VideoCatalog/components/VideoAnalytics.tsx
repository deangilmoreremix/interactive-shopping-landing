import React from 'react';
import { BarChart, Clock, Users, MousePointer, TrendingUp } from 'lucide-react';
import { VideoSource } from '../../../types';

interface VideoAnalyticsProps {
  video: VideoSource;
}

const VideoAnalytics: React.FC<VideoAnalyticsProps> = ({ video }) => {
  // Mock analytics data - in production, this would come from your analytics service
  const analytics = {
    avgWatchTime: '2:45',
    clickRate: '4.2%',
    engagement: '78%',
    viewsOverTime: [
      { date: '2024-01', views: 300 },
      { date: '2024-02', views: 450 },
      { date: '2024-03', views: 600 },
    ],
    conversionRate: '2.8%',
    totalRevenue: '$1,234',
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Performance Metrics</h3>
        <select className="text-sm border rounded-lg px-2 py-1">
          <option value="7d">Last 7 days</option>
          <option value="30d">Last 30 days</option>
          <option value="90d">Last 90 days</option>
        </select>
      </div>
      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <MetricCard
          icon={<Users className="text-indigo-600" size={20} />}
          label="Total Views"
          value={video.views.toLocaleString()}
          trend="+12.3%"
        />
        <MetricCard
          icon={<Clock className="text-green-600" size={20} />}
          label="Avg. Watch Time"
          value={analytics.avgWatchTime}
          trend="+5.2%"
        />
        <MetricCard
          icon={<MousePointer className="text-blue-600" size={20} />}
          label="Click Rate"
          value={analytics.clickRate}
          trend="+1.8%"
        />
        <MetricCard
          icon={<TrendingUp className="text-purple-600" size={20} />}
          label="Conversion Rate"
          value={analytics.conversionRate}
          trend="+0.5%"
        />
      </div>

      <div className="space-y-6">
        <div>
          <h4 className="text-sm font-medium text-gray-600 mb-4">Views Trend</h4>
          <div className="h-40 flex items-end gap-2">
            {analytics.viewsOverTime.map((data) => (
              <div
                key={data.date}
                className="flex-1 bg-indigo-100 rounded-t hover:bg-indigo-200 transition-colors relative group"
                style={{ height: `${(data.views / 600) * 100}%` }}
              >
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  {data.views.toLocaleString()} views
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

        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="text-sm font-medium text-gray-600 mb-2">Top Products</h4>
            <div className="space-y-2">
              {['Product A', 'Product B', 'Product C'].map((product) => (
                <div key={product} className="flex justify-between text-sm">
                  <span>{product}</span>
                  <span className="text-indigo-600 font-medium">24 clicks</span>
                </div>
              ))}
            </div>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="text-sm font-medium text-gray-600 mb-2">Engagement</h4>
            <div className="space-y-2">
              {[
                { label: 'Click-through Rate', value: '4.2%' },
                { label: 'Avg. Watch Time', value: '2:45' },
                { label: 'Completion Rate', value: '68%' },
              ].map((metric) => (
                <div key={metric.label} className="flex justify-between text-sm">
                  <span>{metric.label}</span>
                  <span className="text-indigo-600 font-medium">{metric.value}</span>
                </div>
              ))}
            </div>
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
  trend: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ icon, label, value, trend }) => {
  return (
    <div className="p-4 bg-gray-50 rounded-lg">
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <span className="text-sm text-gray-600">{label}</span>
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-xl font-semibold text-gray-800">{value}</span>
        <span className="text-sm text-green-600">{trend}</span>
      </div>
    </div>
  );
};

export default VideoAnalytics;