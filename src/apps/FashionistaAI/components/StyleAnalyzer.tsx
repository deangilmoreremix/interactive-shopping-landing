import React, { useState } from 'react';
import { Camera, Loader, Sparkles, Upload } from 'lucide-react';
import { Cloudinary } from "@cloudinary/url-gen";
import { CLOUDINARY_CONFIG } from '../../../config/cloudinary';
import { fill } from "@cloudinary/url-gen/actions/resize";
import { autoGravity } from "@cloudinary/url-gen/qualifiers/gravity";

interface StyleAnalyzerProps {
  imageUrl: string | null;
  onAnalyze: (imageUrl: string) => Promise<any>;
  loading: boolean;
}

export default function StyleAnalyzer({ imageUrl, onAnalyze, loading }: StyleAnalyzerProps) {
  const [analysisResult, setAnalysisResult] = useState<any>(null);

  // Initialize Cloudinary
  const cld = new Cloudinary({
    cloud: {
      cloudName: CLOUDINARY_CONFIG.cloudName
    }
  });

  const handleAnalyze = async () => {
    if (!imageUrl) return;
    try {
      const result = await onAnalyze(imageUrl);
      setAnalysisResult(result);
    } catch (error) {
      console.error('Analysis failed:', error);
    }
  };

  const optimizeImage = (publicId: string) => {
    return cld.image(publicId)
      .resize(fill().width(800).height(800).gravity(autoGravity()))
      .format('auto')
      .quality('auto')
      .toURL();
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Style Analysis</h2>
        <p className="text-gray-600">
          Upload an image to get detailed style insights and personalized recommendations
        </p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-4">
          {imageUrl ? (
            <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
              <img
                src={optimizeImage(imageUrl)}
                alt="Style Analysis"
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="aspect-square rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
              <div className="text-center">
                <Camera className="mx-auto text-gray-400 mb-2" size={48} />
                <p className="text-gray-500">Upload an image to start analysis</p>
              </div>
            </div>
          )}

          <button
            onClick={handleAnalyze}
            disabled={loading || !imageUrl}
            className="w-full flex items-center justify-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader className="animate-spin" size={20} />
                Analyzing...
              </>
            ) : (
              <>
                <Sparkles size={20} />
                Analyze Style
              </>
            )}
          </button>
        </div>

        {analysisResult && (
          <div className="space-y-6">
            <div>
              <h3 className="font-medium mb-2">Style Profile</h3>
              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-purple-700 font-medium">
                    {analysisResult.style}
                  </span>
                  <span className="text-sm text-purple-600">
                    {(analysisResult.confidence * 100).toFixed(0)}% match
                  </span>
                </div>
                <div className="space-y-2">
                  <div>
                    <span className="text-sm text-gray-600">Colors:</span>
                    <div className="flex gap-2 mt-1">
                      {analysisResult.colors.map((color: string) => (
                        <span
                          key={color}
                          className="px-2 py-1 bg-white rounded text-xs"
                        >
                          {color}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Patterns:</span>
                    <div className="flex gap-2 mt-1">
                      {analysisResult.patterns.map((pattern: string) => (
                        <span
                          key={pattern}
                          className="px-2 py-1 bg-white rounded text-xs"
                        >
                          {pattern}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-2">Recommendations</h3>
              <div className="space-y-4">
                {analysisResult.recommendations.map((rec: any) => (
                  <div key={rec.type}>
                    <h4 className="text-sm font-medium text-gray-600 mb-2">
                      {rec.type}
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      {rec.items.map((item: any) => (
                        <div
                          key={item.id}
                          className="bg-gray-50 p-2 rounded-lg"
                        >
                          <img
                            src={optimizeImage(item.image)}
                            alt={item.name}
                            className="w-full h-32 object-cover rounded mb-2"
                          />
                          <p className="text-sm font-medium">{item.name}</p>
                          <p className="text-xs text-gray-500">
                            {(item.confidence * 100).toFixed(0)}% match
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}