/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface PricePoint {
  date: string;
  price: number;
  volume: number;
}

export interface MetricDefinition {
  value: string | number;
  info: string;
}

export interface FundametalMetrics {
  pe: MetricDefinition;
  sectorPe: MetricDefinition;
  pb: MetricDefinition;
  sectorPb: MetricDefinition;
  epsGrowth: MetricDefinition;
  netProfit: MetricDefinition;
  marketCap: MetricDefinition;
  debtEquity: MetricDefinition;
  roe: MetricDefinition;
}

export interface TechnicalMetrics {
  rsi: MetricDefinition;
  macd: MetricDefinition;
  volumeRatio: MetricDefinition;
  fiftyTwoWeekPosition: MetricDefinition;
}

export interface SectorMetrics {
  pePercentile: MetricDefinition;
  tailwind: MetricDefinition;
  roeRank: MetricDefinition;
  marginRank: MetricDefinition;
}

export interface MomentumMetrics {
  return3M: MetricDefinition;
  return6M: MetricDefinition;
  return12M: MetricDefinition;
  relativeStrength: MetricDefinition;
}

export interface ProsCons {
  pros: string[];
  cons: string[];
}

export interface RecommendationInfo {
  score: number; // 0 to 10
  label: 'Buy' | 'Hold' | 'Sell';
  prosCons: ProsCons;
}

export interface StockData {
  symbol: string;
  name: string;
  country: 'India' | 'USA';
  exchange: string;
  category: string;
  currentPrice: number;
  currency: string;
  currencySymbol: string;
  fundamentalScore: number;
  technicalScore: number;
  sectorScore: number;
  momentumScore: number;
  recommendation: RecommendationInfo;
  fundamentals: FundametalMetrics;
  technicals: TechnicalMetrics;
  sector: SectorMetrics;
  momentum: MomentumMetrics;
  historicalData: PricePoint[];
}

export interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export interface StockSearchQuery {
  search: string;
  country: string;
}
