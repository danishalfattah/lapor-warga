"use client";

import { Calendar, Mail, User as UserIcon } from "lucide-react";
import UserAvatar from "@/components/shared/UserAvatar";
import { Skeleton } from "@/components/ui/skeleton";
import type { User } from "@/types/user";

interface ProfileHeaderProps {
  user: User | null;
  isLoading?: boolean;
}

export default function ProfileHeader({
  user,
  isLoading = false,
}: ProfileHeaderProps) {
  if (isLoading || !user) {
    return (
      <div className="mb-6 rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <Skeleton className="h-24 w-24 rounded-full shrink-0" />
          <div className="flex-1 space-y-3 w-full">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-64" />
            <Skeleton className="h-4 w-56" />
          </div>
        </div>
      </div>
    );
  }

  // Format tanggal bergabung
  const joinDate = new Date(user.createdAt).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="mb-6 rounded-2xl bg-white p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
        {/* Avatar */}
        <div className="relative shrink-0">
          <UserAvatar name={user.name} size="lg" />
          <div className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-[#FACC15] border-2 border-white flex items-center justify-center">
            <UserIcon className="h-3 w-3 text-[#2c2c21]" />
          </div>
        </div>

        {/* User Info */}
        <div className="flex-1">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#2c2c21] mb-2 inter-semibold">
            {user.name}
          </h1>

          <div className="flex flex-col gap-2">
            {/* Email */}
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Mail className="h-4 w-4 text-[#FACC15]" />
              <span>{user.email}</span>
            </div>

            {/* Join Date */}
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Calendar className="h-4 w-4 text-[#35750f]" />
              <span>Bergabung sejak {joinDate}</span>
            </div>
          </div>

          <p className="mt-3 text-sm text-gray-600 leading-relaxed">
            Aktif melaporkan masalah dan berkontribusi untuk perbaikan
            lingkungan sekitar.
          </p>
        </div>
      </div>
    </div>
  );
}
