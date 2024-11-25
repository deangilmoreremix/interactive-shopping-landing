import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import LiveApp from '../LiveApp';

describe('LiveApp', () => {
  it('renders live shopping interface correctly', () => {
    render(<LiveApp />);

    expect(screen.getByText('Live Shopping')).toBeInTheDocument();
    expect(screen.getByText(/Go Live/i)).toBeInTheDocument();
  });

  it('displays offline state by default', () => {
    render(<LiveApp />);

    expect(screen.getByText('Offline')).toBeInTheDocument();
  });

  it('shows live chat interface', () => {
    render(<LiveApp />);

    expect(screen.getByText('Live Chat')).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Type a message/i)).toBeInTheDocument();
  });

  it('handles message sending', () => {
    render(<LiveApp />);

    const input = screen.getByPlaceholderText(/Type a message/i);
    fireEvent.change(input, { target: { value: 'Test message' } });
    fireEvent.keyPress(input, { key: 'Enter', code: 13, charCode: 13 });

    expect(screen.getByText('Test message')).toBeInTheDocument();
  });
});