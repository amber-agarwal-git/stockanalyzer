/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { Search, Globe, X, TrendingUp, Sparkles, Loader2, Lock, AlertCircle } from 'lucide-react';
import { MOCK_STOCKS } from '../services/mockData';
import { StockData, SearchResult } from '../types';

interface SearchBoxProps {
  onSelectStock: (symbol: string) => void;
  selectedSymbol: string;
  onAISearchChange?: (history: SearchResult | null, searching: boolean) => void;
}

export const SearchBox: React.FC<SearchBoxProps> = ({ onSelectStock, selectedSymbol, onAISearchChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('India');
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // AI Search specific states
  const [queryText, setQueryText] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [searchHistory, setSearchHistory] = useState<SearchResult | null>(null);
  const [lockRemaining, setLockRemaining] = useState<number>(0);

  // Notify parent of AI Search updates
  useEffect(() => {
    if (onAISearchChange) {
      onAISearchChange(searchHistory, isSearching);
    }
  }, [searchHistory, isSearching, onAISearchChange]);

  // Keep track of 5-minute cooldown lock
  useEffect(() => {
    const getCooldown = () => {
      const lockUntilStr = localStorage.getItem('ai_search_lock_until');
      if (lockUntilStr) {
        const lockUntil = parseInt(lockUntilStr, 10);
        const rem = lockUntil - Date.now();
        if (rem > 0) {
          setLockRemaining(Math.ceil(rem / 1000));
        } else {
          localStorage.removeItem('ai_search_lock_until');
          setLockRemaining(0);
        }
      }
    };

    getCooldown();
    const interval = setInterval(() => {
      const lockUntilStr = localStorage.getItem('ai_search_lock_until');
      if (lockUntilStr) {
        const lockUntil = parseInt(lockUntilStr, 10);
        const rem = lockUntil - Date.now();
        if (rem > 0) {
          setLockRemaining(Math.ceil(rem / 1000));
        } else {
          localStorage.removeItem('ai_search_lock_until');
          setLockRemaining(0);
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const activateCooldown = () => {
    const durationMs = 5 * 60 * 1000;
    const lockUntil = Date.now() + durationMs;
    localStorage.setItem('ai_search_lock_until', lockUntil.toString());
    setLockRemaining(300);
  };

  const validateQuery = (text: string): { isValid: boolean; reason?: string } => {
    const trimmed = text.trim();
    if (trimmed.length === 0) {
      return { isValid: false, reason: "Query cannot be completely empty!" };
    }
    if (trimmed.length > 100) {
      return { isValid: false, reason: "Command query exceeds the limit of 100 characters." };
    }
    const hasHtml = /<[^>]*>/g.test(trimmed);
    const hasScript = /javascript:/i.test(trimmed) || /script/i.test(trimmed);
    if (hasHtml || hasScript) {
      return { isValid: false, reason: "Safety trigger: Code sequences/tags are not allowed." };
    }
    const permittedRegex = /^[a-zA-Z0-9\s\$\%\?\!\-\.\,\&\@\(\)\x27]+$/;
    if (!permittedRegex.test(trimmed)) {
      return { 
        isValid: false, 
        reason: "Foreign layout or unsupported symbols detected! Please use standard alphanumeric questions with optional $ % ? ! , . - & characters." 
      };
    }
    const improperWords = ['fuck', 'shit', 'spam', 'hack', 'bitch', 'asshole', 'exploit', 'scam'];
    for (const bad of improperWords) {
      if (trimmed.toLowerCase().includes(bad)) {
        return { isValid: false, reason: "Safety warning: Query term filtered due to non-constructive keywords." };
      }
    }
    return { isValid: true };
  };

  const handleSearchTrigger = async () => {
    if (lockRemaining > 0 || isSearching) return;
    setErrorMsg(null);
    const validation = validateQuery(queryText);
    if (!validation.isValid) {
      setErrorMsg(validation.reason || "Invalid search query context.");
      return;
    }
    setIsSearching(true);
    setTimeout(() => {
      const cleaned = queryText.toLowerCase();
      let matchStocks = [
        { symbol: "RELIANCE", name: "Reliance Industries", matchScore: "9.8", reasonBadge: "High Volume Leader", metrics: "RSI 54 • Growth 18%" },
        { symbol: "AAPL", name: "Apple Inc.", matchScore: "9.2", reasonBadge: "Underpriced Tech", metrics: "PE 26.5 • Growth 14%" },
        { symbol: "TSLA", name: "Tesla Motors", matchScore: "8.7", reasonBadge: "High Volatility", metrics: "Beta 1.6 • Growth 28%" }
      ];

      if (cleaned.includes('high growth') || cleaned.includes('rocket') || cleaned.includes('growth')) {
        matchStocks = [
          { symbol: "NVDA", name: "NVIDIA Corp.", matchScore: "9.9", reasonBadge: "AI Growth Catalyst", metrics: "CAGR 65% • PE 42.1" },
          { symbol: "TSLA", name: "Tesla Motors", matchScore: "9.0", reasonBadge: "EV Expansion", metrics: "Beta 1.6 • Growth 28%" },
          { symbol: "RELIANCE", name: "Reliance Industries", matchScore: "8.2", reasonBadge: "Retail/Telecom Growth", metrics: "Growth 18% • CAGR 15%" }
        ];
      } else if (cleaned.includes('it') || cleaned.includes('tech') || cleaned.includes('software')) {
        matchStocks = [
          { symbol: "NVDA", name: "NVIDIA Corp.", matchScore: "9.8", reasonBadge: "Hardware / Compute", metrics: "CAGR 65% • PE 42.1" },
          { symbol: "AAPL", name: "Apple Inc.", matchScore: "9.4", reasonBadge: "Device Ecosystem", metrics: "PE 26.5 • Growth 14%" },
          { symbol: "TCS", name: "Tata Consultancy", matchScore: "8.8", reasonBadge: "IT Consulting Stable", metrics: "Yield 3.2% • ROE 34%" }
        ];
      }

      setSearchHistory({
        query: queryText,
        timestamp: new Date().toLocaleTimeString(),
        results: matchStocks,
        insightSummary: `AIGenerated Insight: Your query focus highlights high-conviction momentum. We identified ${matchStocks[0].symbol} as the top pick based on custom multi-variable volatility bounds.`
      });
      setIsSearching(false);
      setQueryText('');
      activateCooldown();
    }, 2800);
  };

  const getTimerString = (secondsCount: number) => {
    const mins = Math.floor(secondsCount / 60);
    const secs = secondsCount % 60;
    return `${mins}m ${secs.toString().padStart(2, '0')}s`;
  };

  const isBoxDisabled = isSearching || lockRemaining > 0;

  // Filter stocks for the dropdown suggestions based on country and search term
  const filteredSuggestions = MOCK_STOCKS.filter(stock => {
    const matchesCountry = selectedCountry === 'All' || stock.country.toLowerCase() === selectedCountry.toLowerCase();
    const query = searchTerm.toLowerCase().trim();
    const matchesSearch = query === '' || 
      stock.symbol.toLowerCase().includes(query) || 
      stock.name.toLowerCase().includes(query) ||
      stock.category.toLowerCase().includes(query);
    return matchesCountry && matchesSearch;
  });

  // Handle outside clicks to close autocomplete dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelect = (symbol: string) => {
    onSelectStock(symbol);
    setSearchTerm('');
    setIsOpen(false);
  };

  const currentStock = MOCK_STOCKS.find(s => s.symbol === selectedSymbol);

  return (
    <div className="w-full space-y-2.5">
      {/* Search Bar and Dropdown Wrapper Grid */}
      <div ref={dropdownRef} className="relative grid grid-cols-1 md:grid-cols-6 gap-3">
        
        {/* Country Filter Selector */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-muted">
            <Globe className="h-4 w-4 text-accent-purple" />
          </div>
          <select
            id="country-filter"
            className="w-full pl-8 pr-7 py-2 rounded-xl glass-card text-xs font-sans font-black text-text-main focus:outline-none focus:ring-1 focus:ring-accent-purple appearance-none cursor-pointer leading-tight"
            value={selectedCountry}
            onChange={(e) => {
              setSelectedCountry(e.target.value);
              setIsOpen(false);
            }}
          >
            <option value="All" className="bg-slate-900 text-white font-semibold">ALL Countries</option>
            <option value="India" className="bg-slate-900 text-white font-semibold">🇮🇳 India Market</option>
            <option value="USA" className="bg-slate-900 text-white font-semibold">🇺🇸 USA Market</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-text-muted">
            <span className="text-[10px]">▼</span>
          </div>
        </div>

        {/* Search Field */}
        <div className="relative md:col-span-5">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-text-muted">
            <Search className="h-4 w-4 text-accent-cyan" />
          </div>
          <input
            id="stock-search"
            type="text"
            className="w-full pl-9 pr-10 py-2 rounded-xl glass-card text-xs font-sans placeholder-text-muted focus:outline-none focus:ring-1 focus:ring-accent-cyan tracking-wide font-semibold bg-opacity-40 transition-all duration-300"
            placeholder="Search symbols (e.g. RELIANCE, AAPL, NVDA, TSLA) or core sector categories..."
            value={searchTerm}
            onFocus={() => {
              setIsOpen(true);
              setQueryText('');
            }}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setIsOpen(true);
            }}
          />
          {/* Actions Container */}
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 gap-1">
            {searchTerm && (
              <button 
                id="clear-search"
                onClick={() => setSearchTerm('')}
                className="p-1 text-text-muted hover:text-text-main transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            )}
            <button 
              id="stock-search-submit"
              onClick={() => {
                if (searchTerm) {
                  setIsOpen(false);
                }
              }}
              className="p-1.5 bg-accent-cyan/10 rounded-lg text-accent-cyan hover:bg-accent-cyan/20 transition-all"
            >
              <Search className="h-4 w-4" />
            </button>
          </div>

          {/* Autocomplete Trading-View-Style Dropdown suggestion overlay */}
          {isOpen && (
            <div id="autocomplete-dropdown" className="absolute left-0 right-0 mt-2 rounded-xl bg-slate-900 border border-slate-700/80 max-h-72 overflow-y-auto z-50 shadow-2xl text-left bg-opacity-100">
              <div className="p-2 border-b border-white/5 text-[10px] text-text-muted font-bold tracking-wider uppercase flex items-center justify-between">
                <span>Matching equity tickers ({filteredSuggestions.length})</span>
                <span className="flex items-center text-accent-cyan font-normal lowercase italic text-[9px]">
                  <Sparkles className="w-2.5 h-2.5 mr-0.5 animate-pulse" /> country search: {selectedCountry}
                </span>
              </div>
              {filteredSuggestions.length > 0 ? (
                <div className="divide-y divide-white/5">
                  {filteredSuggestions.map((stock) => (
                    <button
                      key={stock.symbol}
                      onClick={() => handleSelect(stock.symbol)}
                      className="w-full px-4 py-3 flex items-center justify-between hover:bg-white/5 transition-all text-left group"
                    >
                      <div className="flex items-center space-x-3">
                        <span className="font-mono text-sm font-bold text-accent-cyan group-hover:text-white transition-colors">
                          {stock.symbol}
                        </span>
                        <div>
                          <span className="block text-xs font-semibold text-slate-100 group-hover:text-white transition-colors truncate max-w-[140px] sm:max-w-xs">
                            {stock.name}
                          </span>
                          <span className="block text-[10px] text-text-muted truncate">
                            {stock.category} • {stock.exchange}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="block text-xs font-mono font-bold text-slate-200">
                          {stock.currencySymbol}{stock.currentPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </span>
                        <span className="inline-block px-1.5 py-0.5 rounded text-[9px] bg-white/10 text-slate-300">
                          {stock.country}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="p-6 text-center text-xs text-text-muted">
                  No matching equities found for your active criteria. Try choosing <strong className="text-accent-cyan">“All”</strong> countries.
                </div>
              )}
            </div>
          )}
        </div>

      </div>

      {/* AI Assistant Natural Language Query Search block */}
      <div className="border-t border-white/5 pt-3.5 mt-3 space-y-2.5">
        <div className="flex justify-between items-center text-[9px] font-bold tracking-wider uppercase">
          <span className="text-text-muted flex items-center space-x-1">
            <Sparkles className="w-9 h-9 text-accent-cyan animate-pulse" />
            <span> 'OR' Find top 10 stocks, based on below inputted criterea or themes : </span>
          </span>
          <span className={queryText.length > 85 ? "text-accent-red" : "text-text-muted"}>
            {queryText.length}/100 chars
          </span>
        </div>

        <div className="relative">
          <input
            id="ai-stocks-search-textbox"
            type="text"
            maxLength={100}
            disabled={isBoxDisabled}
            className={`w-full pl-3.5 pr-12 py-2 rounded-xl text-xs font-sans placeholder-text-muted focus:outline-none bg-slate-900 bg-opacity-70 text-white tracking-wide border transition-all duration-300 ${
              isBoxDisabled
                ? 'border-white/5 opacity-55 cursor-not-allowed'
                : 'border-white/10 focus:border-accent-cyan focus:ring-1 focus:ring-accent-cyan animate-ring-glow'
            }`}
            placeholder={
              lockRemaining > 0 
                ? "Search is locked (5m Cooldown)..." 
                : "Eg:'Stocks benefitting from semiconductor push','high potential defense sector','High Dividend Stocks','High Growth Stocks','Deep Value/Bargain Stocks','High Quality  Mid-cap Stocks'"
            }
            value={queryText}
            onFocus={() => {
              setSearchTerm('');
            }}
            onChange={(e) => {
              setQueryText(e.target.value);
              if (errorMsg) setErrorMsg(null);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSearchTrigger();
              }
            }}
          />

          <button
            id="ai-stocks-search-submit-btn"
            onClick={handleSearchTrigger}
            disabled={isBoxDisabled || !queryText.trim()}
            className={`absolute right-1 top-1 p-1.5 rounded-lg transition-all duration-300 flex items-center justify-center cursor-pointer ${
              isBoxDisabled || !queryText.trim()
                ? 'bg-white/5 text-text-muted cursor-not-allowed border border-white/5'
                : 'bg-gradient-to-r from-accent-cyan to-accent-blue text-white animate-button-glow hover:opacity-90 active:scale-95 border border-transparent'
            }`}
          >
            {isSearching ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin text-white" />
            ) : lockRemaining > 0 ? (
              <Lock className="w-3.5 h-3.5 text-accent-red" />
            ) : (
              <Search className="w-3.5 h-3.5" />
            )}
          </button>
        </div>

        {/* Error notification alert message */}
        {errorMsg && (
          <div className="p-2.5 rounded-xl bg-accent-red/10 border border-accent-red/20 flex items-start space-x-2 text-[10px] text-accent-red leading-normal select-none animate-bounce">
            <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Cooldown Lock Warning overlay state */}
        {lockRemaining > 0 && (
          <div className="p-2 px-3 rounded-xl bg-slate-950/40 border border-white/5 text-center text-[10px] flex items-center justify-center space-x-2 text-text-muted select-none">
            <Lock className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
            <span>AI Search locked. Cooldown remaining:</span>
            <span className="font-mono font-black text-accent-cyan tracking-wider">{getTimerString(lockRemaining)}</span>
          </div>
        )}
      </div>

      {/* Trending / Active Tickers row */}
      <div id="quick-pills" className="flex flex-wrap items-center gap-1.5 pt-0.5">
        <span className="text-[5px] text-text-muted font-bold flex items-center mr-0.5">
          <TrendingUp className="w-4 h-4 mr-1.5 text-accent-green animate-pulse animate-bounce" /> Searched Stocks:
        </span>
        {MOCK_STOCKS.map(st => (
          <button
            key={st.symbol}
            onClick={() => onSelectStock(st.symbol)}
            className={`px-2 py-1 rounded-lg text-[10px] font-mono font-bold transition-all border flex items-center space-x-1 cursor-pointer ${
              selectedSymbol === st.symbol
                ? 'bg-gradient-to-r from-accent-cyan to-accent-blue text-white border-transparent shadow shadow-accent-cyan/15 scale-102'
                : 'bg-white/5 hover:bg-white/10 hover:border-text-muted/20 border-border-card text-text-muted hover:text-text-main'
            }`}
          >
            <span>{st.symbol}</span>
            <span className="text-[9px] opacity-70">({st.country === 'India' ? 'IN' : 'US'})</span>
          </button>
        ))}
      </div>

      {/* Current Active Metadata Line */}
      {currentStock && (
        <div id="search-active-ticker-feedback" className="flex flex-wrap items-center justify-between border-t border-border-card pt-2.5 pb-0.5">
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-sm sm:text-base font-extrabold tracking-tight font-sans">
                {currentStock.name}
              </h2>
              <span className="px-1.5 py-0.5 rounded font-mono text-[9px] font-bold bg-accent-cyan/15 text-accent-cyan border border-accent-cyan/20">
                {currentStock.symbol}
              </span>
              <span className="text-[10px] text-text-muted bg-white/5 border border-border-card px-1.5 py-0.5 rounded font-medium">
                {currentStock.country} • {currentStock.exchange}
              </span>
            </div>
            <p className="text-[10px] text-text-muted mt-0.5 font-medium italic">
              {currentStock.category} Sector Core Analytics
            </p>
          </div>

          <div className="text-right mt-1 sm:mt-0">
            <p className="text-[8px] text-text-muted uppercase font-bold tracking-wider">Current Market Quote</p>
            <div className="flex items-baseline space-x-1.5 justify-end">
              <span className="text-base sm:text-lg font-mono font-extrabold text-text-main">
                {currentStock.currencySymbol}{currentStock.currentPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </span>
              <span className="text-xs font-mono font-bold text-accent-green bg-accent-green/10 px-1.5 py-0.5 rounded border border-accent-green/20">
                +1.45%
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
