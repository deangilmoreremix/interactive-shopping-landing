import React from 'react';
import { BarChart, TrendingUp, Users, Target, Clock } from 'lucide-react';

export default function AnalyticsDashboard() {
  const metrics = [
    {
      label: 'Video Views',
      value: '24.5K',
      change: '+12.3%',
      icon: <Users className="text-cyan-600" size={20} />
    },
    {
      label: 'Avg. Watch Time',
      value: '4:32',
      change: '+8.7%',
      icon: <Clock className="text-cyan-600" size={20} />
    },
    {
      label: 'Click Rate',
      value: '3.2%',
      change: '+1.4%',
      icon: <Target className="text-cyan-600" size={20} />
    },
    {
      label: 'SEO Score',
      value: '85',
      change: '+5.2%',
      icon: <TrendingUp className="text-cyan-600" size={20} />
    }
  ];

  const performanceData = [
    { date: '2024-01', views: 15000, score: 75 },
    { date: '2024-02', views: 18000, score: 78 },
    { date: '2024-03', views: 24500, score: 85 }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Performance Analytics</h3>
        <select className="text-sm border rounded-lg px-2 py-1">
          <option value="7d">Last 7 days</option>
          <option value="30d">Last 30 days</option>
          <option value="90d">Last 90 days</option>
        </select>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {metrics.map((metric, index) => (
          <div key={index} className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              {metric.icon}
              <span className="text-sm text-gray-600">{metric.label}</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-semibold text-gray-800">
                {metric.value}
              </span>
              <span className="text-sm text-green-600">{metric.change}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Performance Chart */}
      <div>
        <h4 className="text-sm font-medium text-gray-600 mb-4">Performance Trend</h4>
        <div className="h-48 flex items-end gap-2">
          {performanceData.map((data) => (
            <div key={data.date} className="flex-1 flex flex-col gap-2">
              <div
                className="bg-cyan-100 rounded-t hover:bg-cyan-200 transition-colors relative group"
                style={{ height: `${(data.views / 25000) * 100}%` }}
              >
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  {data.views.toLocaleString()} views
                </div>
              </div>
              <div
                className="bg-orange-100 rounded-t hover:bg-orange-200 transition-colors relative group"
                style={{ height: `${data.score}%` }}
              >
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  Score: {data.score}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-2 text-xs text-gray-500">
          {performanceData.map((data) => (
            <span key={data.date}>{data.date}</span>
          ))}
        </div>
      </div>

      {/* Top Performing Content */}
      <div className="mt-8">
        <h4 className="text-sm font-medium text-gray-600 mb-4">Top Performing Content</h4>
        <div className="space-y-3">
          {[
            { title: 'Product Overview', views: '12.4K', score: 92 },
            { title: 'Tutorial Video', views: '8.9K', score: 88 },
            { title: 'Feature Demo', views: '6.2K', score: 85 }
          ].map((content, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div>
                <p className="font-medium">{content.title}</p>
                <p className="text-sm text-gray-500">{content.views} views</p>
              </div>
              <div className="text-right">
                <p className="font-medium text-cyan-600">Score: {content.score}</p>
                <p className="text-xs text-gray-500">SEO Performance</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}