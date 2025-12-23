export interface ChartDataPoint {
  day: string;
  value: number;
  percent: number;
  tradingValue?: number;
}

export interface BreakdownSubItem {
  label: string;
  value: number;
}

export interface BreakdownItem {
  id: string;
  label: string;
  value: number;
  isPositive: boolean; // Determines green or red
  children?: BreakdownSubItem[];
}

export interface AssetChild {
  name: string;
  value: number;
  percent: number;
}

export interface AssetItem {
  id: string;
  name: string;
  value: number;
  percent: number;
  color: string;
  children?: AssetChild[];
}