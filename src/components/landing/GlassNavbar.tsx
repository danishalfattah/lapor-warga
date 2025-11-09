import { MapPin } from "lucide-react";
import { useState, useEffect } from "react";
import { Logo } from "../shared/Logo";

interface GlassNavbarProps {
  onNavigateToMap: () => void;
  onNavigateToAuth: () => void;
}

export function GlassNavbar({
  onNavigateToMap,
  onNavigateToAuth,
}: GlassNavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`
        fixed top-0 z-50 w-full px-6 text-white 
        transition-all duration-300 ease-out lg:px-12
        ${
          isScrolled
            ? "bg-neutral-950/95 py-4 shadow-lg backdrop-blur-lg"
            : "bg-neutral-950/0 py-6 shadow-none"
        }
      `}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Logo isDark={true} height={60} />
        </div>

        {/* Desktop Buttons */}
        <div className="hidden items-center gap-3 sm:flex">
          <button
            onClick={onNavigateToMap}
            className="
              group flex items-center gap-2 rounded-lg border-2 border-white/30
              bg-white/10 backdrop-blur-sm px-4 py-2 text-white 
              transition-colors hover:bg-white/20 cursor-pointer
            "
          >
            <MapPin className="w-4 h-4 transition-transform duration-300 ease-out group-hover:scale-125" />
            <span>Peta Laporan</span>
          </button>
          <button
            onClick={onNavigateToAuth}
            className="
              group flex items-center gap-2 rounded-lg border-2 border-[#FACC15] 
              bg-[#FACC15] px-4 py-2 text-black transition-colors
              hover:bg-[#FACC15]/90 cursor-pointer
            "
          >
            <svg
              className="w-4 h-4 transition-transform duration-300 ease-out group-hover:scale-125"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
              />
            </svg>
            <span>Masuk</span>
          </button>
        </div>

        {/* Mobile Buttons */}
        <div className="flex items-center gap-2 sm:hidden">
          <button
            onClick={onNavigateToMap}
            className="
              group flex items-center gap-2 rounded-lg border-2 border-white/30
              bg-white/10 backdrop-blur-sm px-3 py-2 text-white 
              transition-colors hover:bg-white/20 cursor-pointer
            "
          >
            <MapPin className="w-4 h-4 transition-transform duration-300 ease-out group-hover:scale-125" />
          </button>
          <button
            onClick={onNavigateToAuth}
            className="
              group flex items-center gap-2 rounded-lg border-2 border-[#FACC15] 
              bg-[#FACC15] px-3 py-2 text-black transition-colors
              hover:bg-[#FACC15]/90 cursor-pointer
            "
          >
            <svg
              className="w-4 h-4 transition-transform duration-300 ease-out group-hover:scale-125"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
              />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}
