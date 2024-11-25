import { useState, useCallback } from 'react';
import { CLOUDINARY_CONFIG } from '../config/cloudinary';

interface UploadOptions {
  resourceType?: 'image' | 'video';
  onProgress?: (progress: number) => void;
}

export function useCloudinaryUpload() {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const upload = useCallback(async (file: File, options: UploadOptions = {}) => {
    const {
      resourceType = file.type.startsWith('image/') ? 'image' : 'video',
      onProgress
    } = options;

    setUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', CLOUDINARY_CONFIG.uploadConfig.uploadPreset);
      formData.append('cloud_name', CLOUDINARY_CONFIG.cloudName);

      const xhr = new XMLHttpRequest();
      
      const uploadPromise = new Promise((resolve, reject) => {
        xhr.open('POST', `https://api.cloudinary.com/v1_1/${CLOUDINARY_CONFIG.cloudName}/${resourceType}/upload`);

        xhr.upload.onprogress = (e) => {
          if (e.lengthComputable && onProgress) {
            const progress = Math.round((e.loaded * 100) / e.total);
            onProgress(progress);
          }
        };

        xhr.onload = () => {
          if (xhr.status === 200) {
            resolve(JSON.parse(xhr.response));
          } else {
            reject(new Error('Upload failed'));
          }
        };

        xhr.onerror = () => reject(new Error('Upload failed'));
        xhr.send(formData);
      });

      const result = await uploadPromise;
      return result;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Upload failed';
      setError(message);
      throw err;
    } finally {
      setUploading(false);
    }
  }, []);

  return {
    upload,
    uploading,
    error,
    setError
  };
};