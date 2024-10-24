import React from 'react';
import { Settings2 } from 'lucide-react';
import { DimensionOption } from '../types/analysis';

interface Props {
  dimensions: DimensionOption[];
  selectedDimensions: Record<string, string>;
  onDimensionChange: (dimensionId: string, value: string) => void;
}

export function DimensionSelector({ dimensions, selectedDimensions, onDimensionChange }: Props) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center gap-2 mb-4">
        <Settings2 className="w-5 h-5 text-blue-600" />
        <h2 className="text-lg font-semibold text-gray-800">Analysis Dimensions</h2>
      </div>
      <div className="space-y-4">
        {dimensions.map((dimension) => (
          <div key={dimension.id}>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {dimension.label}
            </label>
            <select
              value={selectedDimensions[dimension.id] || ''}
              onChange={(e) => onDimensionChange(dimension.id, e.target.value)}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">Select {dimension.label}</option>
              {dimension.options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
    </div>
  );
}