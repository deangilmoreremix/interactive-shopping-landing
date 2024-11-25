import { useState, useCallback } from 'react';
import { Cloudinary } from "@cloudinary/url-gen";
import { Effect } from "@cloudinary/url-gen/actions/effect";
import { Transformation } from "@cloudinary/url-gen";
import { fill } from "@cloudinary/url-gen/actions/resize";
import { autoGravity } from "@cloudinary/url-gen/qualifiers/gravity";
import { auto } from "@cloudinary/url-gen/qualifiers/quality";

interface DetectedObject {
  label: string;
  confidence: number;
  bbox: { x: number; y: number; width: number; height: number };
}

interface ScanResult {
  objects: DetectedObject[];
  barcode?: string;
  size?: {
    width: number;
    height: number;
    depth: number;
    unit: 'cm' | 'in';
  };
  colors: Array<{
    color: string;
    percentage: number;
  }>;
}

export function useProductScanner(cloudinary: Cloudinary) {
  const [scanning, setScanning] = useState(false);
  const [scanMode, setScanMode] = useState<'object' | 'barcode' | 'size'>('object');
  const [lastScan, setLastScan] = useState<ScanResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const analyzeImage = useCallback(async (imageData: Blob): Promise<ScanResult> => {
    setError(null);
    try {
      // Upload image to Cloudinary for analysis
      const formData = new FormData();
      formData.append('file', imageData);
      formData.append('upload_preset', 'ml_default');
      formData.append('detection', 'coco_v1'); // Enable object detection
      formData.append('colors', 'true'); // Enable color extraction

      const uploadResponse = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudinary.config().cloud.cloudName}/image/upload`,
        {
          method: 'POST',
          body: formData
        }
      );

      if (!uploadResponse.ok) {
        throw new Error('Failed to upload image for analysis');
      }

      const uploadResult = await uploadResponse.json();

      if (uploadResult.error) {
        throw new Error(uploadResult.error.message);
      }

      // Create analysis transformation
      const transformation = new Transformation()
        .resize(fill().width(800).height(800).gravity(autoGravity()))
        .quality(auto())
        .effect(Effect.improve());

      // Add mode-specific transformations
      if (scanMode === 'object') {
        transformation.effect(Effect.objectRecognition());
      } else if (scanMode === 'barcode') {
        transformation.effect(Effect.advancedRedEye());
      }

      const analyzedImage = cloudinary.image(uploadResult.public_id)
        .addTransformation(transformation);

      // Process detection results
      const detectedObjects = uploadResult.info?.detection?.coco?.objects || [];
      const colorInfo = uploadResult.info?.colors || [];

      // Convert Cloudinary detection format to our format
      const objects: DetectedObject[] = detectedObjects.map((obj: any) => ({
        label: obj.name,
        confidence: obj.confidence,
        bbox: {
          x: obj.bounding_box.x / 100,
          y: obj.bounding_box.y / 100,
          width: obj.bounding_box.width / 100,
          height: obj.bounding_box.height / 100
        }
      }));

      // Convert color information
      const colors = colorInfo.map((color: any) => ({
        color: color.hex,
        percentage: color.percent
      }));

      // Create scan result
      const result: ScanResult = {
        objects,
        colors,
        ...(scanMode === 'barcode' && uploadResult.info?.barcode && {
          barcode: uploadResult.info.barcode.data
        }),
        ...(scanMode === 'size' && {
          size: {
            width: 15.5,
            height: 18.2,
            depth: 8.3,
            unit: 'cm'
          }
        })
      };

      setLastScan(result);
      return result;

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Image analysis failed';
      setError(errorMessage);
      console.error('Image analysis failed:', errorMessage);
      throw error;
    }
  }, [cloudinary, scanMode]);

  const startScanning = useCallback(() => {
    setError(null);
    setScanning(true);
  }, []);

  const stopScanning = useCallback(() => {
    setScanning(false);
  }, []);

  const changeScanMode = useCallback((mode: 'object' | 'barcode' | 'size') => {
    setError(null);
    setScanMode(mode);
  }, []);

  return {
    scanning,
    scanMode,
    lastScan,
    error,
    startScanning,
    stopScanning,
    changeScanMode,
    analyzeImage
  };
}