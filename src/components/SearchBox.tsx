/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { Search, Globe, X, TrendingUp, Sparkles } from 'lucide-react';
import { MOCK_STOCKS } from '../services/mockData';
import { StockData } from '../types';

interface SearchBoxProps {
  onSelectStock: (symbol: string) => void;
  selectedSymbol: string;
}

export const SearchBox: React.FC<SearchBoxProps> = ({ onSelectStock, selectedSymbol }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('All');
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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
    <div className="w-full space-y-4">
      {/* Search Bar and Dropdown Wrapper Grid */}
      <div ref={dropdownRef} className="relative grid grid-cols-1 md:grid-cols-4 gap-3">
        
        {/* Search Field */}
        <div className="relative md:col-span-3">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-text-muted">
            <Search className="h-4 w-4 text-accent-cyan" />
          </div>
          <input
            id="stock-search"
            type="text"
            className="w-full pl-10 pr-10 py-3.5 rounded-xl glass-card text-sm font-sans placeholder-text-muted focus:outline-none focus:ring-1 focus:ring-accent-cyan tracking-wide font-medium bg-opacity-40"
            placeholder="Search symbols (e.g. RELIANCE, AAPL, NVDA, TSLA) or core sector categories..."
            value={searchTerm}
            onFocus={() => setIsOpen(true)}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setIsOpen(true);
            }}
          />
          {searchTerm && (
            <button 
              id="clear-search"
              onClick={() => setSearchTerm('')}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-text-muted hover:text-text-main transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          )}

          {/* Autocomplete Trading-View-Style Dropdown suggestion overlay */}
          {isOpen && (
            <div id="autocomplete-dropdown" className="absolute left-0 right-0 mt-2 rounded-xl glass-card bg-slate-900/98 dark:bg-slate-950/98 max-h-72 overflow-y-auto z-30 shadow-2xl border border-border-card text-left">
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

        {/* Country Filter Selector */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-muted">
            <Globe className="h-4 w-4 text-accent-purple" />
          </div>
          <select
            id="country-filter"
            className="w-full pl-9 pr-8 py-3.5 rounded-xl glass-card text-xs font-sans font-bold text-text-main focus:outline-none focus:ring-1 focus:ring-accent-purple appearance-none cursor-pointer leading-tight"
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

      </div>

      {/* Trending / Active Tickers row */}
      <div id="quick-pills" className="flex flex-wrap items-center gap-2 pt-1">
        <span className="text-xs text-text-muted font-bold flex items-center mr-1">
          <TrendingUp className="w-3.5 h-3.5 mr-1 text-accent-green" /> Trending Tickers:
        </span>
        {MOCK_STOCKS.map(st => (
          <button
            key={st.symbol}
            onClick={() => onSelectStock(st.symbol)}
            className={`px-3 py-1.5 rounded-lg text-[11px] font-mono font-bold transition-all border flex items-center space-x-1 cursor-pointer ${
              selectedSymbol === st.symbol
                ? 'bg-gradient-to-r from-accent-cyan to-accent-blue text-white border-transparent shadow shadow-accent-cyan/20 scale-102'
                : 'bg-white/5 hover:bg-white/10 hover:border-text-muted/30 border-border-card text-text-muted hover:text-text-main'
            }`}
          >
            <span>{st.symbol}</span>
            <span className="text-[9px] opacity-70">({st.country === 'India' ? 'IN' : 'US'})</span>
          </button>
        ))}
      </div>

      {/* Current Active Metadata Line */}
      {currentStock && (
        <div id="search-active-ticker-feedback" className="flex flex-wrap items-end justify-between border-t border-border-card pt-4 pb-1">
          <div>
            <div className="flex items-center space-x-2.5">
              <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight font-sans">
                {currentStock.name}
              </h2>
              <span className="px-2.5 py-0.5 rounded-md font-mono text-xs font-bold bg-accent-cyan/15 text-accent-cyan border border-accent-cyan/20">
                {currentStock.symbol}
              </span>
              <span className="text-xs text-text-muted bg-white/5 border border-border-card px-2 py-0.5 rounded font-medium">
                {currentStock.country} • {currentStock.exchange}
              </span>
            </div>
            <p className="text-xs text-text-muted mt-1 font-medium italic">
              {currentStock.category} Sector Core Analytics
            </p>
          </div>

          <div className="text-right mt-2 sm:mt-0">
            <p className="text-[10px] text-text-muted uppercase font-bold tracking-wider">Current Market Quote</p>
            <div className="flex items-baseline space-x-2 justify-end">
              <span className="text-2xl sm:text-3xl font-mono font-extrabold text-text-main">
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
