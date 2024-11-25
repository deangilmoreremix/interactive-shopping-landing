import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowRight, 
  ChevronDown,
  Play,
  Box,
  Video,
  Glasses,
  Users,
  Scissors,
  Target,
  BookOpen,
  Search,
  Settings
} from 'lucide-react';

export default function SalesHeader() {
  const location = useLocation();
  const isAppView = !location.pathname.includes('/sales');
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const menuItems = {
    features: [
      { icon: <Play size={16} />, label: 'Video Catalog', path: '/video' },
      { icon: <Box size={16} />, label: '360° Experience', path: '/immersive' },
      { icon: <Video size={16} />, label: 'Live Shopping', path: '/live' },
      { icon: <Glasses size={16} />, label: 'Virtual Try-On', path: '/try-on' },
      { icon: <Users size={16} />, label: 'Social Shopping', path: '/social' },
      { icon: <Scissors size={16} />, label: 'Video Editor', path: '/editor' },
      { icon: <Target size={16} />, label: 'Personalization', path: '/personalization' },
      { icon: <BookOpen size={16} />, label: 'Stories', path: '/stories' },
      { icon: <Search size={16} />, label: 'SEO Manager', path: '/seo' }
    ],
    solutions: [
      { label: 'Enterprise', description: 'Custom solutions for large organizations' },
      { label: 'E-commerce', description: 'Integrated shopping experiences' },
      { label: 'Retail', description: 'In-store digital solutions' },
      { label: 'Media', description: 'Content monetization tools' }
    ],
    resources: [
      { label: 'Documentation', path: '/sales/docs' },
      { label: 'API Reference', path: '/sales/api' },
      { label: 'Case Studies', path: '/sales/cases' },
      { label: 'Blog', path: '/sales/blog' }
    ]
  };

  return (
    <header className="bg-white border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <Sparkles className="text-indigo-600" size={24} />
              <span className="text-xl font-bold">Video Commerce Suite</span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            {/* Features Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setActiveDropdown('features')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center gap-1 text-gray-600 hover:text-gray-900">
                Features
                <ChevronDown size={16} />
              </button>
              {activeDropdown === 'features' && (
                <div className="absolute top-full left-0 w-64 bg-white rounded-lg shadow-lg border mt-1 py-2 grid grid-cols-1 gap-1">
                  {menuItems.features.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 text-gray-700 hover:text-indigo-600"
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Solutions Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setActiveDropdown('solutions')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center gap-1 text-gray-600 hover:text-gray-900">
                Solutions
                <ChevronDown size={16} />
              </button>
              {activeDropdown === 'solutions' && (
                <div className="absolute top-full left-0 w-80 bg-white rounded-lg shadow-lg border mt-1 p-4">
                  {menuItems.solutions.map((item) => (
                    <div key={item.label} className="mb-4 last:mb-0">
                      <h3 className="font-medium text-gray-900 mb-1">{item.label}</h3>
                      <p className="text-sm text-gray-500">{item.description}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Resources Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setActiveDropdown('resources')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center gap-1 text-gray-600 hover:text-gray-900">
                Resources
                <ChevronDown size={16} />
              </button>
              {activeDropdown === 'resources' && (
                <div className="absolute top-full left-0 w-48 bg-white rounded-lg shadow-lg border mt-1 py-2">
                  {menuItems.resources.map((item) => (
                    <Link
                      key={item.label}
                      to={item.path}
                      className="block px-4 py-2 hover:bg-gray-50 text-gray-700 hover:text-indigo-600"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link to="/sales/pricing" className="text-gray-600 hover:text-gray-900">
              Pricing
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            {isAppView ? (
              <Link 
                to="/sales"
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
              >
                View Sales Page
                <ArrowRight size={16} />
              </Link>
            ) : (
              <Link 
                to="/"
                className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
              >
                Open App
                <ArrowRight size={16} />
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}