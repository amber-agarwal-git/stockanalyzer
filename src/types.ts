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

export interface GrowthMetrics {
  pegRatio: MetricDefinition;
  revenueCagr3Y: MetricDefinition;
  epsCagr3Y: MetricDefinition;
  fcfGrowthYoY: MetricDefinition;
  piotroskiScore: MetricDefinition;
}

export interface ValuationMetrics {
  grahamNumber: MetricDefinition;
  dcfIntrinsicValue: MetricDefinition;
  evEbitda: MetricDefinition;
  dividendYield: MetricDefinition;
}

export interface SentimentalMetrics {
  nlpToneScore: MetricDefinition;
  analystConsensus: MetricDefinition;
  putCallRatio: MetricDefinition;
  institutionalOwnership: MetricDefinition;
  promoterOwnership: MetricDefinition;
}

export interface RiskRewardMetrics {
  beta1Y: MetricDefinition;
  volatilityStdDev: MetricDefinition;
  dcfUpside: MetricDefinition;
  sharpeRatio: MetricDefinition;
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
  growthScore: number;
  valuationScore: number;
  sentimentalScore: number;
  riskRewardScore: number;
  recommendation: RecommendationInfo;
  fundamentals: FundametalMetrics;
  technicals: TechnicalMetrics;
  sector: SectorMetrics;
  momentum: MomentumMetrics;
  growth: GrowthMetrics;
  valuation: ValuationMetrics;
  sentimental: SentimentalMetrics;
  riskReward: RiskRewardMetrics;
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

export interface SearchResult {
  query: string;
  timestamp: string;
  results: {
    symbol: string;
    name: string;
    matchScore: string;
    reasonBadge: string;
    metrics: string;
  }[];
  insightSummary: string;
}
