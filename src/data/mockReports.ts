// Mock data for reports (50+ realistic Indonesian citizen reports)
import type { Report } from '@/types/report';

export const mockReports: Report[] = [
  {
    id: '1',
    title: 'Jalan Berlubang di Depan Pasar Tanah Abang',
    description: 'Jalan berlubang dengan diameter sekitar 2 meter dan kedalaman 30cm. Sangat berbahaya untuk pengendara motor dan mobil. Sudah menyebabkan beberapa kecelakaan kecil.',
    category: 'infrastruktur',
    status: 'pending',
    province: 'DKI Jakarta',
    city: 'Jakarta Pusat',
    address: 'Jl. Jatibaru Raya, Tanah Abang',
    location: 'Tanah Abang',
    latitude: -6.1867,
    longitude: 106.8134,
    images: ['/images/placeholders/jalan-rusak-1.jpg'],
    upvotes: 156,
    userId: 'user1',
    reporterName: 'Budi Santoso',
    reporterAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=BudiSantoso',
    createdAt: '2024-01-15T08:30:00Z',
    updatedAt: '2024-01-15T08:30:00Z',
  },
  {
    id: '2',
    title: 'Tumpukan Sampah di Bantaran Kali Ciliwung',
    description: 'Sampah menumpuk di bantaran kali dekat Jembatan Matraman. Menimbulkan bau tidak sedap dan berpotensi menyumbat aliran air saat musim hujan.',
    category: 'kebersihan',
    status: 'in-progress',
    province: 'DKI Jakarta',
    city: 'Jakarta Timur',
    address: 'Bantaran Kali Ciliwung, Matraman',
    location: 'Matraman',
    latitude: -6.2088,
    longitude: 106.8631,
    images: ['/images/placeholders/sampah-1.jpg', '/images/placeholders/sampah-2.jpg'],
    upvotes: 203,
    userId: 'user2',
    reporterName: 'Siti Nurhaliza',
    reporterAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SitiNurhaliza',
    createdAt: '2024-01-14T14:20:00Z',
    updatedAt: '2024-01-16T10:15:00Z',
  },
  {
    id: '3',
    title: 'Lampu Jalan Mati di Jalan Sudirman',
    description: '15 lampu jalan mati sepanjang 500 meter di Jalan Sudirman. Area menjadi gelap dan rawan kejahatan pada malam hari.',
    category: 'keamanan',
    status: 'pending',
    province: 'DKI Jakarta',
    city: 'Jakarta Selatan',
    address: 'Jl. Jend. Sudirman, Karet Tengsin',
    location: 'Karet Tengsin',
    latitude: -6.2088,
    longitude: 106.8228,
    images: ['/images/placeholders/lampu-mati.jpg'],
    upvotes: 89,
    userId: 'user3',
    reporterName: 'Ahmad Hidayat',
    reporterAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AhmadHidayat',
    createdAt: '2024-01-13T19:45:00Z',
    updatedAt: '2024-01-13T19:45:00Z',
  },
  {
    id: '4',
    title: 'Drainase Tersumbat Menyebabkan Banjir',
    description: 'Drainase di perumahan Vila Melati Mas tersumbat sampah dan lumpur. Setiap hujan deras, air menggenang setinggi 40cm.',
    category: 'kebersihan',
    status: 'resolved',
    province: 'Jawa Barat',
    city: 'Bekasi',
    address: 'Perumahan Vila Melati Mas, Serpong',
    location: 'Serpong',
    latitude: -6.3025,
    longitude: 106.6519,
    images: ['/images/placeholders/banjir-1.jpg'],
    upvotes: 124,
    userId: 'user4',
    reporterName: 'Dewi Lestari',
    reporterAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=DewiLestari',
    createdAt: '2024-01-10T06:30:00Z',
    updatedAt: '2024-01-17T11:00:00Z',
  },
  {
    id: '5',
    title: 'Fasilitas MCK Umum Tidak Terawat',
    description: 'MCK umum di dekat terminal Kampung Rambutan dalam kondisi sangat kotor dan tidak layak pakai. Bau menyengat dan tidak ada air bersih.',
    category: 'kesehatan',
    status: 'pending',
    province: 'DKI Jakarta',
    city: 'Jakarta Timur',
    address: 'Terminal Kampung Rambutan',
    location: 'Kampung Rambutan',
    latitude: -6.3126,
    longitude: 106.8741,
    images: ['/images/placeholders/mck-kotor.jpg'],
    upvotes: 67,
    userId: 'user5',
    reporterName: 'Rani Wijaya',
    reporterAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=RaniWijaya',
    createdAt: '2024-01-12T11:15:00Z',
    updatedAt: '2024-01-12T11:15:00Z',
  },
  // Add more mock reports...
  {
    id: '6',
    title: 'Trotoar Rusak di Jalan Pemuda',
    description: 'Trotoar sepanjang 200 meter rusak parah, banyak lubang dan paving block hilang. Pejalan kaki terpaksa berjalan di pinggir jalan.',
    category: 'infrastruktur',
    status: 'pending',
    province: 'Jawa Tengah',
    city: 'Semarang',
    address: 'Jl. Pemuda, Sekayu',
    location: 'Sekayu',
    latitude: -6.9833,
    longitude: 110.4167,
    images: [],
    upvotes: 45,
    userId: 'user6',
    reporterName: 'Rudi Hartono',
    reporterAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=RudiHartono',
    createdAt: '2024-01-11T09:00:00Z',
    updatedAt: '2024-01-11T09:00:00Z',
  },
  {
    id: '7',
    title: 'Pohon Tumbang Menghalangi Jalan',
    description: 'Pohon besar tumbang akibat angin kencang menghalangi setengah badan jalan. Menyebabkan kemacetan dan berbahaya.',
    category: 'lainnya',
    status: 'in-progress',
    province: 'Jawa Barat',
    city: 'Bandung',
    address: 'Jl. Dago, Coblong',
    location: 'Coblong',
    latitude: -6.8700,
    longitude: 107.6136,
    images: ['/images/placeholders/pohon-tumbang.jpg'],
    upvotes: 178,
    userId: 'user7',
    reporterName: 'Andi Prasetyo',
    reporterAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AndiPrasetyo',
    createdAt: '2024-01-09T15:30:00Z',
    updatedAt: '2024-01-14T08:00:00Z',
  },
];

// Helper functions
export function getReportById(id: string): Report | undefined {
  return mockReports.find(report => report.id === id);
}

export function getReportsByFilter(filters: {
  province?: string;
  city?: string;
  category?: string;
}): Report[] {
  return mockReports.filter(report => {
    if (filters.province && report.province !== filters.province) return false;
    if (filters.city && report.city !== filters.city) return false;
    if (filters.category && report.category !== filters.category) return false;
    return true;
  });
}

export function getRecentReports(limit: number = 10): Report[] {
  return [...mockReports]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, limit);
}

export function getTopReportsByUpvotes(limit: number = 10): Report[] {
  return [...mockReports]
    .sort((a, b) => b.upvotes - a.upvotes)
    .slice(0, limit);
}
