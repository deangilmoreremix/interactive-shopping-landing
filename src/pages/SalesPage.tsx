import React, { useState } from 'react';
import SalesHeader from '../components/SalesHeader';
import FeatureDemo from '../components/sales/FeatureDemo';
import PricingPlans from '../components/sales/PricingPlans';
import ROICalculator from '../components/sales/ROICalculator';
import TestimonialSlider from '../components/sales/TestimonialSlider';
import TechSpecs from '../components/sales/TechSpecs';
import CaseStudies from '../components/sales/CaseStudies';
import IntegrationShowcase from '../components/sales/IntegrationShowcase';
import InteractiveFeature from '../components/sales/InteractiveFeature';
import AnimatedStats from '../components/sales/AnimatedStats';

export default function SalesPage() {
  const [activeDemo, setActiveDemo] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gray-50">
      <SalesHeader />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-indigo-600 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold mb-6">
                Transform Your Video Commerce Experience
              </h1>
              <p className="text-xl mb-8">
                Engage customers with interactive videos, live shopping, and immersive experiences.
              </p>
              <div className="flex gap-4">
                <button className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100">
                  Get Started
                </button>
                <button className="border border-white px-6 py-3 rounded-lg font-medium hover:bg-white/10">
                  Watch Demo
                </button>
              </div>
            </div>
            <FeatureDemo activeDemo={activeDemo} setActiveDemo={setActiveDemo} />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Proven Results</h2>
          <AnimatedStats />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Complete Video Commerce Solution</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to create engaging, shoppable video experiences that convert.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8">
            <InteractiveFeature
              title="Interactive Video Catalog"
              description="Create engaging shoppable videos with interactive hotspots and real-time analytics"
              image="https://images.unsplash.com/photo-1523275335684-37898b6baf30"
              video="https://res.cloudinary.com/demo/video/upload/v1/samples/ecommerce/fashion-show"
              features={[
                'Product tagging with live pricing',
                'Interactive overlays and CTAs',
                'Advanced analytics tracking',
                'Custom branding options'
              ]}
            />
            <InteractiveFeature
              title="Immersive 360° Experience"
              description="Give customers a complete view with interactive 360° product visualization"
              image="https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
              features={[
                'Interactive 360° product views',
                'Hotspot navigation system',
                'Virtual room staging',
                'Detailed product annotations'
              ]}
            />
            <InteractiveFeature
              title="Live Shopping Studio"
              description="Host interactive live shopping sessions with real-time engagement"
              image="https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc"
              features={[
                'Real-time product showcasing',
                'Live chat and Q&A',
                'Interactive polls and quizzes',
                'Multi-host streaming support'
              ]}
            />
            <InteractiveFeature
              title="Virtual Try-On"
              description="Let customers virtually try products before purchase"
              image="https://images.unsplash.com/photo-1576566588028-4147f3842f27"
              features={[
                'AR-powered try-on experience',
                'Real-time size recommendations',
                'Multi-angle visualization',
                'Social sharing integration'
              ]}
            />
            <InteractiveFeature
              title="Social Shopping Hub"
              description="Transform UGC into shoppable content"
              image="https://images.unsplash.com/photo-1611162617474-5b21e879e113"
              features={[
                'UGC content curation',
                'Automated product tagging',
                'Influencer collaboration tools',
                'Social media integration'
              ]}
            />
            <InteractiveFeature
              title="Video Editor Suite"
              description="Professional video editing tools for creating engaging content"
              image="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d"
              features={[
                'AI-powered editing tools',
                'Custom overlay templates',
                'Brand asset management',
                'Batch video processing'
              ]}
            />
            <InteractiveFeature
              title="Personalization Engine"
              description="Deliver personalized video content based on user behavior"
              image="https://images.unsplash.com/photo-1460925895917-afdab827c52f"
              features={[
                'AI-driven recommendations',
                'Dynamic content adaptation',
                'Behavioral targeting',
                'A/B testing capabilities'
              ]}
            />
            <InteractiveFeature
              title="Shoppable Stories"
              description="Create engaging, mobile-first shopping experiences"
              image="https://images.unsplash.com/photo-1512428559087-560fa5ceab42"
              features={[
                'Interactive story creation',
                'Product tag animations',
                'Mobile-optimized design',
                'Analytics dashboard'
              ]}
            />
            <InteractiveFeature
              title="SEO Manager"
              description="Optimize your video content for maximum visibility"
              image="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d"
              features={[
                'Automated video SEO',
                'Rich snippet generation',
                'Video sitemap creation',
                'Performance analytics'
              ]}
            />
            <InteractiveFeature
              title="FashionistaAI"
              description="AI-powered fashion recommendations and style analysis"
              image="https://images.unsplash.com/photo-1445205170230-053b83016050"
              features={[
                'Style trend prediction',
                'Outfit recommendations',
                'Visual search capability',
                'Personal stylist AI'
              ]}
            />
            <InteractiveFeature
              title="Product Scanner"
              description="Advanced product recognition and information retrieval"
              image="https://images.unsplash.com/photo-1512756290469-ec264b7fbf87"
              features={[
                'Real-time product detection',
                'Barcode & QR scanning',
                'Size estimation',
                'Similar product matching'
              ]}
            />
            <InteractiveFeature
              title="Analytics Dashboard"
              description="Comprehensive insights and performance metrics"
              image="https://images.unsplash.com/photo-1551288049-bebda4e38f71"
              features={[
                'Real-time engagement tracking',
                'Conversion analytics',
                'User behavior analysis',
                'Custom report generation'
              ]}
            />
          </div>
        </div>
      </section>

      {/* Technical Specs */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Technical Specifications</h2>
          <TechSpecs />
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Success Stories</h2>
          <CaseStudies />
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Customers Say</h2>
          <TestimonialSlider />
        </div>
      </section>

      {/* ROI Calculator */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Calculate Your ROI</h2>
          <ROICalculator />
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Pricing Plans</h2>
          <PricingPlans />
        </div>
      </section>

      {/* Integrations */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Integrations</h2>
          <IntegrationShowcase />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-indigo-600 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Business?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of businesses already using our video commerce platform to increase engagement and drive sales.
          </p>
          <button className="bg-white text-indigo-600 px-8 py-4 rounded-lg font-medium hover:bg-gray-100">
            Start Free Trial
          </button>
        </div>
      </section>
    </div>
  );
}