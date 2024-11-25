import React, { useState } from 'react';
import { Box, Eye, Camera, Settings } from 'lucide-react';
import InteractiveVideoPlayer from './components/InteractiveVideoPlayer';
import HotspotEditor from './components/HotspotEditor';
import SceneControls from './components/SceneControls';
import VirtualStaging from './components/VirtualStaging';
import { Cloudinary } from "@cloudinary/url-gen";
import { CLOUDINARY_CONFIG } from '../../config/cloudinary';

const scenes = [
  { 
    id: 'living-room', 
    name: 'Living Room',
    videoId: 'samples/360-living-room'
  },
  { 
    id: 'kitchen', 
    name: 'Kitchen',
    videoId: 'samples/360-kitchen'
  }
];

export default function ImmersiveApp() {
  const [activeScene, setActiveScene] = useState<string>(scenes[0].id);
  const [hotspots, setHotspots] = useState<any[]>([]);
  const [viewMode, setViewMode] = useState<'360' | 'standard'>('360');
  const [showStaging, setShowStaging] = useState(false);

  // Initialize Cloudinary
  const cld = new Cloudinary({
    cloud: {
      cloudName: CLOUDINARY_CONFIG.cloudName
    }
  });

  const handleHotspotClick = (hotspot: any) => {
    console.log('Hotspot clicked:', hotspot);
  };

  const handleAddHotspot = (hotspot: any) => {
    setHotspots([...hotspots, { id: Date.now().toString(), ...hotspot }]);
  };

  const currentScene = scenes.find(s => s.id === activeScene);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Box className="text-violet-600" size={24} />
              <span className="text-xl font-bold text-gray-800">360° Experience</span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowStaging(!showStaging)}
                className="flex items-center gap-2 bg-violet-100 text-violet-600 px-4 py-2 rounded-lg hover:bg-violet-200"
              >
                <Settings size={20} />
                Virtual Staging
              </button>
              <button
                onClick={() => setViewMode(viewMode === '360' ? 'standard' : '360')}
                className="flex items-center gap-2 bg-violet-600 text-white px-4 py-2 rounded-lg hover:bg-violet-700"
              >
                <Eye size={20} />
                {viewMode === '360' ? 'Standard View' : '360° View'}
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-8 aspect-video bg-black rounded-lg overflow-hidden relative">
            {currentScene?.videoId && (
              <InteractiveVideoPlayer
                publicId={currentScene.videoId}
                onHotspotClick={handleHotspotClick}
                hotspots={hotspots}
                mode={viewMode}
              />
            )}
          </div>

          <div className="col-span-4 space-y-4">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="font-semibold mb-4">Scenes</h3>
              <div className="grid gap-2">
                {scenes.map((scene) => (
                  <button
                    key={scene.id}
                    onClick={() => setActiveScene(scene.id)}
                    className={`flex items-center justify-between p-3 rounded-lg transition-colors ${
                      activeScene === scene.id
                        ? 'bg-violet-50 text-violet-600'
                        : 'bg-gray-50 hover:bg-violet-50 hover:text-violet-600'
                    }`}
                  >
                    <span>{scene.name}</span>
                    <Eye size={18} />
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="font-semibold mb-4">Hotspots</h3>
              <HotspotEditor
                onAddHotspot={handleAddHotspot}
                hotspots={hotspots}
              />
            </div>

            <SceneControls
              viewMode={viewMode}
            />
          </div>
        </div>
      </main>

      {showStaging && (
        <VirtualStaging
          scene={currentScene}
          onClose={() => setShowStaging(false)}
          cloudinary={cld}
        />
      )}
    </div>
  );
}