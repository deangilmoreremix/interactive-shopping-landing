import { useState, useCallback } from 'react';
import * as poseDetection from '@tensorflow-models/pose-detection';
import '@mediapipe/pose';

export function useSizeEstimation() {
  const [measurements, setMeasurements] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const estimateSize = useCallback(async (video: HTMLVideoElement) => {
    setLoading(true);
    try {
      const detector = await poseDetection.createDetector(
        poseDetection.SupportedModels.MoveNet
      );

      const poses = await detector.estimatePoses(video);

      if (poses.length > 0) {
        const pose = poses[0];
        
        // Calculate body measurements using keypoints
        const measurements = calculateMeasurements(pose.keypoints);
        setMeasurements(measurements);
        return measurements;
      }
      return null;
    } catch (error) {
      console.error('Size estimation failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const calculateMeasurements = (keypoints: any[]) => {
    // Calculate various body measurements using keypoint positions
    const shoulders = calculateDistance(
      keypoints[5], // leftShoulder
      keypoints[6]  // rightShoulder
    );

    const chest = calculateDistance(
      keypoints[11], // leftHip
      keypoints[12]  // rightHip
    ) * 1.1; // Approximate chest measurement

    const waist = calculateDistance(
      keypoints[11], // leftHip
      keypoints[12]  // rightHip
    );

    const height = calculateDistance(
      keypoints[0],  // nose
      keypoints[16]  // rightAnkle
    );

    return {
      shoulders,
      chest,
      waist,
      height,
      unit: 'cm',
      confidence: calculateConfidence(keypoints)
    };
  };

  const calculateDistance = (point1: any, point2: any) => {
    return Math.sqrt(
      Math.pow(point2.x - point1.x, 2) + 
      Math.pow(point2.y - point1.y, 2)
    );
  };

  const calculateConfidence = (keypoints: any[]) => {
    const scores = keypoints.map(kp => kp.score);
    return scores.reduce((a, b) => a + b) / scores.length;
  };

  return {
    estimateSize,
    measurements,
    loading
  };
}