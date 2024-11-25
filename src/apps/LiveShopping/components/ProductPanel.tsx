import React from 'react';
import { ShoppingBag, Star, Tag } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  stock: number;
  discount: number;
  highlights: string[];
  reviews: { rating: number; count: number };
}

interface ProductPanelProps {
  products: Product[];
  onFeature: (product: Product) => void;
}

export default function ProductPanel({ products, onFeature }: ProductPanelProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <h3 className="font-semibold mb-4">Featured Products</h3>
      <div className="grid grid-cols-2 gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-gray-50 rounded-lg p-4 flex gap-4"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-20 h-20 object-cover rounded-lg"
            />
            <div className="flex-1">
              <h4 className="font-medium">{product.name}</h4>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-lg font-semibold">
                  ${product.price.toFixed(2)}
                </span>
                {product.discount > 0 && (
                  <span className="text-sm text-red-600">
                    -{product.discount}%
                  </span>
                )}
              </div>
              <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <Star size={14} className="text-yellow-400" />
                  {product.reviews.rating}
                </span>
                <span className="flex items-center gap-1">
                  <Tag size={14} />
                  {product.stock} left
                </span>
              </div>
              <button
                onClick={() => onFeature(product)}
                className="mt-2 bg-indigo-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-indigo-700 flex items-center gap-1"
              >
                <ShoppingBag size={14} />
                Feature Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}