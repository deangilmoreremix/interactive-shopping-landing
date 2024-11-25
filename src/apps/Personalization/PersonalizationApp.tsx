import React, { useState } from 'react';
import { Target, Users, Zap, Settings } from 'lucide-react';
import SegmentBuilder from './components/SegmentBuilder';
import RuleEditor from './components/RuleEditor';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import VideoPersonalizationDemo from './components/VideoPersonalizationDemo';
import TutorialGuide from '../../components/TutorialGuide';

const tutorialSteps = [
  {
    target: '[data-tutorial="video-tab"]',
    title: 'Video Personalization',
    content: 'Start here to personalize your videos based on different audience segments.',
    position: 'bottom'
  },
  {
    target: '[data-tutorial="segment-tab"]',
    title: 'Audience Segments',
    content: 'Create and manage your audience segments to target specific user groups.',
    position: 'bottom'
  },
  {
    target: '[data-tutorial="rules-tab"]',
    title: 'Personalization Rules',
    content: 'Set up rules to determine how content adapts for different segments.',
    position: 'bottom'
  },
  {
    target: '[data-tutorial="analytics-tab"]',
    title: 'Performance Analytics',
    content: 'Track how your personalized content performs across different segments.',
    position: 'bottom'
  }
];

export default function PersonalizationApp() {
  const [activeTab, setActiveTab] = useState<'video' | 'segments' | 'rules' | 'analytics'>('video');
  const [showTutorial, setShowTutorial] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Target className="text-orange-600" size={24} />
              <span className="text-xl font-bold text-gray-800">Personalization Engine</span>
            </div>
            <div className="flex gap-2">
              <button 
                data-tutorial="video-tab"
                onClick={() => setActiveTab('video')}
                className={`px-4 py-2 rounded-lg ${
                  activeTab === 'video' 
                    ? 'bg-orange-600 text-white' 
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                Video
              </button>
              <button 
                data-tutorial="segment-tab"
                onClick={() => setActiveTab('segments')}
                className={`px-4 py-2 rounded-lg ${
                  activeTab === 'segments' 
                    ? 'bg-orange-600 text-white' 
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                Segments
              </button>
              <button 
                data-tutorial="rules-tab"
                onClick={() => setActiveTab('rules')}
                className={`px-4 py-2 rounded-lg ${
                  activeTab === 'rules' 
                    ? 'bg-orange-600 text-white' 
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                Rules
              </button>
              <button 
                data-tutorial="analytics-tab"
                onClick={() => setActiveTab('analytics')}
                className={`px-4 py-2 rounded-lg ${
                  activeTab === 'analytics' 
                    ? 'bg-orange-600 text-white' 
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                Analytics
              </button>
              <button
                onClick={() => setShowTutorial(true)}
                className="ml-4 text-gray-600 hover:text-gray-800"
              >
                <Settings size={20} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === 'video' && <VideoPersonalizationDemo />}
        {activeTab === 'segments' && <SegmentBuilder />}
        {activeTab === 'rules' && <RuleEditor />}
        {activeTab === 'analytics' && <AnalyticsDashboard />}
      </main>

      {showTutorial && (
        <TutorialGuide
          steps={tutorialSteps}
          isOpen={showTutorial}
          onClose={() => setShowTutorial(false)}
          onComplete={() => {
            console.log('Tutorial completed');
          }}
        />
      )}
    </div>
  );
}