/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Tooltip } from './Tooltip';
import { Sun, Moon, Settings, TrendingUp, HelpCircle, X, Check, Globe } from 'lucide-react';

export const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [apiDelay, setApiDelay] = useState(350);
  const [cacheEnabled, setCacheEnabled] = useState(true);

  return (
    <>
      <header id="app-header" className="sticky top-0 z-40 w-full glass-card border-b border-border-card bg-opacity-80 backdrop-blur-md px-4 sm:px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Logo & Platform Name */}
          <div className="flex items-center space-x-3">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-accent-cyan via-accent-blue to-accent-purple shadow-lg p-0.5">
              <div className="flex items-center justify-center w-full h-full bg-slate-950 rounded-lg text-accent-cyan">
                <TrendingUp className="w-5 h-5 animate-pulse" />
              </div>
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-accent-cyan/40 to-accent-purple/40 blur-md -z-10" />
            </div>
            
            <div>
              <h1 id="brand-title" className="text-xl sm:text-2xl font-bold font-sans tracking-tight bg-gradient-to-r from-accent-cyan via-accent-purple to-accent-blue bg-clip-text text-transparent">
                Stock Analyzer
              </h1>
              <p className="text-[10px] sm:text-xs text-text-muted hidden sm:block">
                Premium Fintech Research Platform
              </p>
            </div>
          </div>

          {/* Right Controls Group */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            
            {/* Info Link with Hover Popup */}
            <Tooltip 
              content="Platform overview: Access fundamental, technical, sectorial, and real-time momentum models with instant predictive recommendation scores for stock lists globally." 
              position="bottom"
            >
              <div id="info-link" className="flex items-center space-x-1 px-3 py-1.5 rounded-lg border border-border-card text-xs font-semibold hover:border-accent-cyan hover:text-accent-cyan hover:bg-accent-cyan/10 transition-all cursor-help">
                <HelpCircle className="w-4 h-4 text-accent-cyan" />
                <span>Info</span>
              </div>
            </Tooltip>

            {/* Settings Trigger */}
            <button
              id="settings-trigger"
              onClick={() => setIsSettingsOpen(true)}
              className="p-2 rounded-lg border border-border-card text-text-muted hover:border-accent-purple hover:text-accent-purple hover:bg-accent-purple/10 transition-all cursor-pointer"
              title="API & Platform Configuration"
            >
              <Settings className="w-4 h-4" />
            </button>

            {/* Elegant Switch Panel for Light/Dark Mode */}
            <div 
              id="theme-switch-panel" 
              className="flex items-center bg-slate-100 dark:bg-zinc-900 border border-border-card rounded-xl p-1 relative shadow-inner"
            >
              <button
                id="theme-light-btn"
                onClick={() => theme === 'dark' && toggleTheme()}
                className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-lg text-xs font-bold select-none transition-all duration-300 cursor-pointer ${
                  theme === 'light'
                    ? 'bg-white text-slate-950 shadow-md scale-[1.02]'
                    : 'text-text-muted hover:text-text-main hover:bg-slate-200/50 dark:hover:bg-zinc-800/50'
                }`}
                aria-label="Set Light Theme"
              >
                <Sun className={`w-3.5 h-3.5 transition-transform duration-555 ${theme === 'light' ? 'text-amber-500 rotate-12 scale-110' : 'text-slate-400'}`} />
                <span className="text-[11px] tracking-tight">Light</span>
              </button>
              
              <button
                id="theme-dark-btn"
                onClick={() => theme === 'light' && toggleTheme()}
                className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-lg text-xs font-bold select-none transition-all duration-300 cursor-pointer ${
                  theme === 'dark'
                    ? 'bg-zinc-800 text-white shadow-md border border-white/5 scale-[1.02]'
                    : 'text-text-muted hover:text-text-main hover:bg-slate-200/50 dark:hover:bg-zinc-800/50'
                }`}
                aria-label="Set Dark Theme"
              >
                <Moon className={`w-3.5 h-3.5 transition-transform duration-555 ${theme === 'dark' ? 'text-accent-cyan -rotate-12 scale-110' : 'text-slate-400'}`} />
                <span className="text-[11px] tracking-tight">Dark</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Settings Dialog Modal Context */}
      {isSettingsOpen && (
        <div id="settings-modal" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md p-6 rounded-2xl glass-card relative bg-slate-900/98 text-slate-100 shadow-2xl border border-white/10 animate-scale-up">
            
            <button 
              id="close-settings"
              onClick={() => setIsSettingsOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center space-x-2.5 mb-5">
              <div className="p-2 rounded-lg bg-accent-purple/20 text-accent-purple">
                <Settings className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold">API & Dev Settings</h3>
            </div>

            <div className="space-y-5 text-sm">
              <p className="text-xs text-slate-400 leading-relaxed">
                Configure future REST API network emulator characteristics. Adjust latency constraints manually below to stress-test UI shimmer and skeleton overlays.
              </p>

              {/* Latency Input Slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-300 font-medium">Simulated API Latency (ms)</span>
                  <span className="px-2 py-0.5 bg-slate-800 text-slate-200 rounded font-mono">{apiDelay}ms</span>
                </div>
                <input 
                  type="range"
                  min="0"
                  max="2000"
                  step="50"
                  value={apiDelay}
                  onChange={(e) => setApiDelay(Number(e.target.value))}
                  className="w-full accent-accent-purple cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>0ms (Instant)</span>
                  <span>1s (Slow connection)</span>
                  <span>2s (Cellular)</span>
                </div>
              </div>

              {/* Cache toggle */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                <div>
                  <h4 className="font-semibold text-xs text-slate-200">React Query Caching Strategy</h4>
                  <p className="text-[10px] text-slate-400 mt-0.5">Maintain background index fresh states.</p>
                </div>
                <button 
                  onClick={() => setCacheEnabled(!cacheEnabled)}
                  className={`w-10 h-6 flex items-center rounded-full p-0.5 transition-colors duration-200 focus:outline-none ${cacheEnabled ? 'bg-accent-green' : 'bg-slate-600'}`}
                >
                  <div className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-200 ${cacheEnabled ? 'translate-x-4' : 'translate-x-0'}`} />
                </button>
              </div>

              {/* Simulation Status Line */}
              <div className="p-3.5 rounded-xl bg-accent-cyan/10 border border-accent-cyan/20 text-accent-cyan text-xs flex items-start space-x-2.5">
                <Globe className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <div className="leading-relaxed">
                  <span className="font-semibold block mb-0.5">Ready for REST Endpoints</span>
                  The app is ready for REST integration with dynamic routing. Active caching and simulated API contracts are operational.
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button 
                onClick={() => setIsSettingsOpen(false)}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-accent-purple to-accent-blue hover:opacity-90 text-white font-semibold text-xs shadow-lg transition-opacity flex items-center space-x-1.5"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Save & Close</span>
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
};
