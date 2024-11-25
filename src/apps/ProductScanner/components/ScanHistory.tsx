import React from 'react';
import { Clock, ArrowUpRight } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface ScanHistoryProps {
  scans: Array<{
    id: string;
    timestamp: Date;
    product: {
      name: string;
      price: number;
      image: string;
    };
  }>;
  onScanSelect: (scanId: string) => void;
}

export default function ScanHistory({ scans, onScanSelect }: ScanHistoryProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h3 className="font-semibold mb-4">Recent Scans</h3>
      <div className="space-y-4">
        {scans.map((scan) => (
          <div
            key={scan.id}
            onClick={() => onScanSelect(scan.id)}
            className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100"
          >
            <img
              src={scan.product.image}
              alt={scan.product.name}
              className="w-16 h-16 rounded object-cover"
            />
            <div className="flex-1">
              <h4 className="font-medium">{scan.product.name}</h4>
              <p className="text-sm text-gray-500">
                ${scan.product.price}
              </p>
              <div className="flex items-center gap-1 text-xs text-gray-400 mt-1">
                <Clock size={12} />
                {formatDistanceToNow(scan.timestamp, { addSuffix: true })}
              </div>
            </div>
            <ArrowUpRight className="text-gray-400" size={20} />
          </div>
        ))}
      </div>
    </div>
  );
}