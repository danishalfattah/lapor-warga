"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowBigUp,
  MapPin,
  Calendar,
  User,
  X,
  Share2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import type { Report } from "@/types/report";
import StatusBadge from "@/components/shared/StatusBadge";
import { ImageWithFallback } from "@/components/shared/ImageWithFallback";
import { useState } from "react";

interface ReportDetailModalProps {
  report: Report | null;
  open: boolean;
  onClose: () => void;
  onUpvote: (id: string) => void;
  isLoggedIn: boolean;
  isUpvoted?: boolean;
}

const categoryLabels = {
  infrastruktur: "Infrastruktur",
  kebersihan: "Kebersihan",
  keamanan: "Keamanan",
  kesehatan: "Kesehatan",
  lainnya: "Lainnya",
};

export function ReportDetailModal({
  report,
  open,
  onClose,
  onUpvote,
  isLoggedIn,
  isUpvoted = false,
}: ReportDetailModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!report) return null;

  const images = report.images || [report.imageUrl];

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: report.title,
          text: report.description,
          url: window.location.href,
        });
      } catch (error) {
        console.log("Share cancelled");
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert("Link berhasil disalin!");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
        <div className="relative">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 bg-white/90 rounded-full p-2 hover:bg-white shadow-lg transition-colors"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Image Gallery */}
          <div className="relative h-80 bg-gray-900">
            <ImageWithFallback
              src={images[currentImageIndex]}
              alt={report.title}
              className="w-full h-full object-cover"
            />

            {/* Image Navigation */}
            {images.length > 1 && (
              <>
                <button
                  onClick={handlePrevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 rounded-full p-2 hover:bg-white shadow-lg transition-colors"
                  aria-label="Gambar sebelumnya"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 rounded-full p-2 hover:bg-white shadow-lg transition-colors"
                  aria-label="Gambar berikutnya"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {images.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentImageIndex
                          ? "bg-white"
                          : "bg-white/50"
                      }`}
                    />
                  ))}
                </div>
              </>
            )}

            {/* Status Badge Overlay */}
            <div className="absolute top-4 left-4 z-10">
              <StatusBadge status={report.status} />
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Header */}
            <div className="mb-4">
              <div className="flex items-start justify-between gap-4 mb-3">
                <h2 className="text-2xl font-bold text-gray-900">
                  {report.title}
                </h2>
                <Badge
                  variant="outline"
                  className="whitespace-nowrap"
                  style={{
                    borderColor: "#FACC15",
                    color: "#2c2c21",
                  }}
                >
                  {categoryLabels[report.category]}
                </Badge>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {new Date(report.createdAt).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <User className="w-4 h-4" />
                  <span>{report.reporterName}</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Deskripsi
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {report.description}
              </p>
            </div>

            {/* Location */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Lokasi
              </h3>
              <p className="text-gray-700">
                {report.address}, {report.location}
              </p>
              <p className="text-gray-600 text-sm mt-1">
                {report.city}, {report.province}
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
              <Button
                variant="ghost"
                size="lg"
                onClick={() => onUpvote(report.id)}
                className={`h-12 px-6 transition-all ${
                  !isLoggedIn
                    ? "text-gray-400 cursor-not-allowed"
                    : isUpvoted
                    ? "text-[#FACC15] bg-[#FACC15]/10 hover:bg-[#FACC15]/20"
                    : "text-gray-600 hover:text-[#FACC15] hover:bg-[#FACC15]/10"
                }`}
              >
                <ArrowBigUp
                  className={`w-5 h-5 mr-2 ${
                    isUpvoted && isLoggedIn ? "fill-[#FACC15]" : ""
                  }`}
                />
                <span className="font-semibold">{report.upvotes}</span>
                <span className="ml-2">Upvote</span>
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={handleShare}
                className="h-12 px-6"
              >
                <Share2 className="w-5 h-5 mr-2" />
                Bagikan
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
