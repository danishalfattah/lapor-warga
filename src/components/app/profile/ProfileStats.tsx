"use client";

import { FileText, CheckCircle2, ArrowBigUp } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import type { UserStats } from "@/types/user";

interface ProfileStatsProps {
  stats: UserStats | null;
  isLoading?: boolean;
}

export default function ProfileStats({
  stats,
  isLoading = false,
}: ProfileStatsProps) {
  if (isLoading || !stats) {
    return (
      <div className="mb-6 grid gap-4 md:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100"
          >
            <Skeleton className="h-10 w-16 mb-2" />
            <Skeleton className="h-5 w-32" />
          </div>
        ))}
      </div>
    );
  }

  const statsData = [
    {
      label: "Total Laporan",
      value: stats.totalReports,
      icon: FileText,
      color: "text-[#2c2c21]",
      bgColor: "bg-gray-100",
      iconColor: "text-[#2c2c21]",
    },
    {
      label: "Laporan Selesai",
      value: stats.resolvedReports,
      icon: CheckCircle2,
      color: "text-[#35750f]",
      bgColor: "bg-green-50",
      iconColor: "text-[#35750f]",
    },
    {
      label: "Total Upvotes",
      value: stats.totalUpvotes,
      icon: ArrowBigUp,
      color: "text-[#FACC15]",
      bgColor: "bg-yellow-50",
      iconColor: "text-[#FACC15]",
    },
  ];

  return (
    <div className="mb-6 grid gap-4 md:grid-cols-3">
      {statsData.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={index}
            className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 hover:border-gray-200"
          >
            {/* Main Content */}
            <div className="relative z-10">
              <div className={`text-4xl font-bold ${stat.color} mb-2 inter-semibold`}>
                {stat.value.toLocaleString("id-ID")}
              </div>

              <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
            </div>

            {/* Large Background Icon - Bottom Right */}
            <div className="absolute bottom-3 right-3 opacity-20 transition-all duration-300 group-hover:opacity-30 group-hover:scale-110">
              <Icon className={`h-20 w-20 ${stat.iconColor}`} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
