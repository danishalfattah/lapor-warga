// User-related types

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserStats {
  totalReports: number;
  resolvedReports: number;
  totalUpvotes: number;
}

export interface UserWithStats extends User {
  stats: UserStats;
}
