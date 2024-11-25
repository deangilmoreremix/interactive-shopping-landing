import React from 'react';
import { TrendingUp, BarChart2 } from 'lucide-react';
import { useSocialStore } from '../../../store/socialStore';

export default function TrendingStyles() {
  const { trends } = useSocialStore();

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="font-semibold mb-4">Trending Styles</h3>
      <div className="space-y-4">
        {trends.map((trend) => (
          <div
            key={trend.id}
            className="bg-gray-50 rounded-lg p-4"
          >
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium">#{trend.name}</h4>
              <span className="text-green-600 text-sm">
                +{trend.growth}%
              </span>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span>{trend.posts} posts</span>
              <span>{trend.engagement}K engagement</span>
            </div>
            <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-pink-600 rounded-full"
                style={{ width: `${trend.growth}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}