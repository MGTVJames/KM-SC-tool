import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { DimensionSelector } from './components/DimensionSelector';
import { SurvivalChart } from './components/SurvivalChart';
import { useKaplanMeier } from './hooks/useKaplanMeier';
import { DimensionOption } from './types/analysis';
import { BarChart3 } from 'lucide-react';

const queryClient = new QueryClient();

// Example dimensions - replace with actual dimensions from your dataset
const AVAILABLE_DIMENSIONS: DimensionOption[] = [
  {
    id: 'treatment',
    label: 'Treatment Group',
    options: ['Control', 'Treatment A', 'Treatment B']
  },
  {
    id: 'age_group',
    label: 'Age Group',
    options: ['18-30', '31-50', '51-70', '70+']
  },
  {
    id: 'gender',
    label: 'Gender',
    options: ['Male', 'Female', 'Other']
  }
];

function KaplanMeierAnalysis() {
  const [selectedDimensions, setSelectedDimensions] = useState<Record<string, string>>({});

  const { data, isLoading } = useKaplanMeier({
    dimensions: selectedDimensions
  });

  const handleDimensionChange = (dimensionId: string, value: string) => {
    setSelectedDimensions(prev => ({
      ...prev,
      [dimensionId]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-blue-600" />
            <h1 className="text-xl font-semibold text-gray-900">Survival Analysis Dashboard</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <DimensionSelector
              dimensions={AVAILABLE_DIMENSIONS}
              selectedDimensions={selectedDimensions}
              onDimensionChange={handleDimensionChange}
            />
          </div>
          <div className="lg:col-span-2">
            <SurvivalChart
              data={data || []}
              isLoading={isLoading}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <KaplanMeierAnalysis />
    </QueryClientProvider>
  );
}

export default App;