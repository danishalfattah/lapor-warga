import { InfiniteReportReel } from "./InfiniteReportReel";
import { motion } from "motion/react";

interface HeroProps {
  onNavigateToMap: () => void;
}

export function Hero({ onNavigateToMap }: HeroProps) {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center text-center"
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1542382257-80dedb725088?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXJrJTIwY2l0eSUyMG1hcCUyMGFlcmlhbHxlbnwxfHx8fDE3NjIwODAwOTB8MA&ixlib=rb-4.1.0&q=80&w=1080)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark Overlay with Animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="absolute inset-0"
        style={{ background: "rgba(0, 0, 0, 0.5)" }}
      />

      {/* Content - Text Section */}
      <div className="relative z-10 w-full pt-20 pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Main Heading with Animation */}
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.3,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="text-white mb-4 sm:mb-6 inter-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
          >
            Lihat Laporan. Buat Perubahan.
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.5,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="text-white/90 mb-6 sm:mb-8 max-w-2xl mx-auto text-base sm:text-lg"
          >
            Platform pelaporan warga real-time se-Indonesia. Laporkan masalah,
            beri upvote, dan pantau penyelesaiannya secara transparan.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="flex justify-center"
          >
            <button
              onClick={onNavigateToMap}
              className="
                relative z-0 flex items-center gap-2 overflow-hidden rounded-lg border
                border-[#FACC15] px-6 sm:px-8 py-2
                uppercase text-[#FACC15] transition-all duration-500
                font-semibold
                text-base
                
                before:absolute before:-inset-0.5
                before:-z-10 before:translate-x-[150%] 
                before:translate-y-[150%] before:scale-[2.5]
                before:rounded-[100%] before:bg-[#FACC15]
                before:transition-transform before:duration-1000
                before:content-['']

                hover:scale-105 hover:text-black
                hover:before:translate-x-[0%]
                hover:before:translate-y-[0%]
                active:scale-95
                
                shadow-lg hover:shadow-xl cursor-pointer
              "
            >
              Mulai Lapor Sekarang
            </button>
          </motion.div>
        </div>
      </div>

      {/* The Reel - Infinite Scroll - Full Width No Padding */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          delay: 0.9,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="relative z-10 w-full mt-12 sm:mt-16 pb-12"
      >
        <InfiniteReportReel />
      </motion.div>
    </section>
  );
}
