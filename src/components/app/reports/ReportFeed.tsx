import { ScrollArea } from "@/components/ui/scroll-area";
import { ReportCard } from "./ReportCard";
import { Tag } from "lucide-react";
import type { Report } from "@/types/report";

interface ReportFeedProps {
  reports: Report[];
  onReportHover: (id: string | null) => void;
  onReportClick: (id: string | null) => void;
  onUpvote: (id: string) => void;
  isLoggedIn: boolean;
  hoveredReportId: string | null;
}

export function ReportFeed({
  reports,
  onReportHover,
  onReportClick,
  onUpvote,
  isLoggedIn,
  hoveredReportId,
}: ReportFeedProps) {
  return (
    <ScrollArea className="h-full bg-gradient-to-b from-gray-50/50 to-white">
      <div className="p-3 lg:p-4">
        {/* Header */}
        <div className="sticky top-0 bg-white/80 backdrop-blur-md rounded-xl px-4 py-3 mb-3 shadow-sm border border-gray-200/50">
          <h2 className="text-[#2c2c21] inter-semibold">Laporan Terbaru</h2>
          <p className="text-xs text-gray-500 mt-0.5">
            {reports.length} laporan ditemukan
          </p>
        </div>

        {/* Report Cards - 1 column on mobile, responsive grid */}
        <div className="grid grid-cols-1 gap-3">
          {reports.map((report) => (
            <ReportCard
              key={report.id}
              report={report}
              onHover={onReportHover}
              onClick={onReportClick}
              onUpvote={onUpvote}
              isLoggedIn={isLoggedIn}
              isHovered={hoveredReportId === report.id}
            />
          ))}
        </div>


        {/* Empty State */}
        {reports.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 px-4">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Tag className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-500 text-center inter-semibold mb-1">
              Tidak ada laporan
            </p>
            <p className="text-xs text-gray-400 text-center">
              Coba ubah filter atau buat laporan baru
            </p>
          </div>
        )}
      </div>
    </ScrollArea>
  );
}
