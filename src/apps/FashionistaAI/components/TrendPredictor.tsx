import React from 'react';
import { TrendingUp, Loader } from 'lucide-react';

interface TrendPredictorProps {
  onPredict: () => Promise<any>;
  loading: boolean;
}

export default function TrendPredictor({ onPredict, loading }: TrendPredictorProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Trend Predictor</h2>
        <p className="text-gray-600">
          Get AI-powered predictions for upcoming fashion trends
        </p>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-purple-50 rounded-lg">
            <h3 className="font-medium mb-2">Current Trends</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>Sustainable Fashion</li>
              <li>Oversized Silhouettes</li>
              <li>Neutral Palettes</li>
            </ul>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg">
            <h3 className="font-medium mb-2">Rising Trends</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>Digital Fashion</li>
              <li>Upcycled Materials</li>
              <li>Gender-Neutral Designs</li>
            </ul>
          </div>
        </div>

        <button
          onClick={onPredict}
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader className="animate-spin" size={20} />
              Analyzing Trends...
            </>
          ) : (
            <>
              <TrendingUp size={20} />
              Predict Trends
            </>
          )}
        </button>
      </div>
    </div>
  );
}