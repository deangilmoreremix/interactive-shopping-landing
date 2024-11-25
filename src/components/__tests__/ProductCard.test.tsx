import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ProductCard from '../ProductCard';

describe('ProductCard', () => {
  const mockProduct = {
    id: '1',
    name: 'Test Product',
    price: 99.99,
    image: 'test-image.jpg',
    description: 'Test description'
  };

  const mockOnAddToCart = vi.fn();

  it('renders product information correctly', () => {
    render(<ProductCard product={mockProduct} onAddToCart={mockOnAddToCart} />);

    expect(screen.getByText(mockProduct.name)).toBeInTheDocument();
    expect(screen.getByText(mockProduct.description)).toBeInTheDocument();
    expect(screen.getByText(`$${mockProduct.price.toFixed(2)}`)).toBeInTheDocument();
  });

  it('calls onAddToCart when add to cart button is clicked', () => {
    render(<ProductCard product={mockProduct} onAddToCart={mockOnAddToCart} />);

    const addToCartButton = screen.getByText(/Add to Cart/i);
    fireEvent.click(addToCartButton);

    expect(mockOnAddToCart).toHaveBeenCalledWith(mockProduct);
  });

  it('displays product image with correct attributes', () => {
    render(<ProductCard product={mockProduct} onAddToCart={mockOnAddToCart} />);

    const image = screen.getByAltText(mockProduct.name);
    expect(image).toHaveAttribute('src', mockProduct.image);
  });
});