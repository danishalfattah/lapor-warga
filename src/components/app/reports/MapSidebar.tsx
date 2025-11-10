'use client';

import { useState, useEffect } from 'react';
import {
  Search,
  ChevronRight,
  ChevronLeft,
  TrendingUp,
  Clock,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import ReportCard from '@/components/app/feed/ReportCard';
import type { Report } from '@/types/report';
import { formatRelativeTime } from '@/utils/formatters';

interface MapSidebarProps {
  reports: Report[];
  onReportHover: (id: string | null) => void;
  onReportClick: (id: string | null) => void;
  onUpvote: (id: string) => void;
  isLoggedIn: boolean;
  hoveredReportId: string | null;
  onFilteredReportsChange?: (reports: Report[]) => void;
  upvotedReportIds: string[]; // <-- TAMBAHKAN PROP INI
}

export function MapSidebar({
  reports,
  onReportHover,
  onReportClick,
  onUpvote,
  isLoggedIn,
  hoveredReportId,
  onFilteredReportsChange,
  upvotedReportIds, // <-- AMBIL PROP INI
}: MapSidebarProps) {
  // ... (state dan logika filter tidak berubah)
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'upvotes' | 'date'>('upvotes');

  const filteredReports = reports
    .filter((report) => {
      if (!searchQuery) return true;
      const query = searchQuery.toLowerCase();
      return (
        report.title.toLowerCase().includes(query) ||
        report.address.toLowerCase().includes(query) ||
        report.city.toLowerCase().includes(query)
      );
    })
    .sort((a, b) => {
      if (sortBy === 'upvotes') {
        return b.upvotes - a.upvotes;
      } else {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      }
    });

  useEffect(() => {
    onFilteredReportsChange?.(filteredReports);
  }, [searchQuery, sortBy, reports, onFilteredReportsChange]);

  return (
    <>
      {/* ... (markup trigger collapse tidak berubah) ... */}
      {isCollapsed && (
        <div className="relative z-30 h-full w-12 flex-shrink-0">
          <button
            onClick={() => setIsCollapsed(false)}
            className="absolute left-2 top-4 z-20 rounded-lg p-3 transition-all duration-300 hover:scale-110"
            aria-label="Expand sidebar"
          >
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </button>
        </div>
      )}

      {/* Kontainer Sidebar */}
      <div
        className={`relative h-full flex-shrink-0 overflow-hidden bg-card transition-all duration-300 ease-out ${
          isCollapsed ? 'w-0 border-r-0' : 'w-[400px] border-r border-border'
        }`}
        style={{ willChange: 'width' }}
      >
        <div
          className={`flex h-full w-[400px] flex-col overflow-hidden ${
            isCollapsed ? 'invisible' : 'visible'
          }`}
        >
          {/* Header */}
          <div className="flex-shrink-0 border-b border-border p-4 whitespace-nowrap">
            {/* ... (markup header tidak berubah) ... */}
            <div className="mb-4 flex items-center justify-between">
              <h2 className="inter-semibold text-foreground">Laporan Warga</h2>
              <button
                onClick={() => setIsCollapsed(true)}
                className="rounded-lg p-2 transition-colors hover:bg-accent"
                aria-label="Collapse sidebar"
              >
                <ChevronLeft className="h-5 w-5 text-muted-foreground" />
              </button>
            </div>
            
            <div className="relative mb-3">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Cari laporan atau lokasi..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="mb-3 flex gap-2">
              <button
                onClick={() => setSortBy('upvotes')}
                className={`flex-1 flex items-center justify-center gap-2 rounded-lg px-3 py-2 transition-all ${
                  sortBy === 'upvotes'
                    ? 'bg-primary text-primary-content inter-semibold'
                    : 'bg-muted text-muted-foreground hover:bg-accent'
                }`}
              >
                <TrendingUp className="h-4 w-4" />
                <span className="text-sm whitespace-nowrap">Terpopuler</span>
              </button>
              <button
                onClick={() => setSortBy('date')}
                className={`flex-1 flex items-center justify-center gap-2 rounded-lg px-3 py-2 transition-all ${
                  sortBy === 'date'
                    ? 'bg-primary text-primary-content inter-semibold'
                    : 'bg-muted text-muted-foreground hover:bg-accent'
                }`}
              >
                <Clock className="h-4 w-4" />
                <span className="text-sm whitespace-nowrap">Terbaru</span>
              </button>
            </div>
            
            <p className="text-xs text-muted-foreground">
              {`${filteredReports.length} laporan ditemukan`}
            </p>
          </div>

          {/* Daftar Laporan */}
          <div className="flex-1 overflow-hidden">
            <ScrollArea className="h-full">
              <div className="space-y-3 p-3">
                {filteredReports.length > 0 ? (
                  filteredReports.map((report) => {
                    // Tentukan apakah card ini sudah di-upvote
                    const isUpvoted = upvotedReportIds.includes(report.id);
                    return (
                      <div
                        key={report.id}
                        onMouseEnter={() => onReportHover(report.id)}
                        onMouseLeave={() => onReportHover(null)}
                        onClick={() => onReportClick(report.id)}
                        className={`rounded-lg ${
                          hoveredReportId === report.id
                            ? 'ring-2 ring-primary'
                            : ''
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
                  })
                ) : (
                  // ... (markup empty state tidak berubah) ...
                  <div className="flex flex-col items-center justify-center px-4 py-16">
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                      <Search className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <p className="inter-semibold mb-1 text-center text-muted-foreground">
                      Tidak ada laporan
                    </p>
                    <p className="text-center text-xs text-muted-foreground">
                      Coba ubah kata kunci pencarian
                    </p>
                  </div>
                )}
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>
    </>
  );
}