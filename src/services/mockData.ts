/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { StockData, PricePoint } from '../types';

// Helper to generate a realistic price walk for the last year (30 days interval or actual dates for chart grid)
function generateHistoricalData(startPrice: number, trend: number, count: number = 24): PricePoint[] {
  const data: PricePoint[] = [];
  const now = new Date();
  
  for (let i = count - 1; i >= 0; i--) {
    const date = new Date(now.getTime() - i * 15 * 24 * 60 * 60 * 1000);
    const dateString = date.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: '2-digit' });
    
    // Create random walk with general trend
    const noise = (Math.random() - 0.45) * (startPrice * 0.05);
    const trendFactor = (startPrice * trend * (count - i)) / count;
    const price = Math.round((startPrice + trendFactor + noise) * 100) / 100;
    const volume = Math.round(100000 + Math.random() * 900000);
    
    data.push({ date: dateString, price, volume });
  }
  return data;
}

export const MOCK_STOCKS: StockData[] = [
  {
    symbol: "RELIANCE",
    name: "Reliance Industries Limited",
    country: "India",
    exchange: "NSE",
    category: "Energy & Conglomerate",
    currentPrice: 2450.50,
    currency: "INR",
    currencySymbol: "₹",
    fundamentalScore: 7,
    technicalScore: 8,
    sectorScore: 8,
    momentumScore: 9,
    growthScore: 4,
    valuationScore: 7,
    sentimentalScore: 7,
    riskRewardScore: 8,
    recommendation: {
      score: 8.2, // out of 10 -> Green (Buy)
      label: "Buy",
      prosCons: {
        pros: [
          "Strong cash creation from retail & telecom segments",
          "Low Debt-to-Equity (0.2) reduces capital structure risks",
          "High Return on Equity (ROE: 20%) compared to domestic conglomerate average",
          "Expansion of deepwater oil exploration and green energy hubs"
        ],
        cons: [
          "Higher capital expenditures in telecom infrastructure (5G rollout)",
          "Underperforming margins in the traditional oil-to-chemicals refinery segment"
        ]
      }
    },
    fundamentals: {
      pe: { value: 20, info: "Price to Earnings Ratio: Evaluates price relative to EPS. Sector median is 25, meaning Reliance trades at a discount." },
      sectorPe: { value: 25, info: "Sector P/E: The weighted average price-to-earnings ratio of competing energy & retail conglomerate peers." },
      pb: { value: 5, info: "Price to Book Ratio: Compares market value to book value. A value of 5.0 is standard for dominant assets." },
      sectorPb: { value: 4, info: "Sector P/B: The median price-to-book ratio of relevant sector players." },
      epsGrowth: { value: "77%", info: "Earnings Per Share Growth (YoY): Exceptional earnings expansion driven by strong consumer division performance." },
      netProfit: { value: "100 Cr. Rs.", info: "Net Profit (Quarterly): Relates to consolidated net surplus after taxes and operational expenditures." },
      marketCap: { value: "1000 Cr. Rs.", info: "Market Capitalization: Represents the total market value of the company's outstanding equity shares." },
      debtEquity: { value: 0.2, info: "Debt to Equity Ratio: Financial leverage check. Relates total liabilities to shareholder equity; 0.2 is pristine capital safety." },
      roe: { value: "20%", info: "Return on Equity (ROE): Measures efficiency in generating profits from shareholder investment equity." }
    },
    technicals: {
      rsi: { value: 78, info: "RSI (14-day): Relative Strength Index. At 78, it is approaching overbought ranges, indicating powerful short-term buying pressure." },
      macd: { value: "+3.50", info: "MACD: Moving Average Convergence Divergence. Positive reading (+3.50) signals sustainable upward momentum." },
      volumeRatio: { value: 2.0, info: "Volume Ratio (14d average): Average volume traded versus normal benchmark. 2.0 indicates elevated buying interest." },
      fiftyTwoWeekPosition: { value: 0.85, info: "52-Week Position: 1.0 is the highest point and 0.0 is the lowest. 0.85 indicates trading near top-range." }
    },
    sector: {
      pePercentile: { value: 90, info: "Sector P/E Percentile: Reliance is priced more cheaply than 90% of peer enterprises relative to its high earnings yield." },
      tailwind: { value: "25%", info: "Industry Tailwind: Projected global sector compound annual growth factor supported by structural tailwinds." },
      roeRank: { value: 2, info: "ROE Rank vs Sector Median: Ranks shareholder capital return performance; 2nd highest performer in direct peer groups." },
      marginRank: { value: 1, info: "Margin Rank vs Peers: Profit margin tier rank; Reliance stands #1 among peers due to digital platform synergies." }
    },
    momentum: {
      return3M: { value: "40%", info: "3-Month Price Change: Captures stock price appreciation over the past 90 trading days." },
      return6M: { value: "80%", info: "6-Month Price Change: Half-yearly return trend indicating high persistence in buying behavior." },
      return12M: { value: "120%", info: "12-Month Price Change: Year-over-year capitalization return outperforming bench indices." },
      relativeStrength: { value: 20, info: "RS Index Trend: Calculated strength relative to domestic index performance. At 20, it showcases a dominant outperforming trend." }
    },
    growth: {
      pegRatio: { value: 1.1, info: "PEG Ratio: Price-to-Earnings-to-Growth Ratio. A value of 1.1 indicates fairly valued relative to earnings growth." },
      revenueCagr3Y: { value: "20%", info: "Revenue CAGR 3Y: Compound Annual Growth Rate of Revenue over the last 3 years." },
      epsCagr3Y: { value: "15%", info: "EPS CAGR 3Y: Compound Annual Growth Rate of Earnings Per Share over the last 3 years." },
      fcfGrowthYoY: { value: "10%", info: "Free Cash Flow Growth YoY: Year over Year growth in Free Cash Flow." },
      piotroskiScore: { value: 8, info: "Piotroski Score: Piotroski Score out of 9. An 8 indicates extremely strong financial health." }
    },
    valuation: {
      grahamNumber: { value: 10, info: "Graham Number: The classical Graham number pricing benchmark." },
      dcfIntrinsicValue: { value: 2000, info: "DCF-based intrinsic value: Intrinsic value estimate based on corporate free cash flow models discounted to present value." },
      evEbitda: { value: 15, info: "EV/EBITDA: Enterprise value divided by EBITDA. High performance valuation index." },
      dividendYield: { value: "1.2%", info: "Dividend Yield: Represents dividend payments compared directly to local price metrics." }
    },
    sentimental: {
      nlpToneScore: { value: 1, info: "NLP tone score on recent news: Scale from -1 (negative) to +1 (positive)." },
      analystConsensus: { value: "Strong Buy", info: "Analyst Avg. Consensus: Aggregated consensus rating across institutional analyst consensus polls." },
      putCallRatio: { value: 0.8, info: "Put/Call Ratio: Below 1.0 represents general bull trend option coverage hedges." },
      institutionalOwnership: { value: "20%", info: "Institutional Ownership: Holding percentage across mutual funds and asset managers." },
      promoterOwnership: { value: "25%", info: "Promoter Ownership: Shares held by parent company promoters." }
    },
    riskReward: {
      beta1Y: { value: 0.8, info: "Beta (1Y): Measures equity sensitivity relative to benchmark indexing." },
      volatilityStdDev: { value: 2, info: "Volatility (Std Dev): Daily standard deviation pricing bounds." },
      dcfUpside: { value: 0.8, info: "DCF Upside: Represents percentage upside based on DCF valuation metrics." },
      sharpeRatio: { value: 1.2, info: "Sharpe Ratio: Measures excess return output relative to volatility indexes." }
    },
    historicalData: generateHistoricalData(1800, 0.4, 24)
  },
  {
    symbol: "AAPL",
    name: "Apple Inc.",
    country: "USA",
    exchange: "NASDAQ",
    category: "Consumer Electronics & Services",
    currentPrice: 178.20,
    currency: "USD",
    currencySymbol: "$",
    fundamentalScore: 8,
    technicalScore: 6,
    sectorScore: 9,
    momentumScore: 7,
    growthScore: 6,
    valuationScore: 5,
    sentimentalScore: 8,
    riskRewardScore: 7,
    recommendation: {
      score: 7.5, // Hold/Buy transition -> Strong Hold
      label: "Hold",
      prosCons: {
        pros: [
          "Services revenue expansion (iCloud, Apple Arcade, Apple TV) growing at 15% CAGR",
          "Massive cash pile of over $150 Billion allowing solid share buybacks",
          "Unrivaled brand loyalty resulting in sticky product ecosystems",
          "Flawless return on equity (ROE: 140+%) via intelligent leverage"
        ],
        cons: [
          "Weaker physical iPhone shipment growth across international markets",
          "Antitrust regulatory threats in both US and EU marketplaces"
        ]
      }
    },
    fundamentals: {
      pe: { value: 29.5, info: "Price to Earnings Ratio: 29.5x means investors pay premium fees for highly reliable earnings." },
      sectorPe: { value: 32.1, info: "Sector P/E: The consumer technology sector averages 32.1x, making Apple mildly undervalued relative to hardware peers." },
      pb: { value: 42.0, info: "Price to Book Ratio: Elevated at 42.0 due to stock buybacks reducing the capital book-value denominator." },
      sectorPb: { value: 12.0, info: "Sector P/B: Industry average price-to-book valuation indices." },
      epsGrowth: { value: "12%", info: "Earnings Per Share Growth (YoY): Solid tech advancement with expanding high-margin premium subscription packages." },
      netProfit: { value: "24.1B USD", info: "Net Profit: Consolidated quarterly aggregate net earnings after adjustments." },
      marketCap: { value: "2.79T USD", info: "Market Capitalization: Market value of outstanding shares. World-leading scale." },
      debtEquity: { value: 1.4, info: "Debt to Equity Ratio: 1.4x reflects highly optimized capital balance sheet leverage via corporate bond issuance." },
      roe: { value: "145%", info: "Return on Equity (ROE): Superior balance sheet efficiency yielding high performance percentages." }
    },
    technicals: {
      rsi: { value: 52, info: "RSI (14-day): Neutral level at 52, showing a balance between bulls and beasts. Correcting after former overbought positions." },
      macd: { value: "-0.40", info: "MACD: Near zero and slightly negative, signifying short-term flat consolidation patterns." },
      volumeRatio: { value: 0.9, info: "Volume Ratio (14d average): At 0.9, trading activity is slightly below historical quarterly baselines." },
      fiftyTwoWeekPosition: { value: 0.62, info: "52-Week Position: 0.62 means the share price currently sits in the middle-upper tier of its annual bandwidth." }
    },
    sector: {
      pePercentile: { value: 65, info: "Sector P/E Percentile: Priced slightly higher than 65% of technical and device manufacturers." },
      tailwind: { value: "18%", info: "Industry Tailwind: Expansion of personal device electronics assisted by server-side generative neural integration." },
      roeRank: { value: 1, info: "ROE Rank vs Sector Median: Apple ranks first (#1) due to structural capital strategies and service margins." },
      marginRank: { value: 2, info: "Margin Rank vs Peers: Ranked second against pure software entities due to physical inventory production expenses." }
    },
    momentum: {
      return3M: { value: "4%", info: "3-Month Return: Muted short-term performance with focus on inventory supply stabilization." },
      return6M: { value: "12%", info: "6-Month Return: Steady performance reflecting defensive premium characteristics." },
      return12M: { value: "28%", info: "12-Month Return: Modest yearly returns matching benchmark performance index." },
      relativeStrength: { value: -5, info: "RS Index Trend: Underperforming standard tech index performance levels slightly over 90 days." }
    },
    growth: {
      pegRatio: { value: 1.5, info: "PEG Ratio: Price-to-Earnings-to-Growth Ratio. A value of 1.5 indicates moderate premium relative to growth." },
      revenueCagr3Y: { value: "12%", info: "Revenue CAGR 3Y: Stable Compound Annual Growth Rate of Revenue." },
      epsCagr3Y: { value: "14%", info: "EPS CAGR 3Y: Robust Earnings Per Share compound annual growth." },
      fcfGrowthYoY: { value: "8%", info: "Free Cash Flow Growth YoY: Solid cash conversion stream expansion." },
      piotroskiScore: { value: 7, info: "Piotroski Score: High rank indicates strong financial health parameters." }
    },
    valuation: {
      grahamNumber: { value: 80, info: "Graham Number represents traditional intrinsic value calculation." },
      dcfIntrinsicValue: { value: 190, info: "DCF Intrinsic Value: Estimated discounted present value of expected cash flows." },
      evEbitda: { value: 22, info: "EV/EBITDA multiple reflects premium consumer technology valuations." },
      dividendYield: { value: "0.5%", info: "Dividend Yield: Returns paid as dividends relative to price." }
    },
    sentimental: {
      nlpToneScore: { value: 0.6, info: "NLP tone score on recent news indicating positive corporate positioning." },
      analystConsensus: { value: "Buy", info: "Analyst Avg. Consensus: Aggregated recommendation is a solid Buy." },
      putCallRatio: { value: 0.65, info: "Put/Call Ratio representing highly bullish structures." },
      institutionalOwnership: { value: "58%", info: "Institutional Ownership: Deep institutional holding profile." },
      promoterOwnership: { value: "1%", info: "Promoter Ownership: Shares held by active executive insiders." }
    },
    riskReward: {
      beta1Y: { value: 1.05, info: "Beta (1Y) indicates return volatility inline with market indices." },
      volatilityStdDev: { value: 1.5, info: "Volatility (Std Dev) representing steady low-variance trading profiles." },
      dcfUpside: { value: 0.15, info: "DCF Upside represents percentage of intrinsic vs outer valuation gains." },
      sharpeRatio: { value: 1.5, info: "Sharpe Ratio showing positive risk-adjusted performance returns." }
    },
    historicalData: generateHistoricalData(145, 0.22, 24)
  },
  {
    symbol: "TSLA",
    name: "Tesla, Inc.",
    country: "USA",
    exchange: "NASDAQ",
    category: "Automotive & Energy Storage",
    currentPrice: 224.50,
    currency: "USD",
    currencySymbol: "$",
    fundamentalScore: 5,
    technicalScore: 7,
    sectorScore: 6,
    momentumScore: 8,
    growthScore: 8,
    valuationScore: 4,
    sentimentalScore: 6,
    riskRewardScore: 5,
    recommendation: {
      score: 6.5, // Hold/Buy border
      label: "Hold",
      prosCons: {
        pros: [
          "Leadership in fully autonomous self-driving AI compute grids",
          "Expanding stationary battery supply and energy generation business",
          "Net profit positive and zero formal long-term debt liabilities",
          "Next-generation low cost vehicle platform planned for production"
        ],
        cons: [
          "Heightened competitive pressure from domestic automakers globally",
          "Squeezed operating margins caused by price discounts and promotional rates"
        ]
      }
    },
    fundamentals: {
      pe: { value: 68.0, info: "Price to Earnings Ratio: Elevated valuation trading like an AI enterprise rather than standard automotive manufacturers." },
      sectorPe: { value: 18.5, info: "Sector P/E: Direct automotive sector is priced at 18.5x, putting Tesla at a heavy premium valuation." },
      pb: { value: 9.8, info: "Price to Book Ratio: Higher multiples reflecting deep proprietary battery tech assets." },
      sectorPb: { value: 2.1, info: "Sector P/B: Industry average showing substantial capital premium." },
      epsGrowth: { value: "-8%", info: "Earnings Per Share Growth (YoY): Negative growth over the past four quarters due to price modifications." },
      netProfit: { value: "1.9B USD", info: "Net Profit: Quarterly earnings demonstrating solid operational safety net despite discount pricing structures." },
      marketCap: { value: "710B USD", info: "Market Capitalization: Market value reflecting global premium scale." },
      debtEquity: { value: 0.05, info: "Debt to Equity Ratio: Exceptional liquidity position with practically non-existent corporate structure debt." },
      roe: { value: "14%", info: "Return on Equity (ROE): Resilient capital productivity rate." }
    },
    technicals: {
      rsi: { value: 65, info: "RSI (14-day): Slightly elevated at 65, showing growing momentum as market prices recover." },
      macd: { value: "+1.95", info: "MACD: Steady positive trend signalling entry of buyer volume patterns." },
      volumeRatio: { value: 1.4, info: "Volume Ratio: Above baseline average showing lively retail trader interaction." },
      fiftyTwoWeekPosition: { value: 0.55, info: "52-Week Position: Sits near 55% percentile of the yearly high/low thresholds." }
    },
    sector: {
      pePercentile: { value: 20, info: "Sector P/E Percentile: Highly valued; cheaper than only 20% of automotive firms due to high integrated premium value." },
      tailwind: { value: "35%", info: "Industry Tailwind: Supercharged conversion of legacy transport grids to electrified, software-driven vectors." },
      roeRank: { value: 3, info: "ROE Rank vs Sector Median: Ranks third among high-scale production EV companies." },
      marginRank: { value: 2, info: "Margin Rank vs Peers: Outperforms local auto manufacturers but behind pure software SaaS plays." }
    },
    momentum: {
      return3M: { value: "15%", info: "3-Month Return: Sound recovery reflecting premium sentiment reversals." },
      return6M: { value: "5%", info: "6-Month Return: Flattish multi-month trend due to macro interest rate shifts." },
      return12M: { value: "45%", info: "12-Month Return: Healthy long-term trend matching corporate volume growth goals." },
      relativeStrength: { value: 8, info: "RS Index Trend: Positive trend relative to general automotive indices." }
    },
    growth: {
      pegRatio: { value: 2.1, info: "PEG Ratio: Reflects high premium pricing relative to its electric vector transition speed." },
      revenueCagr3Y: { value: "35%", info: "Revenue CAGR 3Y: Immense compound annual expansion speed." },
      epsCagr3Y: { value: "28%", info: "EPS CAGR 3Y: Solid operational compound earnings expansion statistics." },
      fcfGrowthYoY: { value: "12%", info: "Free Cash Flow Growth YoY: Upward cash scaling from high volume model sales." },
      piotroskiScore: { value: 6, info: "Piotroski Score: Moderate score reflecting heavy factory investment capital demands." }
    },
    valuation: {
      grahamNumber: { value: 45, info: "Graham Number indicating historical pricing value thresholds." },
      dcfIntrinsicValue: { value: 210, info: "DCF Intrinsic Value based on long-range autonomous and supercomputing growth modules." },
      evEbitda: { value: 38, info: "EV/EBITDA multiple reflecting premium technical and battery infrastructure leadership." },
      dividendYield: { value: "0%", info: "Dividend Yield: Distributes 100% of capital towards operational expansions." }
    },
    sentimental: {
      nlpToneScore: { value: 0.2, info: "NLP tone score indicating highly volatile public relations and executive press cycles." },
      analystConsensus: { value: "Hold", info: "Analyst Avg. Consensus represents a cautious Hold tier." },
      putCallRatio: { value: 1.1, info: "Put/Call Ratio representing derivative options shorting interest profiles." },
      institutionalOwnership: { value: "44%", info: "Institutional Ownership: Holding percentage across mutual funds and trackers." },
      promoterOwnership: { value: "13%", info: "Promoter Ownership: Concentrated equity held by directors & key insiders." }
    },
    riskReward: {
      beta1Y: { value: 1.6, info: "Beta (1Y) indicates elevated volatility, outperforming indexing shifts in bulls and bears." },
      volatilityStdDev: { value: 3.5, info: "Volatility (Std Dev) reflects steep, active price osculation grids." },
      dcfUpside: { value: -0.05, info: "DCF Upside indicating standard market trading premiums relative to baseline intrinsic models." },
      sharpeRatio: { value: 0.8, info: "Sharpe Ratio reflecting moderate risk-weighted outcome indices." }
    },
    historicalData: generateHistoricalData(200, 0.12, 24)
  },
  {
    symbol: "TATAMOTORS",
    name: "Tata Motors Limited",
    country: "India",
    exchange: "NSE",
    category: "Automotive & Commercial Vehicles",
    currentPrice: 945.15,
    currency: "INR",
    currencySymbol: "₹",
    fundamentalScore: 8,
    technicalScore: 9,
    sectorScore: 7,
    momentumScore: 9,
    growthScore: 9,
    valuationScore: 8,
    sentimentalScore: 9,
    riskRewardScore: 8,
    recommendation: {
      score: 8.8, // out of 10 -> Green (Buy)
      label: "Buy",
      prosCons: {
        pros: [
          "Stunning turnaround of JLR (Jaguar Land Rover) with record margins",
          "Commanding 70%+ market share in India's domestic electric vehicle segment",
          "Excellent order book backlog of over 100,000 premium luxury SUVs",
          "Sharp de-leveraging efforts aiming for zero net-automotive debt"
        ],
        cons: [
          "Risk of general cooling in global premium luxury passenger car sales",
          "Margin volatility in domestic commercial freight trucks"
        ]
      }
    },
    fundamentals: {
      pe: { value: 16.2, info: "Price to Earnings Ratio: 16.2x is conservative given high growth levels of primary global consumer divisions." },
      sectorPe: { value: 21.0, info: "Sector P/E: General domestic automotive average is 21.0x, representing deep value in Tata Motors shares." },
      pb: { value: 4.8, info: "Price to Book Ratio: Demonstrates expanding assets and equity structure." },
      sectorPb: { value: 5.2, info: "Sector P/B: In line with regional auto manufacturers." },
      epsGrowth: { value: "128%", info: "Earnings Per Share Growth (YoY): Exceptional triple-digit profit surge driven by high JLR average selling price realization." },
      netProfit: { value: "54 Cr. Rs.", info: "Net Profit (Quarterly): Superb corporate turnaround from historic loss positions." },
      marketCap: { value: "350 Cr. Rs.", info: "Market Capitalization: Market value reflecting solid blue-chip credentials." },
      debtEquity: { value: 0.6, info: "Debt to Equity Ratio: Successfully reduced from 1.5 to 0.6 via free cash flow generation." },
      roe: { value: "24%", info: "Return on Equity (ROE): Outstanding Return on Equity reflecting turnaround leverage efficacy." }
    },
    technicals: {
      rsi: { value: 81, info: "RSI (14-day): At 81, the shares are deeply overbought, indicating intense momentum but near-term pullback risks." },
      macd: { value: "+12.4", info: "MACD: Strongly positive with expanding histograms confirming absolute bull dominance." },
      volumeRatio: { value: 2.8, info: "Volume Ratio (14d average): Heavy interest, with daily turn-over volumes pushing nearly 3x average levels." },
      fiftyTwoWeekPosition: { value: 0.98, info: "52-Week Position: Trading at the very peak of its yearly bandwidth. 0.98 is highly bullish." }
    },
    sector: {
      pePercentile: { value: 88, info: "Sector P/E Percentile: Trading at attractive entry valuations compared to 88% of major global auto conglomerates." },
      tailwind: { value: "20%", info: "Industry Tailwind: Indian domestic automotive premium expansion combined with JLR electrification." },
      roeRank: { value: 2, info: "ROE Rank vs Sector Median: Second highest return rate in its classification." },
      marginRank: { value: 2, info: "Margin Rank vs Peers: Ranks second behind pure play luxury rivals." }
    },
    momentum: {
      return3M: { value: "52%", info: "3-Month Return: Massive short term breakout driven by high global sales reports." },
      return6M: { value: "95%", info: "6-Month Return: Nearly doubled stock performance on stellar JLR turnaround metrics." },
      return12M: { value: "165%", info: "12-Month Return: World-class annual charts beating tech index averages." },
      relativeStrength: { value: 28, info: "RS Index Trend: At 28, it exhibits incredible sector outperformance and market leadership." }
    },
    growth: {
      pegRatio: { value: 0.8, info: "PEG Ratio: Deep undervaluation relative to its high compound earnings expansion." },
      revenueCagr3Y: { value: "22%", info: "Revenue CAGR 3Y: Robust top-line compound expansion rate." },
      epsCagr3Y: { value: "45%", info: "EPS CAGR 3Y: Tremendous bottom-line compound annual acceleration." },
      fcfGrowthYoY: { value: "32%", info: "Free Cash Flow Growth YoY: Stellar de-leveraging cash accumulation." },
      piotroskiScore: { value: 8, info: "Piotroski Score: Exceptional health reflecting successful corporate turnaround." }
    },
    valuation: {
      grahamNumber: { value: 1100, info: "Graham Number represents conservative index threshold." },
      dcfIntrinsicValue: { value: 1200, info: "DCF Intrinsic Value: Estimated discounted present value of expected cash flows." },
      evEbitda: { value: 9.5, info: "EV/EBITDA multiple indicating high value compared to regional peers." },
      dividendYield: { value: "1.5%", info: "Dividend Yield: Return paid relative to the stock price." }
    },
    sentimental: {
      nlpToneScore: { value: 0.9, info: "NLP tone score showing stellar positive comments across global broker coverage." },
      analystConsensus: { value: "Strong Buy", info: "Analyst Avg. Consensus consensus score across major institutional research houses." },
      putCallRatio: { value: 0.7, info: "Put/Call Ratio showing deep call option volume accumulation." },
      institutionalOwnership: { value: "18%", info: "Institutional Ownership: Percentage of stock owned by funds and investment institutions." },
      promoterOwnership: { value: "46%", info: "Promoter Ownership: Shares held by key promoter groups (Tata Sons)." }
    },
    riskReward: {
      beta1Y: { value: 1.25, info: "Beta (1Y) indicates moderate cyclicality index." },
      volatilityStdDev: { value: 2.4, info: "Volatility (Std Dev) represents average trading day variance thresholds." },
      dcfUpside: { value: 0.35, info: "DCF Upside represents potential gain compared to intrinsic value." },
      sharpeRatio: { value: 1.4, info: "Sharpe Ratio showing strong risk-adjusted returns." }
    },
    historicalData: generateHistoricalData(350, 1.7, 24)
  },
  {
    symbol: "NVDA",
    name: "NVIDIA Corporation",
    country: "USA",
    exchange: "NASDAQ",
    category: "Semiconductors & AI Compute",
    currentPrice: 485.40,
    currency: "USD",
    currencySymbol: "$",
    fundamentalScore: 9,
    technicalScore: 8,
    sectorScore: 9,
    momentumScore: 10,
    growthScore: 10,
    valuationScore: 5,
    sentimentalScore: 9,
    riskRewardScore: 9,
    recommendation: {
      score: 9.1, // out of 10 -> Green (Buy)
      label: "Buy",
      prosCons: {
        pros: [
          "Monopolistic 90%+ market share in high-end AI data center accelerators",
          "Net profit margin exceeding an unimaginable 55% with pricing dominance",
          "Explosive quarterly revenue expansion (+200% YoY) showing absolute demand surplus",
          "Solid proprietary CUDA platform software ecosystem locking in enterprise buyers"
        ],
        cons: [
          "Extreme dependency on raw silicon wafer supply lines via TSMC packaging",
          "High valuation premium leaves minimal leeway for minor earnings misses"
        ]
      }
    },
    fundamentals: {
      pe: { value: 45.0, info: "Price to Earnings Ratio: 45x is remarkably cheap considering triple digit growth velocities." },
      sectorPe: { value: 55.4, info: "Sector P/E: Under industry specialized chip averages due to unprecedented margins." },
      pb: { value: 25.0, info: "Price to Book Ratio: Reflected return on specialized semiconductor fabrication tooling." },
      sectorPb: { value: 8.5, info: "Sector P/B: Industry average showing premiums." },
      epsGrowth: { value: "240%", info: "Earnings Per Share Growth (YoY): Historic growth speed rewriting technology benchmark sheets." },
      netProfit: { value: "14.8B USD", info: "Net Profit: Giant quarterly profit aggregates powered by corporate enterprise demand." },
      marketCap: { value: "1.20T USD", info: "Market Capitalization: Multi-trillion scale category leader." },
      debtEquity: { value: 0.15, info: "Debt to Equity Ratio: Extremely robust balance sheet buffer." },
      roe: { value: "62%", info: "Return on Equity (ROE): Supreme efficiency ratios." }
    },
    technicals: {
      rsi: { value: 72, info: "RSI (14-day): Back above 70 after short-term cool off, confirming active momentum reload patterns." },
      macd: { value: "+8.90", info: "MACD: Steady positive, showing increasing volume support on current breakout trends." },
      volumeRatio: { value: 1.5, info: "Volume Ratio (14d average): Heavy institution accumulation trends." },
      fiftyTwoWeekPosition: { value: 0.92, info: "52-Week Position: Strong position trading just inches below recent high points." }
    },
    sector: {
      pePercentile: { value: 92, info: "Sector P/E Percentile: Possesses extremely strong values relative to semiconductor sector averages." },
      tailwind: { value: "50%", info: "Industry Tailwind: The generational global AI compute paradigm transition." },
      roeRank: { value: 1, info: "ROE Rank vs Sector Median: Undisputed first (#1) place due to unprecedented corporate pricing power." },
      marginRank: { value: 1, info: "Margin Rank vs Peers: Highest margins observed in the entire computing history." }
    },
    momentum: {
      return3M: { value: "35%", info: "3-Month Return: Relentless upward trends matching next-gen server announcements." },
      return6M: { value: "110%", info: "6-Month Return: Outstanding run driven by sovereign datacenter investments." },
      return12M: { value: "220%", info: "12-Month Return: Extraordinary annual outperformance leading the global charts." },
      relativeStrength: { value: 35, info: "RS Index Trend: Extreme relative outperformance compared to standard indices." }
    },
    growth: {
      pegRatio: { value: 1.2, info: "PEG Ratio: Near fair price despite triple digit growth velocities." },
      revenueCagr3Y: { value: "110%", info: "Revenue CAGR 3Y: Unprecedented historical revenue expansion speed." },
      epsCagr3Y: { value: "140%", info: "EPS CAGR 3Y: World-leading earnings growth rate." },
      fcfGrowthYoY: { value: "85%", info: "Free Cash Flow Growth YoY: Massive cash conversion stream expansion." },
      piotroskiScore: { value: 9, info: "Piotroski Score: Flawless status reflecting supreme financial health." }
    },
    valuation: {
      grahamNumber: { value: 120, info: "Graham Number represents conservative index threshold." },
      dcfIntrinsicValue: { value: 520, info: "DCF Intrinsic Value: Present value estimation based on active chip ordering backlogs." },
      evEbitda: { value: 28, info: "EV/EBITDA multiple reflecting premium AI compute leadership valuations." },
      dividendYield: { value: "0.02%", info: "Dividend Yield: Maintained for compliance as all cash is reinvested." }
    },
    sentimental: {
      nlpToneScore: { value: 0.95, info: "NLP tone score showing near-perfect positive sentiment comments across media." },
      analystConsensus: { value: "Strong Buy", info: "Analyst Avg. Consensus consensus score across major institutional research houses." },
      putCallRatio: { value: 0.75, info: "Put/Call Ratio: Deep institutional call accumulation." },
      institutionalOwnership: { value: "65%", info: "Institutional Ownership: World-wide mutual funds backing profile." },
      promoterOwnership: { value: "4%", info: "Promoter Ownership: Held directly by founders and key engineering team members." }
    },
    riskReward: {
      beta1Y: { value: 1.75, info: "Beta (1Y) indicating fast movement relative to benchmark movements." },
      volatilityStdDev: { value: 3.2, info: "Volatility (Std Dev) representing active day trading ranges." },
      dcfUpside: { value: 0.25, info: "DCF Upside represents potential gain compared to intrinsic value." },
      sharpeRatio: { value: 2.2, info: "Sharpe Ratio reflecting industry-leading risk-adjusted outputs." }
    },
    historicalData: generateHistoricalData(150, 2.2, 24)
  },
  {
    symbol: "INFY",
    name: "Infosys Limited",
    country: "India",
    exchange: "NSE",
    category: "IT Services",
    currentPrice: 1412.30,
    currency: "INR",
    currencySymbol: "₹",
    fundamentalScore: 7,
    technicalScore: 5,
    sectorScore: 8,
    momentumScore: 6,
    growthScore: 5,
    valuationScore: 7,
    sentimentalScore: 6,
    riskRewardScore: 6,
    recommendation: {
      score: 6.8, // Hold
      label: "Hold",
      prosCons: {
        pros: [
          "Consistent high dividend yield and structural share buyback plans",
          "Deep enterprise ties with Fortune 500 companies ensuring long term revenue stability",
          "Pristine net-cash balance sheet with zero financial distress risk",
          "Expanding footprint in digital modernization and cloud migration services"
        ],
        cons: [
          "Decelerating discretionary IT spending from US and European financial clients",
          "Relatively high structural employee attrition rates raising talent procurement cost"
        ]
      }
    },
    fundamentals: {
      pe: { value: 24.2, info: "Price to Earnings Ratio: Solid, reliable valuation standard of 24.2x." },
      sectorPe: { value: 26.5, info: "Sector P/E: Sits slightly below standard IT software service indices." },
      pb: { value: 7.5, info: "Price to Book Ratio: In line with premium service providers." },
      sectorPb: { value: 6.8, info: "Sector P/B: Aligns with regional peers." },
      epsGrowth: { value: "8.5%", info: "Earnings Per Share Growth (YoY): Single digit expansion reflecting current tech expenditure consolidation phases." },
      netProfit: { value: "6.2 Cr. Rs.", info: "Net Profit (Quarterly): High, stable operating income yields." },
      marketCap: { value: "580 Cr. Rs.", info: "Market Capitalization: Reputable large-cap weight in the indices." },
      debtEquity: { value: 0.01, info: "Debt to Equity Ratio: Perfect balance sheet safety with virtual absence of physical debt." },
      roe: { value: "32%", info: "Return on Equity (ROE): Phenomenal capitalization efficiency." }
    },
    technicals: {
      rsi: { value: 48, info: "RSI (14-day): Muted at 48, indicating trading range compression with no clear direction." },
      macd: { value: "-0.15", info: "MACD: Flattening near baseline point, confirming rangebound trading behavior." },
      volumeRatio: { value: 0.8, info: "Volume Ratio (14d average): Lower-key buying and selling, showing general market hesitation." },
      fiftyTwoWeekPosition: { value: 0.45, info: "52-Week Position: Currently sitting in its mid-range yearly price bracket." }
    },
    sector: {
      pePercentile: { value: 75, info: "Sector P/E Percentile: Trades at attractive terms relative to 75% of domestic IT giants." },
      tailwind: { value: "12%", info: "Industry Tailwind: Digital automation, cloud scale, and corporate modernization projects." },
      roeRank: { value: 3, info: "ROE Rank vs Sector Median: Third highest in service provider groups." },
      marginRank: { value: 3, info: "Margin Rank vs Peers: High margin stability but behind consulting giants." }
    },
    momentum: {
      return3M: { value: "-2%", info: "3-Month Return: Slightly negative as client budgets see brief pauses." },
      return6M: { value: "8%", info: "6-Month Return: Moderate increase aligned with overall regional gains." },
      return12M: { value: "15%", info: "12-Month Return: Steady performance reflecting stable equity properties." },
      relativeStrength: { value: -12, info: "RS Index Trend: Relative underperformance against active tech indices over past three quarters." }
    },
    growth: {
      pegRatio: { value: 1.8, info: "PEG Ratio: Price-to-Earnings-to-Growth Ratio. A value of 1.8 reflects standard large consulting multiples." },
      revenueCagr3Y: { value: "10%", info: "Revenue CAGR 3Y: Healthy stable compound expansion." },
      epsCagr3Y: { value: "9%", info: "EPS CAGR 3Y: Stable income-generating EPS returns." },
      fcfGrowthYoY: { value: "5%", info: "Free Cash Flow Growth YoY: Standard defensive cash conversion speed." },
      piotroskiScore: { value: 7, info: "Piotroski Score: High rank indicates strong financial health parameters." }
    },
    valuation: {
      grahamNumber: { value: 1100, info: "Graham Number represents conservative index threshold." },
      dcfIntrinsicValue: { value: 1550, info: "DCF Intrinsic Value: Estimated discounted present value of expected cash flows." },
      evEbitda: { value: 18, info: "EV/EBITDA multiple matching regional consulting averages." },
      dividendYield: { value: "2.8%", info: "Dividend Yield: Represents stellar quarterly payouts over trading price ratios." }
    },
    sentimental: {
      nlpToneScore: { value: 0.3, info: "NLP tone score showing stable neutral news commentaries." },
      analystConsensus: { value: "Hold", info: "Analyst Avg. Consensus consensus score reflects general sector stabilization expectations." },
      putCallRatio: { value: 0.95, info: "Put/Call Ratio: Neutral sentiment in derivatives market." },
      institutionalOwnership: { value: "38%", info: "Institutional Ownership: Deep insurance and pension fund backings." },
      promoterOwnership: { value: "15%", info: "Promoter Ownership: Shares held by active executive founders." }
    },
    riskReward: {
      beta1Y: { value: 0.95, info: "Beta (1Y) showing highly defensive profile relative to market moves." },
      volatilityStdDev: { value: 1.8, info: "Volatility (Std Dev) representing steady low-variance trading profiles." },
      dcfUpside: { value: 0.1, info: "DCF Upside represents percentage of intrinsic vs outer valuation gains." },
      sharpeRatio: { value: 1.1, info: "Sharpe Ratio showing positive risk-adjusted performance returns." }
    },
    historicalData: generateHistoricalData(1200, 0.18, 24)
  }
];
