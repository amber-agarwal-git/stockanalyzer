/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from './context/ThemeContext';
import { Header } from './components/Header';
import { SearchBox } from './components/SearchBox';
import { SearchResult } from './types';
import { StockChart } from './components/StockChart';
import { RecommendationCard } from './components/RecommendationCard';
import { ProsConsCard } from './components/ProsConsCard';
import { MetricsGrid } from './components/MetricsGrid';
import { useStockDetailsQuery } from './hooks/useStocks';
import { 
  TrendingUp, 
  HelpCircle, 
  RefreshCw, 
  AlertCircle, 
  LineChart, 
  BarChart4, 
  Zap,
  Github,
  Compass,
  Filter,
  Coins,
  Info
} from 'lucide-react';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000 // 5 minutes caching
    }
  }
});

function DashboardContent() {
  const [selectedSymbol, setSelectedSymbol] = useState('RELIANCE');
  const [activeTab, setActiveTab] = useState<'scores' | 'strategies' | 'screener'>('scores');
  const { data: activeStock, isLoading, isError, error, refetch } = useStockDetailsQuery(selectedSymbol);

  // States for shared AI Search matching results
  const [aiSearchHistory, setAiSearchHistory] = useState<SearchResult | null>(null);
  const [isAiSearching, setIsAiSearching] = useState(false);

  return (
    <div className="min-h-screen pb-16 flex flex-col bg-bg-base transition-colors duration-300">
      
      {/* Top Brand Navigation Header */}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        
        {/* TAB 1: STOCK SCORES (Default Landing Page) */}
        {activeTab === 'scores' && (
          <div className="space-y-6">
            {/* Search Grid containing Left: Price Trend Tracker Search & Right: AI based Stocks Search */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              {/* Search section */}
              <section id="search-section" className="lg:col-span-12 rounded-2xl glass-card p-4 sm:p-5 shadow-md shadow-black/5 flex flex-col justify-between">
                <SearchBox 
                  selectedSymbol={selectedSymbol} 
                  onSelectStock={(symbol) => setSelectedSymbol(symbol)} 
                  onAISearchChange={(history, searching) => {
                    setAiSearchHistory(history);
                    setIsAiSearching(searching);
                  }}
                />
              </section>
            </div>

            {/* Dynamic State Layout (Loading / Error / Main Stock Presentation) */}
            <div id="dashboard-content-area" className="transition-all duration-300">
              {isLoading ? (
                /* Premium Shimmering Skeleton Loader layout */
                <div id="skeleton-loader-view" className="space-y-6 animate-pulse">
                  
                  {/* Primary Grid Skeletons */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Chart placeholder */}
                    <div className="lg:col-span-6 h-80 rounded-2xl bg-white/5 border border-border-card/35 p-6 flex flex-col justify-between">
                      <div className="flex justify-between items-center">
                        <div className="space-y-2">
                          <div className="h-4 w-48 bg-white/10 rounded" />
                          <div className="h-3 w-72 bg-white/5 rounded" />
                        </div>
                        <div className="h-8 w-24 bg-white/10 rounded-lg" />
                      </div>
                      <div className="h-40 w-full bg-white/5 rounded-xl border border-white/5 flex items-center justify-center">
                        <RefreshCw className="w-6 h-6 text-accent-cyan animate-spin" />
                      </div>
                      <div className="h-8 w-full bg-white/15 rounded-lg" />
                    </div>

                    {/* Score slider placeholder */}
                    <div className="lg:col-span-6 h-80 rounded-2xl bg-white/5 border border-border-card/35 p-6 space-y-4">
                      <div className="h-4 w-32 bg-white/10 rounded" />
                      <div className="h-16 w-full bg-white/15 rounded-xl" />
                      <div className="h-8 w-full bg-white/5 rounded-lg" />
                      <div className="h-24 w-full bg-white/10 rounded-xl" />
                    </div>
                  </div>

                  {/* Expansion metrics rows skeleton */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="h-32 rounded-2xl bg-white/5 border border-border-card/35" />
                    <div className="h-32 rounded-2xl bg-white/5 border border-border-card/35" />
                  </div>
                </div>

              ) : isError ? (
                /* Resilience State: Graceful API Error Fallback layout */
                <div id="error-fallback-view" className="rounded-2xl glass-card p-8 border border-accent-red/20 text-center space-y-4 max-w-xl mx-auto my-12">
                  <div className="inline-flex p-3 rounded-full bg-accent-red/10 text-accent-red">
                    <AlertCircle className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-bold text-text-main">Simulated Connection Issue</h3>
                  <p className="text-xs text-text-muted leading-relaxed">
                    Could not retrieve active equity metrics for ticker <strong className="text-accent-red">“{selectedSymbol}”</strong>. This mimics standard REST fetch errors (e.g. rate limit exceptions, authentication status errors).
                  </p>
                  <div className="pt-2 flex justify-center space-x-3">
                    <button
                      id="error-retry-btn"
                      onClick={() => refetch()}
                      className="px-4 py-2 rounded-xl bg-accent-blue hover:opacity-90 text-white font-semibold text-xs shadow-md transition-opacity cursor-pointer"
                    >
                      Retry Connection
                    </button>
                    <button
                      id="error-fallback-btn"
                      onClick={() => setSelectedSymbol('RELIANCE')}
                      className="px-4 py-2 rounded-xl bg-white/5 border border-border-card hover:border-text-muted text-text-main font-semibold text-xs transition-colors cursor-pointer"
                    >
                      Reset to RELIANCE
                    </button>
                  </div>
                </div>

              ) : activeStock ? (
                /* Pristine Live Presentation View */
                <div id="loaded-stock-dashboard" className="space-y-6">
                  
                  {/* Primary Layout Segment: Chart on left, Core Recommendation on right */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    
                    {/* 1 Year Trend Area Chart */}
                    <div className="col-span-1 lg:col-span-6 xl:col-span-6 flex flex-col gap-6">
                      <StockChart stock={activeStock} />
                      <ProsConsCard prosCons={activeStock.recommendation.prosCons} />
                    </div>

                    {/* Weighted recommendation gauge + 4 score breakdowns vertically stacked */}
                    <div className="col-span-1 lg:col-span-6 xl:col-span-6 flex flex-col gap-6">
                      <RecommendationCard recommendation={activeStock.recommendation} />
                      
                      <div className="space-y-4">
                        <div className="flex items-center space-x-2 pl-1">
                          <BarChart4 className="w-4 h-4 text-accent-purple" />
                          <h3 className="font-bold tracking-tight text-text-main text-sm">Score per Aspects (Algorithm based, max score 10) :</h3>
                          <span className="text-[10px] bg-accent-purple/10 text-accent-purple font-mono px-2 py-0.5 rounded border border-accent-purple/20">
                            8 Models
                          </span>
                        </div>
                        <MetricsGrid stock={activeStock} />
                      </div>
                    </div>

                  </div>

                </div>
              ) : null}
            </div>
          </div>
        )}

        {/* TAB 2: STOCK PICKING STRATEGIES (Blank/Placeholder design to be built later) */}
        {activeTab === 'strategies' && (
          <div id="strategies-section" className="space-y-6 animate-fade-in">
            <div className="rounded-2xl glass-card p-6 sm:p-8 space-y-3">
              <div className="flex items-center space-x-3 text-accent-purple">
                <Compass className="w-6 h-6" />
                <h2 className="text-xl sm:text-2xl font-black tracking-tight text-text-main">Stock-Picking Strategies</h2>
              </div>
              <p className="text-xs sm:text-sm text-text-muted max-w-2xl leading-relaxed">
                Discover rules-based portfolios and screeners engineered for alpha. These layouts reflect historical quantitative investment strategies designed to filter high-probability market leaders.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Strategy 1: Benjamin Graham Value */}
              <div className="rounded-2xl glass-card p-6 border-l-4 border-accent-green hover:translate-y-[-2px] transition-all duration-300 space-y-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="flex items-center space-x-2 text-accent-green text-xs font-black uppercase tracking-wider">
                      <TrendingUp className="w-3.5 h-3.5" />
                      <span>Graham Value Hub</span>
                    </span>
                    <span className="text-[9px] bg-accent-green/10 text-accent-green px-2 py-0.5 rounded border border-accent-green/20 font-mono font-bold">
                      Preparing Logic
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-text-main">Undervalued Intrinsic Champions</h3>
                  <p className="text-xs text-text-muted leading-relaxed mt-2">
                    Filters equities trading beneath their mathematical Graham Number bounds. Leverages conservative PE multiples, low price-to-book ratios, and solid balance sheets with strong asset coverage support (Piotroski Score ≥ 7).
                  </p>
                </div>
                <div className="pt-3 border-t border-border-card/30 flex justify-between items-center text-[10px] text-text-muted font-mono">
                  <span>PEG Threshold: ≤ 1.5</span>
                  <span>Safety Margin: 25%+</span>
                </div>
              </div>

              {/* Strategy 2: Hyper Growth Expansion */}
              <div className="rounded-2xl glass-card p-6 border-l-4 border-accent-purple hover:translate-y-[-2px] transition-all duration-300 space-y-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="flex items-center space-x-2 text-accent-purple text-xs font-black uppercase tracking-wider">
                      <Zap className="w-3.5 h-3.5" />
                      <span>Disruptive Growth</span>
                    </span>
                    <span className="text-[9px] bg-accent-purple/10 text-accent-purple px-2 py-0.5 rounded border border-accent-purple/20 font-mono font-bold">
                      Preparing Logic
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-text-main">Compound Revenue Scalers</h3>
                  <p className="text-xs text-text-muted leading-relaxed mt-2">
                    Captures market momentum by filtering companies reporting outstanding quarterly profit spikes. Requires 3-year compound revenue growth rates exceeding 25% with rising free cash flows inside high-beta sectors.
                  </p>
                </div>
                <div className="pt-3 border-t border-border-card/30 flex justify-between items-center text-[10px] text-text-muted font-mono">
                  <span>Revenue CAGR: 25%+</span>
                  <span>Beta Limits: Wide</span>
                </div>
              </div>

              {/* Strategy 3: Dividend Sovereigns */}
              <div className="rounded-2xl glass-card p-6 border-l-4 border-accent-blue hover:translate-y-[-2px] transition-all duration-300 space-y-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="flex items-center space-x-2 text-accent-blue text-xs font-black uppercase tracking-wider">
                      <Coins className="w-3.5 h-3.5" />
                      <span>Dividend Cashflow</span>
                    </span>
                    <span className="text-[9px] bg-accent-blue/10 text-accent-blue px-2 py-0.5 rounded border border-accent-blue/20 font-mono font-bold">
                      Preparing Logic
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-text-main">Defensive Cash Sovereigns</h3>
                  <p className="text-xs text-text-muted leading-relaxed mt-2">
                    Identifies resilient stable earnings compounders providing safe, consistent dividend yields. Emphasizes conservative debt profiles (Debt-to-Equity ≤ 0.5) and robust recurring free cash flow yield ratios.
                  </p>
                </div>
                <div className="pt-3 border-t border-border-card/30 flex justify-between items-center text-[10px] text-text-muted font-mono">
                  <span>Min Yield: 3%</span>
                  <span>Payout Ratio: &lt; 65%</span>
                </div>
              </div>

              {/* Strategy 4: Social & News Momentum */}
              <div className="rounded-2xl glass-card p-6 border-l-4 border-accent-cyan hover:translate-y-[-2px] transition-all duration-300 space-y-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="flex items-center space-x-2 text-accent-cyan text-xs font-black uppercase tracking-wider">
                      <BarChart4 className="w-3.5 h-3.5" />
                      <span>NLP Media Index</span>
                    </span>
                    <span className="text-[9px] bg-accent-cyan/10 text-accent-cyan px-2 py-0.5 rounded border border-accent-cyan/20 font-mono font-bold">
                      Preparing Logic
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-text-main">Sentiment-Driven Momentum</h3>
                  <p className="text-xs text-text-muted leading-relaxed mt-2">
                    Utilizes natural language processing calculations on financial news, broker ratings, and online public feeds to trace institutional confidence clusters before options ratio volatility peaks.
                  </p>
                </div>
                <div className="pt-3 border-t border-border-card/30 flex justify-between items-center text-[10px] text-text-muted font-mono">
                  <span>NLP Tone: &gt; +0.40</span>
                  <span>Put/Call Bounds: &lt; 0.90</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: STOCK SCREENER (Blank/Placeholder design to be built later) */}
        {activeTab === 'screener' && (
          <div id="screener-section" className="space-y-6 animate-fade-in">
            <div className="rounded-2xl glass-card p-6 sm:p-8 space-y-3">
              <div className="flex items-center space-x-3 text-accent-blue">
                <Filter className="w-6 h-6" />
                <h2 className="text-xl sm:text-2xl font-black tracking-tight text-text-main">Stock Screener</h2>
              </div>
              <p className="text-xs sm:text-sm text-text-muted max-w-2xl leading-relaxed">
                Configure your own personalized filters to search companies according to your specific investment parameters. Set limits across multi-asset scoring matrices.
              </p>
            </div>

            {/* Screener Filter Control Panel Mockup wrapper */}
            <div className="rounded-2xl glass-card p-6 space-y-6">
              <h3 className="text-xs sm:text-sm font-bold text-text-main flex items-center space-x-2">
                <span>Filter Tuning Panel</span>
                <span className="text-[9px] bg-white/5 border border-border-card text-text-muted px-2 py-0.5 rounded font-mono font-normal">
                  Parameters Frozen
                </span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {/* Sector Input */}
                <div className="space-y-2">
                  <label className="block text-[10px] font-black uppercase tracking-wider text-text-muted">Market Sector</label>
                  <select disabled className="w-full bg-white/5 border border-border-card rounded-xl px-3.5 py-2.5 text-xs text-text-muted cursor-not-allowed">
                    <option>All Industries Combined</option>
                  </select>
                </div>

                {/* Min Score Input */}
                <div className="space-y-2">
                  <label className="block text-[10px] font-black uppercase tracking-wider text-text-muted">Min Aggregate Score</label>
                  <select disabled className="w-full bg-white/5 border border-border-card rounded-xl px-3.5 py-2.5 text-xs text-text-muted cursor-not-allowed">
                    <option>8.0+ (Top Performers)</option>
                  </select>
                </div>

                {/* Valuation limits */}
                <div className="space-y-2">
                  <label className="block text-[10px] font-black uppercase tracking-wider text-text-muted">Max Valuation Multiples</label>
                  <select disabled className="w-full bg-white/5 border border-border-card rounded-xl px-3.5 py-2.5 text-xs text-text-muted cursor-not-allowed">
                    <option>&lt; 20x Forward P/E</option>
                  </select>
                </div>

                {/* Geographical focus */}
                <div className="space-y-2">
                  <label className="block text-[10px] font-black uppercase tracking-wider text-text-muted">Geographical Bound</label>
                  <select disabled className="w-full bg-white/5 border border-border-card rounded-xl px-3.5 py-2.5 text-xs text-text-muted cursor-not-allowed">
                    <option>Global Exchanges</option>
                  </select>
                </div>
              </div>

              {/* Status explanation widget */}
              <div className="rounded-xl border border-accent-blue/20 bg-accent-blue/10 p-4.5 flex items-start space-x-3.5">
                <Info className="w-4.5 h-4.5 text-accent-blue mt-0.5 flex-shrink-0" />
                <div className="text-xs text-accent-blue leading-relaxed">
                  <strong className="block mb-0.5 font-bold">Interactive Filters Standby Status</strong>
                  Filtering logic is currently on standby. The automated Screener is preparing for background database engine registration in our upcoming cloud ledger revision. Once online, this section will allow users to query real-time data records for all indexed assets.
                </div>
              </div>
            </div>

            {/* Empty table mockup to demonstrate structure */}
            <div className="rounded-2xl glass-card overflow-hidden">
              <div className="p-5 border-b border-border-card/30">
                <h4 className="text-xs font-bold text-text-main">Sample Filtered Tickers</h4>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-border-card/40 bg-white/5 text-[10px] font-black uppercase text-text-muted font-mono">
                      <th className="p-4">Ticker</th>
                      <th className="p-4">Company Name</th>
                      <th className="p-4">Aggregate Score</th>
                      <th className="p-4">P/E Ratio</th>
                      <th className="p-4">3Y Rev CAGR</th>
                      <th className="p-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="text-[11px] text-text-muted divide-y divide-border-card/20 divide-dashed">
                    <tr>
                      <td className="p-4 font-bold text-text-main font-mono">RELIANCE</td>
                      <td className="p-4">Reliance Industries Ltd.</td>
                      <td className="p-4 font-mono text-accent-cyan">7.5/10</td>
                      <td className="p-4 font-mono">18.4x</td>
                      <td className="p-4 font-mono">+12.4%</td>
                      <td className="p-4"><span className="px-2 py-0.5 rounded bg-accent-green/10 text-accent-green text-[9px] font-mono font-bold">Strong Value</span></td>
                    </tr>
                    <tr>
                      <td className="p-4 font-bold text-text-main font-mono">TCS</td>
                      <td className="p-4">Tata Consultancy Services</td>
                      <td className="p-4 font-mono text-accent-cyan">7.0/10</td>
                      <td className="p-4 font-mono">24.1x</td>
                      <td className="p-4 font-mono">+9.8%</td>
                      <td className="p-4"><span className="px-2 py-0.5 rounded bg-accent-purple/10 text-accent-purple text-[9px] font-mono font-bold">Stable Core</span></td>
                    </tr>
                    <tr>
                      <td className="p-4 font-bold text-text-main font-mono">HDFCBANK</td>
                      <td className="p-4">HDFC Bank Limited</td>
                      <td className="p-4 font-mono text-accent-cyan">6.1/10</td>
                      <td className="p-4 font-mono">16.8x</td>
                      <td className="p-4 font-mono">+14.2%</td>
                      <td className="p-4"><span className="px-2 py-0.5 rounded bg-accent-blue/10 text-accent-blue text-[9px] font-mono font-bold">Defensive Selection</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Floating Mini footer details */}
      <footer id="platform-footer" className="text-center py-6 text-[11px] text-text-muted border-t border-border-card/30 mt-auto px-4 max-w-7xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between gap-3">
        <p>© Copyright Disclaimer with copyrights for 2026-2027. It is not open source and any usage, distribution or mimic will trigger legal proceedings.</p>
        <div className="flex items-center space-x-4">
          <span className="flex items-center text-accent-cyan">
            <Zap className="w-3.5 h-3.5 mr-1 text-accent-cyan" /> Contact for integrating these proprietry Algorithm APIs in your product
          </span>
          <span className="text-text-muted">|</span>
          <span className="hover:text-text-main transition-colors select-all">amber.mails@gmail.com</span>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <DashboardContent />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
