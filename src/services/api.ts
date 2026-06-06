/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MOCK_STOCKS } from './mockData';
import { StockData } from '../types';

// Simulate network latency for API emulation
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const stockApiService = {
  /**
   * Fetches the complete list of stocks, optionally filtered by name/symbol and country.
   */
  getStocks: async (searchQuery: string = '', countryFilter: string = 'All'): Promise<StockData[]> => {
    await delay(350); // simulate network latency
    let results = [...MOCK_STOCKS];

    // Filter by country
    if (countryFilter && countryFilter !== 'All') {
      results = results.filter(stock => stock.country.toLowerCase() === countryFilter.toLowerCase());
    }

    // Filter by query (symbol or name)
    if (searchQuery) {
      const query = searchQuery.toLowerCase().trim();
      results = results.filter(stock => 
        stock.symbol.toLowerCase().includes(query) || 
        stock.name.toLowerCase().includes(query) ||
        stock.category.toLowerCase().includes(query)
      );
    }

    return results;
  },

  /**
   * Fetches details of a specific stock.
   */
  getStockBySymbol: async (symbol: string): Promise<StockData> => {
    await delay(250); // simulate brief query latency
    const stock = MOCK_STOCKS.find(s => s.symbol.toUpperCase() === symbol.toUpperCase());
    if (!stock) {
      throw new Error(`Stock with symbol ${symbol} not found`);
    }
    return stock;
  }
};
