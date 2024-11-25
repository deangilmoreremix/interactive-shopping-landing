import React, { useState } from 'react';
import { Sparkles, Loader } from 'lucide-react';

interface OutfitGeneratorProps {
  imageUrl: string | null;
  onGenerate: (preferences: any) => Promise<any>;
  loading: boolean;
}

export default function OutfitGenerator({ imageUrl, onGenerate, loading }: OutfitGeneratorProps) {
  const [preferences, setPreferences] = useState({
    style: 'casual',
    occasion: 'everyday',
    season: 'spring',
    colors: []
  });

  const handleGenerate = async () => {
    try {
      await onGenerate(preferences);
    } catch (error) {
      console.error('Generation failed:', error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Outfit Generator</h2>
        <p className="text-gray-600">
          Generate personalized outfit recommendations based on your preferences
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Style
          </label>
          <select
            value={preferences.style}
            onChange={(e) => setPreferences({ ...preferences, style: e.target.value })}
            className="w-full rounded-lg border-gray-300 shadow-sm"
          >
            <option value="casual">Casual</option>
            <option value="formal">Formal</option>
            <option value="business">Business</option>
            <option value="athletic">Athletic</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Occasion
          </label>
          <select
            value={preferences.occasion}
            onChange={(e) => setPreferences({ ...preferences, occasion: e.target.value })}
            className="w-full rounded-lg border-gray-300 shadow-sm"
          >
            <option value="everyday">Everyday</option>
            <option value="work">Work</option>
            <option value="party">Party</option>
            <option value="date">Date Night</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Season
          </label>
          <select
            value={preferences.season}
            onChange={(e) => setPreferences({ ...preferences, season: e.target.value })}
            className="w-full rounded-lg border-gray-300 shadow-sm"
          >
            <option value="spring">Spring</option>
            <option value="summer">Summer</option>
            <option value="fall">Fall</option>
            <option value="winter">Winter</option>
          </select>
        </div>

        <button
          onClick={handleGenerate}
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader className="animate-spin" size={20} />
              Generating...
            </>
          ) : (
            <>
              <Sparkles size={20} />
              Generate Outfit
            </>
          )}
        </button>
      </div>
    </div>
  );
}