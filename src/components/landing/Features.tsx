export default function Features() {
  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-4">
        <h2 className="mb-12 text-center text-3xl font-bold text-dark-brown">Fitur Platform</h2>
        {/* TODO: Add feature cards */}
        <div className="grid gap-8 md:grid-cols-3">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-dark-brown">Lapor Real-time</h3>
            <p className="mt-2 text-dark-brown/70">Laporkan masalah dengan cepat dan mudah</p>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-semibold text-dark-brown">Peta Interaktif</h3>
            <p className="mt-2 text-dark-brown/70">Visualisasi laporan di peta Indonesia</p>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-semibold text-dark-brown">Transparansi</h3>
            <p className="mt-2 text-dark-brown/70">Semua laporan dapat dilihat publik</p>
          </div>
        </div>
      </div>
    </section>
  );
}
