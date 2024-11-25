import React from 'react';
import { Server, Shield, Zap, Globe } from 'lucide-react';

export default function TechSpecs() {
  const specs = [
    {
      icon: <Server className="text-indigo-600" size={24} />,
      title: 'Infrastructure',
      items: [
        'Global CDN distribution',
        'Auto-scaling architecture',
        '99.99% uptime SLA',
        'Multi-region deployment'
      ]
    },
    {
      icon: <Shield className="text-indigo-600" size={24} />,
      title: 'Security',
      items: [
        'End-to-end encryption',
        'DDoS protection',
        'SOC 2 Type II compliant',
        'GDPR compliant'
      ]
    },
    {
      icon: <Zap className="text-indigo-600" size={24} />,
      title: 'Performance',
      items: [
        'Adaptive bitrate streaming',
        'Low-latency delivery',
        'Automatic quality optimization',
        'Smart caching'
      ]
    },
    {
      icon: <Globe className="text-indigo-600" size={24} />,
      title: 'Integration',
      items: [
        'RESTful API',
        'WebSocket support',
        'SDK libraries',
        'Webhook events'
      ]
    }
  ];

  return (
    <div className="grid grid-cols-2 gap-8">
      {specs.map((spec) => (
        <div key={spec.title} className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            {spec.icon}
            <h3 className="text-lg font-semibold">{spec.title}</h3>
          </div>
          <ul className="space-y-2">
            {spec.items.map((item) => (
              <li key={item} className="flex items-center gap-2 text-gray-600">
                <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}