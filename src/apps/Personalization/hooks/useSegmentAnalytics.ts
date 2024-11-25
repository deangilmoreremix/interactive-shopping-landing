import { useCallback } from 'react';
import { usePersonalizationStore } from '../store/personalizationStore';

interface AnalyticsMetrics {
  views: number;
  completions: number;
  avgWatchTime: number;
  engagementRate: number;
  clickThroughRate: number;
}

interface SegmentPerformance {
  metrics: AnalyticsMetrics;
  trends: {
    daily: Array<{ date: string; value: number }>;
    weekly: Array<{ date: string; value: number }>;
    monthly: Array<{ date: string; value: number }>;
  };
  topContent: Array<{
    id: string;
    title: string;
    views: number;
    engagement: number;
  }>;
}

export function useSegmentAnalytics() {
  const { engagementMetrics, getSegmentMetrics } = usePersonalizationStore();

  const calculateMetrics = useCallback((segmentId: string): AnalyticsMetrics => {
    const metrics = getSegmentMetrics(segmentId);
    const segmentEvents = engagementMetrics.filter(m => m.segmentId === segmentId);

    const views = segmentEvents.filter(e => e.eventName === 'play').length;
    const completions = segmentEvents.filter(e => e.eventName === 'ended').length;
    const interactions = segmentEvents.filter(e => 
      ['click', 'seek', 'qualitychange'].includes(e.eventName)
    ).length;

    return {
      views,
      completions,
      avgWatchTime: metrics.avgWatchTime,
      engagementRate: views > 0 ? (interactions / views) * 100 : 0,
      clickThroughRate: views > 0 ? (completions / views) * 100 : 0
    };
  }, [engagementMetrics, getSegmentMetrics]);

  const getPerformanceData = useCallback((segmentId: string): SegmentPerformance => {
    const metrics = calculateMetrics(segmentId);
    const now = new Date();

    // Generate sample trend data
    const trends = {
      daily: Array.from({ length: 7 }, (_, i) => ({
        date: new Date(now.getTime() - i * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        value: Math.floor(Math.random() * 100)
      })).reverse(),
      weekly: Array.from({ length: 4 }, (_, i) => ({
        date: `Week ${i + 1}`,
        value: Math.floor(Math.random() * 400)
      })),
      monthly: Array.from({ length: 3 }, (_, i) => ({
        date: new Date(now.getFullYear(), now.getMonth() - i).toLocaleString('default', { month: 'short' }),
        value: Math.floor(Math.random() * 1200)
      })).reverse()
    };

    // Sample top content
    const topContent = [
      {
        id: '1',
        title: 'Product Overview',
        views: 1234,
        engagement: 78
      },
      {
        id: '2',
        title: 'Feature Demo',
        views: 987,
        engagement: 65
      },
      {
        id: '3',
        title: 'Tutorial Video',
        views: 756,
        engagement: 82
      }
    ];

    return {
      metrics,
      trends,
      topContent
    };
  }, [calculateMetrics]);

  return {
    calculateMetrics,
    getPerformanceData
  };
}