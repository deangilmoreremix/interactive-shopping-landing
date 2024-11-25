import React from 'react';
import { Gift, Star, Trophy, TrendingUp } from 'lucide-react';
import { useSocialStore } from '../../../store/socialStore';

export default function Rewards() {
  const { rewards } = useSocialStore();

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-semibold">Your Rewards</h3>
        <div className="flex items-center gap-2">
          <Star className="text-yellow-400" size={20} />
          <span className="font-medium">1,234 points</span>
        </div>
      </div>

      <div className="space-y-4">
        {rewards.map((reward) => (
          <div
            key={reward.id}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center">
                <Trophy className="text-pink-600" size={20} />
              </div>
              <div>
                <p className="font-medium">{reward.type}</p>
                <p className="text-sm text-gray-500">
                  +{reward.points} points
                </p>
              </div>
            </div>
            <span className="text-sm text-gray-500">
              {reward.earned}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <button className="w-full bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700">
          Redeem Points
        </button>
      </div>
    </div>
  );
}