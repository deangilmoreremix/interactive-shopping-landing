import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import VideoApp from '../VideoApp';
import { useVideoStore } from '../../../store/videoStore';

// Mock the store
vi.mock('../../../store/videoStore', () => ({
  useVideoStore: vi.fn()
}));

describe('VideoApp', () => {
  const mockVideos = [
    {
      id: '1',
      title: 'Test Video',
      description: 'Test Description',
      thumbnail: 'test-thumb.jpg',
      publicId: 'test-video',
      views: 1000,
      duration: '2:30'
    }
  ];

  beforeEach(() => {
    (useVideoStore as any).mockReturnValue({
      videos: mockVideos,
      selectedVideo: mockVideos[0],
      setSelectedVideo: vi.fn()
    });
  });

  it('renders video catalog interface correctly', () => {
    render(<VideoApp />);

    expect(screen.getByText('Video Catalog')).toBeInTheDocument();
    expect(screen.getByText(/Add Video/i)).toBeInTheDocument();
  });

  it('displays video list correctly', () => {
    render(<VideoApp />);

    expect(screen.getByText(mockVideos[0].title)).toBeInTheDocument();
    expect(screen.getByText(mockVideos[0].description)).toBeInTheDocument();
  });

  it('opens media uploader when add video button is clicked', () => {
    render(<VideoApp />);

    const addButton = screen.getByText(/Add Video/i);
    fireEvent.click(addButton);

    expect(screen.getByText(/Upload Media/i)).toBeInTheDocument();
  });

  it('displays video analytics when a video is selected', () => {
    render(<VideoApp />);

    const videoTitle = screen.getByText(mockVideos[0].title);
    fireEvent.click(videoTitle);

    expect(screen.getByText(/Performance Metrics/i)).toBeInTheDocument();
  });
});