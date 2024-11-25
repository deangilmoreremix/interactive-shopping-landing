import { useState, useCallback } from 'react';
import { Cloudinary } from "@cloudinary/url-gen";
import { CLOUDINARY_CONFIG } from '../../../config/cloudinary';

export function useTryOn() {
  const [isProcessing, setIsProcessing] = useState(false);

  // Initialize Cloudinary
  const cld = new Cloudinary({
    cloud: {
      cloudName: CLOUDINARY_CONFIG.cloudName
    }
  });

  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: 'user'
        }
      });
      return true;
    } catch (error) {
      console.error('Error starting camera:', error);
      return false;
    }
  }, []);

  const stopCamera = useCallback(async () => {
    try {
      const tracks = document.querySelector('video')?.srcObject as MediaStream;
      tracks?.getTracks().forEach(track => track.stop());
    } catch (error) {
      console.error('Error stopping camera:', error);
    }
  }, []);

  const takePhoto = useCallback(async () => {
    setIsProcessing(true);
    try {
      const video = document.querySelector('video');
      const canvas = document.createElement('canvas');
      if (!video) return;

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext('2d')?.drawImage(video, 0, 0);

      const blob = await new Promise<Blob>((resolve) => {
        canvas.toBlob(blob => {
          if (blob) resolve(blob);
        }, 'image/jpeg');
      });

      // Here we would upload to Cloudinary and process the image
      // const formData = new FormData();
      // formData.append('file', blob);
      // formData.append('upload_preset', CLOUDINARY_CONFIG.uploadConfig.uploadPreset);

      setIsProcessing(false);
    } catch (error) {
      console.error('Error taking photo:', error);
      setIsProcessing(false);
    }
  }, []);

  return {
    startCamera,
    stopCamera,
    takePhoto,
    isProcessing
  };
}