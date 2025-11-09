'use client';

import Link from 'next/link';
import { Logo } from './Logo';
import UserAvatar from './UserAvatar';

export default function Navbar() {
  // TODO: Get user from auth context
  const isLoggedIn = false;

  return (
    <nav className="border-b border-dark-brown/10 bg-white">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center gap-2">
          <Logo />
          <span className="text-xl font-bold text-dark-brown">LaporWarga</span>
        </Link>

        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <>
              <Link
                href="/reports/create"
                className="rounded-lg bg-primary-yellow px-4 py-2 font-semibold text-dark-brown transition hover:bg-primary-yellow/90"
              >
                Buat Laporan
              </Link>
              <Link href="/profile">
                <UserAvatar name="User" size="sm" />
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-dark-brown transition hover:text-primary-yellow"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="rounded-lg bg-primary-yellow px-4 py-2 font-semibold text-dark-brown transition hover:bg-primary-yellow/90"
              >
                Daftar
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
