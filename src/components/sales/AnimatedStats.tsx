import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TrendingUp, Users, ShoppingCart, Clock, BarChart2, Target } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Stat {
  label: string;
  value: number;
  suffix: string;
  color: string;
  icon: React.ReactNode;
  description: string;
}

export default function AnimatedStats() {
  const containerRef = useRef<HTMLDivElement>(null);

  const stats: Stat[] = [
    {
      label: 'Increased Engagement',
      value: 200,
      suffix: '%',
      color: 'bg-gradient-to-br from-green-400 to-green-600',
      icon: <TrendingUp className="text-green-400" size={24} />,
      description: 'Average increase in customer engagement with interactive videos'
    },
    {
      label: 'Higher Conversion',
      value: 45,
      suffix: '%',
      color: 'bg-gradient-to-br from-blue-400 to-blue-600',
      icon: <ShoppingCart className="text-blue-400" size={24} />,
      description: 'Boost in conversion rates through personalized experiences'
    },
    {
      label: 'Revenue Growth',
      value: 150,
      suffix: '%',
      color: 'bg-gradient-to-br from-purple-400 to-purple-600',
      icon: <BarChart2 className="text-purple-400" size={24} />,
      description: 'Average revenue increase for businesses using our platform'
    },
    {
      label: 'User Retention',
      value: 85,
      suffix: '%',
      color: 'bg-gradient-to-br from-pink-400 to-pink-600',
      icon: <Users className="text-pink-400" size={24} />,
      description: 'Customer retention rate with interactive shopping experiences'
    },
    {
      label: 'Time Spent',
      value: 300,
      suffix: '%',
      color: 'bg-gradient-to-br from-orange-400 to-orange-600',
      icon: <Clock className="text-orange-400" size={24} />,
      description: 'Increase in average time spent engaging with content'
    },
    {
      label: 'ROI Improvement',
      value: 120,
      suffix: '%',
      color: 'bg-gradient-to-br from-indigo-400 to-indigo-600',
      icon: <Target className="text-indigo-400" size={24} />,
      description: 'Average return on investment improvement for our clients'
    }
  ];

  useEffect(() => {
    if (!containerRef.current) return;

    const counters = containerRef.current.querySelectorAll('.counter');
    const cards = containerRef.current.querySelectorAll('.stat-card');

    // Animate numbers
    counters.forEach((counter, index) => {
      const stat = stats[index];
      
      gsap.fromTo(
        counter,
        { innerText: '0' },
        {
          innerText: stat.value,
          duration: 2,
          snap: { innerText: 1 },
          scrollTrigger: {
            trigger: counter,
            start: 'top bottom-=100',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

    // Animate cards
    gsap.fromTo(
      cards,
      { 
        y: 100,
        opacity: 0,
        scale: 0.8
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "back.out(1.2)",
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom-=100',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }, []);

  return (
    <div ref={containerRef}>
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">Transforming E-commerce Success</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Our platform delivers measurable results that drive growth and engagement across all key metrics
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`stat-card bg-white rounded-xl shadow-xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl`}
          >
            <div className={`p-6 ${stat.color} text-white`}>
              <div className="flex items-center justify-between mb-4">
                {stat.icon}
                <span className="text-3xl font-bold">
                  <span className="counter">{stat.value}</span>
                  {stat.suffix}
                </span>
              </div>
              <h3 className="text-lg font-semibold mb-2">{stat.label}</h3>
              <div className="h-px bg-white/20 my-4"></div>
              <p className="text-sm opacity-90">{stat.description}</p>
            </div>
            <div className="px-6 py-4 bg-gradient-to-br from-white to-gray-50">
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>Previous</span>
                <span>Current</span>
              </div>
              <div className="relative h-2 bg-gray-200 rounded-full mt-2 overflow-hidden">
                <div 
                  className={`absolute left-0 top-0 h-full rounded-full ${stat.color}`}
                  style={{ width: `${stat.value/3}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 text-center">
        <p className="text-gray-600 mb-6">
          Join thousands of businesses that have transformed their online presence
        </p>
        <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-lg font-medium hover:from-indigo-700 hover:to-purple-700 transform transition-all duration-300 hover:scale-105">
          See How It Works
        </button>
      </div>
    </div>
  );
}