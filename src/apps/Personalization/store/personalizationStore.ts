import { create } from 'zustand';

interface EngagementMetric {
  eventName: string;
  segmentId: string;
  timestamp: number;
  data: any;
}

interface PersonalizationStore {
  segments: Array<{
    id: string;
    name: string;
    conditions: string[];
    userCount: number;
    conversionRate: number;
    status: 'active' | 'inactive';
  }>;
  rules: Array<{
    id: string;
    name: string;
    segment: string;
    action: string;
    conditions: any[];
    status: 'active' | 'inactive';
    performance: number;
  }>;
  engagementMetrics: EngagementMetric[];
  addEngagementMetric: (metric: Omit<EngagementMetric, 'timestamp'>) => void;
  getSegmentMetrics: (segmentId: string) => {
    playCount: number;
    completionRate: number;
    avgWatchTime: number;
  };
}

export const usePersonalizationStore = create<PersonalizationStore>((set, get) => ({
  segments: [
    {
      id: '1',
      name: 'High-Value Customers',
      conditions: ['purchases', 'engagement'],
      userCount: 1250,
      conversionRate: 15.4,
      status: 'active'
    },
    {
      id: '2',
      name: 'Mobile Users',
      conditions: ['device', 'location'],
      userCount: 3420,
      conversionRate: 8.2,
      status: 'active'
    }
  ],
  rules: [
    {
      id: '1',
      name: 'Premium Content Access',
      segment: 'High-Value Customers',
      action: 'show_content',
      conditions: [{ overlayId: 'premium_overlay' }],
      status: 'active',
      performance: 24.8
    },
    {
      id: '2',
      name: 'Product Recommendations',
      segment: 'Mobile Users',
      action: 'recommend',
      conditions: [{ recommendedProducts: [] }],
      status: 'active',
      performance: 15.3
    }
  ],
  engagementMetrics: [],
  addEngagementMetric: (metric) =>
    set((state) => ({
      engagementMetrics: [
        ...state.engagementMetrics,
        { ...metric, timestamp: Date.now() }
      ]
    })),
  getSegmentMetrics: (segmentId) => {
    const state = get();
    const segmentMetrics = state.engagementMetrics.filter(
      (m) => m.segmentId === segmentId
    );

    const plays = segmentMetrics.filter((m) => m.eventName === 'play').length;
    const completes = segmentMetrics.filter((m) => m.eventName === 'complete').length;
    const progress = segmentMetrics.filter((m) => m.eventName === 'progress');

    return {
      playCount: plays,
      completionRate: plays ? (completes / plays) * 100 : 0,
      avgWatchTime: progress.reduce((acc, curr) => acc + curr.data.percent, 0) / progress.length || 0
    };
  }
}));