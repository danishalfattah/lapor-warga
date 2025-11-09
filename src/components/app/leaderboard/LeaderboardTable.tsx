'use client';

import { useEffect, useState } from 'react';
import LeaderboardItem from './LeaderboardItem';

export default function LeaderboardTable() {
  const [users, setUsers] = useState([]);

  // TODO: Fetch leaderboard data

  return (
    <div className="rounded-lg bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b border-dark-brown/10">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-dark-brown">
                Peringkat
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-dark-brown">
                Pengguna
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-dark-brown">
                Total Laporan
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-dark-brown">
                Upvotes
              </th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user: any, index: number) => (
                <LeaderboardItem key={user.id} user={user} rank={index + 1} />
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-dark-brown/50">
                  Belum ada data leaderboard
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
