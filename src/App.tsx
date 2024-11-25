import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Sidebar from './components/Sidebar';
import VideoApp from './apps/VideoCatalog/VideoApp';
import ScannerApp from './apps/ProductScanner/ScannerApp';
import LiveApp from './apps/LiveShopping/LiveApp';
import TryOnApp from './apps/VirtualTryOn/TryOnApp';
import SocialApp from './apps/SocialShopping/SocialApp';
import VideoEditorApp from './apps/VideoEditor/VideoEditorApp';
import ImmersiveApp from './apps/ImmersiveVideo/ImmersiveApp';
import PersonalizationApp from './apps/Personalization/PersonalizationApp';
import StoriesApp from './apps/ShoppableStories/StoriesApp';
import SeoApp from './apps/SeoManager/SeoApp';
import FashionistaAIApp from './apps/FashionistaAI/FashionistaAIApp';
import SalesPage from './pages/SalesPage';

export default function App() {
  return (
    <Routes>
      <Route path="/sales/*" element={<SalesPage />} />
      <Route
        path="/*"
        element={
          <div className="min-h-screen bg-gray-100 flex">
            <Sidebar />
            <div className="flex-1">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/video" element={<VideoApp />} />
                <Route path="/scanner" element={<ScannerApp />} />
                <Route path="/live" element={<LiveApp />} />
                <Route path="/try-on" element={<TryOnApp />} />
                <Route path="/social" element={<SocialApp />} />
                <Route path="/editor" element={<VideoEditorApp />} />
                <Route path="/immersive" element={<ImmersiveApp />} />
                <Route path="/personalization" element={<PersonalizationApp />} />
                <Route path="/stories" element={<StoriesApp />} />
                <Route path="/seo" element={<SeoApp />} />
                <Route path="/fashionista-ai" element={<FashionistaAIApp />} />
              </Routes>
            </div>
          </div>
        }
      />
    </Routes>
  );
}