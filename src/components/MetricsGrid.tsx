/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { StockData } from '../types';
import { Tooltip } from './Tooltip';
import { 
  LineChart, 
  ChevronDown, 
  ChevronUp, 
  TrendingUp, 
  Activity, 
  PieChart, 
  Gauge, 
  Info 
} from 'lucide-react';

interface MetricsGridProps {
  stock: StockData;
}

export const MetricsGrid: React.FC<MetricsGridProps> = ({ stock }) => {
  // Store expanded state for the 4 core cards
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({
    fundamental: true, // open Fundamental by default
    technical: false,
    sector: false,
    momentum: false
  });

  const toggleExpand = (cardKey: string) => {
    setExpandedCards(prev => ({
      ...prev,
      [cardKey]: !prev[cardKey]
    }));
  };

  // Common styles for label/values inside list items
  const ParameterRow: React.FC<{
    label: string;
    value: string | number;
    info: string;
    badgeStyle?: string;
  }> = ({ label, value, info, badgeStyle = '' }) => (
    <div className="flex items-center justify-between py-2.5 border-b border-border-card/40 last:border-0 hover:bg-white/5 px-2 rounded-lg transition-colors">
      <div className="flex items-center space-x-1.5 min-w-0">
        <span className="text-xs font-semibold text-text-muted truncate">{label}</span>
        <Tooltip content={info}>
          <button className="text-text-muted hover:text-accent-cyan p-0.5 outline-none" aria-label={`Info about ${label}`}>
            <Info className="w-3.5 h-3.5 shrink-0 hover:scale-105" />
          </button>
        </Tooltip>
      </div>
      <span className={`text-xs font-mono font-bold text-text-main ${badgeStyle}`}>
        {value}
      </span>
    </div>
  );

  return (
    <div id="metrics-analytics-grid" className="flex flex-col gap-5 w-full">
      
      {/* CARD 1: FUNDAMENTAL ANALYSIS CARD */}
      <div 
        id="card-fundamental-analysis" 
        className="rounded-2xl glass-card overflow-hidden"
      >
        {/* Accordion header */}
        <div 
          onClick={() => toggleExpand('fundamental')} 
          className="p-5 flex items-center justify-between cursor-pointer hover:bg-white/5 transition-all select-none"
        >
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-accent-cyan/15 text-accent-cyan">
              <LineChart className="w-4 h-4" />
            </div>
            <div className="flex items-center space-x-1.5">
              <h3 className="text-sm sm:text-base font-bold tracking-tight text-text-main">Fundamental Analysis</h3>
              <Tooltip content="Fundamental valuation checks: Examines earnings yields, P/E multiples, balance sheet leverages, book equity returns, and net global margins." />
            </div>
          </div>

          <div className="flex items-center space-x-3" onClick={(e) => e.stopPropagation()}>
            <span className="px-3 py-1 rounded-lg text-xs font-black bg-accent-cyan/15 border border-accent-cyan/35 text-accent-cyan font-mono">
              Score: {stock.fundamentalScore}/10
            </span>
            <button 
              onClick={() => toggleExpand('fundamental')}
              className="p-1.5 rounded-lg border border-border-card text-text-muted hover:text-text-main hover:bg-white/5 cursor-pointer"
              title="Expand Details"
            >
              {expandedCards.fundamental ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Accordion content with smooth Height animation */}
        <AnimatePresence initial={false}>
          {expandedCards.fundamental && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              exit={{ height: 0 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="p-5 pt-0 border-t border-border-card/30 space-y-1">
                <ParameterRow 
                  label="P/E Ratio" 
                  value={stock.fundamentals.pe.value} 
                  info={stock.fundamentals.pe.info}
                />
                <ParameterRow 
                  label="Sector P/E" 
                  value={stock.fundamentals.sectorPe.value} 
                  info={stock.fundamentals.sectorPe.info}
                />
                <ParameterRow 
                  label="P/B Ratio" 
                  value={stock.fundamentals.pb.value} 
                  info={stock.fundamentals.pb.info}
                />
                <ParameterRow 
                  label="Sector P/B" 
                  value={stock.fundamentals.sectorPb.value} 
                  info={stock.fundamentals.sectorPb.info}
                />
                <ParameterRow 
                  label="EPS Growth (YoY)" 
                  value={stock.fundamentals.epsGrowth.value} 
                  info={stock.fundamentals.epsGrowth.info}
                  badgeStyle="text-accent-green bg-accent-green/10 px-1.5 py-0.5 rounded"
                />
                <ParameterRow 
                  label="Net Profit" 
                  value={stock.fundamentals.netProfit.value} 
                  info={stock.fundamentals.netProfit.info}
                />
                <ParameterRow 
                  label="Market Capitalization" 
                  value={stock.fundamentals.marketCap.value} 
                  info={stock.fundamentals.marketCap.info}
                />
                <ParameterRow 
                  label="Debt to Equity (D/E)" 
                  value={stock.fundamentals.debtEquity.value} 
                  info={stock.fundamentals.debtEquity.info}
                  badgeStyle={Number(stock.fundamentals.debtEquity.value) <= 0.5 ? 'text-accent-green' : 'text-accent-red'}
                />
                <ParameterRow 
                  label="Return on Equity (ROE)" 
                  value={stock.fundamentals.roe.value} 
                  info={stock.fundamentals.roe.info}
                  badgeStyle="text-accent-cyan"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* CARD 2: TECHNICAL ANALYSIS CARD */}
      <div 
        id="card-technical-analysis" 
        className="rounded-2xl glass-card overflow-hidden"
      >
        {/* Accordion header */}
        <div 
          onClick={() => toggleExpand('technical')} 
          className="p-5 flex items-center justify-between cursor-pointer hover:bg-white/5 transition-all select-none"
        >
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-accent-purple/15 text-accent-purple">
              <Activity className="w-4 h-4 animate-pulse" />
            </div>
            <div className="flex items-center space-x-1.5">
              <h3 className="text-sm sm:text-base font-bold tracking-tight text-text-main">Technical Analysis</h3>
              <Tooltip content="Technical oscillators check: Calculates buying fatigue (RSI), moving average cross indicators (MACD), consolidated momentum volumes, and 52-week position percentile bands." />
            </div>
          </div>

          <div className="flex items-center space-x-3" onClick={(e) => e.stopPropagation()}>
            <span className="px-3 py-1 rounded-lg text-xs font-black bg-accent-purple/15 border border-accent-purple/35 text-accent-purple font-mono">
              Score: {stock.technicalScore}/10
            </span>
            <button 
              onClick={() => toggleExpand('technical')}
              className="p-1.5 rounded-lg border border-border-card text-text-muted hover:text-text-main hover:bg-white/5 cursor-pointer"
              title="Expand Details"
            >
              {expandedCards.technical ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Accordion content with smooth Height animation */}
        <AnimatePresence initial={false}>
          {expandedCards.technical && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              exit={{ height: 0 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="p-5 pt-0 border-t border-border-card/30 space-y-1">
                <ParameterRow 
                  label="RSI (14-Day Oscillator)" 
                  value={stock.technicals.rsi.value} 
                  info={stock.technicals.rsi.info}
                  badgeStyle={Number(stock.technicals.rsi.value) >= 70 ? 'text-amber-500 font-extrabold' : 'text-accent-cyan'}
                />
                <ParameterRow 
                  label="MACD Histogram" 
                  value={stock.technicals.macd.value} 
                  info={stock.technicals.macd.info}
                  badgeStyle="text-accent-green font-mono"
                />
                <ParameterRow 
                  label="Volume Ratio" 
                  value={stock.technicals.volumeRatio.value} 
                  info={stock.technicals.volumeRatio.info}
                />
                <ParameterRow 
                  label="52-Week Range Position" 
                  value={stock.technicals.fiftyTwoWeekPosition.value} 
                  info={stock.technicals.fiftyTwoWeekPosition.info}
                  badgeStyle="text-accent-purple"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* CARD 3: SECTOR ANALYSIS CARD */}
      <div 
        id="card-sector-analysis" 
        className="rounded-2xl glass-card overflow-hidden"
      >
        {/* Accordion header */}
        <div 
          onClick={() => toggleExpand('sector')} 
          className="p-5 flex items-center justify-between cursor-pointer hover:bg-white/5 transition-all select-none"
        >
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-accent-blue/15 text-accent-blue">
              <PieChart className="w-4 h-4" />
            </div>
            <div className="flex items-center space-x-1.5">
              <h3 className="text-sm sm:text-base font-bold tracking-tight text-text-main">Sector Analysis</h3>
              <Tooltip content="Peer group standings: Benchmarks the equity against industry sector valuations, sector compound growths, ROE percentiles, and median margin ranks." />
            </div>
          </div>

          <div className="flex items-center space-x-3" onClick={(e) => e.stopPropagation()}>
            <span className="px-3 py-1 rounded-lg text-xs font-black bg-accent-blue/15 border border-accent-blue/35 text-accent-blue font-mono">
              Score: {stock.sectorScore}/10
            </span>
            <button 
              onClick={() => toggleExpand('sector')}
              className="p-1.5 rounded-lg border border-border-card text-text-muted hover:text-text-main hover:bg-white/5 cursor-pointer"
              title="Expand Details"
            >
              {expandedCards.sector ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Accordion content with smooth Height animation */}
        <AnimatePresence initial={false}>
          {expandedCards.sector && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              exit={{ height: 0 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="p-5 pt-0 border-t border-border-card/30 space-y-1">
                <ParameterRow 
                  label="Sector P/E Percentile" 
                  value={stock.sector.pePercentile.value} 
                  info={stock.sector.pePercentile.info}
                />
                <ParameterRow 
                  label="Industry Growth Tailwind" 
                  value={stock.sector.tailwind.value} 
                  info={stock.sector.tailwind.info}
                  badgeStyle="text-accent-green"
                />
                <ParameterRow 
                  label="ROE Rank vs Sector Median" 
                  value={`#${stock.sector.roeRank.value}`} 
                  info={stock.sector.roeRank.info}
                  badgeStyle="text-accent-cyan"
                />
                <ParameterRow 
                  label="Margin Rank vs Peers" 
                  value={`#${stock.sector.marginRank.value}`} 
                  info={stock.sector.marginRank.info}
                  badgeStyle="text-accent-purple"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* CARD 4: MOMENTUM ANALYSIS CARD */}
      <div 
        id="card-momentum-analysis" 
        className="rounded-2xl glass-card overflow-hidden"
      >
        {/* Accordion header */}
        <div 
          onClick={() => toggleExpand('momentum')} 
          className="p-5 flex items-center justify-between cursor-pointer hover:bg-white/5 transition-all select-none"
        >
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-accent-green/15 text-accent-green">
              <Gauge className="w-4 h-4" />
            </div>
            <div className="flex items-center space-x-1.5">
              <h3 className="text-sm sm:text-base font-bold tracking-tight text-text-main">Momentum Analysis</h3>
              <Tooltip content="Trend velocity parameters: Measures multi-month relative stock-price breakouts and comparative index performance (relative strength scaling factors)." />
            </div>
          </div>

          <div className="flex items-center space-x-3" onClick={(e) => e.stopPropagation()}>
            <span className="px-3 py-1 rounded-lg text-xs font-black bg-accent-green/15 border border-accent-green/35 text-accent-green font-mono">
              Score: {stock.momentumScore}/10
            </span>
            <button 
              onClick={() => toggleExpand('momentum')}
              className="p-1.5 rounded-lg border border-border-card text-text-muted hover:text-text-main hover:bg-white/5 cursor-pointer"
              title="Expand Details"
            >
              {expandedCards.momentum ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Accordion content with smooth Height animation */}
        <AnimatePresence initial={false}>
          {expandedCards.momentum && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              exit={{ height: 0 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="p-5 pt-0 border-t border-border-card/30 space-y-1">
                <ParameterRow 
                  label="Price Return 3M" 
                  value={stock.momentum.return3M.value} 
                  info={stock.momentum.return3M.info}
                  badgeStyle={stock.momentum.return3M.value.toString().startsWith('-') ? 'text-accent-red' : 'text-accent-green'}
                />
                <ParameterRow 
                  label="Price Return 6M" 
                  value={stock.momentum.return6M.value} 
                  info={stock.momentum.return6M.info}
                  badgeStyle={stock.momentum.return6M.value.toString().startsWith('-') ? 'text-accent-red' : 'text-accent-green'}
                />
                <ParameterRow 
                  label="Price Return 12M" 
                  value={stock.momentum.return12M.value} 
                  info={stock.momentum.return12M.info}
                  badgeStyle={stock.momentum.return12M.value.toString().startsWith('-') ? 'text-accent-red' : 'text-accent-green'}
                />
                <ParameterRow 
                  label="Relative strength (RS)" 
                  value={stock.momentum.relativeStrength.value} 
                  info={stock.momentum.relativeStrength.info}
                  badgeStyle={Number(stock.momentum.relativeStrength.value) >= 0 ? 'text-accent-green' : 'text-accent-red'}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
};
