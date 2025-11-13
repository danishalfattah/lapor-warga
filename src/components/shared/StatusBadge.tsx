// src/components/shared/StatusBadge.tsx
"use client";

import type { ReportStatus } from "@/types/report";

interface StatusInfo {
  label: string;
  className: string; // Tailwind classes
}

// Peta untuk menerjemahkan status ke Bahasa Indonesia dan memberi style
const STATUS_MAP: Record<ReportStatus, StatusInfo> = {
  pending: {
    label: "Belum Selesai",
    className: "bg-[#FEF3C7] text-[#92400E] border border-[#FCD34D]", // Kuning
  },
  resolved: {
    label: "Selesai",
    className: "bg-[#D1FAE5] text-[#065F46] border border-[#34D399]", // Hijau
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
