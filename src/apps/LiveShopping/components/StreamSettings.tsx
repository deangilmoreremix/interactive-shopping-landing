import React, { useState } from 'react';
import { X, Settings, Video, Sliders, Users, Shield } from 'lucide-react';

interface StreamSettingsProps {
  config: {
    streaming: {
      profiles: {
        hd: { format: string; quality: string };
        sd: { format: string; quality: number };
      };
      protocols: string[];
      dvr: boolean;
      lowLatency: boolean;
      adaptiveBitrate: boolean;
    };
    chat: {
      enabled: boolean;
      moderationEnabled: boolean;
      userLimit: number;
      messageRateLimit: number;
    };
    analytics: {
      enabled: boolean;
      trackViewers: boolean;
      trackEngagement: boolean;
      trackProducts: boolean;
    };
  };
  onClose: () => void;
  onSave: (newConfig: any) => void;
}

export default function StreamSettings({
  config,
  onClose,
  onSave
}: StreamSettingsProps) {
  const [settings, setSettings] = useState(config);

  const handleSave = () => {
    onSave(settings);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold">Stream Settings</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        <div className="space-y-6">
          {/* Stream Quality Settings */}
          <div>
            <h4 className="font-medium flex items-center gap-2 mb-4">
              <Video size={20} />
              Stream Quality
            </h4>
            <div className="space-y-4 pl-7">
              <div>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={settings.streaming.adaptiveBitrate}
                    onChange={(e) => setSettings({
                      ...settings,
                      streaming: {
                        ...settings.streaming,
                        adaptiveBitrate: e.target.checked
                      }
                    })}
                  />
                  <span>Adaptive Bitrate</span>
                </label>
                <p className="text-sm text-gray-500 ml-6">
                  Automatically adjust quality based on viewer's connection
                </p>
              </div>

              <div>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={settings.streaming.lowLatency}
                    onChange={(e) => setSettings({
                      ...settings,
                      streaming: {
                        ...settings.streaming,
                        lowLatency: e.target.checked
                      }
                    })}
                  />
                  <span>Low Latency Mode</span>
                </label>
                <p className="text-sm text-gray-500 ml-6">
                  Reduce delay between broadcaster and viewers
                </p>
              </div>

              <div>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={settings.streaming.dvr}
                    onChange={(e) => setSettings({
                      ...settings,
                      streaming: {
                        ...settings.streaming,
                        dvr: e.target.checked
                      }
                    })}
                  />
                  <span>DVR Controls</span>
                </label>
                <p className="text-sm text-gray-500 ml-6">
                  Allow viewers to pause and rewind the stream
                </p>
              </div>
            </div>
          </div>

          {/* Chat Settings */}
          <div>
            <h4 className="font-medium flex items-center gap-2 mb-4">
              <Users size={20} />
              Chat Settings
            </h4>
            <div className="space-y-4 pl-7">
              <div>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={settings.chat.enabled}
                    onChange={(e) => setSettings({
                      ...settings,
                      chat: {
                        ...settings.chat,
                        enabled: e.target.checked
                      }
                    })}
                  />
                  <span>Enable Chat</span>
                </label>
              </div>

              <div>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={settings.chat.moderationEnabled}
                    onChange={(e) => setSettings({
                      ...settings,
                      chat: {
                        ...settings.chat,
                        moderationEnabled: e.target.checked
                      }
                    })}
                  />
                  <span>Content Moderation</span>
                </label>
                <p className="text-sm text-gray-500 ml-6">
                  Automatically filter inappropriate content
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Message Rate Limit (per second)
                </label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={settings.chat.messageRateLimit}
                  onChange={(e) => setSettings({
                    ...settings,
                    chat: {
                      ...settings.chat,
                      messageRateLimit: Number(e.target.value)
                    }
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Maximum Viewers
                </label>
                <input
                  type="number"
                  min="10"
                  max="10000"
                  value={settings.chat.userLimit}
                  onChange={(e) => setSettings({
                    ...settings,
                    chat: {
                      ...settings.chat,
                      userLimit: Number(e.target.value)
                    }
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
              </div>
            </div>
          </div>

          {/* Analytics Settings */}
          <div>
            <h4 className="font-medium flex items-center gap-2 mb-4">
              <Sliders size={20} />
              Analytics
            </h4>
            <div className="space-y-4 pl-7">
              <div>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={settings.analytics.trackViewers}
                    onChange={(e) => setSettings({
                      ...settings,
                      analytics: {
                        ...settings.analytics,
                        trackViewers: e.target.checked
                      }
                    })}
                  />
                  <span>Track Viewer Analytics</span>
                </label>
              </div>

              <div>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={settings.analytics.trackEngagement}
                    onChange={(e) => setSettings({
                      ...settings,
                      analytics: {
                        ...settings.analytics,
                        trackEngagement: e.target.checked
                      }
                    })}
                  />
                  <span>Track Engagement</span>
                </label>
              </div>

              <div>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={settings.analytics.trackProducts}
                    onChange={(e) => setSettings({
                      ...settings,
                      analytics: {
                        ...settings.analytics,
                        trackProducts: e.target.checked
                      }
                    })}
                  />
                  <span>Track Product Performance</span>
                </label>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
            >
              Save Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}