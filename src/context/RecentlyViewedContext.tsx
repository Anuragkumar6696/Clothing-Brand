import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { Product } from '../types';
import { PRODUCTS } from '../data/products';
import { loadFromStorage, saveToStorage } from '../lib/storage';

interface RecentlyViewedContextValue {
  recentlyViewedIds: string[];
  recentlyViewedProducts: Product[];
  recordView: (productId: string) => void;
  clearHistory: () => void;
}

const STORAGE_KEY = 'aurelia_recently_viewed_v1';

const RecentlyViewedContext = createContext<RecentlyViewedContextValue | undefined>(undefined);

export const RecentlyViewedProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [recentlyViewedIds, setRecentlyViewedIds] = useState<string[]>(() => {
    return loadFromStorage<string[]>(STORAGE_KEY, []);
  });

  useEffect(() => {
    saveToStorage(STORAGE_KEY, recentlyViewedIds);
  }, [recentlyViewedIds]);

  const recordView = useCallback((productId: string) => {
    setRecentlyViewedIds((prev) => {
      // Move product to the front of recently viewed, limit to 8
      const filtered = prev.filter((id) => id !== productId);
      return [productId, ...filtered].slice(0, 8);
    });
  }, []);

  const clearHistory = useCallback(() => {
    setRecentlyViewedIds([]);
  }, []);

  const recentlyViewedProducts = recentlyViewedIds
    .map((id) => PRODUCTS.find((p) => p.id === id))
    .filter((p): p is Product => Boolean(p));

  return (
    <RecentlyViewedContext.Provider
      value={{
        recentlyViewedIds,
        recentlyViewedProducts,
        recordView,
        clearHistory,
      }}
    >
      {children}
    </RecentlyViewedContext.Provider>
  );
};

export function useRecentlyViewed(): RecentlyViewedContextValue {
  const context = useContext(RecentlyViewedContext);
  if (!context) {
    throw new Error('useRecentlyViewed must be used within a RecentlyViewedProvider');
  }
  return context;
}

