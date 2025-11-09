'use client';

import { createContext, useContext, ReactNode } from 'react';
import { useFilters } from '@/hooks/useFilters';

interface FilterContextType {
  filters: {
    province: string;
    city: string;
    category: string;
  };
  setProvince: (province: string) => void;
  setCity: (city: string) => void;
  setCategory: (category: string) => void;
  resetFilters: () => void;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export function FilterProvider({ children }: { children: ReactNode }) {
  const filters = useFilters();

  return <FilterContext.Provider value={filters}>{children}</FilterContext.Provider>;
}

export function useFilterContext() {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error('useFilterContext must be used within a FilterProvider');
  }
  return context;
}
