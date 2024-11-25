import React from 'react';
import { Tag, DollarSign, Ruler, PaintBucket, BarChart2 } from 'lucide-react';

interface ProductDetailsProps {
  product: {
    name: string;
    price: number;
    description: string;
    size: string;
    colors: string[];
    availability: number;
    similarProducts: Array<{
      id: string;
      name: string;
      price: number;
      image: string;
    }>;
  };
  onAddToCart: () => void;
}

export default function ProductDetails({ product, onAddToCart }: ProductDetailsProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-semibold text-lg">{product.name}</h3>
          <p className="text-gray-600">{product.description}</p>
        </div>
        <span className="text-2xl font-bold text-purple-600">
          ${product.price}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="flex items-center gap-2 text-sm">
          <Ruler className="text-gray-400" size={16} />
          <span>Size: {product.size}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <PaintBucket className="text-gray-400" size={16} />
          <div className="flex gap-1">
            {product.colors.map((color) => (
              <span
                key={color}
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <BarChart2 className="text-gray-400" size={16} />
          <span>Stock: {product.availability} units</span>
        </div>
      </div>

      <button
        onClick={onAddToCart}
        className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700"
      >
        Add to Cart
      </button>

      {/* Similar Products */}
      <div className="mt-6">
        <h4 className="font-medium mb-3">Similar Products</h4>
        <div className="grid grid-cols-2 gap-3">
          {product.similarProducts.map((item) => (
            <div
              key={item.id}
              className="p-2 bg-gray-50 rounded-lg flex items-center gap-2"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-12 h-12 rounded object-cover"
              />
              <div>
                <p className="text-sm font-medium">{item.name}</p>
                <p className="text-xs text-purple-600">${item.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}