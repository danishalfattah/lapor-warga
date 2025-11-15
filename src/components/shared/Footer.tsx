import Link from "next/link";
import { Facebook, Twitter, Instagram, Heart } from "lucide-react";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#f5f3ea]">
      {/* Main Footer Card */}
      <div className="relative max-w-6xl mx-auto px-4 pt-20 pb-12">
        {/* Decorative Corner Elements */}
        <div className="absolute top-16 left-0 w-20 h-20 border-l-4 border-t-4 border-[#FACC15] opacity-30" />
        <div className="absolute bottom-8 right-0 w-20 h-20 border-r-4 border-b-4 border-[#FACC15] opacity-30" />

        {/* Content Grid */}
        <div className="bg-white/50 backdrop-blur-sm rounded-3xl p-8 sm:p-12 border border-[#eae6d4] shadow-xl relative overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
            {/* Left: Logo & Tagline */}
            <div className="flex flex-col items-center md:items-start gap-6">
              <Link href="/" className="cursor-pointer transition-opacity hover:opacity-80">
                <Logo height={56} />
              </Link>
              <div className="space-y-3">
                <p className="text-[#342e19] inter-semibold text-center md:text-left">
                  Suara Anda, Perubahan Nyata
                </p>
                <p className="text-[#8a7b42] text-sm text-center md:text-left max-w-xs">
                  Platform civic engagement yang menghubungkan warga dengan solusi nyata
                </p>
              </div>
            </div>

            {/* Right: Quick Links & Social */}
            <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center md:items-start md:justify-end">
              {/* Quick Navigation */}
              <div className="flex flex-col items-center md:items-start gap-3">
                <h4 className="text-[#342e19] inter-semibold mb-2">Navigasi</h4>
                <a
                  href="#hero"
                  className="text-[#8a7b42] hover:text-[#FACC15] transition-colors text-sm cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    document
                      .getElementById("hero")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Beranda
                </a>
                <a
                  href="#stats"
                  className="text-[#8a7b42] hover:text-[#FACC15] transition-colors text-sm cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    document
                      .getElementById("stats")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Statistik
                </a>
                <a
                  href="#leaderboard"
                  className="text-[#8a7b42] hover:text-[#FACC15] transition-colors text-sm cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    document
                      .getElementById("leaderboard")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Leaderboard
                </a>
              </div>

              {/* Social Media */}
              <div className="flex flex-col items-center md:items-start gap-3">
                <h4 className="text-[#342e19] inter-semibold mb-2">
                  Ikuti Kami
                </h4>
                <div className="flex items-center gap-3">
                  <a
                    href="#"
                    className="w-10 h-10 rounded-xl bg-[#FACC15]/20 hover:bg-[#FACC15] flex items-center justify-center text-[#342e19] transition-all duration-300 hover:scale-110 hover:rotate-6 cursor-pointer"
                  >
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 rounded-xl bg-[#FACC15]/20 hover:bg-[#FACC15] flex items-center justify-center text-[#342e19] transition-all duration-300 hover:scale-110 hover:rotate-6 cursor-pointer"
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 rounded-xl bg-[#FACC15]/20 hover:bg-[#FACC15] flex items-center justify-center text-[#342e19] transition-all duration-300 hover:scale-110 hover:rotate-6 cursor-pointer"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="relative pt-8">
            {/* Divider Line */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#FACC15]/30" />

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-[#b4a464] text-xs sm:text-sm">
                © 2025 LaporWarga. Semua hak dilindungi.
              </p>
              <p className="text-[#b4a464] text-xs sm:text-sm flex items-center gap-1.5">
                Dibuat dengan
                <Heart className="w-3.5 h-3.5 text-[#fa1515] fill-[#fa1515] animate-pulse" />
                untuk Indonesia
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
