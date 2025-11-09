"use client";

import { Hero } from "@/components/landing/Hero";
import { Statistics } from "@/components/landing/Statistics";
import { LeaderboardSection } from "@/components/landing/LeaderboardSection";
import { Footer } from "@/components/shared/Footer";
import { GlassNavbar } from "@/components/landing/GlassNavbar";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();

  const handleNavigateToMap = () => {
    router.push("/report");
  };

  const handleNavigateToAuth = () => {
    router.push("/login");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-[#f5f3ea]"
    >
      <GlassNavbar
        onNavigateToMap={handleNavigateToMap}
        onNavigateToAuth={handleNavigateToAuth}
      />
      <Hero onNavigateToMap={handleNavigateToMap} />
      <Statistics />
      <LeaderboardSection />
      <Footer />
    </motion.div>
  );
}
