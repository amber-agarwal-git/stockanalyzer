/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { HelpCircle } from 'lucide-react';

interface TooltipProps {
  content: string;
  children?: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

export const Tooltip: React.FC<TooltipProps> = ({ content, children, position = 'top' }) => {
  const [visible, setVisible] = useState(false);

  const positionClasses = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2"
  };

  const arrowClasses = {
    top: "top-full left-1/2 -translate-x-1/2 border-t-slate-900 dark:border-t-slate-950",
    bottom: "bottom-full left-1/2 -translate-x-1/2 border-b-slate-900 dark:border-b-slate-950",
    left: "left-full top-1/2 -translate-y-1/2 border-l-slate-900 dark:border-l-slate-950",
    right: "right-full top-1/2 -translate-y-1/2 border-r-slate-900 dark:border-r-slate-950"
  };

  return (
    <div 
      className="relative inline-flex items-center group cursor-help"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
    >
      {children ? children : (
        <HelpCircle id="tooltip-trigger" className="w-3.5 h-3.5 ml-1.5 text-text-muted hover:text-accent-cyan transition-colors" />
      )}
      {visible && (
        <div id="tooltip-content" className={`absolute ${positionClasses[position]} w-56 p-2 rounded-lg text-xs leading-relaxed bg-slate-900/98 dark:bg-slate-950/98 text-slate-100 z-50 shadow-2xl border border-white/10 text-center font-normal transition-all duration-200 pointer-events-none`}>
          {content}
          <div className={`absolute border-4 border-transparent ${arrowClasses[position]}`}></div>
        </div>
      )}
    </div>
  );
};
