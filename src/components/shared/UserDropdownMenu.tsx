"use client";

import { User, LogOut, Settings } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import UserAvatar from "@/components/shared/UserAvatar";
import type { User as UserType, UserStats } from "@/types/user";

interface UserDropdownMenuProps {
  user: UserType & { stats: UserStats };
  onLogout?: () => void;
  showDetails?: boolean; // Show name and reports count in trigger button
}

export function UserDropdownMenu({
  user,
  onLogout,
  showDetails = true,
}: UserDropdownMenuProps) {
  const router = useRouter();

  const handleNavigateToProfile = () => {
    router.push("/profile");
  };

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    } else {
      // Default logout behavior - redirect to login
      router.push("/login");
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="relative flex items-center gap-2 rounded-full focus:outline-none focus:ring-2 focus:ring-[#FACC15] focus:ring-offset-2 transition-all hover:ring-2 hover:ring-[#FACC15]/50 cursor-pointer"
          aria-label="User menu"
        >
          <UserAvatar name={user.name} size="sm" />
          {showDetails && (
            <div className="hidden md:block text-left">
              <p className="text-sm font-semibold text-[#2c2c21]">
                {user.name}
              </p>
              <p className="text-xs text-gray-500">
                {user.stats.totalReports} laporan
              </p>
            </div>
          )}
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={handleNavigateToProfile}
          className="cursor-pointer"
        >
          <User className="mr-2 h-4 w-4" />
          <span>Profil Saya</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={handleLogout}
          className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Keluar</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
