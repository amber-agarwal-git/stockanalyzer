/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip as RechartsTooltip, 
  CartesianGrid,
  Bar,
  ComposedChart
} from 'recharts';
import { StockData, PricePoint } from '../types';
import { Calendar, TrendingUp, TrendingDown, RefreshCw } from 'lucide-react';

interface StockChartProps {
  stock: StockData;
}

type Timeframe = '1M' | '3M' | '6M' | '1Y';

export const StockChart: React.FC<StockChartProps> = ({ stock }) => {
  const [timeframe, setTimeframe] = useState<Timeframe>('1Y');

  // Filter or slice historical data based on selected timeframe
  const displayedData = useMemo(() => {
    const totalPoints = stock.historicalData.length;
    switch (timeframe) {
      case '1M':
        return stock.historicalData.slice(totalPoints - 3); // ~45 days
      case '3M':
        return stock.historicalData.slice(totalPoints - 6); // ~90 days
      case '6M':
        return stock.historicalData.slice(totalPoints - 12); // ~180 days
      case '1Y':
      default:
        return stock.historicalData; // 24 points, fully 360 days
    }
  }, [stock.historicalData, timeframe]);

  // Calculate high, low, and performance over active timeframe
  const statistics = useMemo(() => {
    if (!displayedData.length) return { high: 0, low: 0, change: 0, isPositive: true };
    const prices = displayedData.map(d => d.price);
    const high = Math.max(...prices);
    const low = Math.min(...prices);
    const initialPrice = displayedData[0].price;
    const finalPrice = displayedData[displayedData.length - 1].price;
    const changePercent = ((finalPrice - initialPrice) / initialPrice) * 100;
    return {
      high,
      low,
      change: Math.round(changePercent * 100) / 100,
      isPositive: changePercent >= 0
    };
  }, [displayedData]);

  // Custom tooltips matching the dashboard glassmorphic motif
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload as PricePoint;
      return (
        <div className="p-3 rounded-lg glass-card bg-slate-950/95 border border-white/10 text-xs font-mono text-slate-100 shadow-2xl space-y-1">
          <p className="font-bold text-text-muted">{data.date}</p>
          <p className="flex justify-between space-x-4">
            <span className="text-slate-400">Price:</span>
            <span className="text-accent-cyan font-bold">
              {stock.currencySymbol}{data.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </span>
          </p>
          <p className="flex justify-between space-x-4">
            <span className="text-slate-400">Vol:</span>
            <span className="text-accent-purple font-bold">
              {(data.volume / 1000).toFixed(1)}k
            </span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div id="stock-chart-panel" className="rounded-2xl glass-card p-4 sm:p-6 w-full space-y-4">
      
      {/* Chart Headers & Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center space-x-2">
          <div className="p-2 rounded-xl bg-accent-cyan/10 text-accent-cyan">
            <Calendar className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold font-sans tracking-tight">Charts: Price, Volume</h3>
            <p className="text-[10px] sm:text-xs text-text-muted">1-year historical chart & consolidated transaction volumes</p>
          </div>
        </div>

        {/* Timeframe selector bar */}
        <div className="flex items-center space-x-1 p-1 bg-white/5 border border-border-card rounded-xl">
          {(['1M', '3M', '6M', '1Y'] as Timeframe[]).map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold tracking-wider transition-all cursor-pointer ${
                timeframe === tf
                  ? 'bg-gradient-to-r from-accent-cyan to-accent-blue text-white shadow shadow-accent-cyan/25'
                  : 'text-text-muted hover:text-text-main hover:bg-white/5'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      {/* Mini Technical Metrics row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white/5 border border-border-card/30 rounded-xl p-3 text-xs sm:text-sm">
        <div className="space-y-0.5 border-r border-border-card/50">
          <span className="text-[10px] text-text-muted font-bold tracking-wider uppercase block">Timeframe Return</span>
          <span className={`font-bold font-mono flex items-center space-x-1 ${statistics.isPositive ? 'text-accent-green' : 'text-accent-red'}`}>
            {statistics.isPositive ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
            <span>{statistics.isPositive ? '+' : ''}{statistics.change}%</span>
          </span>
        </div>
        <div className="space-y-0.5 sm:border-r border-border-card/50">
          <span className="text-[10px] text-text-muted font-bold tracking-wider uppercase block">Peak Range</span>
          <span className="font-bold font-mono text-text-main">
            {stock.currencySymbol}{statistics.high.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </span>
        </div>
        <div className="space-y-0.5 border-r border-border-card/50">
          <span className="text-[10px] text-text-muted font-bold tracking-wider uppercase block">Trough Range</span>
          <span className="font-bold font-mono text-text-main">
            {stock.currencySymbol}{statistics.low.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </span>
        </div>
        <div className="space-y-0.5">
          <span className="text-[10px] text-text-muted font-bold tracking-wider uppercase block font-sans">Active Interval</span>
          <span className="font-bold flex items-center space-x-1.5 text-[11px] text-text-muted">
            <RefreshCw className="w-3 h-3 text-accent-purple" />
            <span>15-Day Cadence</span>
          </span>
        </div>
      </div>

      {/* Main Area-Chart Visual Container */}
      <div className="h-64 sm:h-72 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={displayedData} margin={{ top: 10, right: 5, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--accent-cyan)" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="var(--accent-cyan)" stopOpacity={0.0}/>
              </linearGradient>
            </defs>
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="var(--border-card)" 
              vertical={false} 
            />
            <XAxis 
              dataKey="date" 
              stroke="var(--text-muted)" 
              fontSize={10} 
              fontFamily="JetBrains Mono"
              tickLine={false} 
              axisLine={false}
              dy={10}
            />
            <YAxis 
              yAxisId="price"
              stroke="var(--text-muted)" 
              fontSize={10} 
              fontFamily="JetBrains Mono"
              domain={['auto', 'auto']}
              tickLine={false} 
              axisLine={false}
              tickFormatter={(v) => `${stock.currencySymbol}${v}`}
            />
            {/* Volume axis hidden but calibrated */}
            <YAxis 
              yAxisId="volume"
              orientation="right"
              stroke="transparent" 
              domain={[0, (max: number) => max * 4]} 
              axisLine={false}
              tick={false}
            />
            <RechartsTooltip content={<CustomTooltip />} />
            
            {/* Volume Bars on Background */}
            <Bar 
              yAxisId="volume"
              dataKey="volume" 
              fill="var(--accent-purple)" 
              radius={[3, 3, 0, 0]}
              opacity={0.12} 
              barSize={12}
            />
            
            {/* Linear Glow Area Path */}
            <Area
              yAxisId="price"
              type="monotone"
              dataKey="price"
              stroke="var(--accent-cyan)"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#colorPrice)"
              activeDot={{ r: 6, strokeWidth: 0, fill: 'var(--accent-blue)' }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
