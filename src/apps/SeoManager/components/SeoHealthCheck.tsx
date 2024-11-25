import React from 'react';
import { AlertCircle } from 'lucide-react';

interface SeoHealthCheckProps {
  issues: {
    missingMeta: number;
    noTranscripts: number;
    duplicateTitles: number;
  };
}

export default function SeoHealthCheck({ issues }: SeoHealthCheckProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-4 border-b">
        <h3 className="font-semibold">SEO Health Check</h3>
      </div>
      <div className="p-4">
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <AlertCircle className="text-red-500" size={20} />
              <div>
                <h4 className="font-medium">Missing Meta Descriptions</h4>
                <p className="text-sm text-gray-500">
                  {issues.missingMeta} pages affected
                </p>
              </div>
            </div>
            <button className="text-cyan-600 hover:text-cyan-700">
              Fix Issues
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <AlertCircle className="text-yellow-500" size={20} />
              <div>
                <h4 className="font-medium">Videos Without Transcripts</h4>
                <p className="text-sm text-gray-500">
                  {issues.noTranscripts} pages affected
                </p>
              </div>
            </div>
            <button className="text-cyan-600 hover:text-cyan-700">
              Generate Transcripts
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <AlertCircle className="text-blue-500" size={20} />
              <div>
                <h4 className="font-medium">Duplicate Title Tags</h4>
                <p className="text-sm text-gray-500">
                  {issues.duplicateTitles} pages affected
                </p>
              </div>
            </div>
            <button className="text-cyan-600 hover:text-cyan-700">
              Fix Issues
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}