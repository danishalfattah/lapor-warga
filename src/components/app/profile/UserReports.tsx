'use client';

import ReportCard from '../feed/ReportCard';

interface UserReportsProps {
  userId?: string;
}

export default function UserReports({ userId }: UserReportsProps) {
  // TODO: Fetch user reports

  return (
    <div className="rounded-lg bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-bold text-dark-brown">Laporan Saya</h2>
      <div className="space-y-4">
        <p className="text-dark-brown/50">Belum ada laporan</p>
        {/* TODO: Map user reports */}
      </div>
    </div>
  );
}
