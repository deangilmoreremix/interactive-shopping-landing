import React, { useState } from 'react';
import { Plus } from 'lucide-react';

interface Hotspot {
  id: string;
  time: string;
  x: string;
  y: string;
  content: {
    title: string;
    description: string;
  };
}

interface HotspotEditorProps {
  onAddHotspot: (hotspot: Omit<Hotspot, 'id'>) => void;
  hotspots: Hotspot[];
}

export default function HotspotEditor({ onAddHotspot, hotspots }: HotspotEditorProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [time, setTime] = useState('00:00');
  const [position, setPosition] = useState({ x: '50%', y: '50%' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddHotspot({
      time,
      x: position.x,
      y: position.y,
      content: {
        title,
        description
      }
    });
    setTitle('');
    setDescription('');
    setTime('00:00');
    setPosition({ x: '50%', y: '50%' });
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 w-full rounded-lg border-gray-300 shadow-sm"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 w-full rounded-lg border-gray-300 shadow-sm"
            rows={3}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Time (MM:SS)</label>
          <input
            type="text"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            pattern="[0-9]{2}:[0-9]{2}"
            className="mt-1 w-full rounded-lg border-gray-300 shadow-sm"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 bg-violet-600 text-white px-4 py-2 rounded-lg hover:bg-violet-700"
        >
          <Plus size={20} />
          Add Hotspot
        </button>
      </form>

      <div className="space-y-2">
        {hotspots.map((hotspot) => (
          <div
            key={hotspot.id}
            className="p-3 bg-gray-50 rounded-lg"
          >
            <h4 className="font-medium">{hotspot.content.title}</h4>
            <p className="text-sm text-gray-500">{hotspot.content.description}</p>
            <p className="text-xs text-gray-400 mt-1">Time: {hotspot.time}</p>
          </div>
        ))}
      </div>
    </div>
  );
}