import React, { useState, useRef } from 'react';
import { Scissors, Plus, Play, Pause, Undo, Redo, Save, Download } from 'lucide-react';
import Timeline from './components/Timeline';
import EffectsPanel from './components/EffectsPanel';
import MediaLibrary from './components/MediaLibrary';
import TransitionEditor from './components/TransitionEditor';
import AudioMixer from './components/AudioMixer';
import { useVideoEditor } from './hooks/useVideoEditor';

export default function VideoEditorApp() {
  const {
    currentTime,
    duration,
    isPlaying,
    clips,
    selectedClipId,
    history,
    effects,
    transitions,
    audioTracks,
    playVideo,
    pauseVideo,
    addClip,
    removeClip,
    updateClip,
    selectClip,
    addEffect,
    removeEffect,
    addTransition,
    removeTransition,
    undo,
    redo,
    exportVideo
  } = useVideoEditor();

  const [showMediaLibrary, setShowMediaLibrary] = useState(false);
  const [activeTab, setActiveTab] = useState<'effects' | 'transitions' | 'audio'>('effects');
  const previewRef = useRef<HTMLVideoElement>(null);

  const handleExport = async () => {
    try {
      const url = await exportVideo({
        format: 'mp4',
        quality: 'high',
        resolution: '1080p'
      });
      console.log('Export successful:', url);
    } catch (error) {
      console.error('Export failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Scissors className="text-blue-600" size={24} />
              <span className="text-xl font-bold text-gray-800">Video Editor</span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={undo}
                disabled={!history.canUndo}
                className="p-2 text-gray-600 hover:text-gray-800 disabled:opacity-50"
                title="Undo"
              >
                <Undo size={20} />
              </button>
              <button
                onClick={redo}
                disabled={!history.canRedo}
                className="p-2 text-gray-600 hover:text-gray-800 disabled:opacity-50"
                title="Redo"
              >
                <Redo size={20} />
              </button>
              <button
                onClick={() => setShowMediaLibrary(true)}
                className="bg-gray-100 text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-200"
              >
                Add Media
              </button>
              <button
                onClick={handleExport}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
              >
                <Download size={20} />
                Export
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-12 gap-6">
          {/* Preview */}
          <div className="col-span-8">
            <div className="bg-black aspect-video rounded-lg overflow-hidden">
              <video
                ref={previewRef}
                className="w-full h-full"
                src={selectedClipId ? clips.find(c => c.id === selectedClipId)?.url : ''}
              />
            </div>
            
            <div className="mt-4 flex items-center justify-center gap-4">
              <button
                onClick={isPlaying ? pauseVideo : playVideo}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                {isPlaying ? <Pause size={24} /> : <Play size={24} />}
              </button>
            </div>

            {/* Timeline */}
            <Timeline
              clips={clips}
              currentTime={currentTime}
              duration={duration}
              selectedClipId={selectedClipId}
              onClipSelect={selectClip}
              onClipUpdate={updateClip}
              onClipRemove={removeClip}
              transitions={transitions}
            />
          </div>

          {/* Tools */}
          <div className="col-span-4 space-y-4">
            {/* Tabs */}
            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex gap-2 mb-4">
                <button
                  onClick={() => setActiveTab('effects')}
                  className={`flex-1 py-2 rounded-lg ${
                    activeTab === 'effects'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Effects
                </button>
                <button
                  onClick={() => setActiveTab('transitions')}
                  className={`flex-1 py-2 rounded-lg ${
                    activeTab === 'transitions'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Transitions
                </button>
                <button
                  onClick={() => setActiveTab('audio')}
                  className={`flex-1 py-2 rounded-lg ${
                    activeTab === 'audio'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Audio
                </button>
              </div>

              {activeTab === 'effects' && (
                <EffectsPanel
                  effects={effects}
                  selectedClipId={selectedClipId}
                  onAddEffect={addEffect}
                  onRemoveEffect={removeEffect}
                />
              )}

              {activeTab === 'transitions' && (
                <TransitionEditor
                  transitions={transitions}
                  selectedClipId={selectedClipId}
                  onAddTransition={addTransition}
                  onRemoveTransition={removeTransition}
                />
              )}

              {activeTab === 'audio' && (
                <AudioMixer
                  tracks={audioTracks}
                  selectedClipId={selectedClipId}
                />
              )}
            </div>
          </div>
        </div>
      </main>

      {showMediaLibrary && (
        <MediaLibrary
          onClose={() => setShowMediaLibrary(false)}
          onSelect={(media) => {
            addClip(media);
            setShowMediaLibrary(false);
          }}
        />
      )}
    </div>
  );
}