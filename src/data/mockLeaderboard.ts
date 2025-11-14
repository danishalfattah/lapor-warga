// Mock data for leaderboard users across all provinces and cities
import { PROVINCES_DATA } from './mockReports';

export interface LeaderboardUser {
  id: string;
  name: string;
  avatar: string;
  reportCount: number;
  rank?: number;
  province: string;
  city: string;
}

// Indonesian first names
const firstNames = [
  'Budi', 'Siti', 'Ahmad', 'Dewi', 'Rudi', 'Rina', 'Agus', 'Ani', 'Joko', 'Sri',
  'Hendra', 'Nurul', 'Bambang', 'Yanti', 'Eko', 'Fitri', 'Doni', 'Maya', 'Wahyu', 'Lina',
  'Andi', 'Lia', 'Imam', 'Dian', 'Tono', 'Indah', 'Arif', 'Ratna', 'Dedi', 'Wulan',
  'Fajar', 'Sari', 'Rizki', 'Ayu', 'Bayu', 'Ika', 'Hendro', 'Novi', 'Ardi', 'Yuni',
  'Guntur', 'Erni', 'Dwi', 'Retno', 'Putra', 'Endang', 'Roni', 'Tuti', 'Widi', 'Lastri',
];

// Indonesian last names
const lastNames = [
  'Santoso', 'Wijaya', 'Lestari', 'Hidayat', 'Pratama', 'Kusuma', 'Hartono', 'Prasetyo',
  'Setiawan', 'Nugroho', 'Permadi', 'Raharjo', 'Saputra', 'Wibowo', 'Utomo', 'Surya',
  'Gunawan', 'Ramadhan', 'Sanjaya', 'Budiono', 'Purnomo', 'Handoko', 'Suryanto', 'Hakim',
  'Susanto', 'Pangestu', 'Syahputra', 'Rahman', 'Firmansyah', 'Kurniawan', 'Saputri',
];

// Generate random report count (weighted towards lower numbers)
function getRandomReportCount(): number {
  const rand = Math.random();
  if (rand < 0.3) return Math.floor(Math.random() * 10) + 5; // 5-14 reports (30%)
  if (rand < 0.6) return Math.floor(Math.random() * 15) + 15; // 15-29 reports (30%)
  if (rand < 0.85) return Math.floor(Math.random() * 20) + 30; // 30-49 reports (25%)
  return Math.floor(Math.random() * 30) + 50; // 50-79 reports (15%)
}

// Generate mock leaderboard users
function generateLeaderboardUsers(): LeaderboardUser[] {
  const users: LeaderboardUser[] = [];
  let userId = 1;

  // Distribution per province (total ~230 users)
  const distribution = {
    "DKI Jakarta": 12,      // 6 cities x 12 = 72 users
    "Banten": 8,            // 6 cities x 8 = 48 users
    "Jawa Barat": 8,        // 8 cities x 8 = 64 users
    "Jawa Tengah": 5,       // 6 cities x 5 = 30 users
    "Jawa Timur": 4,        // 7 cities x 4 = 28 users
    "DI Yogyakarta": 4,     // 5 cities x 4 = 20 users
  };

  // Generate users for each province and city
  Object.entries(PROVINCES_DATA).forEach(([province, cities]) => {
    const usersPerCity = distribution[province as keyof typeof distribution] || 5;

    cities.forEach((city) => {
      for (let i = 0; i < usersPerCity; i++) {
        const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
        const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
        const name = `${firstName} ${lastName}`;
        const seed = name.replace(/\s/g, '');

        users.push({
          id: `user-${userId}`,
          name,
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`,
          reportCount: getRandomReportCount(),
          province,
          city,
        });

        userId++;
      }
    });
  });

  return users;
}

// Generate and export all leaderboard users
export const mockLeaderboardUsers: LeaderboardUser[] = generateLeaderboardUsers();

// Helper functions
export function getAllLeaderboardUsers(): LeaderboardUser[] {
  return mockLeaderboardUsers;
}

export function getLeaderboardByProvince(province: string): LeaderboardUser[] {
  return mockLeaderboardUsers
    .filter(user => user.province === province)
    .sort((a, b) => b.reportCount - a.reportCount);
}

export function getLeaderboardByCity(province: string, city: string): LeaderboardUser[] {
  return mockLeaderboardUsers
    .filter(user => user.province === province && user.city === city)
    .sort((a, b) => b.reportCount - a.reportCount);
}

export function getTopLeaderboard(
  limit: number = 24,
  province?: string,
  city?: string
): LeaderboardUser[] {
  let filteredUsers = mockLeaderboardUsers;

  // Filter by province if provided
  if (province) {
    filteredUsers = filteredUsers.filter(user => user.province === province);
  }

  // Filter by city if provided (requires province)
  if (province && city) {
    filteredUsers = filteredUsers.filter(user => user.city === city);
  }

  // Sort by report count and get top N
  return filteredUsers
    .sort((a, b) => b.reportCount - a.reportCount)
    .slice(0, limit)
    .map((user, index) => ({
      ...user,
      rank: index + 1,
    })) as LeaderboardUser[];
}

// Get total number of users (for stats)
export function getTotalUsersCount(province?: string, city?: string): number {
  if (province && city) {
    return mockLeaderboardUsers.filter(
      user => user.province === province && user.city === city
    ).length;
  }
  if (province) {
    return mockLeaderboardUsers.filter(user => user.province === province).length;
  }
  return mockLeaderboardUsers.length;
}
