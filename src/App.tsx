/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from './context/ThemeContext';
import { Header } from './components/Header';
import { SearchBox } from './components/SearchBox';
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
  Github
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
  const { data: activeStock, isLoading, isError, error, refetch } = useStockDetailsQuery(selectedSymbol);

  return (
    <div className="min-h-screen pb-16 flex flex-col bg-bg-base transition-colors duration-300">
      
      {/* Top Brand Navigation Header */}
      <Header />

      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        
        {/* Search section */}
        <section id="search-section" className="rounded-2xl glass-card p-5 sm:p-6 shadow-md shadow-black/5">
          <SearchBox 
            selectedSymbol={selectedSymbol} 
            onSelectStock={(symbol) => setSelectedSymbol(symbol)} 
          />
        </section>

        {/* Dynamic State Layout (Loading / Error / Main Stock Presentation) */}
        <div id="dashboard-content-area" className="transition-all duration-300">
          {isLoading ? (
            /* Premium Shimmering Skeleton Loader layout */
            <div id="skeleton-loader-view" className="space-y-6 animate-pulse">
              
              {/* Primary Grid Skeletons */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Chart placeholder */}
                <div className="lg:col-span-8 h-80 rounded-2xl bg-white/5 border border-border-card/35 p-6 flex flex-col justify-between">
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
                <div className="lg:col-span-4 h-80 rounded-2xl bg-white/5 border border-border-card/35 p-6 space-y-4">
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
                <div className="col-span-1 lg:col-span-7 xl:col-span-8 flex flex-col gap-6">
                  <StockChart stock={activeStock} />
                  <ProsConsCard prosCons={activeStock.recommendation.prosCons} />
                </div>

                {/* Weighted recommendation gauge + 4 score breakdowns vertically stacked */}
                <div className="col-span-1 lg:col-span-5 xl:col-span-4 flex flex-col gap-6">
                  <RecommendationCard recommendation={activeStock.recommendation} />
                  
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2 pl-1">
                      <BarChart4 className="w-4 h-4 text-accent-purple" />
                      <h3 className="font-bold tracking-tight text-text-main text-sm">Comprehensive Score Overview</h3>
                      <span className="text-[10px] bg-accent-purple/10 text-accent-purple font-mono px-2 py-0.5 rounded border border-accent-purple/20">
                        4 Models
                      </span>
                    </div>
                    <MetricsGrid stock={activeStock} />
                  </div>
                </div>

              </div>

            </div>
          ) : null}
        </div>
      </main>

      {/* Floating Mini footer details */}
      <footer id="platform-footer" className="text-center py-6 text-[11px] text-text-muted border-t border-border-card/30 mt-auto px-4 max-w-7xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between gap-3">
        <p>© 2026 Stock Analyzer Inc. Powered by advanced predictive algorithms and automated client caching wrappers.</p>
        <div className="flex items-center space-x-4">
          <span className="flex items-center text-accent-cyan">
            <Zap className="w-3.5 h-3.5 mr-1 text-accent-cyan" /> Ready for REST API Integration
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
