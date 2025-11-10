// src/contexts/Providers.tsx
'use client'; // <-- Ini adalah bagian terpenting

import type { ReactNode } from 'react';
import { AuthProvider } from '@/contexts/AuthContext';
import { APIProvider } from '@vis.gl/react-google-maps';
import { GOOGLE_MAPS_API_KEY } from '@/lib/google-maps/client';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
      <AuthProvider>{children}</AuthProvider>
    </APIProvider>
  );
}