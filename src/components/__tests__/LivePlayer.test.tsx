import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import LivePlayer from '../LivePlayer';

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

describe('LivePlayer', () => {
  const mockStreamUrl = 'https://example.com/live-stream.m3u8';
  const mockOnStreamStart = vi.fn();
  const mockOnStreamEnd = vi.fn();

  it('renders live player with correct attributes', () => {
    render(
      <LivePlayer 
        streamUrl={mockStreamUrl}
        onStreamStart={mockOnStreamStart}
        onStreamEnd={mockOnStreamEnd}
      />
    );
    
    const videoElement = screen.getByRole('video');
    expect(videoElement).toBeInTheDocument();
    expect(videoElement).toHaveAttribute('crossorigin', 'anonymous');
  });

  it('initializes player with live streaming configuration', () => {
    render(
      <LivePlayer 
        streamUrl={mockStreamUrl}
        onStreamStart={mockOnStreamStart}
        onStreamEnd={mockOnStreamEnd}
      />
    );

    expect(mockCloudinary.videoPlayer).toHaveBeenCalledWith(
      expect.any(HTMLVideoElement),
      expect.objectContaining({
        sourceTypes: ['hls'],
        autoplayMode: 'always',
        muted: false,
        controls: true,
        fluid: true,
        bigPlayButton: false
      })
    );
  });

  it('sets up stream event listeners', () => {
    render(
      <LivePlayer 
        streamUrl={mockStreamUrl}
        onStreamStart={mockOnStreamStart}
        onStreamEnd={mockOnStreamEnd}
      />
    );

    expect(mockCloudinaryPlayer.on).toHaveBeenCalledWith('streamstart', mockOnStreamStart);
    expect(mockCloudinaryPlayer.on).toHaveBeenCalledWith('streamend', mockOnStreamEnd);
  });

  it('cleans up resources and event listeners on unmount', () => {
    const { unmount } = render(
      <LivePlayer 
        streamUrl={mockStreamUrl}
        onStreamStart={mockOnStreamStart}
        onStreamEnd={mockOnStreamEnd}
      />
    );
    unmount();

    expect(mockCloudinaryPlayer.off).toHaveBeenCalledWith('streamstart', mockOnStreamStart);
    expect(mockCloudinaryPlayer.off).toHaveBeenCalledWith('streamend', mockOnStreamEnd);
    expect(mockCloudinaryPlayer.dispose).toHaveBeenCalled();
  });
});