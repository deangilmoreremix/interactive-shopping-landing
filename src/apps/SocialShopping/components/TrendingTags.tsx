import React from 'react';
import { TrendingUp } from 'lucide-react';

const trendingTags = [
  { tag: 'fashion', count: 1234 },
  { tag: 'style', count: 987 },
  { tag: 'ootd', count: 856 },
  { tag: 'shopping', count: 743 },
  { tag: 'trendy', count: 632 }
];

export default function TrendingTags() {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="text-pink-600" size={20} />
        <h3 className="font-semibold">Trending Tags</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {trendingTags.map(({ tag, count }) => (
          <button
            key={tag}
            className="px-3 py-1 bg-pink-50 text-pink-600 rounded-full text-sm hover:bg-pink-100 transition-colors group"
          >
            #{tag}
            <span className="ml-1 text-xs text-pink-400 group-hover:text-pink-500">
              {count.toLocaleString()}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}