import { Cloudinary } from "@cloudinary/url-gen";

export const CLOUDINARY_CONFIG = {
  cloudName: 'demo',
  uploadConfig: {
    uploadPreset: 'ml_default',
    maxFileSize: 100000000, // 100MB
    sources: ['local', 'url', 'camera'],
    multiple: false,
    resourceType: 'auto'
  },
  playerConfig: {
    fluid: true,
    controls: true,
    preload: 'auto',
    muted: true,
    sourceTypes: ['mp4'],
    transformation: {
      quality: 'auto',
      fetch_format: 'auto'
    }
  }
} as const;

// Create and export the Cloudinary instance
export const cloudinaryInstance = new Cloudinary({
  cloud: {
    cloudName: CLOUDINARY_CONFIG.cloudName
  },
  url: {
    secure: true
  }
});