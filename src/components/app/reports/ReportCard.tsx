import { ArrowBigUp, MapPin, Tag, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ImageWithFallback } from "@/components/shared/ImageWithFallback";
import StatusBadge from "@/components/shared/StatusBadge";
import type { Report } from "@/types/report";

interface ReportCardProps {
  report: Report;
  onHover: (id: string | null) => void;
  onClick: (id: string) => void;
  onUpvote: (id: string) => void;
  isLoggedIn: boolean;
  isHovered: boolean;
  isUpvoted?: boolean;
  showActions?: boolean;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

const categoryLabels = {
  infrastruktur: "Infrastruktur",
  kebersihan: "Kebersihan",
  keamanan: "Keamanan",
  kesehatan: "Kesehatan",
  lainnya: "Lainnya",
};

export function ReportCard({
  report,
  onHover,
  onClick,
  onUpvote,
  isLoggedIn,
  isHovered,
  isUpvoted = false,
  showActions = false,
  onEdit,
  onDelete,
}: ReportCardProps) {
  return (
    <div
      className="group bg-white rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 border border-gray-200/50 hover:border-[#FACC15]/30 shadow-sm hover:shadow-lg"
      onMouseEnter={() => onHover(report.id)}
      onMouseLeave={() => onHover(null)}
      onClick={() => onClick(report.id)}
      role="article"
      aria-label={`Laporan: ${report.title}`}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick(report.id);
        }
      }}
    >
      {/* Image */}
      <div className="relative h-40 w-full overflow-hidden">
        <ImageWithFallback
          src={report.imageUrl}
          alt={report.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        <div className="absolute top-3 right-3">
          <StatusBadge status={report.status} />
        </div>
        <div className="absolute bottom-3 left-3 right-3">
          <h3 className="text-white inter-semibold line-clamp-2 drop-shadow-lg">
            {report.title}
          </h3>
        </div>
      </div>

      {/* Content */}
      <div className="p-3.5">
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          <div className="flex items-center gap-1.5 text-xs text-gray-600 bg-gray-50 rounded-full px-2.5 py-1 flex-shrink-0">
            <Tag className="w-3.5 h-3.5" />
            <span>{categoryLabels[report.category]}</span>
          </div>
          <span className="text-xs text-gray-400 whitespace-nowrap">
            {new Date(report.createdAt).toLocaleDateString("id-ID", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </span>
        </div>

        <div className="flex items-start gap-1.5 mb-3">
          <MapPin className="w-3.5 h-3.5 text-gray-400 mt-0.5 flex-shrink-0" />
          <span className="text-xs text-gray-600 line-clamp-1">
            {report.location}, {report.city}
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-2.5 border-t border-gray-100">
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onUpvote(report.id);
            }}
            className={`h-8 px-3 cursor-pointer transition-all ${
              !isLoggedIn
                ? "text-gray-400 cursor-not-allowed"
                : isUpvoted
                ? "text-[#FACC15] bg-[#FACC15]/10 hover:bg-[#FACC15]/20 hover:scale-105 active:scale-95"
                : "text-gray-600 hover:text-[#FACC15] hover:bg-[#FACC15]/10 hover:scale-105 active:scale-95"
            }`}
            aria-label={
              isUpvoted
                ? `Batalkan upvote dari ${report.title}`
                : `Upvote ${report.title}`
            }
            disabled={!isLoggedIn}
          >
            <ArrowBigUp
              className={`w-4 h-4 mr-1 transition-all ${
                isUpvoted && isLoggedIn ? "fill-[#FACC15]" : ""
              }`}
            />
            <span className="inter-semibold text-sm">{report.upvotes}</span>
          </Button>

          {showActions && (onEdit || onDelete) ? (
            <div className="flex gap-1.5">
              {onEdit && (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit(report.id);
                  }}
                  className="h-8 px-2 text-gray-600 hover:text-[#FACC15] hover:bg-[#FACC15]/10 cursor-pointer transition-colors"
                  aria-label={`Edit laporan ${report.title}`}
                >
                  <Pencil className="w-4 h-4" />
                  <span className="ml-1 hidden sm:inline text-xs">Edit</span>
                </Button>
              )}
              {onDelete && (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(report.id);
                  }}
                  className="h-8 px-2 text-gray-600 hover:text-red-500 hover:bg-red-50 cursor-pointer transition-colors"
                  aria-label={`Hapus laporan ${report.title}`}
                >
                  <Trash2 className="w-4 h-4" />
                  <span className="ml-1 hidden sm:inline text-xs">Hapus</span>
                </Button>
              )}
            </div>
          ) : (
            <span className="text-xs text-gray-400">
              oleh {report.reporterName}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
