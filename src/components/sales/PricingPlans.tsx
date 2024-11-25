import React from 'react';
import { Check } from 'lucide-react';

export default function PricingPlans() {
  const plans = [
    {
      name: 'Starter',
      price: 49,
      description: 'Perfect for small businesses getting started with video commerce',
      features: [
        'Up to 100 videos',
        'Basic analytics',
        'Standard support',
        '720p streaming',
        '5 team members'
      ]
    },
    {
      name: 'Professional',
      price: 149,
      description: 'Advanced features for growing businesses',
      features: [
        'Unlimited videos',
        'Advanced analytics',
        'Priority support',
        '1080p streaming',
        'Unlimited team members',
        'Custom branding',
        'API access'
      ],
      popular: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'Custom solutions for large organizations',
      features: [
        'Everything in Professional',
        'Dedicated support',
        'Custom integrations',
        '4K streaming',
        'SLA guarantee',
        'Advanced security',
        'Custom development'
      ]
    }
  ];

  return (
    <div className="grid grid-cols-3 gap-8">
      {plans.map((plan) => (
        <div
          key={plan.name}
          className={`relative bg-white rounded-lg shadow-sm p-6 ${
            plan.popular ? 'ring-2 ring-indigo-600' : ''
          }`}
        >
          {plan.popular && (
            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
              <span className="bg-indigo-600 text-white px-3 py-1 rounded-full text-sm">
                Most Popular
              </span>
            </div>
          )}

          <div className="text-center mb-6">
            <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
            <div className="text-3xl font-bold mb-2">
              {typeof plan.price === 'number' ? (
                <>
                  ${plan.price}
                  <span className="text-gray-500 text-base font-normal">/mo</span>
                </>
              ) : (
                plan.price
              )}
            </div>
            <p className="text-gray-600 text-sm">{plan.description}</p>
          </div>

          <ul className="space-y-3 mb-6">
            {plan.features.map((feature) => (
              <li key={feature} className="flex items-center gap-2 text-sm">
                <Check size={16} className="text-green-500" />
                {feature}
              </li>
            ))}
          </ul>

          <button
            className={`w-full py-2 rounded-lg ${
              plan.popular
                ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }`}
          >
            {plan.name === 'Enterprise' ? 'Contact Sales' : 'Get Started'}
          </button>
        </div>
      ))}
    </div>
  );
}