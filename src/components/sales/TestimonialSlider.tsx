import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

export default function TestimonialSlider() {
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Head of E-commerce',
      company: 'Fashion Co.',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
      content: 'The video commerce platform has transformed how we showcase our products. Our engagement rates have increased by 200% since implementation.',
      rating: 5
    },
    {
      name: 'Michael Chen',
      role: 'Digital Marketing Director',
      company: 'Tech Innovations',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
      content: 'The personalization features and analytics have helped us better understand our customers and increase conversions significantly.',
      rating: 5
    },
    {
      name: 'Emily Rodriguez',
      role: 'Product Manager',
      company: 'Retail Plus',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
      content: 'The 360° product views and virtual try-on features have reduced our return rates by 45%. Our customers love the immersive experience.',
      rating: 5
    }
  ];

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="relative max-w-3xl mx-auto">
      <div className="relative bg-white rounded-lg shadow-sm p-8">
        <div className="flex items-center gap-6 mb-6">
          <img
            src={testimonials[activeIndex].image}
            alt={testimonials[activeIndex].name}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
            <h3 className="font-semibold">{testimonials[activeIndex].name}</h3>
            <p className="text-gray-600">
              {testimonials[activeIndex].role} at {testimonials[activeIndex].company}
            </p>
            <div className="flex items-center gap-1 mt-1">
              {Array.from({ length: testimonials[activeIndex].rating }).map((_, i) => (
                <Star key={i} size={16} className="text-yellow-400 fill-current" />
              ))}
            </div>
          </div>
        </div>

        <blockquote className="text-lg text-gray-700 italic">
          "{testimonials[activeIndex].content}"
        </blockquote>
      </div>

      <div className="absolute top-1/2 -translate-y-1/2 -left-4">
        <button
          onClick={prevTestimonial}
          className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50"
        >
          <ChevronLeft size={24} />
        </button>
      </div>

      <div className="absolute top-1/2 -translate-y-1/2 -right-4">
        <button
          onClick={nextTestimonial}
          className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
}