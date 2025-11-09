'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();

  const links = [
    { href: '/feed', label: 'Feed', icon: '📋' },
    { href: '/leaderboard', label: 'Leaderboard', icon: '🏆' },
    { href: '/profile', label: 'Profil', icon: '👤' },
  ];

  return (
    <aside className="hidden w-64 border-r border-dark-brown/10 bg-white lg:block">
      <nav className="p-4">
        <ul className="space-y-2">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`flex items-center gap-3 rounded-lg px-4 py-3 transition ${
                  pathname === link.href
                    ? 'bg-primary-yellow text-dark-brown'
                    : 'text-dark-brown/70 hover:bg-cream'
                }`}
              >
                <span>{link.icon}</span>
                <span className="font-medium">{link.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
