import { useCallback, useRef } from 'react';
import * as tf from '@tensorflow/tfjs';
import { Cloudinary } from "@cloudinary/url-gen";
import { Effect } from "@cloudinary/url-gen/actions/effect";
import { Transformation } from "@cloudinary/url-gen";

interface ProcessingOptions {
  stabilization?: boolean;
  noiseReduction?: boolean;
  colorCorrection?: boolean;
  frameInterpolation?: boolean;
  hdrToneMapping?: boolean;
}

export function useVideoProcessor() {
  const processorRef = useRef<any>(null);

  const initializeProcessor = useCallback(async () => {
    await tf.ready();
    // Initialize TensorFlow.js models
    const models = {
      stabilization: await tf.loadGraphModel('/models/stabilization'),
      colorCorrection: await tf.loadGraphModel('/models/color-correction'),
      noiseReduction: await tf.loadGraphModel('/models/noise-reduction')
    };
    processorRef.current = models;
  }, []);

  const processFrame = useCallback(async (
    frame: ImageData,
    options: ProcessingOptions
  ) => {
    const tensor = tf.browser.fromPixels(frame);
    let processed = tensor;

    if (options.stabilization && processorRef.current?.stabilization) {
      processed = await processorRef.current.stabilization.predict(processed);
    }

    if (options.noiseReduction && processorRef.current?.noiseReduction) {
      processed = await processorRef.current.noiseReduction.predict(processed);
    }

    if (options.colorCorrection && processorRef.current?.colorCorrection) {
      processed = await processorRef.current.colorCorrection.predict(processed);
    }

    const processedFrame = await tf.browser.toPixels(processed);
    tensor.dispose();
    processed.dispose();

    return processedFrame;
  }, []);

  const applyEffect = useCallback(async (
    videoElement: HTMLVideoElement,
    effect: string,
    params: any
  ) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = videoElement.videoWidth;
    canvas.height = videoElement.videoHeight;

    // Process each frame
    const processFrames = async () => {
      if (videoElement.paused || videoElement.ended) return;

      ctx.drawImage(videoElement, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      
      const processedData = await processFrame(imageData, {
        stabilization: true,
        noiseReduction: true,
        colorCorrection: true
      });

      ctx.putImageData(new ImageData(processedData, canvas.width, canvas.height), 0, 0);
      requestAnimationFrame(processFrames);
    };

    return processFrames();
  }, [processFrame]);

  const applyChromaKey = useCallback(async (
    videoElement: HTMLVideoElement,
    background: string,
    options: {
      color: string;
      similarity: number;
      smoothness: number;
    }
  ) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = videoElement.videoWidth;
    canvas.height = videoElement.videoHeight;

    const backgroundImage = new Image();
    backgroundImage.src = background;
    await backgroundImage.decode();

    const processFrame = () => {
      if (videoElement.paused || videoElement.ended) return;

      ctx.drawImage(videoElement, 0, 0);
      const frame = ctx.getImageData(0, 0, canvas.width, canvas.height);
      
      // Apply chroma key effect
      for (let i = 0; i < frame.data.length; i += 4) {
        const r = frame.data[i];
        const g = frame.data[i + 1];
        const b = frame.data[i + 2];

        // Check if pixel matches the chroma key color
        if (isChromaKeyColor(r, g, b, options)) {
          // Make pixel transparent
          frame.data[i + 3] = 0;
        }
      }

      // Draw background
      ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
      ctx.putImageData(frame, 0, 0);

      requestAnimationFrame(processFrame);
    };

    return processFrame();
  }, []);

  const isChromaKeyColor = (r: number, g: number, b: number, options: any) => {
    const targetColor = hexToRgb(options.color);
    if (!targetColor) return false;

    const distance = Math.sqrt(
      Math.pow(r - targetColor.r, 2) +
      Math.pow(g - targetColor.g, 2) +
      Math.pow(b - targetColor.b, 2)
    );

    return distance < options.similarity;
  };

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  return {
    initializeProcessor,
    processFrame,
    applyEffect,
    applyChromaKey
  };
}