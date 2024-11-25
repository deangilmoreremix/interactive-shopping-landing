import React, { useState } from 'react';
import { Sparkles, Upload, Camera, Image as ImageIcon } from 'lucide-react';
import StyleAnalyzer from './components/StyleAnalyzer';
import OutfitGenerator from './components/OutfitGenerator';
import TrendPredictor from './components/TrendPredictor';
import MediaUploader from '../../components/MediaUploader';
import { useFashionAI } from './hooks/useFashionAI';

export default function FashionistaAIApp() {
  const [activeTab, setActiveTab] = useState<'analyze' | 'generate' | 'predict'>('analyze');
  const [showUploader, setShowUploader] = useState(false);
  const { analyzeStyle, generateOutfit, predictTrends, loading } = useFashionAI();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleUpload = async (result: any) => {
    setSelectedImage(result.secure_url);
    setShowUploader(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="text-purple-600" size={24} />
              <span className="text-xl font-bold text-gray-800">FashionistaAI</span>
            </div>
            <button
              onClick={() => setShowUploader(true)}
              className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
            >
              <Upload size={20} />
              Upload Image
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab('analyze')}
            className={`flex-1 py-2 rounded-lg ${
              activeTab === 'analyze'
                ? 'bg-purple-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            Style Analysis
          </button>
          <button
            onClick={() => setActiveTab('generate')}
            className={`flex-1 py-2 rounded-lg ${
              activeTab === 'generate'
                ? 'bg-purple-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            Outfit Generator
          </button>
          <button
            onClick={() => setActiveTab('predict')}
            className={`flex-1 py-2 rounded-lg ${
              activeTab === 'predict'
                ? 'bg-purple-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            Trend Predictor
          </button>
        </div>

        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-8">
            {activeTab === 'analyze' && (
              <StyleAnalyzer
                imageUrl={selectedImage}
                onAnalyze={analyzeStyle}
                loading={loading}
              />
            )}
            {activeTab === 'generate' && (
              <OutfitGenerator
                imageUrl={selectedImage}
                onGenerate={generateOutfit}
                loading={loading}
              />
            )}
            {activeTab === 'predict' && (
              <TrendPredictor
                onPredict={predictTrends}
                loading={loading}
              />
            )}
          </div>

          <div className="col-span-4 space-y-4">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="font-semibold mb-4">AI Features</h3>
              <div className="space-y-2">
                <div className="p-3 bg-purple-50 text-purple-700 rounded-lg">
                  <h4 className="font-medium">Style Analysis</h4>
                  <p className="text-sm mt-1">
                    Analyze outfits and get detailed style insights
                  </p>
                </div>
                <div className="p-3 bg-purple-50 text-purple-700 rounded-lg">
                  <h4 className="font-medium">Outfit Generation</h4>
                  <p className="text-sm mt-1">
                    Generate personalized outfit recommendations
                  </p>
                </div>
                <div className="p-3 bg-purple-50 text-purple-700 rounded-lg">
                  <h4 className="font-medium">Trend Prediction</h4>
                  <p className="text-sm mt-1">
                    Predict upcoming fashion trends using AI
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="font-semibold mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-2">
                <button className="flex flex-col items-center gap-2 p-4 bg-gray-50 rounded-lg hover:bg-gray-100">
                  <Camera size={24} />
                  <span className="text-sm">Take Photo</span>
                </button>
                <button className="flex flex-col items-center gap-2 p-4 bg-gray-50 rounded-lg hover:bg-gray-100">
                  <ImageIcon size={24} />
                  <span className="text-sm">Browse</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {showUploader && (
        <MediaUploader
          type="image"
          onUpload={handleUpload}
          onClose={() => setShowUploader(false)}
        />
      )}
    </div>
  );
}