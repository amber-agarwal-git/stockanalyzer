/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useQuery } from '@tanstack/react-query';
import { stockApiService } from '../services/api';

/**
 * Hook to retrieve filtered stocks list based on search term and country filter.
 */
export function useStocksQuery(search: string, country: string) {
  return useQuery({
    queryKey: ['stocks', { search, country }],
    queryFn: () => stockApiService.getStocks(search, country),
    placeholderData: (previousData) => previousData,
    refetchOnWindowFocus: false,
    staleTime: 5000 * 60, // 5 minutes caching
    retry: 1
  });
}

/**
 * Hook to retrieve specific stock insights and detailed indicators for a single symbol.
 */
export function useStockDetailsQuery(symbol: string) {
  return useQuery({
    queryKey: ['stockDetails', symbol],
    queryFn: () => stockApiService.getStockBySymbol(symbol),
    enabled: Array.isArray(symbol) ? symbol.length > 0 : !!symbol,
    refetchOnWindowFocus: false,
    staleTime: 5000 * 60,
    retry: 1
  });
}
