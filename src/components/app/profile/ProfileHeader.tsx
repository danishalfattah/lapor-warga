'use client';

import UserAvatar from '@/components/shared/UserAvatar';

interface ProfileHeaderProps {
  userId?: string;
}

export default function ProfileHeader({ userId }: ProfileHeaderProps) {
  // TODO: Fetch user data

  return (
    <div className="mb-6 rounded-lg bg-white p-6 shadow-sm">
      <div className="flex items-center gap-4">
        <UserAvatar name="User Name" size="lg" />
        <div>
          <h1 className="text-2xl font-bold text-dark-brown">Nama Pengguna</h1>
          <p className="text-dark-brown/70">Bergabung sejak Januari 2024</p>
        </div>
      </div>
    </div>
  );
}
