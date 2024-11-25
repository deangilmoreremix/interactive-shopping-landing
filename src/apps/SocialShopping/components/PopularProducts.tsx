import React from 'react';
import { ShoppingBag } from 'lucide-react';

const popularProducts = [
  {
    id: '1',
    name: 'Designer Sunglasses',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f',
    engagement: 245
  },
  {
    id: '2',
    name: 'Leather Watch',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30',
    engagement: 189
  },
  {
    id: '3',
    name: 'Premium Headphones',
    price: 249.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
    engagement: 167
  }
];

export default function PopularProducts() {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <ShoppingBag className="text-pink-600" size={20} />
        <h3 className="font-semibold">Popular Products</h3>
      </div>
      <div className="space-y-4">
        {popularProducts.map((product) => (
          <div
            key={product.id}
            className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-16 h-16 rounded-lg object-cover"
            />
            <div className="flex-1">
              <h4 className="font-medium text-gray-900">{product.name}</h4>
              <p className="text-gray-600">${product.price}</p>
              <p className="text-sm text-pink-600">
                {product.engagement} engagements
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}