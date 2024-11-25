import React from 'react';
import { Trophy, Users, Clock, Gift } from 'lucide-react';
import { useSocialStore } from '../../../store/socialStore';

export default function Challenges() {
  const { challenges } = useSocialStore();

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="font-semibold mb-4">Style Challenges</h3>
      <div className="space-y-4">
        {challenges.map((challenge) => (
          <div
            key={challenge.id}
            className="bg-gray-50 rounded-lg p-4"
          >
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium">{challenge.title}</h4>
              <span className="text-pink-600 text-sm font-medium">
                {challenge.reward}
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-3">
              {challenge.description}
            </p>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <Users size={16} />
                {challenge.participants} joined
              </span>
              <span className="flex items-center gap-1">
                <Clock size={16} />
                Ends in {challenge.endDate}
              </span>
            </div>
            <button className="mt-3 w-full bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700">
              Join Challenge
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}