import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ReportCard } from "./ReportCard";
import { ReportCardSkeleton } from "@/components/shared/ReportCardSkeleton";
import { CATEGORIES } from "@/constants/categories";
import type { Report, ReportCategory, ReportStatus } from "@/types/report";
import { Search } from "lucide-react";

interface MobileReportListProps {
  reports: Report[];
  onReportHover: (id: string | null) => void;
  onReportClick: (reportId: string) => void;
  onUpvote: (id: string) => void;
  isLoggedIn: boolean;
  hoveredReportId: string | null;
  // Filter props
  selectedCategory: ReportCategory | "all";
  selectedStatus: "all" | ReportStatus;
  sortBy: "upvotes" | "date";
  onCategoryChange: (value: ReportCategory | "all") => void;
  onStatusChange: (value: "all" | ReportStatus) => void;
  onSortChange: (value: "upvotes" | "date") => void;
  upvotedReportIds?: string[];
  isLoading?: boolean;
}

export function MobileReportList({
  reports,
  onReportHover,
  onReportClick,
  onUpvote,
  isLoggedIn,
  hoveredReportId,
  selectedCategory,
  selectedStatus,
  sortBy,
  onCategoryChange,
  onStatusChange,
  onSortChange,
  upvotedReportIds = [],
  isLoading = false,
}: MobileReportListProps) {
  return (
    <div className="px-4 pb-4">
      {/* Header with Title */}
      <div className="mb-3">
        <h2 className="text-lg font-semibold text-gray-900">Daftar Laporan</h2>
        <p className="text-xs text-gray-500 mt-1">
          {reports.length} laporan ditemukan
        </p>
      </div>

      {/* Filters - 3 columns */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        {/* Category Filter */}
        <Select
          value={selectedCategory}
          onValueChange={(value) =>
            onCategoryChange(value as ReportCategory | "all")
          }
        >
          <SelectTrigger className="h-9 text-xs text-left">
            <SelectValue placeholder="Kategori" />
          </SelectTrigger>
          <SelectContent align="start">
            <SelectItem value="all" className="text-xs text-left">
              Semua
            </SelectItem>
            {CATEGORIES.map((category) => (
              <SelectItem
                key={category.id}
                value={category.id}
                className="text-xs text-left"
              >
                {category.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Status Filter */}
        <Select
          value={selectedStatus}
          onValueChange={(value) =>
            onStatusChange(value as "all" | ReportStatus)
          }
        >
          <SelectTrigger className="h-9 text-xs text-left">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent align="start">
            <SelectItem value="all" className="text-xs text-left">
              Semua Status
            </SelectItem>
            <SelectItem value="pending" className="text-xs text-left">
              Belum Selesai
            </SelectItem>
            <SelectItem value="resolved" className="text-xs text-left">
              Selesai
            </SelectItem>
          </SelectContent>
        </Select>

        {/* Sort Filter */}
        <Select
          value={sortBy}
          onValueChange={(value) => onSortChange(value as "upvotes" | "date")}
        >
          <SelectTrigger className="h-9 text-xs text-left">
            <SelectValue placeholder="Urut" />
          </SelectTrigger>
          <SelectContent align="start">
            <SelectItem value="upvotes" className="text-xs text-left">
              Terpopuler
            </SelectItem>
            <SelectItem value="date" className="text-xs text-left">
              Terbaru
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Report Cards */}
      <div className="grid grid-cols-1 gap-3">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <ReportCardSkeleton key={i} />
          ))
        ) : (
          <>
            {reports.map((report) => (
              <ReportCard
                key={report.id}
                report={report}
                onHover={onReportHover}
                onClick={onReportClick}
                onUpvote={onUpvote}
                isLoggedIn={isLoggedIn}
                isHovered={hoveredReportId === report.id}
                isUpvoted={upvotedReportIds.includes(report.id)}
              />
            ))}

            {/* Empty State */}
            {reports.length === 0 && (
              <div className="flex flex-col items-center justify-center py-16 px-4">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-gray-500 text-center inter-semibold mb-1">
                  Tidak ada laporan
                </p>
                <p className="text-xs text-gray-400 text-center">
                  Coba ubah filter atau kata kunci pencarian
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
