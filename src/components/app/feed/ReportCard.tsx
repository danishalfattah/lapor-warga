'use client';

import CategoryBadge from '@/components/shared/CategoryBadge';
import LocationBadge from '@/components/shared/LocationBadge';
import StatusBadge from '@/components/shared/StatusBadge'; // <-- 1. IMPORT BARU
import type { Report } from '@/types/report';
import { ArrowBigUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ReportCardProps {
  report: Report & { timestamp?: string };
  onUpvote?: (reportId: string) => void;
  isLoggedIn?: boolean;
  isUpvoted?: boolean;
}

export default function ReportCard({
  report,
  onUpvote,
  isLoggedIn,
  isUpvoted,
}: ReportCardProps) {
  const handleUpvoteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onUpvote?.(report.id);
  };

  return (
    <div className="block cursor-pointer rounded-lg border border-border bg-card p-4 shadow-sm transition hover:shadow-md">
      <div className="mb-2 flex items-start justify-between">
        <CategoryBadge category={report.category} />
        <span className="text-sm text-muted-foreground">{report.timestamp}</span>
      </div>

      <h3 className="mb-2 font-semibold text-foreground">{report.title}</h3>
      <p className="mb-3 line-clamp-2 text-sm text-muted-foreground">
        {report.description}
      </p>

      {/* 2. MODIFIKASI BAGIAN BAWAH INI */}
      <div className="flex items-center justify-between">
        <LocationBadge location={`${report.city}, ${report.province}`} />

        <div className="flex shrink-0 items-center gap-2">
          {/* 3. TAMBAHKAN STATUS BADGE DI SINI */}
          <StatusBadge status={report.status} />

          {/* Tombol Upvote (biarkan) */}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleUpvoteClick}
            disabled={!isLoggedIn}
            className={`h-8 px-3 transition-all ${
              !isLoggedIn
                ? 'cursor-not-allowed text-muted-foreground/50'
                : isUpvoted
                ? 'text-primary hover:bg-primary/10'
                : 'text-muted-foreground hover:bg-accent'
            }`}
            aria-label="Upvote laporan"
          >
            <ArrowBigUp
              className={`mr-1 h-4 w-4 transition-all ${
                isLoggedIn && isUpvoted ? 'fill-primary' : 'fill-none'
              }`}
            />
            <span className="inter-semibold text-sm">{report.upvotes}</span>
          </Button>
        </div>
      </div>
    </div>
  );
}