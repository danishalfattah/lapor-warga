import Link from 'next/link';

export default function CallToAction() {
  return (
    <section className="bg-secondary-green py-20">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-white">Siap Berkontribusi?</h2>
        <p className="mt-4 text-xl text-white/90">
          Mulai laporkan masalah di lingkungan Anda sekarang
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Link
            href="/feed"
            className="rounded-lg bg-primary-yellow px-8 py-3 font-semibold text-dark-brown transition hover:bg-primary-yellow/90"
          >
            Lihat Semua Laporan
          </Link>
          <Link
            href="/register"
            className="rounded-lg border-2 border-white px-8 py-3 font-semibold text-white transition hover:bg-white/10"
          >
            Daftar Sekarang
          </Link>
        </div>
      </div>
    </section>
  );
}
