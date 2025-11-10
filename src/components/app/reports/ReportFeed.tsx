'use client';

import { ScrollArea } from '@/components/ui/scroll-area';
import ReportCard from '@/components/app/feed/ReportCard';
import { Tag } from 'lucide-react';
import type { Report } from '@/types/report';
import { formatRelativeTime } from '@/utils/formatters';

interface ReportFeedProps {
  reports: Report[];
  onReportHover: (id: string | null) => void;
  onReportClick: (id: string | null) => void;
  onUpvote: (id: string) => void;
  isLoggedIn: boolean;
  hoveredReportId: string | null;
  upvotedReportIds: string[]; // <-- TAMBAHKAN PROP INI
}

export function ReportFeed({
  reports,
  onReportHover,
  onReportClick,
  onUpvote,
  isLoggedIn,
  hoveredReportId,
  upvotedReportIds, // <-- AMBIL PROP INI
}: ReportFeedProps) {
  return (
    <ScrollArea className="h-full bg-linear-to-b from-background/50 to-card">
      <div className="space-y-3 p-3 lg:p-4">
        {/* Header */}
        <div className="sticky top-0 z-10 mb-2 rounded-xl border border-border/50 bg-card/80 px-4 py-3 shadow-sm backdrop-blur-md">
          <h2 className="inter-semibold text-foreground">Laporan Terbaru</h2>
          <p className="mt-0.5 text-xs text-muted-foreground">
            {reports.length} laporan ditemukan
          </p>
        </div>

        {/* Report Cards */}
        {reports.map((report) => {
          // Tentukan apakah card ini sudah di-upvote
          const isUpvoted = upvotedReportIds.includes(report.id);
          return (
            <div
              key={report.id}
              onMouseEnter={() => onReportHover(report.id)}
              onMouseLeave={() => onReportHover(null)}
              onClick={() => onReportClick(report.id)}
              className={`rounded-lg ${
                hoveredReportId === report.id ? 'ring-2 ring-primary' : ''
              }`}
            >
              <ReportCard
                report={{
                  ...report,
                  timestamp: formatRelativeTime(report.createdAt),
                }}
                onUpvote={onUpvote}
                isLoggedIn={isLoggedIn}
                isUpvoted={isUpvoted} // <-- KIRIM PROP BARU
              />
            </div>
          );
        })}

        {/* Empty State */}
        {reports.length === 0 && (
          <div className="flex flex-col items-center justify-center px-4 py-16">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
              <Tag className="h-8 w-8 text-muted-foreground" />
            </div>
            <p className="inter-semibold mb-1 text-center text-muted-foreground">
              Tidak ada laporan
            </p>
            <p className="text-center text-xs text-muted-foreground">
              Coba ubah filter atau buat laporan baru
            </p>
          </div>
        )}
      </div>
    </ScrollArea>
  );
}