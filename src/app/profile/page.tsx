"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Settings, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MapNavbar } from "@/components/app/reports/MapNavbar";
import ProfileHeader from "@/components/app/profile/ProfileHeader";
import ProfileStats from "@/components/app/profile/ProfileStats";
import UserReports from "@/components/app/profile/UserReports";
import { ProfileTabs } from "@/components/app/profile/ProfileTabs";
import { EditProfileDialog } from "@/components/app/profile/EditProfileDialog";
import { CreateReportDialog } from "@/components/app/reports/CreateReportDialog";
import { ReportDetailModal } from "@/components/app/reports/ReportDetailModal";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { mockCurrentUser } from "@/data/mockUsers";
import { mockReports } from "@/lib/mockData";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import type { Report } from "@/types/report";

export default function ProfilePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"my-reports" | "upvoted">(
    "my-reports"
  );
  const [allUserReports, setAllUserReports] = useState<Report[]>([]);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [userData, setUserData] = useState(mockCurrentUser);

  // Persistent upvote state
  const [upvotedReportIds, setUpvotedReportIds] = useLocalStorage<string[]>(
    "laporwarga_upvoted_reports",
    []
  );

  // Mock authentication - always logged in
  const isLoggedIn = true;

  // Simulate initial loading
  useEffect(() => {
    const timer = setTimeout(() => {
      // Filter reports by current user
      const userReports = mockReports.filter(
        (report) => report.userId === userData.id
      );

      // Sort by newest first
      const sortedReports = userReports.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

      setAllUserReports(sortedReports);
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [userData.id]);

  // Get reports based on active tab
  const displayedReports =
    activeTab === "my-reports"
      ? allUserReports
      : mockReports.filter((report) => upvotedReportIds.includes(report.id));

  const handleUpvote = (reportId: string) => {
    if (!isLoggedIn) {
      router.push("/login");
      return;
    }

    const hasUpvoted = upvotedReportIds.includes(reportId);

    if (hasUpvoted) {
      // Remove upvote
      setUpvotedReportIds((prev) => prev.filter((id) => id !== reportId));
      setAllUserReports((prev) =>
        prev.map((report) =>
          report.id === reportId
            ? { ...report, upvotes: Math.max(0, report.upvotes - 1) }
            : report
        )
      );
    } else {
      // Add upvote
      setUpvotedReportIds((prev) => [...prev, reportId]);
      setAllUserReports((prev) =>
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

  const handleReportClick = (reportId: string) => {
    const report =
      activeTab === "my-reports"
        ? allUserReports.find((r) => r.id === reportId)
        : mockReports.find((r) => r.id === reportId);

    if (report) {
      setSelectedReport(report);
      setShowDetailModal(true);
    }
  };

  const handleSaveProfile = (updates: { name: string; bio: string }) => {
    // Update user data (in real app, this would be API call)
    setUserData((prev) => ({
      ...prev,
      name: updates.name,
    }));
    console.log("Profile updated:", updates);
  };

  const handleValidateReport = (reportId: string) => {
    // Update report status to resolved
    setAllUserReports((prev) =>
      prev.map((report) =>
        report.id === reportId
          ? { ...report, status: "resolved" as const }
          : report
      )
    );

    // Show success message (in console for demo)
    console.log(`Report ${reportId} marked as resolved`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f2f2ed]">
      {/* Navbar */}
      <MapNavbar
        isLoggedIn={isLoggedIn}
        onCreateReport={handleCreateReport}
        onNavigateToAuth={() => router.push("/login")}
        onNavigateToLanding={() => router.push("/")}
        currentUser={userData}
        onLogout={() => router.push("/login")}
        showUserDetails={false}
      />

      {/* Main Content */}
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <ErrorBoundary>
            {/* Back Navigation */}
            <Button
              onClick={() => router.back()}
              variant="ghost"
              className="mb-4 gap-2 text-[#2c2c21] cursor-pointer "
            >
              <ArrowLeft className="h-4 w-4" />
              Kembali
            </Button>

            {/* Profile Header with Edit Button */}
            <div className="relative">
              <ProfileHeader user={userData} isLoading={isLoading} />
              {!isLoading && (
                <Button
                  onClick={() => setShowEditDialog(true)}
                  size="sm"
                  variant="outline"
                  className="absolute top-6 right-6 gap-2"
                >
                  <Settings className="h-4 w-4" />
                  <span className="hidden sm:inline">Edit Profil</span>
                </Button>
              )}
            </div>

            {/* Profile Stats */}
            <ProfileStats stats={userData.stats} isLoading={isLoading} />

            {/* Profile Tabs */}
            {!isLoading && (
              <ProfileTabs
                activeTab={activeTab}
                onTabChange={setActiveTab}
                myReportsCount={allUserReports.length}
                upvotedReportsCount={upvotedReportIds.length}
              />
            )}

            {/* User Reports */}
            <UserReports
              reports={displayedReports}
              onReportClick={handleReportClick}
              onUpvote={handleUpvote}
              isLoggedIn={isLoggedIn}
              upvotedReportIds={upvotedReportIds}
              isLoading={isLoading}
              onCreateReport={
                activeTab === "my-reports" ? handleCreateReport : undefined
              }
              onValidateReport={
                activeTab === "my-reports" ? handleValidateReport : undefined
              }
              isOwner={activeTab === "my-reports"}
            />
          </ErrorBoundary>
        </div>
      </main>

      {/* Edit Profile Dialog */}
      <EditProfileDialog
        open={showEditDialog}
        onClose={() => setShowEditDialog(false)}
        user={userData}
        onSave={handleSaveProfile}
      />

      {/* Create Report Dialog */}
      <CreateReportDialog
        open={showCreateDialog}
        onClose={() => setShowCreateDialog(false)}
        onSubmit={(newReport) => {
          setAllUserReports((prev) => [newReport, ...prev]);
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
        isUpvoted={
          selectedReport ? upvotedReportIds.includes(selectedReport.id) : false
        }
      />
    </div>
  );
}
