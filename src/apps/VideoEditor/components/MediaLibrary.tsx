import React, { useState } from 'react';
import { X, Upload, Film, Image as ImageIcon, Music, Search, Grid, List } from 'lucide-react';
import { useCloudinaryUpload } from '../../../hooks/useCloudinaryUpload';

interface MediaItem {
  id: string;
  type: 'video' | 'image' | 'audio';
  url: string;
  thumbnail?: string;
  name: string;
  duration?: string;
  size: string;
  createdAt: string;
}

interface MediaLibraryProps {
  onClose: () => void;
  onSelect: (media: MediaItem) => void;
}

const DEMO_MEDIA: MediaItem[] = [
  {
    id: '1',
    type: 'video',
    url: 'https://res.cloudinary.com/demo/video/upload/v1/samples/elephants',
    thumbnail: 'https://res.cloudinary.com/demo/video/upload/v1/samples/elephants',
    name: 'Nature Documentary',
    duration: '2:30',
    size: '24.5 MB',
    createdAt: '2024-03-15'
  },
  {
    id: '2',
    type: 'video',
    url: 'https://res.cloudinary.com/demo/video/upload/v1/samples/sea-turtle',
    thumbnail: 'https://res.cloudinary.com/demo/video/upload/v1/samples/sea-turtle',
    name: 'Ocean Life',
    duration: '1:45',
    size: '18.2 MB',
    createdAt: '2024-03-14'
  }
];

export default function MediaLibrary({ onClose, onSelect }: MediaLibraryProps) {
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [filter, setFilter] = useState<'all' | 'video' | 'image' | 'audio'>('all');
  const [search, setSearch] = useState('');
  const [showUploader, setShowUploader] = useState(false);
  const { upload, uploading } = useCloudinaryUpload();

  const filteredMedia = DEMO_MEDIA.filter(item => {
    if (filter !== 'all' && item.type !== filter) return false;
    if (search && !item.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const handleUpload = async (file: File) => {
    try {
      const result = await upload(file);
      const newMedia: MediaItem = {
        id: result.public_id,
        type: file.type.startsWith('video/') ? 'video' : 
              file.type.startsWith('image/') ? 'image' : 'audio',
        url: result.secure_url,
        thumbnail: result.secure_url,
        name: file.name,
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        createdAt: new Date().toISOString().split('T')[0]
      };
      onSelect(newMedia);
      onClose();
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-4xl mx-4 overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">Media Library</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex h-[600px]">
          {/* Sidebar */}
          <div className="w-48 border-r p-4 space-y-4">
            <button
              onClick={() => setShowUploader(true)}
              className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2"
              disabled={uploading}
            >
              <Upload size={20} />
              Upload
            </button>

            <div className="space-y-2">
              <button
                onClick={() => setFilter('all')}
                className={`w-full text-left px-3 py-2 rounded-lg flex items-center gap-2 ${
                  filter === 'all' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100'
                }`}
              >
                <Grid size={18} />
                All Media
              </button>
              <button
                onClick={() => setFilter('video')}
                className={`w-full text-left px-3 py-2 rounded-lg flex items-center gap-2 ${
                  filter === 'video' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100'
                }`}
              >
                <Film size={18} />
                Videos
              </button>
              <button
                onClick={() => setFilter('image')}
                className={`w-full text-left px-3 py-2 rounded-lg flex items-center gap-2 ${
                  filter === 'image' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100'
                }`}
              >
                <ImageIcon size={18} />
                Images
              </button>
              <button
                onClick={() => setFilter('audio')}
                className={`w-full text-left px-3 py-2 rounded-lg flex items-center gap-2 ${
                  filter === 'audio' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100'
                }`}
              >
                <Music size={18} />
                Audio
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col">
            {/* Toolbar */}
            <div className="p-4 border-b flex items-center justify-between">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search media..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10 pr-4 py-2 border rounded-lg w-64"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setView('grid')}
                  className={`p-2 rounded ${
                    view === 'grid' ? 'bg-gray-100' : 'hover:bg-gray-100'
                  }`}
                >
                  <Grid size={20} />
                </button>
                <button
                  onClick={() => setView('list')}
                  className={`p-2 rounded ${
                    view === 'list' ? 'bg-gray-100' : 'hover:bg-gray-100'
                  }`}
                >
                  <List size={20} />
                </button>
              </div>
            </div>

            {/* Media Grid/List */}
            <div className="flex-1 overflow-y-auto p-4">
              {view === 'grid' ? (
                <div className="grid grid-cols-3 gap-4">
                  {filteredMedia.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => onSelect(item)}
                      className="cursor-pointer group relative rounded-lg overflow-hidden border hover:border-blue-500"
                    >
                      <img
                        src={item.thumbnail}
                        alt={item.name}
                        className="w-full aspect-video object-cover"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity" />
                      <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black to-transparent">
                        <p className="text-white text-sm truncate">{item.name}</p>
                        <p className="text-white/70 text-xs">{item.duration}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-2">
                  {filteredMedia.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => onSelect(item)}
                      className="flex items-center gap-4 p-2 hover:bg-gray-50 rounded-lg cursor-pointer"
                    >
                      <div className="w-24 aspect-video rounded overflow-hidden">
                        <img
                          src={item.thumbnail}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>{item.duration}</span>
                          <span>{item.size}</span>
                          <span>{item.createdAt}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {showUploader && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Upload Media</h3>
              <button
                onClick={() => setShowUploader(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>
            <input
              type="file"
              accept="video/*,image/*,audio/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  handleUpload(file);
                  setShowUploader(false);
                }
              }}
              className="w-full"
            />
          </div>
        </div>
      )}
    </div>
  );
}