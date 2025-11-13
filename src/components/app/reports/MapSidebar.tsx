import { useState, useEffect } from "react";
import {
  Search,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ReportCard } from "./ReportCard";
import { ReportCardSkeleton } from "@/components/shared/ReportCardSkeleton";
import type { Report, ReportCategory, ReportStatus } from "@/types/report";
import { CATEGORIES } from "@/constants/categories";

interface MapSidebarProps {
  reports: Report[];
  onReportHover: (id: string | null) => void;
  onReportClick: (id: string | null) => void;
  onUpvote: (id: string) => void;
  isLoggedIn: boolean;
  hoveredReportId: string | null;
  onFilteredReportsChange?: (reports: Report[]) => void;
  upvotedReportIds?: string[];
  isLoading?: boolean;
}

export function MapSidebar({
  reports,
  onReportHover,
  onReportClick,
  onUpvote,
  isLoggedIn,
  hoveredReportId,
  onFilteredReportsChange,
  upvotedReportIds = [],
  isLoading = false,
}: MapSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"upvotes" | "date">("upvotes");
  const [sidebarWidth, setSidebarWidth] = useState(400); // Default width
  const [isResizing, setIsResizing] = useState(false);

  // Filter states
  const [selectedCategory, setSelectedCategory] = useState<ReportCategory | "all">("all");
  const [selectedStatus, setSelectedStatus] = useState<"all" | ReportStatus>("all");

  // Filter and sort reports
  const filteredReports = reports
    .filter((report) => {
      // Search filter
      if (
        searchQuery &&
        !report.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !report.location.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !report.city.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }

      // Category filter
      if (selectedCategory !== "all" && report.category !== selectedCategory) {
        return false;
      }

      // Status filter
      if (selectedStatus !== "all" && report.status !== selectedStatus) {
        return false;
      }

      return true;
    })
    .sort((a, b) => {
      if (sortBy === "upvotes") {
        return b.upvotes - a.upvotes;
      } else {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      }
    });

  // Notify parent component about filtered reports
  useEffect(() => {
    if (onFilteredReportsChange) {
      onFilteredReportsChange(filteredReports);
    }
  }, [filteredReports, onFilteredReportsChange]);

  // Handle resize
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing) return;

      const newWidth = e.clientX;
      // Min width: 300px, Max width: 800px
      if (newWidth >= 300 && newWidth <= 800) {
        setSidebarWidth(newWidth);
      }
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    if (isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "ew-resize";
      document.body.style.userSelect = "none";
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
  }, [isResizing]);

  // Determine grid columns based on width
  const gridCols = sidebarWidth >= 550 ? "grid-cols-2" : "grid-cols-1";

  return (
    <>
      {/* Expand button when collapsed */}
      {isCollapsed && (
        <button
          onClick={() => setIsCollapsed(false)}
          className="fixed left-4 top-20 p-2.5 rounded-lg bg-white shadow-lg border border-gray-200 hover:bg-gray-50 transition-all duration-300 z-50"
          aria-label="Expand sidebar"
        >
          <ChevronRight className="w-5 h-5 text-gray-600" />
        </button>
      )}

      {/* Sidebar Container - handles width with resize */}
      <div
        className={`relative bg-white border-r border-gray-200 h-full overflow-hidden flex-shrink-0 ${
          isCollapsed ? "w-0 border-r-0" : ""
        } ${isResizing ? "" : "transition-all duration-300 ease-in-out"}`}
        style={{
          width: isCollapsed ? 0 : sidebarWidth,
        }}
      >
        {/* Sidebar content */}
        <div
          className={`h-full flex flex-col ${
            isCollapsed ? "opacity-0" : "opacity-100"
          } transition-opacity duration-300 ease-in-out`}
          style={{ width: sidebarWidth }}
        >
          {/* Header */}
          <div className="flex-shrink-0 p-3 border-b border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <h2 className="inter-semibold text-[#2c2c21]">Laporan Warga</h2>
              <button
                onClick={() => setIsCollapsed(true)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Collapse sidebar"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Search */}
            <div className="relative mb-2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Cari laporan atau lokasi..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filters - Responsive layout with dropdowns */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-2">
              {/* Category Filter */}
              <Select value={selectedCategory} onValueChange={(value) => setSelectedCategory(value as ReportCategory | "all")}>
                <SelectTrigger className="h-9 text-xs text-left">
                  <SelectValue placeholder="Kategori" />
                </SelectTrigger>
                <SelectContent align="start">
                  <SelectItem value="all" className="text-xs text-left">Semua Kategori</SelectItem>
                  {CATEGORIES.map((category) => (
                    <SelectItem key={category.id} value={category.id} className="text-xs text-left">
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Status Filter */}
              <Select value={selectedStatus} onValueChange={(value) => setSelectedStatus(value as "all" | ReportStatus)}>
                <SelectTrigger className="h-9 text-xs text-left">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent align="start">
                  <SelectItem value="all" className="text-xs text-left">Semua Status</SelectItem>
                  <SelectItem value="pending" className="text-xs text-left">Belum Selesai</SelectItem>
                  <SelectItem value="resolved" className="text-xs text-left">Selesai</SelectItem>
                </SelectContent>
              </Select>

              {/* Sort Filter */}
              <Select value={sortBy} onValueChange={(value) => setSortBy(value as "upvotes" | "date")}>
                <SelectTrigger className="h-9 text-xs text-left">
                  <SelectValue placeholder="Urutkan" />
                </SelectTrigger>
                <SelectContent align="start">
                  <SelectItem value="upvotes" className="text-xs text-left">Terpopuler</SelectItem>
                  <SelectItem value="date" className="text-xs text-left">Terbaru</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Results Count */}
            <p className="text-xs text-gray-500 mt-2">
              {filteredReports.length} laporan ditemukan
            </p>
          </div>

          {/* Reports List - ScrollArea with proper height */}
          <div className="flex-1 overflow-hidden">
            <ScrollArea className="h-full">
              <div className={`p-3 grid ${gridCols} gap-3`}>
                {isLoading ? (
                  // Loading skeletons
                  Array.from({ length: 4 }).map((_, i) => (
                    <ReportCardSkeleton key={i} />
                  ))
                ) : (
                  <>
                    {filteredReports.map((report) => (
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
                    {filteredReports.length === 0 && (
                      <div className={`${gridCols === "grid-cols-2" ? "col-span-2" : ""} flex flex-col items-center justify-center py-16 px-4`}>
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
            </ScrollArea>
          </div>
        </div>

        {/* Resize Handle */}
        {!isCollapsed && (
          <div
            className="absolute top-0 right-0 w-1 h-full cursor-ew-resize hover:bg-[#FACC15] transition-colors group"
            onMouseDown={handleMouseDown}
          >
            <div className="absolute top-1/2 -translate-y-1/2 right-0 w-1 h-20 bg-gray-300 group-hover:bg-[#FACC15] transition-colors" />
          </div>
        )}
      </div>
    </>
  );
}
