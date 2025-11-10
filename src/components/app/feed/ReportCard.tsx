'use client';

import Link from 'next/link';
import CategoryBadge from '@/components/shared/CategoryBadge';
import LocationBadge from '@/components/shared/LocationBadge';
import type { Report } from '@/types/report';
import { ArrowBigUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ReportCardProps {
  report: Report & { timestamp?: string };
  onUpvote?: (reportId: string) => void;
  isLoggedIn?: boolean;
  isUpvoted?: boolean; // <-- TAMBAHKAN PROP INI
}

export default function ReportCard({
  report,
  onUpvote,
  isLoggedIn,
  isUpvoted, // <-- AMBIL PROP INI
}: ReportCardProps) {
  const handleUpvoteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onUpvote?.(report.id);
  };

  return (
    <Link
      href={`/reports/${report.id}`}
      className="block rounded-lg border border-border bg-card p-4 shadow-sm transition hover:shadow-md"
    >
      <div className="mb-2 flex items-start justify-between">
        <CategoryBadge category={report.category} />
        <span className="text-sm text-muted-foreground">{report.timestamp}</span>
      </div>

      <h3 className="mb-2 font-semibold text-foreground">{report.title}</h3>
      <p className="mb-3 line-clamp-2 text-sm text-muted-foreground">
        {report.description}
      </p>

      <div className="flex items-center justify-between">
        <LocationBadge location={`${report.city}, ${report.province}`} />
        <div className="flex items-center gap-2">
          {/* === KODE TOMBOL DIPERBARUI DENGAN LOGIKA KONDISIONAL === */}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleUpvoteClick}
            disabled={!isLoggedIn}
            className={`h-8 px-3 transition-all ${
              !isLoggedIn
                ? 'cursor-not-allowed text-muted-foreground/50' // 1. Nonaktif
                : isUpvoted
                ? 'text-primary hover:bg-primary/10' // 2. Sudah di-upvote (Kuning)
                : 'text-muted-foreground hover:bg-accent' // 3. Belum di-upvote (Putih/Grey)
            }`}
            aria-label="Upvote laporan"
          >
            <ArrowBigUp
              className={`mr-1 h-4 w-4 transition-all ${
                isLoggedIn && isUpvoted ? 'fill-primary' : 'fill-none' // Isi ikon jika di-upvote
              }`}
            />
            <span className="inter-semibold text-sm">{report.upvotes}</span>
          </Button>
          {/* === AKHIR DARI KODE BARU === */}
        </div>
      </div>
    </Link>
  );
}