import React, { useRef, useEffect, useState } from 'react';
import { Camera, Loader } from 'lucide-react';
import { Product } from '../../../types';
import { useFaceDetection } from '../hooks/useFaceDetection';
import { useVirtualTryOn } from '../hooks/useVirtualTryOn';
import { useSizeEstimation } from '../hooks/useSizeEstimation';

interface TryOnViewerProps {
  cameraActive: boolean;
  selectedProduct: Product | null;
  isProcessing: boolean;
}

export default function TryOnViewer({
  cameraActive,
  selectedProduct,
  isProcessing
}: TryOnViewerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  const { detectFace, landmarks, loading: faceLoading } = useFaceDetection();
  const { applyVirtualTryOn, processing: tryOnProcessing } = useVirtualTryOn();
  const { estimateSize, measurements, loading: sizeLoading } = useSizeEstimation();

  // Handle camera stream
  useEffect(() => {
    if (cameraActive && videoRef.current && !stream) {
      navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: 'user'
        }
      })
      .then(stream => {
        videoRef.current!.srcObject = stream;
        setStream(stream);
      })
      .catch(err => console.error('Error accessing camera:', err));
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
        setStream(null);
      }
    };
  }, [cameraActive, stream]);

  // Process video frames
  useEffect(() => {
    if (!videoRef.current || !canvasRef.current || !cameraActive) return;

    let animationFrame: number;
    const processFrame = async () => {
      if (videoRef.current && canvasRef.current) {
        // Detect face landmarks
        const faceLandmarks = await detectFace(videoRef.current);
        
        if (faceLandmarks && selectedProduct) {
          // Apply virtual try-on
          await applyVirtualTryOn(
            videoRef.current.srcObject as MediaStream,
            selectedProduct.image,
            faceLandmarks
          );

          // Estimate body measurements
          await estimateSize(videoRef.current);
        }

        // Draw results on canvas
        drawResults();
      }
      animationFrame = requestAnimationFrame(processFrame);
    };

    processFrame();
    return () => cancelAnimationFrame(animationFrame);
  }, [cameraActive, selectedProduct, detectFace, applyVirtualTryOn, estimateSize]);

  const drawResults = () => {
    if (!canvasRef.current || !videoRef.current) return;

    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    // Draw face landmarks
    if (landmarks) {
      drawFaceLandmarks(ctx, landmarks);
    }

    // Draw measurements
    if (measurements) {
      drawMeasurements(ctx, measurements);
    }
  };

  const drawFaceLandmarks = (ctx: CanvasRenderingContext2D, landmarks: any) => {
    ctx.fillStyle = 'rgba(0, 255, 0, 0.4)';
    landmarks.forEach((point: any) => {
      ctx.beginPath();
      ctx.arc(point.x, point.y, 2, 0, 2 * Math.PI);
      ctx.fill();
    });
  };

  const drawMeasurements = (ctx: CanvasRenderingContext2D, measurements: any) => {
    ctx.font = '14px Arial';
    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;

    Object.entries(measurements).forEach(([key, value]: [string, any], index) => {
      if (key !== 'confidence' && key !== 'unit') {
        const text = `${key}: ${value.toFixed(1)}${measurements.unit}`;
        ctx.strokeText(text, 10, 30 + index * 20);
        ctx.fillText(text, 10, 30 + index * 20);
      }
    });
  };

  return (
    <div className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden">
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        autoPlay
        playsInline
        muted
      />
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        width={1280}
        height={720}
      />

      {(faceLoading || tryOnProcessing || sizeLoading || isProcessing) && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="text-white text-center">
            <Loader className="animate-spin mx-auto mb-2" size={32} />
            <p>Processing...</p>
          </div>
        </div>
      )}

      {!cameraActive && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-gray-400">
            <Camera className="mx-auto mb-2" size={48} />
            <p>Start camera to begin try-on</p>
          </div>
        </div>
      )}
    </div>
  );
}