'use client';

import { useState, useEffect } from 'react';  // useEffect dihapus karena tidak perlu
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/contexts/AuthContext';
import { ROUTES } from '@/constants/routes';
import { MapNavbar } from '@/components/app/reports/MapNavbar';
import { MapSidebar } from '@/components/app/reports/MapSidebar';
import { ReportFeed } from '@/components/app/reports/ReportFeed';
import { InteractiveMap } from '@/components/app/reports/InteractiveMap';
import { MobileBottomNav } from '@/components/app/reports/MobileBottomNav';
import { CreateReportDialog } from '@/components/app/reports/CreateReportDialog';
import { mockReports } from '@/data/mockReports';
import type { Report } from '@/types/report';

export default function ReportPage() {
  const [hoveredReportId, setHoveredReportId] = useState<string | null>(null);
  const [selectedReportId, setSelectedReportId] = useState<string | null>(null);
  const [mobileView, setMobileView] = useState<'map' | 'feed'>('map');
  const [showCreateDialog, setShowCreateDialog] = useState(false);

  // --- Manajemen Data Statis ---
  const [reports, setReports] = useState<Report[]>(mockReports);
  const [filteredMapReports, setFilteredMapReports] =
    useState<Report[]>(reports);

  // --- LOGIKA UPVOTE BARU ---
  // 1. State baru untuk melacak ID laporan yang sudah di-upvote
  const [upvotedReportIds, setUpvotedReportIds] = useState<string[]>([]);
  // -------------------------

  const { isAuthenticated } = useAuthContext();
  const router = useRouter();

  // --- Handlers Navigasi ---
  const handleNavigateToAuth = () => router.push(ROUTES.login);
  const handleNavigateToLanding = () => router.push(ROUTES.home);
  const handleNavigateToLeaderboard = () => router.push('/leaderboard');
  const handleNavigateToProfile = () => router.push('/profile');
  // -------------------------

  // --- FUNGSI UPVOTE BARU (TOGGLE) ---
  const handleUpvote = (reportId: string) => {
    if (!isAuthenticated) {
      handleNavigateToAuth();
      return;
    }

    const hasUpvoted = upvotedReportIds.includes(reportId);

    if (hasUpvoted) {
      // --- Logika UN-VOTE ---
      // 1. Hapus dari daftar upvote
      setUpvotedReportIds((prev) => prev.filter((id) => id !== reportId));
      // 2. Kurangi jumlah di state reports
      setReports((prev) =>
        prev.map((report) =>
          report.id === reportId
            ? { ...report, upvotes: report.upvotes - 1 }
            : report
        )
      );
    } else {
      // --- Logika VOTE ---
      // 1. Tambahkan ke daftar upvote
      setUpvotedReportIds((prev) => [...prev, reportId]);
      // 2. Tambah jumlah di state reports
      setReports((prev) =>
        prev.map((report) =>
          report.id === reportId
            ? { ...report, upvotes: report.upvotes + 1 }
            : report
        )
      );
    }
  };
  // -------------------------------

  const handleCreateReport = () => {
    if (!isAuthenticated) {
      handleNavigateToAuth();
      return;
    }
    setShowCreateDialog(true);
  };

  const handleSubmitReport = (newReport: Report) => {
    setReports((prev) => [newReport, ...prev]);
    setFilteredMapReports((prev) => [newReport, ...prev]);
    setShowCreateDialog(false);
  };

  // Setiap kali 'reports' berubah (misalnya karena upvote),
  // perbarui juga 'filteredMapReports'
  useEffect(() => {
    // Logika filter sederhana untuk memastikan data tetap sinkron
    const filtered = reports.filter((report) =>
      filteredMapReports.some((fr) => fr.id === report.id)
    );
     // Note: Ini bisa dibuat lebih canggih, tapi untuk upvote saja ini cukup
    setFilteredMapReports(reports);
  }, [reports]);


  return (
    <div className="flex h-screen flex-col">
      {/* ... (Navbar, dll) ... */}
      <div className="hidden md:block">
        <MapNavbar
          isLoggedIn={isAuthenticated}
          onCreateReport={handleCreateReport}
          onNavigateToAuth={handleNavigateToAuth}
          onNavigateToLanding={handleNavigateToLanding}
        />
      </div>

      <div className="flex flex-1 overflow-hidden bg-gray-50">
        {/* Desktop: Sidebar + Map Layout */}
        <div className="hidden w-full md:flex">
          <MapSidebar
            reports={reports}
            onReportHover={setHoveredReportId}
            onReportClick={setSelectedReportId}
            onUpvote={handleUpvote}
            isLoggedIn={isAuthenticated}
            hoveredReportId={hoveredReportId}
            onFilteredReportsChange={setFilteredMapReports}
            upvotedReportIds={upvotedReportIds} // <-- KIRIM STATE BARU
          />
          <div className="flex-1">
            <InteractiveMap
              reports={filteredMapReports}
              hoveredReportId={hoveredReportId}
              selectedReportId={selectedReportId}
              onReportHover={setHoveredReportId}
              onReportClick={setSelectedReportId}
            />
          </div>
        </div>

        {/* Mobile: Single View */}
        <div className="w-full md:hidden">
          {mobileView === 'map' && (
            <InteractiveMap
              reports={reports}
              hoveredReportId={hoveredReportId}
              selectedReportId={selectedReportId}
              onReportHover={setHoveredReportId}
              onReportClick={setSelectedReportId}
            />
          )}
          {mobileView === 'feed' && (
            <ReportFeed
              reports={reports}
              onReportHover={setHoveredReportId}
              onReportClick={setSelectedReportId}
              onUpvote={handleUpvote}
              isLoggedIn={isAuthenticated}
              hoveredReportId={hoveredReportId}
              upvotedReportIds={upvotedReportIds} // <-- KIRIM STATE BARU
            />
          )}
        </div>
      </div>

      {/* ... (Mobile Nav, Dialog) ... */}
            <div className="md:hidden">
        <MobileBottomNav
          activeView={mobileView}
          onViewChange={setMobileView}
          onCreateReport={handleCreateReport}
          onNavigateToLanding={handleNavigateToLanding}
          onNavigateToLeaderboard={handleNavigateToLeaderboard}
          onNavigateToProfile={handleNavigateToProfile}
          onNavigateToAuth={handleNavigateToAuth}
          isLoggedIn={isAuthenticated}
        />
      </div>

      <CreateReportDialog
        open={showCreateDialog}
        onClose={() => setShowCreateDialog(false)}
        onSubmit={handleSubmitReport}
      />
    </div>
  );
}