import Link from 'next/link';
import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="border-t border-dark-brown/10 bg-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <Logo />
              <span className="text-xl font-bold text-dark-brown">LaporWarga</span>
            </div>
            <p className="text-sm text-dark-brown/70">
              Platform pelaporan warga untuk Indonesia yang lebih baik
            </p>
          </div>

          <div>
            <h3 className="mb-4 font-semibold text-dark-brown">Navigasi</h3>
            <ul className="space-y-2 text-sm text-dark-brown/70">
              <li>
                <Link href="/feed" className="hover:text-primary-yellow">
                  Semua Laporan
                </Link>
              </li>
              <li>
                <Link href="/leaderboard" className="hover:text-primary-yellow">
                  Leaderboard
                </Link>
              </li>
              <li>
                <Link href="/reports/create" className="hover:text-primary-yellow">
                  Buat Laporan
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-semibold text-dark-brown">Tentang</h3>
            <ul className="space-y-2 text-sm text-dark-brown/70">
              <li>
                <Link href="/about" className="hover:text-primary-yellow">
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-primary-yellow">
                  Kebijakan Privasi
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-primary-yellow">
                  Syarat & Ketentuan
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-semibold text-dark-brown">Kontak</h3>
            <ul className="space-y-2 text-sm text-dark-brown/70">
              <li>Email: info@laporwarga.id</li>
              <li>Twitter: @laporwarga</li>
              <li>Instagram: @laporwarga</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-dark-brown/10 pt-8 text-center text-sm text-dark-brown/70">
          © 2024 LaporWarga. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
