'use client';

import { useState } from 'react';

export function useFilters() {
  const [province, setProvince] = useState('');
  const [city, setCity] = useState('');
  const [category, setCategory] = useState('');

  const resetFilters = () => {
    setProvince('');
    setCity('');
    setCategory('');
  };

  return {
    filters: {
      province,
      city,
      category,
    },
    setProvince,
    setCity,
    setCategory,
    resetFilters,
  };
}
