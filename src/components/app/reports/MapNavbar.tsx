import { Plus, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Logo } from "@/components/shared/Logo";

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
    <nav className="bg-neutral-950/95 backdrop-blur-lg border-b border-white/10 px-4 lg:px-6 py-3 shadow-lg sticky top-0 z-50">
      <div className="flex items-center justify-between gap-4 max-w-[2000px] mx-auto">
        {/* Logo */}
        <button
          onClick={onNavigateToLanding}
          className="hover:opacity-80 transition-opacity cursor-pointer flex-shrink-0"
        >
          <Logo height={44} isDark={true} />
        </button>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 flex-shrink-0 ml-auto">
          <Button
            onClick={onCreateReport}
            className="bg-[#FACC15] text-[#2c2c21] hover:bg-[#FACC15]/90 shadow-sm h-9 cursor-pointer transition-all"
          >
            <Plus className="w-4 h-4 lg:mr-2" />
            <span className="hidden lg:inline">Buat Laporan</span>
          </Button>

          {isLoggedIn ? (
            <Avatar className="cursor-pointer h-9 w-9 ring-2 ring-[#FACC15]/20 hover:ring-[#FACC15]/40 transition-all">
              <AvatarFallback className="bg-[#35750f] text-white">
                U
              </AvatarFallback>
            </Avatar>
          ) : (
            <Button
              onClick={onNavigateToAuth}
              variant="outline"
              className="h-9 border-white/30 bg-white/10 text-white hover:bg-white/20 hover:border-white/40 cursor-pointer transition-all"
            >
              <User className="w-4 h-4 lg:mr-2" />
              <span className="hidden lg:inline">Masuk</span>
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}
