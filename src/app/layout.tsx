// src/app/layout.tsx
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/contexts/AuthContext'; // <-- 1. IMPORT TAMBAHAN
import { APIProvider } from '@vis.gl/react-google-maps';
import { GOOGLE_MAPS_API_KEY } from '@/lib/google-maps/client';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

// 2. METADATA DIPERBARUI
export const metadata: Metadata = {
  title: 'LaporWarga',
  description: 'Platform pelaporan warga untuk Indonesia yang lebih baik',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* 3. BUNGKUS APLIKASI DENGAN APIProvider */}
        <APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
          <AuthProvider>{children}</AuthProvider>
        </APIProvider>
      </body>
    </html>
  );
}