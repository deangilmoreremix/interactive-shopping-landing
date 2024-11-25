import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import InteractiveVideoPlayer from '../../apps/ImmersiveVideo/components/InteractiveVideoPlayer';

// Mock Cloudinary global object
const mockCloudinaryPlayer = {
  source: vi.fn(),
  on: vi.fn(),
  off: vi.fn(),
  dispose: vi.fn()
};

const mockCloudinary = {
  videoPlayer: vi.fn(() => mockCloudinaryPlayer)
};

beforeEach(() => {
  window.cloudinary = mockCloudinary;
});

afterEach(() => {
  vi.clearAllMocks();
});

describe('InteractiveVideoPlayer', () => {
  const mockPublicId = 'test-360-video';
  const mockHotspotClick = vi.fn();

  it('renders 360° video player with correct attributes', () => {
    render(
      <InteractiveVideoPlayer 
        publicId={mockPublicId}
        onHotspotClick={mockHotspotClick}
      />
    );
    
    const videoElement = screen.getByRole('video');
    expect(videoElement).toBeInTheDocument();
    expect(videoElement).toHaveAttribute('crossorigin', 'anonymous');
    expect(videoElement).toHaveAttribute('playsinline');
  });

  it('initializes player with 360° interactive features', () => {
    render(
      <InteractiveVideoPlayer 
        publicId={mockPublicId}
        onHotspotClick={mockHotspotClick}
      />
    );

    expect(mockCloudinary.videoPlayer).toHaveBeenCalledWith(
      expect.any(HTMLVideoElement),
      expect.objectContaining({
        interactive: {
          mode: '360',
          hotspots: {
            enabled: true,
            template: 'default',
            onClick: mockHotspotClick
          }
        }
      })
    );
  });

  it('configures video source with proper transformations', () => {
    render(
      <InteractiveVideoPlayer 
        publicId={mockPublicId}
        onHotspotClick={mockHotspotClick}
      />
    );

    expect(mockCloudinaryPlayer.source).toHaveBeenCalledWith(
      mockPublicId,
      expect.objectContaining({
        transformation: expect.arrayContaining([
          { streaming_profile: 'hd' },
          { fetch_format: 'auto' },
          { quality: 'auto' }
        ]),
        sourceTypes: ['hls', 'dash', 'mp4']
      })
    );
  });

  it('cleans up resources on unmount', () => {
    const { unmount } = render(
      <InteractiveVideoPlayer 
        publicId={mockPublicId}
        onHotspotClick={mockHotspotClick}
      />
    );
    unmount();

    expect(mockCloudinaryPlayer.dispose).toHaveBeenCalled();
  });
});