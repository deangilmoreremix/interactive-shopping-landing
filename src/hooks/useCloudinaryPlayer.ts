import { useEffect, useRef, MutableRefObject } from 'react';
import { CLOUDINARY_CONFIG } from '../config/cloudinary';
import { Product } from '../types';

interface UseCloudinaryPlayerProps {
  publicId: string;
  videoRef: MutableRefObject<HTMLVideoElement | null>;
  products?: Product[];
  onProductClick?: (product: Product) => void;
}

export function useCloudinaryPlayer({
  publicId,
  videoRef,
  products = [],
  onProductClick
}: UseCloudinaryPlayerProps) {
  const playerRef = useRef<any>(null);

  useEffect(() => {
    if (!videoRef.current || !publicId || typeof window === 'undefined') return;

    const cld = (window as any).cloudinary;
    if (!cld) return;

    // Initialize player
    playerRef.current = cld.videoPlayer(videoRef.current, {
      cloud_name: CLOUDINARY_CONFIG.cloudName,
      publicId,
      ...CLOUDINARY_CONFIG.playerConfig
    });

    // Configure shoppable features
    playerRef.current.source(publicId, {
      shoppable: {
        ...CLOUDINARY_CONFIG.shoppableConfig,
        products: products.map(product => ({
          productId: product.id,
          productName: product.name,
          startTime: 0,
          endTime: 5,
          publicId: product.image,
          onClick: () => onProductClick?.(product)
        }))
      }
    });

    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
      }
    };
  }, [publicId, products, onProductClick]);

  return playerRef;
}