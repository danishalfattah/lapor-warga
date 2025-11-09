'use client';

import { useState, useEffect } from 'react';
import { getReportsByFilter, mockReports } from '@/data/mockReports';
import type { Report } from '@/types/report';

export function useReports(filters?: {
  province?: string;
  city?: string;
  category?: string;
}) {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchReports();
  }, [filters?.province, filters?.city, filters?.category]);

  const fetchReports = async () => {
    setLoading(true);
    try {
      // Simulate API delay for realistic loading state
      await new Promise(resolve => setTimeout(resolve, 300));

      const filteredReports = filters
        ? getReportsByFilter(filters)
        : mockReports;

      setReports(filteredReports);
      setError(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    reports,
    loading,
    error,
    refetch: fetchReports,
  };
}
