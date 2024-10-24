export interface DataPoint {
  time: number;
  survival: number;
  confidence_lower?: number;
  confidence_upper?: number;
}

export interface DimensionOption {
  id: string;
  label: string;
  options: string[];
}

export interface AnalysisFilters {
  dimensions: Record<string, string>;
}