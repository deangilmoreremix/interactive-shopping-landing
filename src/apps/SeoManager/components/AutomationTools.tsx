import React from 'react';
import { FileText, RefreshCw, Code, Image as ImageIcon } from 'lucide-react';

interface AutomationToolsProps {
  onRun: (publicId: string) => Promise<any>;
}

export default function AutomationTools({ onRun }: AutomationToolsProps) {
  const handleRunTool = async (tool: string) => {
    try {
      await onRun('sample_video');
      console.log(`Running ${tool}...`);
    } catch (error) {
      console.error(`Failed to run ${tool}:`, error);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <h3 className="font-semibold mb-4">Quick Optimizations</h3>
      <div className="space-y-2">
        <button
          onClick={() => handleRunTool('sitemap')}
          className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-cyan-50 hover:text-cyan-600 group"
        >
          <div className="flex items-center gap-2">
            <FileText size={20} />
            <span>Generate Video Sitemap</span>
          </div>
          <span className="text-xs text-gray-500 group-hover:text-cyan-600">
            Auto-generate
          </span>
        </button>

        <button
          onClick={() => handleRunTool('meta')}
          className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-cyan-50 hover:text-cyan-600 group"
        >
          <div className="flex items-center gap-2">
            <RefreshCw size={20} />
            <span>Update Meta Tags</span>
          </div>
          <span className="text-xs text-gray-500 group-hover:text-cyan-600">
            Bulk update
          </span>
        </button>

        <button
          onClick={() => handleRunTool('schema')}
          className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-cyan-50 hover:text-cyan-600 group"
        >
          <div className="flex items-center gap-2">
            <Code size={20} />
            <span>Add Schema Markup</span>
          </div>
          <span className="text-xs text-gray-500 group-hover:text-cyan-600">
            VideoObject
          </span>
        </button>

        <button
          onClick={() => handleRunTool('thumbnails')}
          className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-cyan-50 hover:text-cyan-600 group"
        >
          <div className="flex items-center gap-2">
            <ImageIcon size={20} />
            <span>Optimize Thumbnails</span>
          </div>
          <span className="text-xs text-gray-500 group-hover:text-cyan-600">
            Auto-generate
          </span>
        </button>
      </div>
    </div>
  );
}