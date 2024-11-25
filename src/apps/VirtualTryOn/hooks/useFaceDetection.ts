import { useEffect, useRef, useState } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as faceLandmarksDetection from '@tensorflow-models/face-landmarks-detection';
import '@mediapipe/face_mesh';

export function useFaceDetection() {
  const [model, setModel] = useState<faceLandmarksDetection.FaceLandmarksDetector | null>(null);
  const [landmarks, setLandmarks] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadModel() {
      try {
        await tf.ready();
        const model = await faceLandmarksDetection.load(
          faceLandmarksDetection.SupportedPackages.mediapipeFacemesh,
          { maxFaces: 1 }
        );
        setModel(model);
        setLoading(false);
      } catch (err) {
        setError('Failed to load face detection model');
        setLoading(false);
      }
    }
    loadModel();
  }, []);

  const detectFace = async (video: HTMLVideoElement) => {
    if (!model) return null;

    try {
      const predictions = await model.estimateFaces({
        input: video,
        returnTensors: false,
        flipHorizontal: false,
        predictIrises: true
      });

      if (predictions.length > 0) {
        setLandmarks(predictions[0]);
        return predictions[0];
      }
      return null;
    } catch (err) {
      setError('Face detection failed');
      return null;
    }
  };

  return {
    detectFace,
    landmarks,
    loading,
    error
  };
}