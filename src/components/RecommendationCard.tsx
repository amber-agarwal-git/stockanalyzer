/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { RecommendationInfo } from '../types';
import { Vote, RotateCcw, AlertTriangle, TrendingDown, TrendingUp } from 'lucide-react';
import { Tooltip } from './Tooltip';

interface RecommendationCardProps {
  recommendation: RecommendationInfo;
}

export const RecommendationCard: React.FC<RecommendationCardProps> = ({ recommendation }) => {
  // 1- Change its default score value to 5
  const [sliderVal, setSliderVal] = useState(5.0);
  const [isSliderDisabled, setIsSliderDisabled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userReasoning, setUserReasoning] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Reset ratings & interactions when recommendation/stock changes
  useEffect(() => {
    setSliderVal(5.0);
    setIsSliderDisabled(false);
    setUserReasoning('');
    setIsSubmitted(false);
  }, [recommendation]);

  const calcScore = recommendation.score;
  const calcLabel = React.useMemo(() => {
    if (calcScore < 4) return 'Sell';
    if (calcScore < 7) return 'Hold';
    return 'Buy';
  }, [calcScore]);

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

  const isModified = Math.abs(sliderVal - 5.0) > 0.05;

  const handleSubmitRating = () => {
    setIsSliderDisabled(true);
    setIsModalOpen(true);
  };

  const handleFinalSubmit = () => {
    setIsSubmitted(true);
    setIsModalOpen(false);
  };

  return (
    <div id="recommendation-card" className="rounded-2xl glass-card p-3 sm:p-4 space-y-2.5 relative">
      
      {/* 1 & 2: Header title showing Buy/Hold/Sell Signal center-aligned & custom warning with tooltip */}
      <div className="flex flex-col items-center justify-center text-center relative py-0 border-b border-white/5 pb-1">
        <span className="text-[9px] font-black uppercase tracking-widest text-text-muted mb-0.5">
          Score per Aspects (Algorithm based, max score 10) :
        </span>
        
        <div className="flex items-center justify-center space-x-2">
          <div 
            id="recommendation-header-signal" 
            className={`px-5 py-1.5 rounded-xl text-xs sm:text-sm font-black uppercase tracking-widest transition-all duration-300 scale-102 ${
              calcLabel === 'Sell'
                ? 'bg-gradient-to-r from-red-500 via-rose-500 to-red-600 text-white shadow-lg shadow-red-500/25'
                : calcLabel === 'Hold'
                ? 'bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 text-slate-950 shadow-lg shadow-amber-500/25 font-extrabold'
                : 'bg-gradient-to-r from-emerald-400 via-green-400 to-emerald-500 text-slate-950 shadow-lg shadow-green-400/25 font-extrabold'
            }`}
          >
            {calcLabel} Signal
          </div>
          
          <Tooltip 
            content="Scoring done based on non-standard algorithms and hence apply your research and logic while taking any decisions"
            position="top"
          >
            <div className="p-1 px-1.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 cursor-help flex items-center justify-center animate-pulse">
              <AlertTriangle className="w-3.5 h-3.5" />
            </div>
          </Tooltip>
        </div>

        {/* Hypothetical Reset button (Enabled if user changed rating and is not submitted/locked yet) */}
        {isModified && !isSliderDisabled && (
          <button
            id="reset-slider-score"
            onClick={() => setSliderVal(5.0)}
            className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center space-x-1 px-2 py-1 rounded-lg bg-white/5 border border-border-card text-[9px] font-bold text-text-main hover:bg-white/15 hover:border-accent-cyan hover:text-accent-cyan transition-all cursor-pointer animate-fade-in"
          >
            <RotateCcw className="w-2.5 h-2.5" />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* Unified Score Indicator Box */}
      <div className="p-2 rounded-2xl bg-white/5 border border-border-card/30 flex flex-col md:flex-row items-center justify-between gap-5">
        
        {/* Calculated score: INCREASED BY 20% on Left (AI algorithm based Overall Score out of 10) */}
        <div className="flex flex-col items-center justify-center space-y-4 shrink-0 w-full md:flex-1 min-w-[170px]">
          <span className="text-[9px] font-black uppercase tracking-widest text-accent-cyan/85 text-center max-w-[155px] leading-tight">
            AI algorithm based Overall Score out of 10
          </span>
          {/* Sizing increased by 20%: w-16 h-16 -> w-20 h-20, sm:w-20 sm:h-20 -> sm:w-24 sm:h-24, text size -> text-2xl sm:text-3xl */}
          <div className={`relative w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center border-4 border-dashed transition-all duration-500 z-10 ${
            calcLabel === 'Sell' 
              ? 'overall-glow-red border-accent-red/60 bg-accent-red/5' 
              : calcLabel === 'Hold' 
              ? 'overall-glow-amber border-amber-500/60 bg-amber-500/5' 
              : 'overall-glow-green border-accent-green/65 bg-accent-green/5'
          }`}>
            <span className="text-2xl sm:text-3xl font-mono font-black tracking-tight text-white">
              {calcScore.toFixed(1)}
            </span>
          </div>
        </div>

        {/* Interactive Custom Rating Box (Consolidating everything to make it feel fitted and premium) */}
        <div className="md:w-[45%] flex flex-col space-y-1 p-2 rounded-xl bg-white/[0.02] border border-white/5 w-full">
          
          {/* Header of this User rating section: simple title only */}
          <div className="text-left">
            <span className="text-[9px] font-black uppercase tracking-widest text-accent-cyan">
              USERS Submitted Sentiment Rating (average)
            </span>
          </div>

          {/* Slider input, 5.0 score circle (increased by 75% to w-14 h-14) & Submit block: Horizontal layout */}
          <div className="flex flex-col items-center gap-2 w-full">
            
            {/* Consolidates the 5.0 score circle right here: increased size by 75% to w-14 h-14! */}
            <div className="flex items-center gap-2">
              <TrendingDown className="w-4 h-4 text-accent-red" />
              <div className={`relative w-12 h-12 rounded-full flex items-center justify-center border border-dashed transition-all duration-500 z-10 shrink-0 ${
                currentLabel === 'Sell' 
                  ? 'overall-glow-red border-accent-red/60 bg-accent-red/5' 
                  : currentLabel === 'Hold' 
                  ? 'overall-glow-amber border-amber-500/60 bg-amber-500/5' 
                  : 'overall-glow-green border-accent-green/65 bg-accent-green/5'
              }`}>
                <span className="text-sm sm:text-base font-mono font-black tracking-tight text-white">
                  {sliderVal.toFixed(1)}
                </span>
              </div>
              <TrendingUp className="w-4 h-4 text-accent-green" />
            </div>

            {/* The actual slider track - now very clean and spacious inside this container */}
            <div className="flex-1 w-full relative py-1">
              <input
                id="recommendation-score-slider"
                type="range"
                min="0"
                max="10"
                step="0.1"
                value={sliderVal}
                onChange={(e) => setSliderVal(parseFloat(e.target.value))}
                disabled={isSliderDisabled}
                className="rec-slider cursor-grab active:cursor-grabbing w-full disabled:opacity-50 disabled:cursor-not-allowed"
              />
              
              {/* Slide Marker glow shadow line details */}
              <div 
                style={{ left: `${sliderVal * 10}%` }}
                className={`absolute top-2 w-1.5 h-3 -ml-0.75 pointer-events-none rounded blur-[2px] opacity-65 ${
                  currentLabel === 'Sell' ? 'bg-accent-red' : currentLabel === 'Hold' ? 'bg-amber-400' : 'bg-accent-green'
                }`}
              />
            </div>

            {/* Submit rating button - beautifully compact and high contrast */}
            <div className="shrink-0 w-full flex flex-col items-stretch justify-center">
              <button
                id="submit-rating-button"
                onClick={handleSubmitRating}
                disabled={isSliderDisabled}
                className={`py-1.5 px-3 rounded-lg text-[9px] font-black tracking-widest uppercase transition-all duration-200 cursor-pointer text-center ${
                  isSliderDisabled
                    ? 'bg-emerald-500/10 text-emerald-400/80 border border-emerald-500/20 cursor-not-allowed'
                    : 'bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 text-white hover:opacity-95 shadow-sm shadow-cyan-500/5 active:scale-95'
                }`}
              >
                {isSliderDisabled ? 'LOCKED' : 'Submit rating'}
              </button>
              
              {isSubmitted && (
                <span className="text-[8px] text-emerald-400 font-bold italic text-center animate-pulse mt-1">
                  ✓ Recorded
                </span>
              )}
            </div>

          </div>

        </div>
      </div>

      {/* Pop-up modal text box */}
      {isModalOpen && (
        <div 
          id="rating-modal-backdrop"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in"
          onClick={() => setIsModalOpen(false)}
        >
          <div 
            id="rating-modal"
            className="w-full max-w-md p-6 rounded-2xl bg-slate-900 border border-slate-700/80 text-slate-100 shadow-2xl relative text-left"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Title: score value selected by user */}
            <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
              <h3 className="text-base font-black font-mono tracking-tight text-accent-cyan">
                Your Selection Rating: {sliderVal.toFixed(1)} / 10.0
              </h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-text-muted hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Prompt */}
            <p className="text-xs sm:text-sm font-semibold text-text-main mb-3">
              Add proper reasoning within 10 lines
            </p>

            {/* Textarea */}
            <textarea
              id="rating-reasoning-input"
              rows={8}
              maxLength={1000}
              value={userReasoning}
              onChange={(e) => setUserReasoning(e.target.value)}
              placeholder="Provide analysis or logical reasons why you assigned this custom rating score to this stock..."
              className="w-full rounded-xl bg-slate-950 border border-slate-800 p-3 text-xs sm:text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-accent-cyan focus:border-accent-cyan resize-none"
            />

            {/* Footer / Submit button */}
            <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/5">
              <span className="text-[10px] text-text-muted italic">
                Lines used: {userReasoning.split('\n').filter(Boolean).length || 0} / 10
              </span>
              <div className="flex space-x-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-3.5 py-1.5 rounded-lg text-xs font-bold text-text-muted hover:text-white hover:bg-white/5 transition-all"
                >
                  Cancel
                </button>
                <button
                  id="final-submit-rating"
                  onClick={handleFinalSubmit}
                  className="px-4 py-1.5 rounded-lg text-xs font-black bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:opacity-90 active:scale-95 transition-all shadow-md shadow-cyan-500/10"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
