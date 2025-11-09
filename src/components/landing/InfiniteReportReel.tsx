"use client";

import { motion } from "motion/react";
import { mockReports } from "../../lib/mockData";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export function InfiniteReportReel() {
  // Duplicate reports multiple times for seamless infinite loop
  const reports = [
    ...mockReports,
    ...mockReports,
    ...mockReports,
    ...mockReports,
  ];

  return (
    <div className="overflow-hidden relative w-full">
      <motion.div
        className="flex gap-4"
        animate={{
          x: [0, -3200],
        }}
        transition={{
          duration: 60,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {reports.map((report, index) => (
          <div
            key={`${report.id}-${index}`}
            className="shrink-0 w-64 sm:w-72 rounded-lg border border-white/20 p-3"
            style={{
              background: "rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
            }}
          >
            <div className="flex items-start gap-2.5">
              <Avatar className="w-9 h-9">
                <AvatarImage
                  src={report.reporterAvatar}
                  alt={report.reporterName}
                />
                <AvatarFallback>{report.reporterName[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm mb-0.5">
                  {report.reporterName}
                </p>
                <p className="text-white/80 text-xs line-clamp-2">
                  melaporkan: {report.title} di {report.location}, {report.city}
                </p>
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
