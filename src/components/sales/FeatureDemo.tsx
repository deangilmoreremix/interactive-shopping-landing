import React from 'react';
import { Play, Pause } from 'lucide-react';

interface FeatureDemoProps {
  activeDemo: string | null;
  setActiveDemo: (demo: string | null) => void;
}

export default function FeatureDemo({ activeDemo, setActiveDemo }: FeatureDemoProps) {
  const demos = [
    {
      id: 'shoppable',
      title: 'Shoppable Videos',
      video: 'https://res.cloudinary.com/demo/video/upload/v1/samples/ecommerce/fashion-show'
    },
    {
      id: '360',
      title: '360° Experience',
      video: 'https://res.cloudinary.com/demo/video/upload/v1/samples/ecommerce/virtual-try-on'
    },
    {
      id: 'live',
      title: 'Live Shopping',
      video: 'https://res.cloudinary.com/demo/video/upload/v1/samples/ecommerce/live-stream'
    }
  ];

  return (
    <div className="grid grid-cols-3 gap-8">
      {demos.map((demo) => (
        <div key={demo.id} className="relative aspect-video rounded-lg overflow-hidden">
          <video
            src={demo.video}
            className="w-full h-full object-cover"
            autoPlay={activeDemo === demo.id}
            muted
            loop
            playsInline
          />
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <button
              onClick={() => setActiveDemo(activeDemo === demo.id ? null : demo.id)}
              className="bg-white/10 backdrop-blur-sm text-white p-4 rounded-full hover:bg-white/20 transition-colors"
            >
              {activeDemo === demo.id ? (
                <Pause size={24} />
              ) : (
                <Play size={24} />
              )}
            </button>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
            <h3 className="text-white font-medium">{demo.title}</h3>
          </div>
        </div>
      ))}
    </div>
  );
}