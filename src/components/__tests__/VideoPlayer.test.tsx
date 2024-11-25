import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import VideoPlayer from '../VideoPlayer';

// Mock Cloudinary global object
const mockCloudinaryPlayer = {
  source: vi.fn(),
  on: vi.fn(),
  off: vi.fn(),
  dispose: vi.fn(),
  ima: vi.fn()
};

const mockCloudinary = {
  videoPlayer: vi.fn(() => mockCloudinaryPlayer)
};

// Mock window.cloudinary
beforeEach(() => {
  window.cloudinary = mockCloudinary;
});

afterEach(() => {
  vi.clearAllMocks();
});

describe('VideoPlayer', () => {
  const mockPublicId = 'test-video';
  const mockProducts = [
    {
      id: '1',
      name: 'Test Product',
      price: 99.99,
      image: 'test-image.jpg',
      description: 'Test description'
    }
  ];
  const mockAdTagUrl = 'https://example.com/ad';

  it('renders video element with correct attributes', () => {
    render(<VideoPlayer publicId={mockPublicId} />);
    
    const videoElement = screen.getByRole('video');
    expect(videoElement).toBeInTheDocument();
    expect(videoElement).toHaveAttribute('crossorigin', 'anonymous');
    expect(videoElement).toHaveAttribute('playsinline');
  });

  it('initializes Cloudinary player with correct config', () => {
    render(<VideoPlayer publicId={mockPublicId} />);

    expect(mockCloudinary.videoPlayer).toHaveBeenCalledWith(
      expect.any(HTMLVideoElement),
      expect.objectContaining({
        cloud_name: expect.any(String),
        controls: true,
        fluid: true,
        muted: true,
        preload: 'auto',
        playsinline: true,
        sourceTypes: ['hls', 'dash', 'mp4']
      })
    );
  });

  it('configures shoppable features when products are provided', () => {
    render(
      <VideoPlayer 
        publicId={mockPublicId} 
        products={mockProducts}
        onProductClick={vi.fn()}
      />
    );

    expect(mockCloudinaryPlayer.source).toHaveBeenCalledWith(
      expect.objectContaining({
        publicId: mockPublicId,
        shoppable: expect.objectContaining({
          products: expect.arrayContaining([
            expect.objectContaining({
              productId: mockProducts[0].id,
              productName: mockProducts[0].name
            })
          ])
        })
      })
    );
  });

  it('initializes IMA plugin when adTagUrl is provided', () => {
    const onAdStart = vi.fn();
    const onAdEnd = vi.fn();
    const onAdError = vi.fn();

    render(
      <VideoPlayer 
        publicId={mockPublicId}
        adTagUrl={mockAdTagUrl}
        onAdStart={onAdStart}
        onAdEnd={onAdEnd}
        onAdError={onAdError}
      />
    );

    expect(mockCloudinaryPlayer.ima).toHaveBeenCalledWith(
      expect.objectContaining({
        adTagUrl: mockAdTagUrl,
        debug: false,
        locale: 'en',
        timeout: 6000,
        prerollTimeout: 1000,
        postrollTimeout: 1000,
        showControlsForJSAds: true,
        adEvents: {
          started: onAdStart,
          complete: onAdEnd,
          error: onAdError
        }
      })
    );
  });

  it('cleans up resources on unmount', () => {
    const { unmount } = render(<VideoPlayer publicId={mockPublicId} />);
    unmount();

    expect(mockCloudinaryPlayer.dispose).toHaveBeenCalled();
  });
});