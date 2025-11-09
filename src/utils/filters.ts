// Filter logic utilities
import type { Report } from '@/types/report';

export function filterReports(
  reports: Report[],
  filters: {
    province?: string;
    city?: string;
    category?: string;
  }
): Report[] {
  return reports.filter((report) => {
    if (filters.province && report.province !== filters.province) {
      return false;
    }
    if (filters.city && report.city !== filters.city) {
      return false;
    }
    if (filters.category && report.category !== filters.category) {
      return false;
    }
    return true;
  });
}

export function sortReports(
  reports: Report[],
  sortBy: 'date' | 'upvotes' = 'date'
): Report[] {
  return [...reports].sort((a, b) => {
    if (sortBy === 'date') {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
    return b.upvotes - a.upvotes;
  });
}
