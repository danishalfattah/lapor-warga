"use client";

import { useState, useEffect } from "react";
import { motion, useSpring, useTransform } from "motion/react";
import { mockReports, PROVINCES_DATA } from "../../data/mockReports";
import { FileText, Clock, CheckCircle2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

// Animated Number Component
function AnimatedNumber({ value }: { value: number }) {
  const spring = useSpring(0, { mass: 0.8, stiffness: 75, damping: 15 });
  const display = useTransform(spring, (current) =>
    Math.round(current).toLocaleString("id-ID")
  );

  useEffect(() => {
    spring.set(value);
  }, [spring, value]);

  return <motion.span>{display}</motion.span>;
}

export function Statistics() {
  const [selectedProvince, setSelectedProvince] = useState("all");
  const [selectedCity, setSelectedCity] = useState("all");
  const [stats, setStats] = useState({
    totalReports: 0,
    inProgress: 0,
    resolved: 0,
  });
  const [key, setKey] = useState(0); // For re-triggering animation

  // Calculate stats based on filters
  useEffect(() => {
    const filteredReports = mockReports.filter((report) => {
      if (selectedProvince !== "all" && report.province !== selectedProvince)
        return false;
      if (selectedCity !== "all" && report.city !== selectedCity) return false;
      return true;
    });

    // More realistic calculation
    const baseMultiplier = selectedProvince === "all" ? 3000 : 800;
    const totalReports = filteredReports.length * baseMultiplier;

    const pendingCount = filteredReports.filter(
      (r) => r.status === "pending"
    ).length;
    const resolvedCount = filteredReports.filter(
      (r) => r.status === "resolved"
    ).length;

    // Calculate proportionally
    const inProgress = Math.floor(
      totalReports * (pendingCount / filteredReports.length)
    );
    const resolved = Math.floor(
      totalReports * (resolvedCount / filteredReports.length)
    );

    setStats({ totalReports, inProgress, resolved });
    setKey((prev) => prev + 1); // Trigger animation
  }, [selectedProvince, selectedCity]);

  // Get available cities based on selected province
  const getAvailableCities = () => {
    if (selectedProvince === "all") {
      return [];
    }
    return PROVINCES_DATA[selectedProvince] || [];
  };

  return (
    <section
      id="stats"
      className="bg-gradient-to-b from-[#f5f3ea] to-[#fdfcfa] py-12 sm:py-16 lg:py-24 px-4 relative overflow-hidden"
    >
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-64 h-64 bg-[#FACC15]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-[#15fa59]/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="grid"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 40 0 L 0 0 0 40"
                  fill="none"
                  stroke="rgba(0,0,0,0.02)"
                  strokeWidth="1"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header with Filters */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-12 items-start lg:items-end mb-8 lg:mb-12">
          <div className="flex-1">
            <motion.h2
              className="text-[#342e19] inter-bold text-3xl sm:text-4xl lg:text-5xl mb-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Data Laporan.
            </motion.h2>
            <motion.p
              className="text-[#8a7b42] text-sm sm:text-base"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Statistik real-time pelaporan warga se-Indonesia
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

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {/* Total Reports - Large Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-br from-[#FACC15] to-[#F59E0B] rounded-3xl p-8 lg:p-10 shadow-xl relative overflow-hidden"
          >
            {/* Background Pattern */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-2xl bg-white/20 backdrop-blur-sm">
                  <FileText className="w-7 h-7 text-white" />
                </div>
                <p className="text-white/90 text-sm sm:text-base inter-medium">
                  Total Laporan
                </p>
              </div>
              <motion.div
                key={`total-${key}`}
                className="text-5xl sm:text-6xl lg:text-7xl inter-extrabold text-white mb-2"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
              >
                <AnimatedNumber value={stats.totalReports} />
              </motion.div>
              <p className="text-white/80 text-xs sm:text-sm">
                Laporan terdaftar
              </p>
            </div>
          </motion.div>

          {/* In Progress Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white rounded-3xl p-8 lg:p-10 shadow-lg border border-gray-100 relative overflow-hidden group hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-2xl bg-orange-50 group-hover:bg-orange-100 transition-colors">
                <Clock className="w-7 h-7 text-orange-500" />
              </div>
              <p className="text-gray-600 text-sm sm:text-base inter-medium">
                Dalam Proses
              </p>
            </div>

            <motion.div
              key={`progress-${key}`}
              className="text-4xl sm:text-5xl lg:text-6xl inter-extrabold text-[#1E293B] mb-2"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
            >
              <AnimatedNumber value={stats.inProgress} />
            </motion.div>
            <p className="text-gray-500 text-xs sm:text-sm">Sedang ditangani</p>
          </motion.div>

          {/* Resolved Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-3xl p-8 lg:p-10 shadow-lg border border-gray-100 relative overflow-hidden group hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-2xl bg-green-50 group-hover:bg-green-100 transition-colors">
                <CheckCircle2 className="w-7 h-7 text-[#15fa59]" />
              </div>
              <p className="text-gray-600 text-sm sm:text-base inter-medium">
                Terselesaikan
              </p>
            </div>

            <motion.div
              key={`resolved-${key}`}
              className="text-4xl sm:text-5xl lg:text-6xl inter-extrabold text-[#1E293B] mb-2"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
            >
              <AnimatedNumber value={stats.resolved} />
            </motion.div>
            <p className="text-gray-500 text-xs sm:text-sm">
              Masalah terselesaikan
            </p>
          </motion.div>
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 text-center"
        >
          <p className="text-gray-500 text-xs sm:text-sm">
            Data diperbarui secara real-time • Terakhir diperbarui:{" "}
            {new Date().toLocaleDateString("id-ID", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
