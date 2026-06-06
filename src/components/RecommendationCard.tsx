/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { RecommendationInfo } from '../types';
import { Vote, RotateCcw, AlertTriangle } from 'lucide-react';

interface RecommendationCardProps {
  recommendation: RecommendationInfo;
}

export const RecommendationCard: React.FC<RecommendationCardProps> = ({ recommendation }) => {
  // Allow manual slider sliding for hypothetical analysis exploration!
  const [sliderVal, setSliderVal] = useState(recommendation.score);

  // Sync whenever stock recommendation modifies
  useEffect(() => {
    setSliderVal(recommendation.score);
  }, [recommendation]);

  const currentLabel = React.useMemo(() => {
    if (sliderVal < 4) return 'Sell';
    if (sliderVal < 7) return 'Hold';
    return 'Buy';
  }, [sliderVal]);

  const getLabelColor = (label: string) => {
    switch (label) {
      case 'Sell': return 'text-accent-red bg-accent-red/10 border-accent-red/20';
      case 'Hold': return 'text-amber-500 bg-amber-500/10 border-amber-500/20';
      case 'Buy':
      default:
        return 'text-accent-green bg-accent-green/10 border-accent-green/20';
    }
  };

  const isModified = Math.abs(sliderVal - recommendation.score) > 0.05;

  return (
    <div id="recommendation-card" className="rounded-2xl glass-card p-5 sm:p-6 space-y-6">
      
      {/* Card Title & Reset Action */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="p-2 rounded-xl bg-accent-blue/10 text-accent-blue">
            <Vote className="w-4 h-4 animate-bounce" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold font-sans tracking-tight">AI Analytical Recommendation</h3>
            <p className="text-[10px] sm:text-xs text-text-muted">Weighted algorithm recommendation index & core rationale</p>
          </div>
        </div>

        {/* Hypothetical Reset button */}
        {isModified && (
          <button
            id="reset-slider-score"
            onClick={() => setSliderVal(recommendation.score)}
            className="flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-white/5 border border-border-card text-[11px] font-bold text-text-main hover:bg-white/15 hover:border-accent-cyan hover:text-accent-cyan transition-all cursor-pointer animate-fade-in"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* Unified Score Indicator Box */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white/5 border border-border-card/30 flex flex-col md:flex-row items-center justify-between gap-5">
        
        {/* Large Score Dial Emulation */}
        <div className="flex items-center space-x-4">
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center border-4 border-dashed border-border-card">
            
            {/* Dynamic circle glows */}
            <div className={`absolute inset-0 rounded-full blur-md opacity-25 ${
              currentLabel === 'Sell' ? 'bg-accent-red' : currentLabel === 'Hold' ? 'bg-amber-500' : 'bg-accent-green'
            }`} />

            <span className="text-xl sm:text-2xl font-mono font-black tracking-tight z-10">
              {sliderVal.toFixed(1)}
            </span>
          </div>

          <div>
            <span className={`inline-block px-3 py-1 rounded-lg text-xs font-black uppercase tracking-wider border ${getLabelColor(currentLabel)}`}>
              {currentLabel} Signalling
            </span>
            <p className="text-[10px] sm:text-xs text-text-muted mt-1 font-medium max-w-[200px]">
              {currentLabel === 'Sell' 
                ? 'High risk indicator ratios. Liquidating exposure recommended.' 
                : currentLabel === 'Hold' 
                ? 'Fair market indexing. Maintain active portfolio allocation.' 
                : 'Favorable value metrics. High prospective equity gain channels.'
              }
            </p>
          </div>
        </div>

        {/* Interactive Slider Track (Starting Red, Amber middle, Green right) */}
        <div className="w-full md:max-w-md flex flex-col space-y-2">
          <div className="flex justify-between items-center text-[10px] font-extrabold uppercase tracking-wider text-text-muted">
            <span className="text-accent-red">Sell (0-4.0)</span>
            <span className="text-amber-500">Hold (4.0-7.0)</span>
            <span className="text-accent-green">Buy (7.0-10.0)</span>
          </div>

          <div className="relative pt-2 pb-1">
            <input
              id="recommendation-score-slider"
              type="range"
              min="0"
              max="10"
              step="0.1"
              value={sliderVal}
              onChange={(e) => setSliderVal(parseFloat(e.target.value))}
              className="rec-slider cursor-grab active:cursor-grabbing w-full"
            />
            
            {/* Slide Marker glow shadow line details */}
            <div 
              style={{ left: `${sliderVal * 10}%` }}
              className={`absolute top-4 w-1.5 h-4 -ml-0.75 pointer-events-none rounded blur-sm opacity-60 ${
                currentLabel === 'Sell' ? 'bg-accent-red' : currentLabel === 'Hold' ? 'bg-amber-400' : 'bg-accent-green'
              }`}
            />
          </div>

          {isModified && (
            <p className="text-[10px] text-accent-purple font-semibold italic text-center sm:text-right flex items-center justify-center sm:justify-end space-x-1">
              <AlertTriangle className="w-3 h-3 text-accent-purple shrink-0" />
              <span>Simulating hypothetical scenario analysis state.</span>
            </p>
          )}
        </div>
      </div>

    </div>
  );
};
