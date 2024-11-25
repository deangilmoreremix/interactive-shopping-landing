import React, { useState } from 'react';
import { Plus, X, Settings } from 'lucide-react';
import { usePersonalizationStore } from '../store/personalizationStore';

const actions = [
  { id: 'show_content', label: 'Show Personalized Content' },
  { id: 'optimize_view', label: 'Optimize View' },
  { id: 'recommend', label: 'Show Recommendations' },
  { id: 'highlight', label: 'Highlight Products' },
  { id: 'customize_ui', label: 'Customize UI' }
];

export default function RuleEditor() {
  const { segments, rules, addRule } = usePersonalizationStore();
  const [showEditor, setShowEditor] = useState(false);
  const [ruleName, setRuleName] = useState('');
  const [selectedSegment, setSelectedSegment] = useState('');
  const [selectedAction, setSelectedAction] = useState('');

  const handleAddRule = () => {
    if (!ruleName || !selectedSegment || !selectedAction) return;

    addRule({
      id: Date.now().toString(),
      name: ruleName,
      segment: selectedSegment,
      action: selectedAction,
      conditions: [],
      status: 'active',
      performance: 0
    });

    setRuleName('');
    setSelectedSegment('');
    setSelectedAction('');
    setShowEditor(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Personalization Rules</h2>
        <button
          onClick={() => setShowEditor(true)}
          className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 flex items-center gap-2"
        >
          <Plus size={20} />
          Create Rule
        </button>
      </div>

      {/* Rules List */}
      <div className="grid gap-4">
        {rules.map((rule) => (
          <div key={rule.id} className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold">{rule.name}</h3>
                <p className="text-sm text-gray-500">
                  Segment: {rule.segment}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <span className={`px-2 py-1 rounded-full text-xs ${
                  rule.status === 'active' 
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-100 text-gray-700'
                }`}>
                  {rule.status}
                </span>
                <span className="text-sm font-medium text-green-600">
                  +{rule.performance}%
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="px-2 py-1 bg-orange-50 text-orange-700 rounded-md text-sm">
                {actions.find(a => a.id === rule.action)?.label}
              </span>
              <button className="text-gray-400 hover:text-gray-600">
                <Settings size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Rule Editor Modal */}
      {showEditor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold">Create Rule</h3>
              <button
                onClick={() => setShowEditor(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Rule Name
                </label>
                <input
                  type="text"
                  value={ruleName}
                  onChange={(e) => setRuleName(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="e.g., Premium Content Access"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Target Segment
                </label>
                <select
                  value={selectedSegment}
                  onChange={(e) => setSelectedSegment(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  <option value="">Select a segment...</option>
                  {segments.map((segment) => (
                    <option key={segment.id} value={segment.name}>
                      {segment.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Action
                </label>
                <div className="space-y-2">
                  {actions.map((action) => (
                    <label
                      key={action.id}
                      className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100"
                    >
                      <input
                        type="radio"
                        name="action"
                        value={action.id}
                        checked={selectedAction === action.id}
                        onChange={(e) => setSelectedAction(e.target.value)}
                        className="mr-3"
                      />
                      {action.label}
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-2 mt-6">
                <button
                  onClick={() => setShowEditor(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddRule}
                  disabled={!ruleName || !selectedSegment || !selectedAction}
                  className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Create Rule
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}