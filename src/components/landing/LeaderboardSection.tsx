"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { PROVINCES_DATA } from "../../data/mockReports";
import { getTopLeaderboard, type LeaderboardUser } from "../../data/mockLeaderboard";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Trophy, Medal, Award } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export function LeaderboardSection() {
  const [selectedProvince, setSelectedProvince] = useState("all");
  const [selectedCity, setSelectedCity] = useState("all");
  const [leaderboard, setLeaderboard] = useState<LeaderboardUser[]>([]);

  // Get leaderboard data based on filters
  useEffect(() => {
    const province = selectedProvince === "all" ? undefined : selectedProvince;
    const city = selectedCity === "all" ? undefined : selectedCity;

    const topUsers = getTopLeaderboard(24, province, city);
    setLeaderboard(topUsers);
  }, [selectedProvince, selectedCity]);

  // Get available cities based on selected province
  const getAvailableCities = () => {
    if (selectedProvince === "all") {
      return [];
    }
    return PROVINCES_DATA[selectedProvince] || [];
  };

  const getRankStyle = (rank: number) => {
    if (rank === 1)
      return {
        bg: "bg-gradient-to-br from-yellow-400 to-yellow-600",
        icon: Trophy,
        textColor: "text-white",
        border: "border-yellow-300",
      };
    if (rank === 2)
      return {
        bg: "bg-gradient-to-br from-gray-300 to-gray-500",
        icon: Medal,
        textColor: "text-white",
        border: "border-gray-300",
      };
    if (rank === 3)
      return {
        bg: "bg-gradient-to-br from-amber-600 to-amber-800",
        icon: Award,
        textColor: "text-white",
        border: "border-amber-400",
      };
    return {
      bg: "bg-white",
      icon: null,
      textColor: "text-[#1E293B]",
      border: "border-gray-100",
    };
  };

  return (
    <section
      id="leaderboard"
      className="bg-gradient-to-b from-white to-gray-50 py-12 sm:py-16 lg:py-24 px-4 relative overflow-hidden"
    >
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-20 w-72 h-72 bg-yellow-400/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-20 w-80 h-80 bg-amber-600/5 rounded-full blur-3xl" />
        {/* Subtle Dot Pattern */}
        <div className="absolute inset-0 opacity-30">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="dots"
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
              >
                <circle cx="2" cy="2" r="1" fill="rgba(0,0,0,0.03)" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dots)" />
          </svg>
        </div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header with Filters */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-12 items-start lg:items-end mb-8 lg:mb-12">
          <div className="flex-1">
            <motion.h2
              className="text-[#1E293B] inter-bold text-3xl sm:text-4xl lg:text-5xl mb-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Warga Pelopor.
            </motion.h2>
            <motion.p
              className="text-gray-600 text-sm sm:text-base"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Pengguna teraktif dalam melaporkan permasalahan
            </motion.p>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            <div className="w-full sm:w-52">
              <Select
                value={selectedProvince}
                onValueChange={(value) => {
                  setSelectedProvince(value);
                  setSelectedCity("all");
                }}
              >
                <SelectTrigger className="bg-white shadow-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">🇮🇩 Seluruh Indonesia</SelectItem>
                  {Object.keys(PROVINCES_DATA).map((province) => (
                    <SelectItem key={province} value={province}>
                      {province}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="w-full sm:w-52">
              <Select
                value={selectedCity}
                onValueChange={setSelectedCity}
                disabled={selectedProvince === "all"}
              >
                <SelectTrigger className="bg-white shadow-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">📍 Semua Kota</SelectItem>
                  {getAvailableCities().map((city) => (
                    <SelectItem key={city} value={city}>
                      {city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Top 3 Podium */}
        {leaderboard.length >= 3 && (
          <div className="grid grid-cols-3 gap-4 mb-8 lg:mb-12">
            {/* 2nd Place */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-col items-center pt-8"
            >
              <div className="relative mb-3">
                <Avatar className="w-16 h-16 sm:w-20 sm:h-20 border-4 border-gray-300 shadow-lg">
                  <AvatarImage
                    src={leaderboard[1].avatar}
                    alt={leaderboard[1].name}
                  />
                  <AvatarFallback>{leaderboard[1].name[0]}</AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-gray-300 to-gray-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                  <span className="text-white inter-bold text-xs sm:text-sm">
                    2
                  </span>
                </div>
              </div>
              <p className="inter-semibold text-sm sm:text-base text-[#1E293B] text-center line-clamp-1 mb-1">
                {leaderboard[1].name}
              </p>
              <p className="text-xs text-gray-500 mb-2 text-center line-clamp-1">
                {leaderboard[1].city}
              </p>
              <div className="bg-gray-100 px-3 py-1 rounded-full">
                <span className="text-xs sm:text-sm inter-bold text-gray-700">
                  {leaderboard[1].reportCount} laporan
                </span>
              </div>
            </motion.div>

            {/* 1st Place */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center"
            >
              <Trophy className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-500 mb-2" />
              <div className="relative mb-3">
                <Avatar className="w-20 h-20 sm:w-24 sm:h-24 border-4 border-yellow-400 shadow-xl">
                  <AvatarImage
                    src={leaderboard[0].avatar}
                    alt={leaderboard[0].name}
                  />
                  <AvatarFallback>{leaderboard[0].name[0]}</AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-2 -right-2 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                  <span className="text-white inter-bold text-sm sm:text-base">
                    1
                  </span>
                </div>
              </div>
              <p className="inter-semibold text-base sm:text-lg text-[#1E293B] text-center line-clamp-1 mb-1">
                {leaderboard[0].name}
              </p>
              <p className="text-xs sm:text-sm text-gray-500 mb-2 text-center line-clamp-1">
                {leaderboard[0].city}
              </p>
              <div className="bg-yellow-100 px-4 py-1.5 rounded-full">
                <span className="text-sm sm:text-base inter-bold text-yellow-700">
                  {leaderboard[0].reportCount} laporan
                </span>
              </div>
            </motion.div>

            {/* 3rd Place */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col items-center pt-12"
            >
              <div className="relative mb-3">
                <Avatar className="w-14 h-14 sm:w-18 sm:h-18 border-4 border-amber-600 shadow-lg">
                  <AvatarImage
                    src={leaderboard[2].avatar}
                    alt={leaderboard[2].name}
                  />
                  <AvatarFallback>{leaderboard[2].name[0]}</AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-amber-600 to-amber-800 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                  <span className="text-white inter-bold text-xs sm:text-sm">
                    3
                  </span>
                </div>
              </div>
              <p className="inter-semibold text-sm sm:text-base text-[#1E293B] text-center line-clamp-1 mb-1">
                {leaderboard[2].name}
              </p>
              <p className="text-xs text-gray-500 mb-2 text-center line-clamp-1">
                {leaderboard[2].city}
              </p>
              <div className="bg-amber-100 px-3 py-1 rounded-full">
                <span className="text-xs sm:text-sm inter-bold text-amber-700">
                  {leaderboard[2].reportCount} laporan
                </span>
              </div>
            </motion.div>
          </div>
        )}

        {/* Rest of Leaderboard - Compact Grid (3 columns) */}
        {leaderboard.length > 3 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {leaderboard.slice(3).map((user, index) => {
              const bgVariant = index % 3;
              const bgClass =
                bgVariant === 0
                  ? "bg-white"
                  : bgVariant === 1
                  ? "bg-gray-50"
                  : "bg-blue-50/30";

              return (
                <motion.div
                  key={user.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: (index % 9) * 0.03 }}
                  className={`group rounded-xl p-4 border border-gray-200 transition-all hover:shadow-md ${bgClass}`}
                >
                  <div className="flex items-center gap-3">
                    {/* Rank Badge */}
                    <div className="shrink-0 w-8 h-8 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center group-hover:from-[#FACC15]/20 group-hover:to-[#FACC15]/10 transition-all">
                      <span className="text-gray-700 inter-bold text-sm">
                        {user.rank}
                      </span>
                    </div>

                    {/* Avatar */}
                    <Avatar className="w-9 h-9 shrink-0 border-2 border-white shadow-sm">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>{user.name[0]}</AvatarFallback>
                    </Avatar>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className="text-[#1E293B] inter-semibold text-sm truncate">
                        {user.name}
                      </p>
                      <p className="text-gray-500 text-xs truncate">
                        {user.city}
                      </p>
                    </div>

                    {/* Report Count Badge */}
                    <div className="shrink-0 bg-[#FACC15]/10 px-3 py-1.5 rounded-lg group-hover:bg-[#FACC15]/20 transition-all">
                      <p className="text-[#1E293B] inter-bold text-sm">
                        {user.reportCount}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Empty State */}
        {leaderboard.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center py-16 bg-white rounded-3xl shadow-lg"
          >
            <Trophy className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">
              Tidak ada data untuk filter yang dipilih
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
