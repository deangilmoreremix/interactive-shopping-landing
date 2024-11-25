import React from 'react';
import { Code, Database, ShoppingCart, MessageSquare } from 'lucide-react';

export default function IntegrationShowcase() {
  const integrations = [
    {
      category: 'E-commerce Platforms',
      icon: <ShoppingCart className="text-indigo-600" size={24} />,
      platforms: [
        'Shopify',
        'WooCommerce',
        'Magento',
        'BigCommerce'
      ]
    },
    {
      category: 'CMS',
      icon: <Database className="text-indigo-600" size={24} />,
      platforms: [
        'WordPress',
        'Contentful',
        'Strapi',
        'Sanity'
      ]
    },
    {
      category: 'Development',
      icon: <Code className="text-indigo-600" size={24} />,
      platforms: [
        'React',
        'Vue',
        'Angular',
        'Next.js'
      ]
    },
    {
      category: 'Communication',
      icon: <MessageSquare className="text-indigo-600" size={24} />,
      platforms: [
        'Slack',
        'Discord',
        'Microsoft Teams',
        'Intercom'
      ]
    }
  ];

  return (
    <div className="grid grid-cols-2 gap-8">
      {integrations.map((integration) => (
        <div key={integration.category} className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            {integration.icon}
            <h3 className="text-lg font-semibold">{integration.category}</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {integration.platforms.map((platform) => (
              <div
                key={platform}
                className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg"
              >
                <span className="w-2 h-2 bg-indigo-600 rounded-full" />
                <span className="text-gray-700">{platform}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}