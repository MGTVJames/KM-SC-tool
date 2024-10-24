import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { DataPoint } from '../types/analysis';

interface Props {
  data: DataPoint[];
  isLoading: boolean;
}

export function SurvivalChart({ data, isLoading }: Props) {
  if (isLoading) {
    return (
      <div className="h-[400px] flex items-center justify-center bg-white rounded-lg shadow-md">
        <div className="text-gray-500">Loading analysis...</div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Kaplan-Meier Survival Curve</h2>
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="time" 
              label={{ value: 'Time', position: 'bottom' }}
            />
            <YAxis 
              domain={[0, 1]}
              label={{ value: 'Survival Probability', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip />
            <Legend />
            <Line
              type="stepAfter"
              dataKey="survival"
              stroke="#2563eb"
              name="Survival"
              strokeWidth={2}
            />
            {data[0]?.confidence_lower && (
              <>
                <Line
                  type="stepAfter"
                  dataKey="confidence_lower"
                  stroke="#93c5fd"
                  strokeDasharray="5 5"
                  name="95% CI Lower"
                />
                <Line
                  type="stepAfter"
                  dataKey="confidence_upper"
                  stroke="#93c5fd"
                  strokeDasharray="5 5"
                  name="95% CI Upper"
                />
              </>
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}