import React from 'react';
import { Check } from 'lucide-react';
import { Product } from '../../../types';

interface ProductSelectorProps {
  products: Product[];
  selectedProduct: Product | null;
  onSelectProduct: (product: Product) => void;
}

export default function ProductSelector({
  products,
  selectedProduct,
  onSelectProduct
}: ProductSelectorProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <h3 className="font-semibold mb-4">Available Items</h3>
      <div className="space-y-4">
        {products.map(product => (
          <div
            key={product.id}
            onClick={() => onSelectProduct(product)}
            className={`flex items-center gap-4 p-4 rounded-lg cursor-pointer transition-colors ${
              selectedProduct?.id === product.id
                ? 'bg-emerald-50 border border-emerald-200'
                : 'bg-gray-50 hover:bg-gray-100'
            }`}
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-20 h-20 object-cover rounded-lg"
            />
            <div className="flex-1">
              <h4 className="font-medium">{product.name}</h4>
              <p className="text-gray-600">${product.price}</p>
              <p className="text-sm text-gray-500 mt-1">{product.description}</p>
            </div>
            {selectedProduct?.id === product.id && (
              <Check className="text-emerald-600" size={24} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}