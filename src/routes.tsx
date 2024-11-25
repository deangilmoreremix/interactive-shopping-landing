import { RouteObject } from 'react-router-dom';
import VideoApp from './apps/VideoCatalog/VideoApp';
import ScannerApp from './apps/ProductScanner/ScannerApp';
import LiveApp from './apps/LiveShopping/LiveApp';
import TryOnApp from './apps/VirtualTryOn/TryOnApp';
import SocialApp from './apps/SocialShopping/SocialApp';
import VideoEditorApp from './apps/VideoEditor/VideoEditorApp';
import ImmersiveApp from './apps/ImmersiveVideo/ImmersiveApp';
import PersonalizationApp from './apps/Personalization/PersonalizationApp';
import ShoppableStoriesApp from './apps/ShoppableStories/StoriesApp';
import SeoManagerApp from './apps/SeoManager/SeoApp';

export const routes: RouteObject[] = [
  {
    path: '/video',
    element: <VideoApp />,
  },
  {
    path: '/scanner',
    element: <ScannerApp />,
  },
  {
    path: '/live',
    element: <LiveApp />,
  },
  {
    path: '/try-on',
    element: <TryOnApp />,
  },
  {
    path: '/social',
    element: <SocialApp />,
  },
  {
    path: '/editor',
    element: <VideoEditorApp />,
  },
  {
    path: '/immersive',
    element: <ImmersiveApp />,
  },
  {
    path: '/personalization',
    element: <PersonalizationApp />,
  },
  {
    path: '/stories',
    element: <ShoppableStoriesApp />,
  },
  {
    path: '/seo',
    element: <SeoManagerApp />,
  },
  {
    path: '/settings',
    element: <div>Settings</div>,
  },
  {
    path: '/support',
    element: <div>Help & Support</div>,
  },
];