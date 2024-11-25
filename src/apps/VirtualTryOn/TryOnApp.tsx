import React, { useState } from 'react';
import { Glasses, Camera, Ruler, Sparkles, Split, Download } from 'lucide-react';
import TryOnViewer from './components/TryOnViewer';
import ProductSelector from './components/ProductSelector';
import CameraControls from './components/CameraControls';
import { Product } from '../../types';
import { useTryOn } from './hooks/useTryOn';
import { useFaceDetection } from './hooks/useFaceDetection';
import { useSizeEstimation } from './hooks/useSizeEstimation';
import { Cloudinary } from "@cloudinary/url-gen";
import { CLOUDINARY_CONFIG } from '../../config/cloudinary';

export default function TryOnApp() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [splitView, setSplitView] = useState(false);
  const [showMeasurements, setShowMeasurements] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  // Initialize hooks
  const { startCamera, stopCamera, takePhoto, isProcessing } = useTryOn();
  const { detectFace, landmarks, loading: faceLoading } = useFaceDetection();
  const { estimateSize, measurements, loading: sizeLoading } = useSizeEstimation();

  // Initialize Cloudinary
  const cld = new Cloudinary({
    cloud: {
      cloudName: CLOUDINARY_CONFIG.cloudName
    }
  });

  const products: Product[] = [
    {
      id: 'glasses-1',
      name: 'Classic Aviator',
      price: 149.99,
      image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f',
      description: 'Timeless aviator style sunglasses'
    },
    {
      id: 'glasses-2',
      name: 'Modern Round',
      price: 129.99,
      image: 'https://images.unsplash.com/photo-1577803645773-f96470509666',
      description: 'Contemporary round frame glasses'
    }
  ];

  const handleCameraToggle = async () => {
    if (cameraActive) {
      await stopCamera();
      setCameraActive(false);
    } else {
      const success = await startCamera();
      if (success) {
        setCameraActive(true);
      }
    }
  };

  const handleCapture = async () => {
    const photo = await takePhoto();
    if (photo) {
      setCapturedImage(photo);
      // Analyze the captured image
      if (selectedProduct) {
        await detectFace(photo);
        await estimateSize(photo);
      }
    }
  };

  const handleDownload = () => {
    if (capturedImage) {
      const link = document.createElement('a');
      link.href = capturedImage;
      link.download = 'virtual-tryon.jpg';
      link.click();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Glasses className="text-emerald-600" size={24} />
              <span className="text-xl font-bold text-gray-800">Virtual Try-On</span>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowMeasurements(!showMeasurements)}
                className={`p-2 rounded-full ${
                  showMeasurements ? 'bg-emerald-100 text-emerald-600' : 'bg-gray-100 text-gray-600'
                }`}
                title="Show Measurements"
              >
                <Ruler size={20} />
              </button>
              <button
                onClick={() => setSplitView(!splitView)}
                className={`p-2 rounded-full ${
                  splitView ? 'bg-emerald-100 text-emerald-600' : 'bg-gray-100 text-gray-600'
                }`}
                title="Split View"
              >
                <Split size={20} />
              </button>
              {capturedImage && (
                <button
                  onClick={handleDownload}
                  className="p-2 rounded-full bg-gray-100 text-gray-600"
                  title="Download"
                >
                  <Download size={20} />
                </button>
              )}
              <span className={`px-3 py-1 rounded-full text-sm ${
                cameraActive 
                  ? 'bg-emerald-100 text-emerald-700' 
                  : 'bg-gray-100 text-gray-600'
              }`}>
                {cameraActive ? 'Camera Active' : 'Camera Off'}
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Try-On View */}
          <div className="lg:col-span-2 space-y-4">
            <TryOnViewer
              cameraActive={cameraActive}
              selectedProduct={selectedProduct}
              isProcessing={isProcessing || faceLoading || sizeLoading}
              splitView={splitView}
              showMeasurements={showMeasurements}
              landmarks={landmarks}
              measurements={measurements}
              cloudinary={cld}
            />
            
            <CameraControls
              cameraActive={cameraActive}
              onCameraToggle={handleCameraToggle}
              onTakePhoto={handleCapture}
              isProcessing={isProcessing}
            />

            {measurements && showMeasurements && (
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="font-semibold mb-3">Body Measurements</h3>
                <div className="grid grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Shoulders</p>
                    <p className="font-medium">{measurements.shoulders.toFixed(1)} cm</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Chest</p>
                    <p className="font-medium">{measurements.chest.toFixed(1)} cm</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Waist</p>
                    <p className="font-medium">{measurements.waist.toFixed(1)} cm</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Height</p>
                    <p className="font-medium">{measurements.height.toFixed(1)} cm</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Product Selection */}
          <div className="space-y-4">
            <ProductSelector
              products={products}
              selectedProduct={selectedProduct}
              onSelectProduct={setSelectedProduct}
            />

            {selectedProduct && measurements && (
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="font-semibold mb-3">Fit Analysis</h3>
                <div className="flex items-center gap-2 text-emerald-600 mb-4">
                  <Sparkles size={16} />
                  <span>98% Size Match</span>
                </div>
                <p className="text-sm text-gray-600">
                  Based on your measurements, this {selectedProduct.name.toLowerCase()} 
                  will provide a comfortable fit. The frame width aligns well with your 
                  face measurements.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}