import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { Product, InteractionArea } from '../../../types';

interface ProductHotspotEditorProps {
  products: Product[];
  interactionAreas: InteractionArea[];
  onAddHotspot: (hotspot: Omit<InteractionArea, 'id'>) => void;
  onRemoveHotspot: (id: string) => void;
  videoDuration: number;
}

const ProductHotspotEditor: React.FC<ProductHotspotEditorProps> = ({
  products,
  interactionAreas,
  onAddHotspot,
  onRemoveHotspot,
  videoDuration,
}) => {
  const [selectedProduct, setSelectedProduct] = useState<string>('');
  const [startTime, setStartTime] = useState<number>(0);
  const [endTime, setEndTime] = useState<number>(5);
  const [coordinates, setCoordinates] = useState({ x: 0.5, y: 0.5, width: 0.2, height: 0.2 });

  const handleAddHotspot = () => {
    if (!selectedProduct) return;

    onAddHotspot({
      productId: selectedProduct,
      startTime,
      endTime,
      coordinates,
    });

    // Reset form
    setSelectedProduct('');
    setStartTime(0);
    setEndTime(5);
    setCoordinates({ x: 0.5, y: 0.5, width: 0.2, height: 0.2 });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <h3 className="font-semibold mb-4">Product Hotspots</h3>
      
      {/* Add Hotspot Form */}
      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select Product
          </label>
          <select
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(e.target.value)}
            className="w-full rounded-lg border-gray-300 shadow-sm"
          >
            <option value="">Choose a product...</option>
            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Start Time (s)
            </label>
            <input
              type="number"
              min={0}
              max={videoDuration}
              value={startTime}
              onChange={(e) => setStartTime(Number(e.target.value))}
              className="w-full rounded-lg border-gray-300 shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              End Time (s)
            </label>
            <input
              type="number"
              min={startTime}
              max={videoDuration}
              value={endTime}
              onChange={(e) => setEndTime(Number(e.target.value))}
              className="w-full rounded-lg border-gray-300 shadow-sm"
            />
          </div>
        </div>

        <button
          onClick={handleAddHotspot}
          disabled={!selectedProduct}
          className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Plus size={20} />
          Add Hotspot
        </button>
      </div>

      {/* Existing Hotspots */}
      <div className="space-y-2">
        {interactionAreas.map((area) => {
          const product = products.find((p) => p.id === area.productId);
          return (
            <div
              key={area.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div>
                <p className="font-medium">{product?.name}</p>
                <p className="text-sm text-gray-500">
                  {area.startTime}s - {area.endTime}s
                </p>
              </div>
              <button
                onClick={() => onRemoveHotspot(area.id)}
                className="text-gray-400 hover:text-red-600"
              >
                <X size={20} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductHotspotEditor;