import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
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
  Settings,
  HelpCircle,
  Sparkles,
  ExternalLink
} from 'lucide-react';

const navItems = [
  { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/video', icon: Play, label: 'Video Catalog' },
  { path: '/scanner', icon: PackageSearch, label: 'Product Scanner' },
  { path: '/live', icon: Video, label: 'Live Shopping' },
  { path: '/try-on', icon: Glasses, label: 'Virtual Try-On' },
  { path: '/social', icon: Users, label: 'Social Shopping' },
  { path: '/editor', icon: Scissors, label: 'Video Editor' },
  { path: '/immersive', icon: Box, label: '360° Experience' },
  { path: '/personalization', icon: Target, label: 'Personalization' },
  { path: '/stories', icon: BookOpen, label: 'Stories' },
  { path: '/seo', icon: Search, label: 'SEO Manager' },
  { path: '/fashionista-ai', icon: Sparkles, label: 'FashionistaAI' },
];

const bottomNavItems = [
  { path: '/settings', icon: Settings, label: 'Settings' },
  { path: '/support', icon: HelpCircle, label: 'Help & Support' },
];

export default function Sidebar() {
  return (
    <div className="w-64 bg-white h-screen flex flex-col border-r">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-800">Video Shopping</h1>
          <NavLink
            to="/sales"
            className="flex items-center gap-1 text-indigo-600 hover:text-indigo-700"
          >
            <ExternalLink size={16} />
            <span className="text-sm">Sales</span>
          </NavLink>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto p-4">
        <div className="space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-indigo-50 text-indigo-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`
              }
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </div>
      </nav>

      <div className="p-4 border-t">
        <div className="space-y-1">
          {bottomNavItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-gray-100 text-gray-900'
                    : 'text-gray-600 hover:bg-gray-50'
                }`
              }
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </NavLink>
          ))}
          <NavLink
            to="/sales"
            className="flex items-center gap-3 px-4 py-2 rounded-lg text-indigo-600 hover:bg-indigo-50"
          >
            <ExternalLink size={20} />
            <span>View Sales Page</span>
          </NavLink>
        </div>
      </div>

      <div className="p-4 border-t">
        <div className="flex items-center gap-3">
          <img
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
            alt="Profile"
            className="w-8 h-8 rounded-full"
          />
          <div>
            <p className="text-sm font-medium text-gray-800">John Doe</p>
            <p className="text-xs text-gray-500">Admin</p>
          </div>
        </div>
      </div>
    </div>
  );
}