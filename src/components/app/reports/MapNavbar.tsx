'use client';

import { Plus, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Logo from '@/components/shared/Logo'; // Menggunakan Logo dari project Anda

interface MapNavbarProps {
  isLoggedIn: boolean;
  onCreateReport: () => void;
  onNavigateToAuth: () => void;
  onNavigateToLanding: () => void;
}

export function MapNavbar({
  isLoggedIn,
  onCreateReport,
  onNavigateToAuth,
  onNavigateToLanding,
}: MapNavbarProps) {
  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-neutral-950/95 px-4 py-3 shadow-lg backdrop-blur-lg lg:px-6">
      <div className="mx-auto flex max-w-[2000px] items-center justify-between gap-4">
        {/* Logo */}
        <button
          onClick={onNavigateToLanding}
          className="shrink-0 cursor-pointer transition-opacity hover:opacity-80"
        >
          <div className="flex items-center gap-2">
            <Logo />
            <span className="font-bold text-white">LaporWarga</span>
          </div>
        </button>

        {/* Right: Actions */}
        <div className="ml-auto flex shrink-0 items-center gap-2">
          <Button
            onClick={onCreateReport}
            className="h-9 cursor-pointer bg-primary text-primary-content shadow-sm transition-all hover:scale-105 hover:bg-primary/90 active:scale-95" // DIGANTI
          >
            <Plus className="h-4 w-4 lg:mr-2" />
            <span className="hidden lg:inline">Buat Laporan</span>
          </Button>

          {isLoggedIn ? (
            <Avatar className="h-9 w-9 cursor-pointer ring-2 ring-primary/20 transition-all hover:ring-primary/40">
              <AvatarFallback className="bg-secondary text-secondary-content">
                {' '}
                {/* DIGANTI */}U
              </AvatarFallback>
            </Avatar>
          ) : (
            <Button
              onClick={onNavigateToAuth}
              variant="outline"
              className="h-9 cursor-pointer border-white/30 bg-white/10 text-white transition-all hover:border-white/40 hover:bg-white/20"
            >
              <User className="h-4 w-4 lg:mr-2" />
              <span className="hidden lg:inline">Masuk</span>
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}