// Mock platform statistics

export const mockStatistics = {
  totalReports: 2547,
  resolvedReports: 1823,
  activeUsers: 1256,
  engagementRate: 72.5,
  reportsThisMonth: 234,
  newUsersThisMonth: 89,
  averageResolutionTime: 4.2, // in days
  categoriesBreakdown: {
    infrastruktur: 876,
    kebersihan: 654,
    keamanan: 432,
    kesehatan: 321,
    lainnya: 264,
  },
  provinceBreakdown: {
    'DKI Jakarta': 1234,
    'Jawa Barat': 543,
    'Jawa Tengah': 321,
    'Jawa Timur': 287,
    'Banten': 162,
  },
  monthlyTrend: [
    { month: 'Jul', reports: 187 },
    { month: 'Aug', reports: 203 },
    { month: 'Sep', reports: 189 },
    { month: 'Oct', reports: 234 },
    { month: 'Nov', reports: 256 },
    { month: 'Dec', reports: 298 },
    { month: 'Jan', reports: 234 },
  ],
};

export function getPlatformStatistics() {
  return mockStatistics;
}

export function getEngagementRate() {
  const { totalReports, resolvedReports } = mockStatistics;
  return ((resolvedReports / totalReports) * 100).toFixed(1);
}

export function getCategoryStats() {
  return Object.entries(mockStatistics.categoriesBreakdown)
    .map(([category, count]) => ({ category, count }))
    .sort((a, b) => b.count - a.count);
}
