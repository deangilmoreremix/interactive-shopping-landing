import React, { useRef, useState } from 'react';
import { Box, Camera } from 'lucide-react';
import { Cloudinary } from "@cloudinary/url-gen";
import { CLOUDINARY_CONFIG } from '../../config/cloudinary';
import ObjectDetection from './components/ObjectDetection';
import ProductDetails from './components/ProductDetails';
import ScannerOverlay from './components/ScannerOverlay';
import ScanHistory from './components/ScanHistory';
import { useProductScanner } from './hooks/useProductScanner';

export default function ScannerApp() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [scannedProduct, setScannedProduct] = useState<any>(null);
  const [scanHistory, setScanHistory] = useState<any[]>([]);

  // Initialize Cloudinary
  const cld = new Cloudinary({
    cloud: {
      cloudName: CLOUDINARY_CONFIG.cloudName
    }
  });

  const {
    scanning,
    scanMode,
    lastScan,
    error,
    startScanning,
    stopScanning,
    changeScanMode,
    analyzeImage
  } = useProductScanner(cld);

  const handleStartScanning = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: 'environment'
        }
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }

      startScanning();
    } catch (error) {
      console.error('Failed to start camera:', error);
    }
  };

  const handleStopScanning = () => {
    if (videoRef.current?.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    stopScanning();
  };

  const captureImage = async () => {
    if (!videoRef.current || !canvasRef.current) return;

    const context = canvasRef.current.getContext('2d');
    if (!context) return;

    try {
      // Set canvas dimensions to match video
      canvasRef.current.width = videoRef.current.videoWidth;
      canvasRef.current.height = videoRef.current.videoHeight;

      // Draw video frame to canvas
      context.drawImage(videoRef.current, 0, 0);

      // Convert canvas to blob
      const blob = await new Promise<Blob>((resolve, reject) => {
        canvasRef.current?.toBlob(
          blob => {
            if (blob) resolve(blob);
            else reject(new Error('Failed to capture image'));
          },
          'image/jpeg',
          0.95
        );
      });

      // Analyze the image using AI
      const result = await analyzeImage(blob);

      // Create product based on analysis
      const mockProduct = {
        id: Date.now().toString(),
        name: result.objects[0]?.label || 'Unknown Product',
        price: 199.99,
        description: 'High-quality product with advanced features',
        size: result.size ? 
          `${result.size.width}x${result.size.height}x${result.size.depth}${result.size.unit}` : 
          'Standard Size',
        colors: result.colors.map(c => c.color),
        availability: 45,
        similarProducts: [
          {
            id: '1',
            name: 'Similar Product 1',
            price: 189.99,
            image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e'
          },
          {
            id: '2',
            name: 'Similar Product 2',
            price: 209.99,
            image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30'
          }
        ]
      };

      setScannedProduct(mockProduct);
      setScanHistory(prev => [{
        id: Date.now().toString(),
        timestamp: new Date(),
        product: {
          name: mockProduct.name,
          price: mockProduct.price,
          image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e'
        }
      }, ...prev]);

      handleStopScanning();
    } catch (error) {
      console.error('Analysis failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-2">
            <Box className="text-purple-600" size={24} />
            <span className="text-xl font-bold text-gray-800">Product Scanner</span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-12 gap-6">
          {/* Scanner View */}
          <div className="col-span-8">
            <div className="bg-black rounded-lg overflow-hidden relative aspect-video">
              {scanning ? (
                <>
                  <video
                    ref={videoRef}
                    className="w-full h-full object-cover"
                    playsInline
                  />
                  <canvas
                    ref={canvasRef}
                    className="hidden"
                  />
                  <ScannerOverlay
                    scanning={scanning}
                    mode={scanMode}
                    onModeChange={changeScanMode}
                  />
                  {lastScan?.objects && (
                    <ObjectDetection
                      detectedObjects={lastScan.objects}
                      canvasWidth={videoRef.current?.videoWidth || 0}
                      canvasHeight={videoRef.current?.videoHeight || 0}
                    />
                  )}
                  <button
                    onClick={captureImage}
                    className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700"
                  >
                    Capture
                  </button>
                </>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <button
                    onClick={handleStartScanning}
                    className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 flex items-center gap-2"
                  >
                    <Camera size={24} />
                    Start Scanning
                  </button>
                </div>
              )}
            </div>

            {error && (
              <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-lg">
                {error}
              </div>
            )}

            {scannedProduct && (
              <div className="mt-6">
                <ProductDetails
                  product={scannedProduct}
                  onAddToCart={() => {
                    console.log('Adding to cart:', scannedProduct);
                  }}
                />
              </div>
            )}
          </div>

          {/* Scan History */}
          <div className="col-span-4">
            <ScanHistory
              scans={scanHistory}
              onScanSelect={(scanId) => {
                console.log('Selected scan:', scanId);
              }}
            />
          </div>
        </div>
      </main>
    </div>
  );
}