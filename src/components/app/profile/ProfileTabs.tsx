"use client";

import { FileText, ArrowBigUp } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ProfileTabsProps {
  activeTab: "my-reports" | "upvoted";
  onTabChange: (tab: "my-reports" | "upvoted") => void;
  myReportsCount: number;
  upvotedReportsCount: number;
}

export function ProfileTabs({
  activeTab,
  onTabChange,
  myReportsCount,
  upvotedReportsCount,
}: ProfileTabsProps) {
  return (
    <div className="mb-6">
      <Tabs value={activeTab} onValueChange={(value) => onTabChange(value as "my-reports" | "upvoted")}>
        <TabsList className="grid w-full max-w-md grid-cols-2 bg-white border border-gray-100 p-1">
          <TabsTrigger
            value="my-reports"
            className="data-[state=active]:bg-[#FACC15] data-[state=active]:text-[#2c2c21] data-[state=active]:font-semibold"
          >
            <FileText className="w-4 h-4 mr-2" />
            Laporan Saya
            <span className="ml-1.5 text-xs px-1.5 py-0.5 rounded-full bg-gray-100 data-[state=active]:bg-[#2c2c21]/10">
              {myReportsCount}
            </span>
          </TabsTrigger>
          <TabsTrigger
            value="upvoted"
            className="data-[state=active]:bg-[#FACC15] data-[state=active]:text-[#2c2c21] data-[state=active]:font-semibold"
          >
            <ArrowBigUp className="w-4 h-4 mr-2" />
            Di-upvote
            <span className="ml-1.5 text-xs px-1.5 py-0.5 rounded-full bg-gray-100 data-[state=active]:bg-[#2c2c21]/10">
              {upvotedReportsCount}
            </span>
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}
