"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { MapNavbar } from "@/components/app/reports/MapNavbar";
import { MapSidebar } from "@/components/app/reports/MapSidebar";
import { InteractiveMap } from "@/components/app/reports/InteractiveMap";
import { BottomDrawer } from "@/components/app/reports/BottomDrawer";
import { MobileReportList } from "@/components/app/reports/MobileReportList";
import { CreateReportDialog } from "@/components/app/reports/CreateReportDialog";
import { ReportDetailModal } from "@/components/app/reports/ReportDetailModal";
import { mockReports } from "@/lib/mockData";
import type { Report, ReportCategory, ReportStatus } from "@/types/report";
import { APIProvider } from "@vis.gl/react-google-maps";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { MapErrorFallback } from "@/components/shared/MapErrorFallback";

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";

export default function ReportPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [hoveredReportId, setHoveredReportId] = useState<string | null>(null);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [mobileSearchQuery, setMobileSearchQuery] = useState("");
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [reports, setReports] = useState<Report[]>(mockReports);
  const [filteredMapReports, setFilteredMapReports] =
    useState<Report[]>(mockReports);

  // Persistent upvote state with localStorage
  const [upvotedReportIds, setUpvotedReportIds] = useLocalStorage<string[]>(
    "laporwarga_upvoted_reports",
    []
  );

  // Mobile filter states
  const [mobileCategory, setMobileCategory] = useState<ReportCategory | "all">("all");
  const [mobileStatus, setMobileStatus] = useState<"all" | ReportStatus>("all");
  const [mobileSortBy, setMobileSortBy] = useState<"upvotes" | "date">("upvotes");

  // Mock authentication - always logged in
  const isLoggedIn = true;

  // Simulate initial loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleUpvote = (reportId: string) => {
    if (!isLoggedIn) {
      router.push("/login");
      return;
    }

    const hasUpvoted = upvotedReportIds.includes(reportId);

    if (hasUpvoted) {
      // Remove upvote
      setUpvotedReportIds(prev => prev.filter(id => id !== reportId));
      setReports((prev) =>
        prev.map((report) =>
          report.id === reportId
            ? { ...report, upvotes: Math.max(0, report.upvotes - 1) }
            : report
        )
      );
    } else {
      // Add upvote
      setUpvotedReportIds(prev => [...prev, reportId]);
      setReports((prev) =>
        prev.map((report) =>
          report.id === reportId
            ? { ...report, upvotes: report.upvotes + 1 }
            : report
        )
      );
    }
  };

  const handleCreateReport = () => {
    if (!isLoggedIn) {
      router.push("/login");
      return;
    }
    setShowCreateDialog(true);
  };

  const handleReportSelect = (reportId: string | null) => {
    const report = reports.find((r) => r.id === reportId);
    setSelectedReport(report || null);
    if (report) {
      setShowDetailModal(true);
    }
  };

  const handleFilteredReportsChange = useCallback(
    (filteredReports: Report[]) => {
      setFilteredMapReports(filteredReports);
    },
    []
  );

  // Filter reports for mobile with search, category, and status
  const mobileFilteredReports = reports
    .filter((report) => {
      // Search filter
      if (mobileSearchQuery) {
        const matchesSearch =
          report.title.toLowerCase().includes(mobileSearchQuery.toLowerCase()) ||
          report.address.toLowerCase().includes(mobileSearchQuery.toLowerCase()) ||
          report.city.toLowerCase().includes(mobileSearchQuery.toLowerCase());
        if (!matchesSearch) return false;
      }

      // Category filter
      if (mobileCategory !== "all" && report.category !== mobileCategory) {
        return false;
      }

      // Status filter
      if (mobileStatus !== "all" && report.status !== mobileStatus) {
        return false;
      }

      return true;
    })
    .sort((a, b) => {
      // Sort by upvotes or date
      if (mobileSortBy === "upvotes") {
        return b.upvotes - a.upvotes;
      } else {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });

  return (
    <APIProvider apiKey={GOOGLE_MAPS_API_KEY} libraries={["visualization"]}>
      <div className="h-screen flex flex-col">
        {/* Navbar - All devices */}
        <MapNavbar
          isLoggedIn={isLoggedIn}
          onCreateReport={handleCreateReport}
          onNavigateToAuth={() => router.push("/login")}
          onNavigateToLanding={() => router.push("/")}
        />

        {/* Main Content */}
        <div className="flex-1 flex overflow-hidden bg-gray-50">
          {/* Desktop: Sidebar + Map Layout (1024px+) */}
          <div className="hidden lg:flex w-full">
            {/* Left: Sidebar with Search and Reports */}
            <ErrorBoundary>
              <MapSidebar
                reports={reports}
                onReportHover={setHoveredReportId}
                onReportClick={handleReportSelect}
                onUpvote={handleUpvote}
                isLoggedIn={isLoggedIn}
                hoveredReportId={hoveredReportId}
                onFilteredReportsChange={handleFilteredReportsChange}
                upvotedReportIds={upvotedReportIds}
                isLoading={isLoading}
              />
            </ErrorBoundary>

            {/* Right: Map (Full width) */}
            <div className="flex-1">
              <ErrorBoundary fallback={<MapErrorFallback />}>
                <InteractiveMap
                  reports={filteredMapReports}
                  selectedReport={selectedReport}
                  onReportClick={(report) => {
                    setSelectedReport(report);
                  }}
                  onReportHover={(id) => setHoveredReportId(id)}
                  hoveredReportId={hoveredReportId}
                  onUpvote={handleUpvote}
                  isLoggedIn={isLoggedIn}
                  upvotedReportIds={upvotedReportIds}
                  isLoading={isLoading}
                />
              </ErrorBoundary>
            </div>
          </div>

          {/* Tablet: Sidebar + Map Layout (768px-1024px) */}
          <div className="hidden md:flex lg:hidden w-full">
            <ErrorBoundary>
              <MapSidebar
                reports={reports}
                onReportHover={setHoveredReportId}
                onReportClick={handleReportSelect}
                onUpvote={handleUpvote}
                isLoggedIn={isLoggedIn}
                hoveredReportId={hoveredReportId}
                onFilteredReportsChange={handleFilteredReportsChange}
                upvotedReportIds={upvotedReportIds}
                isLoading={isLoading}
              />
            </ErrorBoundary>

            <div className="flex-1">
              <ErrorBoundary fallback={<MapErrorFallback />}>
                <InteractiveMap
                  reports={filteredMapReports}
                  selectedReport={selectedReport}
                  onReportClick={(report) => {
                    setSelectedReport(report);
                  }}
                  onReportHover={(id) => setHoveredReportId(id)}
                  hoveredReportId={hoveredReportId}
                  onUpvote={handleUpvote}
                  isLoggedIn={isLoggedIn}
                  upvotedReportIds={upvotedReportIds}
                  isLoading={isLoading}
                />
              </ErrorBoundary>
            </div>
          </div>

          <div className="md:hidden w-full h-full flex flex-col">
            {/* Map with Search Bar - Always visible */}
            <div className="flex-1 relative">
              <ErrorBoundary fallback={<MapErrorFallback />}>
                <InteractiveMap
                  reports={mobileFilteredReports}
                  selectedReport={selectedReport}
                  onReportClick={(report) => {
                    setSelectedReport(report);
                    // Tidak auto buka drawer, biar user swipe manual
                  }}
                  onReportHover={(id) => setHoveredReportId(id)}
                  hoveredReportId={hoveredReportId}
                  searchValue={mobileSearchQuery}
                  onSearchChange={setMobileSearchQuery}
                  onUpvote={handleUpvote}
                  isLoggedIn={isLoggedIn}
                  upvotedReportIds={upvotedReportIds}
                  isLoading={isLoading}
                />
              </ErrorBoundary>
            </div>

            {/* Bottom Drawer with Report List and Filters */}
            <BottomDrawer isOpen={drawerOpen} onOpenChange={setDrawerOpen}>
              <ErrorBoundary>
                <MobileReportList
                  reports={mobileFilteredReports}
                  onReportHover={setHoveredReportId}
                  onReportClick={(reportId) => {
                    handleReportSelect(reportId);
                    setDrawerOpen(false); // Close drawer when card is clicked
                  }}
                  onUpvote={handleUpvote}
                  isLoggedIn={isLoggedIn}
                  hoveredReportId={hoveredReportId}
                  selectedCategory={mobileCategory}
                  selectedStatus={mobileStatus}
                  sortBy={mobileSortBy}
                  onCategoryChange={setMobileCategory}
                  onStatusChange={setMobileStatus}
                  onSortChange={setMobileSortBy}
                  upvotedReportIds={upvotedReportIds}
                  isLoading={isLoading}
                />
              </ErrorBoundary>
            </BottomDrawer>
          </div>
        </div>

        {/* Create Report Dialog */}
        <CreateReportDialog
          open={showCreateDialog}
          onClose={() => setShowCreateDialog(false)}
          onSubmit={(newReport) => {
            setReports((prev) => [newReport, ...prev]);
            setShowCreateDialog(false);
          }}
        />

        {/* Report Detail Modal */}
        <ReportDetailModal
          report={selectedReport}
          open={showDetailModal}
          onClose={() => {
            setShowDetailModal(false);
            setSelectedReport(null);
          }}
          onUpvote={handleUpvote}
          isLoggedIn={isLoggedIn}
          isUpvoted={selectedReport ? upvotedReportIds.includes(selectedReport.id) : false}
        />
      </div>
    </APIProvider>
  );
}
