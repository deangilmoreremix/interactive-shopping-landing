import React, { useState } from 'react';
import { X, Tag, Search } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
}

interface ProductTaggerProps {
  products: Product[];
  onUpdate: (products: Product[]) => void;
  onClose: () => void;
}

export default function ProductTagger({ products, onUpdate, onClose }: ProductTaggerProps) {
  const [search, setSearch] = useState('');
  const [selectedProducts, setSelectedProducts] = useState<Product[]>(products);

  const demoProducts = [
    {
      id: '1',
      name: 'Premium Headphones',
      price: 199.99,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e'
    },
    {
      id: '2',
      name: 'Smart Watch',
      price: 299.99,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30'
    }
  ];

  const handleSave = () => {
    onUpdate(selectedProducts);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold">Tag Products</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          {demoProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => {
                if (selectedProducts.find(p => p.id === product.id)) {
                  setSelectedProducts(selectedProducts.filter(p => p.id !== product.id));
                } else {
                  setSelectedProducts([...selectedProducts, product]);
                }
              }}
              className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer ${
                selectedProducts.find(p => p.id === product.id)
                  ? 'bg-pink-50 border border-pink-200'
                  : 'bg-gray-50 hover:bg-gray-100'
              }`}
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-16 h-16 object-cover rounded"
              />
              <div>
                <h4 className="font-medium">{product.name}</h4>
                <p className="text-sm text-gray-500">${product.price}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700"
          >
            Save Tags
          </button>
        </div>
      </div>
    </div>
  );
}