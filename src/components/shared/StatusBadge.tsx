// src/components/shared/StatusBadge.tsx
'use client';

import type { ReportStatus } from '@/types/report';

interface StatusInfo {
  label: string;
  className: string; // Tailwind classes
}

// Peta untuk menerjemahkan status ke Bahasa Indonesia dan memberi style
// Style ini meniru komponen CategoryBadge Anda
const STATUS_MAP: Record<ReportStatus, StatusInfo> = {
  pending: {
    label: 'Menunggu',
    className: 'bg-yellow-100 text-yellow-700',
  },
  in_progress: {
    label: 'Ditangani',
    className: 'bg-blue-100 text-blue-700',
  },
  resolved: {
    label: 'Selesai',
    className: 'bg-green-100 text-green-700',
  },
  rejected: {
    label: 'Ditolak',
    className: 'bg-red-100 text-red-700',
  },
};

interface StatusBadgeProps {
  status: ReportStatus;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  // Ambil info status, default ke 'pending' jika tidak ditemukan
  const info = STATUS_MAP[status] || STATUS_MAP.pending;

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${info.className}`}
    >
      {info.label}
    </span>
  );
}