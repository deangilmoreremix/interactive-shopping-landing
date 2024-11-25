import React from 'react';
import { BarChart, TrendingUp, Users, Target, Clock } from 'lucide-react';
import { usePersonalizationStore } from '../store/personalizationStore';

export default function AnalyticsDashboard() {
  const { segments, rules } = usePersonalizationStore();

  const metrics = [
    {
      label: 'Total Users',
      value: '24.5K',
      change: '+12.3%',
      icon: <Users className="text-orange-600" size={20} />
    },
    {
      label: 'Avg. Engagement',
      value: '68%',
      change: '+5.2%',
      icon: <Target className="text-orange-600" size={20} />
    },
    {
      label: 'Session Duration',
      value: '4m 32s',
      change: '+8.7%',
      icon: <Clock className="text-orange-600" size={20} />
    },
    {
      label: 'Conversion Rate',
      value: '3.2%',
      change: '+1.4%',
      icon: <TrendingUp className="text-orange-600" size={20} />
    }
  ];

  const segmentPerformance = [
    { name: 'High-Value', value: 85 },
    { name: 'Mobile Users', value: 65 },
    { name: 'New Visitors', value: 45 },
    { name: 'Returning', value: 75 }
  ];

  return (
    <div className="space-y-6">
      {/* Metrics Overview */}
      <div className="grid grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
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

      {/* Segment Performance */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold mb-6">Segment Performance</h3>
        <div className="space-y-4">
          {segmentPerformance.map((segment) => (
            <div key={segment.name} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">{segment.name}</span>
                <span className="font-medium">{segment.value}%</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-orange-600 rounded-full"
                  style={{ width: `${segment.value}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Active Rules Impact */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold mb-6">Rules Impact</h3>
        <div className="space-y-4">
          {rules
            .filter((rule) => rule.status === 'active')
            .map((rule) => (
              <div
                key={rule.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div>
                  <p className="font-medium">{rule.name}</p>
                  <p className="text-sm text-gray-500">
                    Target: {rule.segment}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-green-600">
                    +{rule.performance}%
                  </p>
                  <p className="text-sm text-gray-500">Improvement</p>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Insights */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Top Converting Segments</h3>
          <div className="space-y-3">
            {segments
              .sort((a, b) => b.conversionRate - a.conversionRate)
              .slice(0, 3)
              .map((segment) => (
                <div
                  key={segment.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <span className="font-medium">{segment.name}</span>
                  <span className="text-green-600">
                    {segment.conversionRate.toFixed(1)}%
                  </span>
                </div>
              ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Recommendations</h3>
          <div className="space-y-3">
            <div className="p-3 bg-orange-50 text-orange-700 rounded-lg">
              <p className="text-sm font-medium">Increase mobile targeting</p>
              <p className="text-xs mt-1">
                Mobile users show 25% higher engagement rates
              </p>
            </div>
            <div className="p-3 bg-green-50 text-green-700 rounded-lg">
              <p className="text-sm font-medium">Optimize high-value segment</p>
              <p className="text-xs mt-1">
                Potential for 15% conversion rate improvement
              </p>
            </div>
            <div className="p-3 bg-blue-50 text-blue-700 rounded-lg">
              <p className="text-sm font-medium">New segment opportunity</p>
              <p className="text-xs mt-1">
                Consider targeting weekend shoppers
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}