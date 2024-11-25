import { useCallback } from 'react';
import { Cloudinary } from "@cloudinary/url-gen";
import { CLOUDINARY_CONFIG } from '../../../config/cloudinary';
import { Effect } from "@cloudinary/url-gen/actions/effect";
import { Transformation } from "@cloudinary/url-gen";

interface PersonalizationOptions {
  colorEffect?: string;
  textOverlay?: {
    text: string;
    font?: string;
    size?: number;
    color?: string;
    position?: string;
  };
  imageOverlay?: {
    publicId: string;
    position?: string;
    blendMode?: string;
  };
  videoFilters?: {
    blur?: number;
    brightness?: number;
    contrast?: number;
    saturation?: number;
  };
  trim?: {
    startOffset: number;
    endOffset: number;
  };
}

export function usePersonalization() {
  const cld = new Cloudinary({
    cloud: {
      cloudName: CLOUDINARY_CONFIG.cloudName
    }
  });

  const applyPersonalization = useCallback((publicId: string, options: PersonalizationOptions) => {
    const transformation = new Transformation();

    // Add color effects
    if (options.colorEffect) {
      transformation.effect(Effect.artisticFilter(options.colorEffect));
    }

    // Add text overlay
    if (options.textOverlay) {
      transformation.overlay({
        text: options.textOverlay.text,
        font_family: options.textOverlay.font || 'Arial',
        font_size: options.textOverlay.size || 32,
        color: options.textOverlay.color || 'white',
        gravity: options.textOverlay.position || 'center'
      });
    }

    // Add image overlay
    if (options.imageOverlay) {
      transformation.overlay({
        publicId: options.imageOverlay.publicId,
        gravity: options.imageOverlay.position || 'center',
        blendMode: options.imageOverlay.blendMode
      });
    }

    // Add video filters
    if (options.videoFilters) {
      const { blur, brightness, contrast, saturation } = options.videoFilters;
      if (blur) transformation.effect(Effect.blur(blur));
      if (brightness) transformation.effect(Effect.brightness(brightness));
      if (contrast) transformation.effect(Effect.contrast(contrast));
      if (saturation) transformation.effect(Effect.saturation(saturation));
    }

    // Add trim
    if (options.trim) {
      transformation
        .offset([options.trim.startOffset, options.trim.endOffset]);
    }

    return cld.video(publicId).addTransformation(transformation);
  }, [cld]);

  const generateThumbnail = useCallback((publicId: string, options: { width?: number; height?: number } = {}) => {
    return cld.video(publicId)
      .resize({
        width: options.width || 640,
        height: options.height || 360,
        crop: 'fill'
      })
      .format('auto')
      .quality('auto')
      .toURL();
  }, [cld]);

  const generatePreview = useCallback((publicId: string, duration: number = 5) => {
    return cld.video(publicId)
      .resize({
        width: 640,
        height: 360,
        crop: 'fill'
      })
      .offset([0, duration])
      .format('gif')
      .quality('auto')
      .toURL();
  }, [cld]);

  return {
    applyPersonalization,
    generateThumbnail,
    generatePreview
  };
}