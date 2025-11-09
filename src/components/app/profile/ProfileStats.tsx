'use client';

interface ProfileStatsProps {
  userId?: string;
}

export default function ProfileStats({ userId }: ProfileStatsProps) {
  // TODO: Fetch user stats

  return (
    <div className="mb-6 grid gap-4 md:grid-cols-3">
      <div className="rounded-lg bg-white p-4 shadow-sm">
        <div className="text-3xl font-bold text-dark-brown">0</div>
        <div className="text-dark-brown/70">Total Laporan</div>
      </div>
      <div className="rounded-lg bg-white p-4 shadow-sm">
        <div className="text-3xl font-bold text-secondary-green">0</div>
        <div className="text-dark-brown/70">Laporan Selesai</div>
      </div>
      <div className="rounded-lg bg-white p-4 shadow-sm">
        <div className="text-3xl font-bold text-primary-yellow">0</div>
        <div className="text-dark-brown/70">Total Upvotes</div>
      </div>
    </div>
  );
}
