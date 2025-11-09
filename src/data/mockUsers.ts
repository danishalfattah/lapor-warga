// Mock data for users
import type { User, UserStats } from '@/types/user';

export const mockUsers: (User & { stats: UserStats })[] = [
  {
    id: 'user1',
    email: 'budi.santoso@email.com',
    name: 'Budi Santoso',
    avatar: undefined,
    createdAt: '2023-12-01T00:00:00Z',
    updatedAt: '2024-01-15T08:30:00Z',
    stats: {
      totalReports: 23,
      resolvedReports: 15,
      totalUpvotes: 456,
    },
  },
  {
    id: 'user2',
    email: 'siti.nurhaliza@email.com',
    name: 'Siti Nurhaliza',
    avatar: undefined,
    createdAt: '2023-11-15T00:00:00Z',
    updatedAt: '2024-01-16T10:15:00Z',
    stats: {
      totalReports: 31,
      resolvedReports: 22,
      totalUpvotes: 678,
    },
  },
  {
    id: 'user3',
    email: 'ahmad.wijaya@email.com',
    name: 'Ahmad Wijaya',
    avatar: undefined,
    createdAt: '2023-10-20T00:00:00Z',
    updatedAt: '2024-01-13T19:45:00Z',
    stats: {
      totalReports: 18,
      resolvedReports: 12,
      totalUpvotes: 345,
    },
  },
  {
    id: 'user4',
    email: 'dewi.lestari@email.com',
    name: 'Dewi Lestari',
    avatar: undefined,
    createdAt: '2023-12-10T00:00:00Z',
    updatedAt: '2024-01-17T11:00:00Z',
    stats: {
      totalReports: 27,
      resolvedReports: 19,
      totalUpvotes: 523,
    },
  },
  {
    id: 'user5',
    email: 'rudi.hartono@email.com',
    name: 'Rudi Hartono',
    avatar: undefined,
    createdAt: '2024-01-05T00:00:00Z',
    updatedAt: '2024-01-12T11:15:00Z',
    stats: {
      totalReports: 12,
      resolvedReports: 7,
      totalUpvotes: 189,
    },
  },
  {
    id: 'user6',
    email: 'rina.kusuma@email.com',
    name: 'Rina Kusuma',
    avatar: undefined,
    createdAt: '2023-11-01T00:00:00Z',
    updatedAt: '2024-01-11T09:00:00Z',
    stats: {
      totalReports: 35,
      resolvedReports: 28,
      totalUpvotes: 892,
    },
  },
  {
    id: 'user7',
    email: 'agus.setiawan@email.com',
    name: 'Agus Setiawan',
    avatar: undefined,
    createdAt: '2023-09-15T00:00:00Z',
    updatedAt: '2024-01-14T08:00:00Z',
    stats: {
      totalReports: 41,
      resolvedReports: 31,
      totalUpvotes: 1024,
    },
  },
];

export function getUserById(id: string) {
  return mockUsers.find(user => user.id === id);
}

export function getTopUsers(limit: number = 10) {
  return [...mockUsers]
    .sort((a, b) => b.stats.totalReports - a.stats.totalReports)
    .slice(0, limit);
}

export function getLeaderboard() {
  return [...mockUsers]
    .sort((a, b) => {
      // Sort by total reports, then by upvotes
      if (b.stats.totalReports !== a.stats.totalReports) {
        return b.stats.totalReports - a.stats.totalReports;
      }
      return b.stats.totalUpvotes - a.stats.totalUpvotes;
    });
}

// Mock current user (for demo purposes)
export const mockCurrentUser = mockUsers[0];
