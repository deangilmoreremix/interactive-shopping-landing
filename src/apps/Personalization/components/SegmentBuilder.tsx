import React, { useState } from 'react';
import { Plus, X, ChevronDown } from 'lucide-react';
import { usePersonalizationStore } from '../store/personalizationStore';

const conditions = [
  { id: 'location', label: 'Location' },
  { id: 'device', label: 'Device Type' },
  { id: 'watchTime', label: 'Watch Time' },
  { id: 'engagement', label: 'Engagement Rate' },
  { id: 'purchases', label: 'Purchase History' },
  { id: 'interests', label: 'Interests' },
  { id: 'age', label: 'Age Range' },
  { id: 'visitFrequency', label: 'Visit Frequency' }
];

export default function SegmentBuilder() {
  const { segments, addSegment } = usePersonalizationStore();
  const [showBuilder, setShowBuilder] = useState(false);
  const [segmentName, setSegmentName] = useState('');
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);

  const handleAddSegment = () => {
    if (!segmentName) return;

    addSegment({
      id: Date.now().toString(),
      name: segmentName,
      conditions: selectedConditions,
      userCount: 0,
      conversionRate: 0,
      status: 'active'
    });

    setSegmentName('');
    setSelectedConditions([]);
    setShowBuilder(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Audience Segments</h2>
        <button
          onClick={() => setShowBuilder(true)}
          className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 flex items-center gap-2"
        >
          <Plus size={20} />
          Create Segment
        </button>
      </div>

      {/* Segment List */}
      <div className="grid gap-4">
        {segments.map((segment) => (
          <div key={segment.id} className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold">{segment.name}</h3>
                <p className="text-sm text-gray-500">
                  {segment.userCount.toLocaleString()} users
                </p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs ${
                segment.status === 'active' 
                  ? 'bg-green-100 text-green-700'
                  : 'bg-gray-100 text-gray-700'
              }`}>
                {segment.status}
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {segment.conditions.map((condition) => (
                <span
                  key={condition}
                  className="px-2 py-1 bg-orange-50 text-orange-700 rounded-md text-sm"
                >
                  {conditions.find(c => c.id === condition)?.label}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Segment Builder Modal */}
      {showBuilder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold">Create Segment</h3>
              <button
                onClick={() => setShowBuilder(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Segment Name
                </label>
                <input
                  type="text"
                  value={segmentName}
                  onChange={(e) => setSegmentName(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="e.g., High-Value Customers"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Conditions
                </label>
                <div className="space-y-2">
                  {conditions.map((condition) => (
                    <label
                      key={condition.id}
                      className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100"
                    >
                      <input
                        type="checkbox"
                        checked={selectedConditions.includes(condition.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedConditions([...selectedConditions, condition.id]);
                          } else {
                            setSelectedConditions(
                              selectedConditions.filter((id) => id !== condition.id)
                            );
                          }
                        }}
                        className="mr-3"
                      />
                      {condition.label}
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-2 mt-6">
                <button
                  onClick={() => setShowBuilder(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddSegment}
                  disabled={!segmentName || selectedConditions.length === 0}
                  className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Create Segment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}