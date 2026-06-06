/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ThumbsUp, ThumbsDown, HelpCircle } from 'lucide-react';
import { ProsCons } from '../types';

interface ProsConsCardProps {
  prosCons: ProsCons;
}

export const ProsConsCard: React.FC<ProsConsCardProps> = ({ prosCons }) => {
  return (
    <div id="pros-cons-card" className="rounded-2xl glass-card p-5 sm:p-6 space-y-5">
      
      {/* Title & Description of Pros and Cons Card */}
      <div className="flex items-center space-x-2">
        <div className="p-2 rounded-xl bg-accent-blue/10 text-accent-cyan">
          <HelpCircle className="w-4 h-4" />
        </div>
        <div>
          <h3 className="text-sm sm:text-base font-bold font-sans tracking-tight">SWOT Analysis: Strength & Weakness</h3>
          <p className="text-[10px] sm:text-xs text-text-muted">Consolidated core positive indicators and system risk signals</p>
        </div>
      </div>

      {/* Grid split columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-1">
        
        {/* Equity Strengths (Pros - green glow motif) */}
        <div id="pros-column-wrapper" className="rounded-xl border border-accent-green/10 bg-accent-green/5 p-4 sm:p-5 space-y-3.5 hover:border-accent-green/20 transition-all duration-350">
          <div className="flex items-center space-x-2 text-accent-green">
            <ThumbsUp className="w-4 h-4 text-accent-green" />
            <h4 className="text-xs sm:text-sm font-black tracking-tight uppercase font-sans">Equity Strengths (Pros)</h4>
          </div>
          <ul className="space-y-2.5 text-xs text-text-main font-medium leading-relaxed">
            {prosCons.pros.map((pro, index) => (
              <li key={index} className="flex items-start">
                <span className="text-accent-green mr-2 font-black select-none">✓</span>
                <span className="text-text-main leading-normal">{pro}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Equity Red Flags (Cons - red glow motif) */}
        <div id="cons-column-wrapper" className="rounded-xl border border-accent-red/10 bg-accent-red/5 p-4 sm:p-5 space-y-3.5 hover:border-accent-red/20 transition-all duration-350">
          <div className="flex items-center space-x-2 text-accent-red">
            <ThumbsDown className="w-4 h-4 text-accent-red" />
            <h4 className="text-xs sm:text-sm font-black tracking-tight uppercase font-sans">Equity Red Flags (Cons)</h4>
          </div>
          <ul className="space-y-2.5 text-xs text-text-main font-medium leading-relaxed">
            {prosCons.cons.map((con, index) => (
              <li key={index} className="flex items-start">
                <span className="text-accent-red mr-2 font-black select-none">✗</span>
                <span className="text-text-main leading-normal">{con}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>

    </div>
  );
};
