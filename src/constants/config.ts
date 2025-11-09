// Application configuration

export const APP_CONFIG = {
  name: 'LaporWarga',
  description: 'Platform pelaporan warga untuk Indonesia yang lebih baik',
  url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  maxImageSize: 5 * 1024 * 1024, // 5MB
  maxImages: 5,
  defaultLimit: 50,
} as const;
