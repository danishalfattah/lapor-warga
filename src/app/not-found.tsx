export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#f5f3ea] flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* 404 Big Number */}
        <h1 className="text-[180px] sm:text-[220px] leading-none inter-extrabold text-[#FACC15] mb-6">
          404
        </h1>

        {/* Message */}
        <h2 className="text-2xl sm:text-3xl inter-bold text-[#342e19] mb-3">
          Halaman Tidak Ditemukan
        </h2>
        <p className="text-base sm:text-lg text-[#8a7b42]">
          Maaf, halaman yang Anda cari tidak ada atau telah dipindahkan. Silakan kembali ke halaman utama.
        </p>
      </div>
    </div>
  );
}
