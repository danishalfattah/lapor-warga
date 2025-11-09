'use client';

import CategoryBadge from '@/components/shared/CategoryBadge';
import LocationBadge from '@/components/shared/LocationBadge';

interface ReportDetailProps {
  reportId: string;
}

export default function ReportDetail({ reportId }: ReportDetailProps) {
  // TODO: Fetch report data

  return (
    <div className="rounded-lg bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-start justify-between">
        <CategoryBadge category="infrastruktur" />
        <span className="text-sm text-dark-brown/50">2 hari yang lalu</span>
      </div>

      <h1 className="mb-4 text-2xl font-bold text-dark-brown">
        Judul Laporan
      </h1>

      <LocationBadge location="Jakarta Pusat, DKI Jakarta" />

      <div className="mt-6">
        <h2 className="mb-2 font-semibold text-dark-brown">Deskripsi</h2>
        <p className="text-dark-brown/70">
          Detail laporan akan ditampilkan di sini...
        </p>
      </div>

      <div className="mt-6">
        <h2 className="mb-2 font-semibold text-dark-brown">Lokasi Detail</h2>
        <p className="text-dark-brown/70">
          Alamat lengkap...
        </p>
      </div>
    </div>
  );
}
