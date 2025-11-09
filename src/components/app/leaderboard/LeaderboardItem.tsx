'use client';

import Link from 'next/link';
import UserAvatar from '@/components/shared/UserAvatar';

interface LeaderboardItemProps {
  user: any; // TODO: Add proper type
  rank: number;
}

export default function LeaderboardItem({ user, rank }: LeaderboardItemProps) {
  return (
    <tr className="border-b border-dark-brown/5 transition hover:bg-cream">
      <td className="px-6 py-4">
        <span className="text-lg font-bold text-primary-yellow">#{rank}</span>
      </td>
      <td className="px-6 py-4">
        <Link href={`/profile/${user.id}`} className="flex items-center gap-3">
          <UserAvatar name={user.name} size="sm" />
          <span className="font-medium text-dark-brown">{user.name}</span>
        </Link>
      </td>
      <td className="px-6 py-4 text-dark-brown">{user.reportCount || 0}</td>
      <td className="px-6 py-4 text-dark-brown">{user.upvoteCount || 0}</td>
    </tr>
  );
}
