import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MediaUploader from '../MediaUploader';
import { useCloudinaryUpload } from '../../hooks/useCloudinaryUpload';

// Mock the custom hook
vi.mock('../../hooks/useCloudinaryUpload', () => ({
  useCloudinaryUpload: vi.fn()
}));

describe('MediaUploader', () => {
  const mockOnUpload = vi.fn();
  const mockOnClose = vi.fn();
  const mockUpload = vi.fn();

  beforeEach(() => {
    (useCloudinaryUpload as any).mockReturnValue({
      upload: mockUpload,
      uploading: false,
      error: null
    });
  });

  it('renders upload interface correctly', () => {
    render(
      <MediaUploader
        type="both"
        onUpload={mockOnUpload}
        onClose={mockOnClose}
      />
    );

    expect(screen.getByText(/Upload Media/i)).toBeInTheDocument();
    expect(screen.getByText(/Drag and drop/i)).toBeInTheDocument();
  });

  it('handles file upload correctly', async () => {
    const file = new File(['test'], 'test.mp4', { type: 'video/mp4' });
    mockUpload.mockResolvedValueOnce({ secure_url: 'test-url' });

    render(
      <MediaUploader
        type="video"
        onUpload={mockOnUpload}
        onClose={mockOnClose}
      />
    );

    const input = screen.getByRole('button', { name: /Upload Media/i });
    await userEvent.click(input);

    expect(mockUpload).toHaveBeenCalled();
  });

  it('shows error message when upload fails', async () => {
    (useCloudinaryUpload as any).mockReturnValue({
      upload: mockUpload,
      uploading: false,
      error: 'Upload failed'
    });

    render(
      <MediaUploader
        type="both"
        onUpload={mockOnUpload}
        onClose={mockOnClose}
      />
    );

    expect(screen.getByText(/Upload failed/i)).toBeInTheDocument();
  });

  it('closes uploader when close button is clicked', () => {
    render(
      <MediaUploader
        type="both"
        onUpload={mockOnUpload}
        onClose={mockOnClose}
      />
    );

    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalled();
  });
});