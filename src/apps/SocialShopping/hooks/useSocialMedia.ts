import { useState, useCallback } from 'react';
import { Cloudinary } from "@cloudinary/url-gen";
import { CLOUDINARY_CONFIG } from '../../../config/cloudinary';

export function useSocialMedia() {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadMedia = useCallback(async (file: File) => {
    setIsUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', CLOUDINARY_CONFIG.uploadConfig.uploadPreset);
      formData.append('cloud_name', CLOUDINARY_CONFIG.cloudName);

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CONFIG.cloudName}/auto/upload`,
        {
          method: 'POST',
          body: formData
        }
      );

      const result = await response.json();
      
      if (result.error) {
        throw new Error(result.error.message);
      }

      return result;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Upload failed';
      setError(message);
      throw err;
    } finally {
      setIsUploading(false);
    }
  }, []);

  const generateSocialPreview = useCallback((publicId: string, options: {
    width?: number;
    height?: number;
    crop?: string;
    aspectRatio?: string;
    format?: string;
  } = {}) => {
    const cld = new Cloudinary({
      cloud: { cloudName: CLOUDINARY_CONFIG.cloudName }
    });

    const transformation = {
      width: options.width || 1200,
      height: options.height || 630,
      crop: options.crop || 'fill',
      aspectRatio: options.aspectRatio || '1.91:1',
      format: options.format || 'auto'
    };

    return cld.image(publicId).toURL();
  }, []);

  return {
    uploadMedia,
    generateSocialPreview,
    isUploading,
    error
  };
}