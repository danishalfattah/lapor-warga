export default async function Statistics() {
  // TODO: Fetch statistics from API
  return (
    <section className="bg-primary-yellow py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="text-center">
            <div className="text-4xl font-bold text-dark-brown">0</div>
            <div className="mt-2 text-dark-brown/70">Total Laporan</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-dark-brown">0</div>
            <div className="mt-2 text-dark-brown/70">Terselesaikan</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-dark-brown">0</div>
            <div className="mt-2 text-dark-brown/70">Warga Aktif</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-dark-brown">0%</div>
            <div className="mt-2 text-dark-brown/70">Engagement</div>
          </div>
        </div>
      </div>
    </section>
  );
}
