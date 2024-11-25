import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function CaseStudies() {
  const cases = [
    {
      company: 'Fashion Retailer',
      logo: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30',
      metrics: {
        engagement: '+150%',
        conversion: '+45%',
        retention: '+60%'
      },
      description: 'Leading fashion retailer increased customer engagement and sales through interactive shoppable videos and virtual try-ons.'
    },
    {
      company: 'Electronics Brand',
      logo: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
      metrics: {
        engagement: '+200%',
        conversion: '+35%',
        retention: '+40%'
      },
      description: 'Consumer electronics company improved product demonstrations with 360° views and interactive features.'
    },
    {
      company: 'Beauty Company',
      logo: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9',
      metrics: {
        engagement: '+180%',
        conversion: '+55%',
        retention: '+70%'
      },
      description: 'Beauty brand revolutionized customer experience with AR try-ons and personalized video content.'
    }
  ];

  return (
    <div className="grid grid-cols-3 gap-8">
      {cases.map((study) => (
        <div key={study.company} className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="aspect-video">
            <img
              src={study.logo}
              alt={study.company}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-2">{study.company}</h3>
            <p className="text-gray-600 mb-4">{study.description}</p>
            
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div>
                <div className="text-sm text-gray-500">Engagement</div>
                <div className="text-lg font-semibold text-green-600">
                  {study.metrics.engagement}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Conversion</div>
                <div className="text-lg font-semibold text-green-600">
                  {study.metrics.conversion}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Retention</div>
                <div className="text-lg font-semibold text-green-600">
                  {study.metrics.retention}
                </div>
              </div>
            </div>

            <button className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700">
              Read Case Study
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}