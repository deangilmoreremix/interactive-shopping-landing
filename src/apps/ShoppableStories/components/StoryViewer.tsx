import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, ShoppingBag } from 'lucide-react';
import { Cloudinary } from "@cloudinary/url-gen";
import { CLOUDINARY_CONFIG } from '../../../config/cloudinary';
import { fill } from "@cloudinary/url-gen/actions/resize";
import { autoGravity } from "@cloudinary/url-gen/qualifiers/gravity";

interface StoryViewerProps {
  story: any;
  onClose: () => void;
}

export default function StoryViewer({ story, onClose }: StoryViewerProps) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  // Initialize Cloudinary
  const cld = new Cloudinary({
    cloud: {
      cloudName: CLOUDINARY_CONFIG.cloudName
    }
  });

  useEffect(() => {
    const duration = story.slides[currentSlideIndex].duration * 1000;
    const interval = 100;
    const steps = duration / interval;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      setProgress((currentStep / steps) * 100);

      if (currentStep >= steps) {
        if (currentSlideIndex < story.slides.length - 1) {
          setCurrentSlideIndex(prev => prev + 1);
          setProgress(0);
          currentStep = 0;
        } else {
          clearInterval(timer);
          onClose();
        }
      }
    }, interval);

    return () => clearInterval(timer);
  }, [currentSlideIndex, story.slides, onClose]);

  const currentSlide = story.slides[currentSlideIndex];

  const optimizedMedia = currentSlide.type === 'image'
    ? cld.image(currentSlide.mediaId)
        .resize(fill().width(1080).height(1920).gravity(autoGravity()))
        .format('auto')
        .quality('auto')
    : cld.video(currentSlide.mediaId)
        .resize(fill().width(1080).height(1920).gravity(autoGravity()))
        .format('auto')
        .quality('auto');

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
      >
        <X size={24} />
      </button>

      {/* Progress Bars */}
      <div className="absolute top-4 left-4 right-4 flex gap-1">
        {story.slides.map((slide: any, index: number) => (
          <div
            key={slide.id}
            className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden"
          >
            <div
              className="h-full bg-white transition-all duration-100"
              style={{
                width: index === currentSlideIndex ? `${progress}%` : 
                      index < currentSlideIndex ? '100%' : '0%'
              }}
            />
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={() => setCurrentSlideIndex(prev => Math.max(0, prev - 1))}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300"
        disabled={currentSlideIndex === 0}
      >
        <ChevronLeft size={32} />
      </button>

      <button
        onClick={() => setCurrentSlideIndex(prev => Math.min(story.slides.length - 1, prev + 1))}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300"
        disabled={currentSlideIndex === story.slides.length - 1}
      >
        <ChevronRight size={32} />
      </button>

      {/* Media Content */}
      <div className="relative w-full max-w-lg aspect-[9/16] bg-black">
        {currentSlide.type === 'image' ? (
          <img
            src={optimizedMedia.toURL()}
            alt={story.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <video
            src={optimizedMedia.toURL()}
            className="w-full h-full object-cover"
            autoPlay
            muted
            playsInline
          />
        )}

        {/* Product Tags */}
        {currentSlide.products?.map((product: any) => (
          <button
            key={product.id}
            className="absolute bg-white/90 text-gray-800 px-3 py-1.5 rounded-full flex items-center gap-2 hover:bg-white transform -translate-x-1/2 -translate-y-1/2"
            style={{
              left: `${product.position.x}%`,
              top: `${product.position.y}%`
            }}
          >
            <ShoppingBag size={16} />
            <span className="text-sm">${product.price}</span>
          </button>
        ))}
      </div>
    </div>
  );
}