import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Play,
  PackageSearch,
  Video,
  Glasses,
  Users,
  Scissors,
  Box,
  Target,
  BookOpen,
  Search,
  Sparkles
} from 'lucide-react';

interface AppCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  metrics: Array<{ label: string; value: string }>;
  onClick: () => void;
}

const AppCard: React.FC<AppCardProps> = ({
  title,
  description,
  icon,
  metrics,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer"
    >
      <div className="flex items-center gap-3 mb-4">
        {icon}
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      </div>
      <p className="text-gray-600 mb-6">{description}</p>
      <div className="grid grid-cols-3 gap-4 pt-4 border-t">
        {metrics.map((metric, index) => (
          <div key={index}>
            <p className="text-sm text-gray-500">{metric.label}</p>
            <p className="text-lg font-semibold text-gray-900">{metric.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const apps = [
  {
    path: '/video',
    title: 'Video Catalog',
    description: 'Create interactive shoppable videos with product hotspots and analytics',
    icon: <Play className="text-indigo-600" size={24} />,
    metrics: [
      { label: 'Active Videos', value: '24' },
      { label: 'Total Views', value: '12.3K' },
      { label: 'CTR', value: '4.2%' },
    ]
  },
  {
    path: '/scanner',
    title: 'Product Scanner',
    description: 'Enable AR product visualization and scanning features',
    icon: <PackageSearch className="text-purple-600" size={24} />,
    metrics: [
      { label: 'Scans', value: '1.2K' },
      { label: 'Products', value: '156' },
      { label: 'Conversions', value: '89' },
    ]
  },
  {
    path: '/live',
    title: 'Live Shopping',
    description: 'Host interactive live shopping sessions with real-time analytics',
    icon: <Video className="text-red-600" size={24} />,
    metrics: [
      { label: 'Live Now', value: '3' },
      { label: 'Viewers', value: '842' },
      { label: 'Sales', value: '$2.4K' },
    ]
  },
  {
    path: '/try-on',
    title: 'Virtual Try-On',
    description: 'Let customers virtually try products before purchase',
    icon: <Glasses className="text-emerald-600" size={24} />,
    metrics: [
      { label: 'Try-Ons', value: '3.2K' },
      { label: 'Products', value: '89' },
      { label: 'Saves', value: '456' },
    ]
  },
  {
    path: '/social',
    title: 'Social Shopping',
    description: 'Enable social commerce with user-generated content',
    icon: <Users className="text-pink-600" size={24} />,
    metrics: [
      { label: 'Posts', value: '1.8K' },
      { label: 'Shares', value: '4.2K' },
      { label: 'Sales', value: '$8.9K' },
    ]
  },
  {
    path: '/editor',
    title: 'Video Editor',
    description: 'Professional video editing tools for creating engaging content',
    icon: <Scissors className="text-blue-600" size={24} />,
    metrics: [
      { label: 'Projects', value: '45' },
      { label: 'Exports', value: '128' },
      { label: 'Storage', value: '24GB' },
    ]
  },
  {
    path: '/immersive',
    title: '360° Experience',
    description: 'Create immersive shopping experiences with 360° views',
    icon: <Box className="text-violet-600" size={24} />,
    metrics: [
      { label: 'Scenes', value: '18' },
      { label: 'Views', value: '2.3K' },
      { label: 'Time', value: '4:25' },
    ]
  },
  {
    path: '/personalization',
    title: 'Personalization',
    description: 'Deliver personalized video content based on user segments',
    icon: <Target className="text-orange-600" size={24} />,
    metrics: [
      { label: 'Segments', value: '12' },
      { label: 'Rules', value: '24' },
      { label: 'CTR', value: '5.8%' },
    ]
  },
  {
    path: '/stories',
    title: 'Stories',
    description: 'Create engaging shoppable stories for your products',
    icon: <BookOpen className="text-teal-600" size={24} />,
    metrics: [
      { label: 'Stories', value: '34' },
      { label: 'Views', value: '5.6K' },
      { label: 'Sales', value: '$3.2K' },
    ]
  },
  {
    path: '/seo',
    title: 'SEO Manager',
    description: 'Optimize your video content for search engines',
    icon: <Search className="text-cyan-600" size={24} />,
    metrics: [
      { label: 'Rankings', value: '156' },
      { label: 'Traffic', value: '8.9K' },
      { label: 'CTR', value: '3.4%' },
    ]
  },
  {
    path: '/fashionista-ai',
    title: 'FashionistaAI',
    description: 'AI-powered fashion recommendations and style analysis',
    icon: <Sparkles className="text-purple-600" size={24} />,
    metrics: [
      { label: 'Analyses', value: '2.3K' },
      { label: 'Accuracy', value: '94%' },
      { label: 'Users', value: '1.2K' },
    ]
  }
];

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div>
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">Dashboard</h2>
            <div className="flex items-center gap-4">
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                New Project
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {apps.map((app) => (
            <AppCard
              key={app.path}
              title={app.title}
              description={app.description}
              icon={app.icon}
              metrics={app.metrics}
              onClick={() => navigate(app.path)}
            />
          ))}
        </div>
      </main>
    </div>
  );
}