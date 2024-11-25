import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useSpring, animated } from 'react-spring';
import { useGesture } from 'react-use-gesture';

interface InteractiveFeatureProps {
  title: string;
  description: string;
  image: string;
  video?: string;
  features: string[];
  onInteract?: () => void;
}

export default function InteractiveFeature({
  title,
  description,
  image,
  video,
  features,
  onInteract
}: InteractiveFeatureProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [{ scale }, api] = useSpring(() => ({ scale: 1 }));

  const bind = useGesture({
    onHover: ({ hovering }) => {
      api.start({ scale: hovering ? 1.05 : 1 });
      if (hovering) onInteract?.();
    },
    onMove: ({ xy: [x, y] }) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const rotateX = (y - centerY) / 20;
      const rotateY = (x - centerX) / 20;

      gsap.to(containerRef.current, {
        rotateX: -rotateX,
        rotateY: rotateY,
        duration: 0.5,
        ease: 'power2.out'
      });
    }
  });

  useEffect(() => {
    if (!containerRef.current) return;

    gsap.fromTo(
      containerRef.current,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom-=100',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }, []);

  return (
    <animated.div
      ref={containerRef}
      {...bind()}
      style={{
        scale,
        perspective: 1000,
        transformStyle: 'preserve-3d'
      }}
      className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer"
    >
      <div className="relative aspect-video">
        {video ? (
          <video
            src={video}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
        ) : (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
          <p className="text-white/90">{description}</p>
        </div>
      </div>

      <div className="p-6">
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li
              key={index}
              className="flex items-center gap-3 text-gray-700"
            >
              <span className="w-2 h-2 bg-indigo-600 rounded-full" />
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </animated.div>
  );
}