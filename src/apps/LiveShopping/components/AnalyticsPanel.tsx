import React from 'react';
import { BarChart, Users, ThumbsUp, Share2 } from 'lucide-react';

interface AnalyticsPanelProps {
  viewers: number;
  duration: number;
  engagement: {
    likes: number;
    comments: number;
    shares: number;
  };
  products: any[];
}

export default function AnalyticsPanel({
  viewers,
  duration,
  engagement,
  products
}: AnalyticsPanelProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <h3 className="font-semibold mb-4">Stream Analytics</h3>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-50 p-3 rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <Users size={16} className="text-gray-400" />
            <span className="text-sm text-gray-600">Viewers</span>
          </div>
          <span className="text-lg font-semibold">{viewers}</span>
        </div>
        <div className="bg-gray-50 p-3 rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <ThumbsUp size={16} className="text-gray-400" />
            <span className="text-sm text-gray-600">Engagement</span>
          </div>
          <span className="text-lg font-semibold">{engagement.likes}</span>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-sm font-medium text-gray-600">Product Performance</h4>
        {products.map((product) => (
          <div
            key={product.id}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
          >
            <div className="flex items-center gap-3">
              <img
                src={product.image}
                alt={product.name}
                className="w-10 h-10 rounded object-cover"
              />
              <div>
                <p className="font-medium">{product.name}</p>
                <p className="text-sm text-gray-500">
                  ${product.price.toFixed(2)}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-medium text-green-600">
                {product.stock} views
              </p>
              <p className="text-xs text-gray-500">
                {product.reviews.count} clicks
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}