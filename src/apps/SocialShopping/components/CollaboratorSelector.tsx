import React, { useState } from 'react';
import { X, Search, Users, CheckCircle } from 'lucide-react';

interface Collaborator {
  id: string;
  name: string;
  avatar: string;
  followers: number;
}

interface CollaboratorSelectorProps {
  selected: Collaborator[];
  onUpdate: (collaborators: Collaborator[]) => void;
  onClose: () => void;
}

export default function CollaboratorSelector({
  selected,
  onUpdate,
  onClose
}: CollaboratorSelectorProps) {
  const [search, setSearch] = useState('');
  const [selectedCollaborators, setSelectedCollaborators] = useState<Collaborator[]>(selected);

  const demoCollaborators = [
    {
      id: '1',
      name: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
      followers: 12400
    },
    {
      id: '2',
      name: 'Mike Chen',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
      followers: 8900
    }
  ];

  const handleSave = () => {
    onUpdate(selectedCollaborators);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold">Add Collaborators</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search collaborators..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          </div>
        </div>

        <div className="space-y-4 mb-6">
          {demoCollaborators.map((collaborator) => (
            <div
              key={collaborator.id}
              onClick={() => {
                if (selectedCollaborators.find(c => c.id === collaborator.id)) {
                  setSelectedCollaborators(selectedCollaborators.filter(c => c.id !== collaborator.id));
                } else {
                  setSelectedCollaborators([...selectedCollaborators, collaborator]);
                }
              }}
              className={`flex items-center justify-between p-3 rounded-lg cursor-pointer ${
                selectedCollaborators.find(c => c.id === collaborator.id)
                  ? 'bg-pink-50 border border-pink-200'
                  : 'bg-gray-50 hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <img
                  src={collaborator.avatar}
                  alt={collaborator.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-medium">{collaborator.name}</h4>
                  <p className="text-sm text-gray-500">
                    {collaborator.followers.toLocaleString()} followers
                  </p>
                </div>
              </div>
              {selectedCollaborators.find(c => c.id === collaborator.id) && (
                <CheckCircle className="text-pink-600" size={20} />
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700"
          >
            Add Selected
          </button>
        </div>
      </div>
    </div>
  );
}