"use client";

import { useState } from "react";
import { FileX, Plus, CheckCircle2 } from "lucide-react";
import { ReportCard } from "../reports/ReportCard";
import { ReportCardSkeleton } from "@/components/shared/ReportCardSkeleton";
import { Button } from "@/components/ui/button";
import { ConfirmValidateDialog } from "./ConfirmValidateDialog";
import type { Report } from "@/types/report";

interface UserReportsProps {
  reports: Report[];
  onReportClick: (id: string) => void;
  onUpvote: (id: string) => void;
  isLoggedIn: boolean;
  upvotedReportIds: string[];
  isLoading?: boolean;
  onCreateReport?: () => void;
  onValidateReport?: (id: string) => void;
  isOwner?: boolean; // Apakah ini laporan milik user sendiri
  onEditReport?: (id: string) => void;
  onDeleteReport?: (id: string) => void;
  statusFilter?: "all" | "pending" | "resolved";
}

export default function UserReports({
  reports,
  onReportClick,
  onUpvote,
  isLoggedIn,
  upvotedReportIds,
  isLoading = false,
  onCreateReport,
  onValidateReport,
  isOwner = false,
  onEditReport,
  onDeleteReport,
  statusFilter,
}: UserReportsProps) {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [reportToValidate, setReportToValidate] = useState<Report | null>(null);

  const handleValidateClick = (report: Report) => {
    setReportToValidate(report);
    setShowConfirmDialog(true);
  };

  const handleConfirmValidate = () => {
    if (reportToValidate && onValidateReport) {
      onValidateReport(reportToValidate.id);
      setReportToValidate(null);
    }
  };
  if (isLoading) {
    return (
      <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-[#2c2c21] inter-semibold">
            Laporan Saya
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <ReportCardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  // Empty state with dynamic messages based on filter
  if (reports.length === 0) {
    const getEmptyStateContent = () => {
      if (statusFilter === "resolved") {
        return {
          title: "Belum Ada Laporan Selesai",
          description:
            "Anda belum memiliki laporan yang sudah diselesaikan. Laporan yang sudah ditandai selesai akan muncul di sini.",
        };
      }
      if (statusFilter === "pending") {
        return {
          title: "Belum Ada Laporan ",
          description:
            "Semua laporan Anda sudah diselesaikan. Laporan baru yang belum diselesaikan akan muncul di sini.",
        };
      }
      return {
        title: "Belum Ada Laporan",
        description:
          "Anda belum membuat laporan apapun. Mulai berkontribusi dengan membuat laporan tentang masalah di lingkungan sekitar Anda.",
      };
    };

    const emptyContent = getEmptyStateContent();

    return (
      <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-[#2c2c21] inter-semibold">
            Laporan Saya
          </h2>
        </div>

        <div className="flex flex-col items-center justify-center py-16 px-4">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <FileX className="w-10 h-10 text-gray-400" />
          </div>

          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {emptyContent.title}
          </h3>

          <p className="text-sm text-gray-600 text-center max-w-md mb-6">
            {emptyContent.description}
          </p>

          {onCreateReport &&
            statusFilter !== "resolved" &&
            statusFilter !== "pending" && (
              <Button
                onClick={onCreateReport}
                className="bg-[#FACC15] hover:bg-[#FACC15]/90 text-[#2c2c21] font-semibold"
              >
                <Plus className="w-4 h-4 mr-2" />
                Buat Laporan Pertama
              </Button>
            )}
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-[#2c2c21] inter-semibold">
          Laporan Saya
          <span className="ml-2 text-sm font-normal text-gray-500">
            ({reports.length} laporan)
          </span>
        </h2>

        {onCreateReport && (
          <Button
            onClick={onCreateReport}
            size="sm"
            className="bg-[#FACC15] hover:bg-[#FACC15]/90 text-[#2c2c21] font-semibold"
          >
            <Plus className="w-4 h-4 mr-2" />
            Buat Laporan
          </Button>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {reports.map((report) => (
          <div key={report.id} className="relative">
            <ReportCard
              report={report}
              onHover={() => {}}
              onClick={onReportClick}
              onUpvote={onUpvote}
              isLoggedIn={isLoggedIn}
              isHovered={false}
              isUpvoted={upvotedReportIds.includes(report.id)}
              showActions={isOwner}
              onEdit={onEditReport}
              onDelete={onDeleteReport}
            />
            {/* Validate Button - Only show for owner's pending reports */}
            {isOwner && onValidateReport && report.status === "pending" && (
              <div className="mt-2">
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleValidateClick(report);
                  }}
                  size="sm"
                  className="w-full bg-[#35750f] hover:bg-[#35750f]/90 text-white font-semibold"
                >
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Tandai Selesai
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Confirmation Dialog */}
      <ConfirmValidateDialog
        open={showConfirmDialog}
        onClose={() => {
          setShowConfirmDialog(false);
          setReportToValidate(null);
        }}
        onConfirm={handleConfirmValidate}
        report={reportToValidate}
      />
    </div>
  );
}
