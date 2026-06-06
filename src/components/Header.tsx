/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Tooltip } from './Tooltip';
import { Sun, Moon, Settings, TrendingUp, HelpCircle, X, Check, Globe, Compass, Filter } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  const { theme, toggleTheme } = useTheme();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [apiDelay, setApiDelay] = useState(350);
  const [cacheEnabled, setCacheEnabled] = useState(true);

  return (
    <>
      <header id="app-header" className="sticky top-0 z-40 w-full glass-card border-b border-border-card bg-opacity-80 backdrop-blur-md px-4 sm:px-6 py-3 sm:py-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 md:gap-4">
          
          {/* Left Group: Logo, Platform Name & Mobile Controls */}
          <div className="flex items-center justify-between w-full md:w-auto">
            <div className="flex items-center space-x-3">
              <Tooltip
                content="Skip research fatigue, decide faster with smart scores"
                position="bottom"
              >
                <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-accent-cyan via-accent-blue to-accent-purple shadow-lg p-0.5 cursor-help">
                  <div className="flex items-center justify-center w-full h-full bg-slate-950 rounded-lg text-accent-cyan">
                    <TrendingUp className="w-5 h-5 animate-pulse" />
                  </div>
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-accent-cyan/40 to-accent-purple/40 blur-md -z-10" />
                </div>
              </Tooltip>
              
              <div>
                <Tooltip
                  content="Skip research fatigue, decide faster with smart scores."
                  position="bottom"
                >
                  <h1 id="brand-title" className="text-lg sm:text-xl md:text-2xl font-bold font-sans tracking-tight bg-gradient-to-r from-accent-cyan via-accent-purple to-accent-blue bg-clip-text text-transparent cursor-help">
                    Stock Analyzer
                  </h1>
                </Tooltip>
                <div className="hidden sm:block">
                  <Tooltip
                    content="Skip research fatigue, decide faster with smart scores"
                    position="bottom"
                  >
                    <p className="text-[10px] text-text-muted font-medium cursor-help">
                      Stop Digging, Start Scoring
                    </p>
                  </Tooltip>
                </div>
              </div>
            </div>

            {/* Mobile Controls Group (Only visible on screens < md) */}
            <div className="md:hidden flex items-center space-x-1.5">
              <button
                id="mobile-settings-trigger"
                onClick={() => setIsSettingsOpen(true)}
                className="p-2 rounded-lg border border-border-card text-text-muted hover:border-accent-purple hover:text-accent-purple transition-all cursor-pointer"
                title="API Settings"
              >
                <Settings className="w-4 h-4" />
              </button>
              <button
                id="mobile-theme-trigger"
                onClick={() => toggleTheme()}
                className="p-2 rounded-lg border border-border-card text-text-muted hover:border-accent-cyan transition-all cursor-pointer"
                title="Toggle Theme"
              >
                {theme === 'light' ? <Moon className="w-4 h-4 text-slate-600" /> : <Sun className="w-4 h-4 text-amber-500" />}
              </button>
            </div>
          </div>

          {/* Navigation Tabs - Responsive layout centering tabs */}
          <nav 
            id="header-navigation-tabs" 
            className="flex items-center justify-start md:justify-center space-x-2 p-1 rounded-xl bg-slate-100/70 dark:bg-zinc-900/70 border border-border-card/45 w-full md:w-auto overflow-x-auto md:overflow-visible no-scrollbar scroll-smooth"
          >
            <Tooltip 
              content="Proprietry 'Algorithm based scoring' (out of 10) on each possible aspects and models, along with Overall Score and Buy/Sell Signal." 
              position="bottom"
            >
              <button
                id="tab-stock-scores"
                onClick={() => setActiveTab('scores')}
                className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-lg text-xs font-black uppercase tracking-wide whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  activeTab === 'scores'
                    ? 'bg-gradient-to-r from-teal-400 via-cyan-400 to-teal-500 text-slate-950 shadow-md shadow-cyan-400/25 border-transparent scale-102'
                    : 'text-cyan-700 dark:text-cyan-300 bg-cyan-500/10 dark:bg-cyan-500/15 border border-cyan-400/20 hover:bg-cyan-500/20 hover:border-cyan-400/40 hover:text-cyan-800 dark:hover:text-cyan-200'
                }`}
              >
                <TrendingUp className="w-3.5 h-3.5" />
                <span>Stock Scores</span>
              </button>
            </Tooltip>
            
            <Tooltip
              content="Find top stocks based on various famous financial strategies and algorithms."
              position="bottom"
            >
              <button
                id="tab-stock-strategies"
                onClick={() => setActiveTab('strategies')}
                className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-lg text-xs font-black uppercase tracking-wide whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  activeTab === 'strategies'
                    ? 'bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500 text-white shadow-md shadow-purple-500/25 border-transparent scale-102'
                    : 'text-purple-700 dark:text-purple-300 bg-purple-500/10 dark:bg-purple-500/15 border border-purple-400/20 hover:bg-purple-500/20 hover:border-purple-400/40 hover:text-purple-800 dark:hover:text-purple-200'
                }`}
              >
                <Compass className="w-3.5 h-3.5" />
                <span>Stock picking Strategies</span>
              </button>
            </Tooltip>
            
            <Tooltip
              content="Find stocks based on custom filter critereas."
              position="bottom"
            >
              <button
                id="tab-stock-screener"
                onClick={() => setActiveTab('screener')}
                className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-lg text-xs font-black uppercase tracking-wide whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  activeTab === 'screener'
                    ? 'bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500 text-white shadow-md shadow-blue-500/25 border-transparent scale-102'
                    : 'text-blue-700 dark:text-blue-300 bg-blue-500/10 dark:bg-blue-500/15 border border-blue-400/20 hover:bg-blue-500/20 hover:border-blue-400/40 hover:text-blue-800 dark:hover:text-blue-200'
                }`}
              >
                <Filter className="w-3.5 h-3.5" />
                <span>Stock Screener</span>
              </button>
            </Tooltip>
          </nav>

          {/* Right Controls Group (Hidden on mobile, visible on md+) */}
          <div className="hidden md:flex items-center space-x-2 sm:space-x-4">
            
            {/* About Link with Hover Popup */}
            <Tooltip 
              content="AI platform under beta-testing, created by Amber Agarwal, Avik Deb, Suresh Murali (India)." 
              position="bottom"
            >
              <div id="info-link" className="flex items-center space-x-1 px-3 py-1.5 rounded-lg border border-border-card text-xs font-semibold hover:border-accent-cyan hover:text-accent-cyan hover:bg-accent-cyan/10 transition-all cursor-help">
                <HelpCircle className="w-4 h-4 text-accent-cyan" />
                <span>About</span>
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
