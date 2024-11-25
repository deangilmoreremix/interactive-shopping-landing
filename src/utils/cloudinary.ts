import { Cloudinary } from "@cloudinary/url-gen";
import { scale, fill, crop, thumbnail } from "@cloudinary/url-gen/actions/resize";
import { autoGravity, focusOn } from "@cloudinary/url-gen/qualifiers/gravity";
import { face } from "@cloudinary/url-gen/qualifiers/focusOn";
import { format, quality } from "@cloudinary/url-gen/actions/delivery";
import { auto } from "@cloudinary/url-gen/qualifiers/quality";
import { artisticFilter } from "@cloudinary/url-gen/actions/effect";
import { CLOUDINARY_CONFIG, cloudinaryInstance } from '../config/cloudinary';

export const cloudinary = cloudinaryInstance;

export const uploadConfig = {
  cloudName: CLOUDINARY_CONFIG.cloudName,
  uploadPreset: CLOUDINARY_CONFIG.uploadConfig.uploadPreset,
  maxFileSize: CLOUDINARY_CONFIG.uploadConfig.maxFileSize,
  sources: CLOUDINARY_CONFIG.uploadConfig.sources,
  multiple: CLOUDINARY_CONFIG.uploadConfig.multiple,
  resourceType: CLOUDINARY_CONFIG.uploadConfig.resourceType
};

export const createVideoPlayer = (element: HTMLVideoElement, publicId: string) => {
  return window.cloudinary.videoPlayer(element, {
    cloud_name: uploadConfig.cloudName,
    publicId,
    fluid: true,
    controls: true,
    preload: 'auto',
    muted: false,
    sourceTypes: ['hls', 'dash', 'mp4'],
    transformation: {
      quality: 'auto'
    }
  });
};

export const uploadToCloudinary = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', uploadConfig.uploadPreset);
  formData.append('cloud_name', uploadConfig.cloudName);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${uploadConfig.cloudName}/auto/upload`,
    {
      method: 'POST',
      body: formData
    }
  );

  return await response.json();
};

export const transformImage = (publicId: string, options: {
  width?: number;
  height?: number;
  crop?: 'scale' | 'fill' | 'thumb' | 'crop';
  focusOnFaces?: boolean;
  quality?: 'auto' | number;
  format?: 'auto' | string;
  effect?: string;
}) => {
  let transformation = cloudinary.image(publicId);

  // Apply resize transformation
  if (options.width || options.height) {
    switch (options.crop) {
      case 'scale':
        transformation.resize(scale().width(options.width).height(options.height));
        break;
      case 'fill':
        transformation.resize(fill().width(options.width).height(options.height));
        break;
      case 'thumb':
        transformation.resize(thumbnail().width(options.width).height(options.height));
        break;
      default:
        transformation.resize(crop().width(options.width).height(options.height));
    }
  }

  // Apply face detection if requested
  if (options.focusOnFaces) {
    transformation.gravity(focusOn(face()));
  } else {
    transformation.gravity(autoGravity());
  }

  // Set quality
  if (options.quality) {
    transformation.delivery(
      quality(options.quality === 'auto' ? auto() : options.quality)
    );
  }

  // Set format
  if (options.format) {
    transformation.delivery(
      format(options.format === 'auto' ? 'auto' : options.format)
    );
  }

  // Apply artistic filter if specified
  if (options.effect) {
    transformation.effect(artisticFilter(options.effect));
  }

  return transformation;
};

export const transformVideo = (publicId: string, options: {
  width?: number;
  height?: number;
  crop?: string;
  quality?: string;
  format?: string;
  effect?: string;
  streaming?: {
    profile?: string;
    bitRate?: string;
  };
}) => {
  let transformation = cloudinary.video(publicId);

  // Apply basic transformations
  if (options.width || options.height) {
    transformation.resize(
      crop().width(options.width).height(options.height)
    );
  }

  // Set quality and format
  if (options.quality) {
    transformation.delivery(quality(options.quality));
  }
  if (options.format) {
    transformation.delivery(format(options.format));
  }

  // Apply streaming optimizations
  if (options.streaming) {
    transformation
      .delivery(format('auto'))
      .delivery(quality('auto'));
  }

  return transformation;
};