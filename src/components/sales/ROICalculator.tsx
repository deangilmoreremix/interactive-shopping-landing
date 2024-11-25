import React, { useState } from 'react';
import { Calculator } from 'lucide-react';

export default function ROICalculator() {
  const [inputs, setInputs] = useState({
    monthlyVisitors: 10000,
    averageOrderValue: 100,
    conversionRate: 2
  });

  const calculateROI = () => {
    const currentRevenue = 
      (inputs.monthlyVisitors * (inputs.conversionRate / 100) * inputs.averageOrderValue);
    const improvedRevenue = 
      (inputs.monthlyVisitors * ((inputs.conversionRate * 1.5) / 100) * inputs.averageOrderValue);
    const monthlyIncrease = improvedRevenue - currentRevenue;
    const annualIncrease = monthlyIncrease * 12;
    
    return {
      currentRevenue: currentRevenue.toFixed(2),
      improvedRevenue: improvedRevenue.toFixed(2),
      monthlyIncrease: monthlyIncrease.toFixed(2),
      annualIncrease: annualIncrease.toFixed(2),
      roi: (((improvedRevenue - currentRevenue) / currentRevenue) * 100).toFixed(1)
    };
  };

  const results = calculateROI();

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid grid-cols-2 gap-12">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Monthly Visitors
            </label>
            <input
              type="number"
              value={inputs.monthlyVisitors}
              onChange={(e) => setInputs({ ...inputs, monthlyVisitors: Number(e.target.value) })}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Average Order Value ($)
            </label>
            <input
              type="number"
              value={inputs.averageOrderValue}
              onChange={(e) => setInputs({ ...inputs, averageOrderValue: Number(e.target.value) })}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Current Conversion Rate (%)
            </label>
            <input
              type="number"
              value={inputs.conversionRate}
              onChange={(e) => setInputs({ ...inputs, conversionRate: Number(e.target.value) })}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold mb-6">Projected Results</h3>
          
          <div className="space-y-4">
            <div>
              <div className="text-sm text-gray-600 mb-1">Current Monthly Revenue</div>
              <div className="text-2xl font-bold">${results.currentRevenue}</div>
            </div>

            <div>
              <div className="text-sm text-gray-600 mb-1">Projected Monthly Revenue</div>
              <div className="text-2xl font-bold text-green-600">${results.improvedRevenue}</div>
            </div>

            <div className="pt-4 border-t">
              <div className="text-sm text-gray-600 mb-1">Monthly Increase</div>
              <div className="text-2xl font-bold text-indigo-600">+${results.monthlyIncrease}</div>
            </div>

            <div>
              <div className="text-sm text-gray-600 mb-1">Annual Increase</div>
              <div className="text-2xl font-bold text-indigo-600">+${results.annualIncrease}</div>
            </div>

            <div className="pt-4 border-t">
              <div className="text-sm text-gray-600 mb-1">ROI Improvement</div>
              <div className="text-2xl font-bold text-green-600">+{results.roi}%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}