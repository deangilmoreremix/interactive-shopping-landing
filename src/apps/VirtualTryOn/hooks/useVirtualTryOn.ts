import { useState, useCallback } from 'react';
import { Cloudinary } from "@cloudinary/url-gen";
import { CLOUDINARY_CONFIG } from '../../../config/cloudinary';
import { Effect } from "@cloudinary/url-gen/actions/effect";
import { Transformation } from "@cloudinary/url-gen";

interface TryOnResult {
  overlayUrl: string;
  fit: {
    scale: number;
    rotation: number;
    position: { x: number; y: number };
  };
  confidence: number;
}

export function useVirtualTryOn() {
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<TryOnResult | null>(null);

  const cld = new Cloudinary({
    cloud: {
      cloudName: CLOUDINARY_CONFIG.cloudName
    }
  });

  const applyVirtualTryOn = useCallback(async (
    faceImage: string,
    productImage: string,
    landmarks: any
  ) => {
    setProcessing(true);
    try {
      // Create a transformation for the product overlay
      const transformation = new Transformation()
        .effect(Effect.overlay(productImage))
        .effect(Effect.position({
          x: landmarks.boundingBox.xCenter,
          y: landmarks.boundingBox.yCenter,
          gravity: "faces"
        }))
        .effect(Effect.scale(landmarks.boundingBox.width))
        .effect(Effect.angle(landmarks.rotation.angle));

      // Apply the transformation to the face image
      const overlayUrl = cld.image(faceImage)
        .addTransformation(transformation)
        .toURL();

      setResult({
        overlayUrl,
        fit: {
          scale: landmarks.boundingBox.width,
          rotation: landmarks.rotation.angle,
          position: {
            x: landmarks.boundingBox.xCenter,
            y: landmarks.boundingBox.yCenter
          }
        },
        confidence: landmarks.detection.score
      });

      return result;
    } catch (error) {
      console.error('Virtual try-on failed:', error);
      throw error;
    } finally {
      setProcessing(false);
    }
  }, [cld]);

  return {
    applyVirtualTryOn,
    processing,
    result
  };
}