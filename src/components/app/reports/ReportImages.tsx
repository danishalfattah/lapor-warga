'use client';

interface ReportImagesProps {
  reportId: string;
}

export default function ReportImages({ reportId }: ReportImagesProps) {
  // TODO: Fetch report images

  return (
    <div className="mt-6 rounded-lg bg-white p-6 shadow-sm">
      <h2 className="mb-4 font-semibold text-dark-brown">Foto Pendukung</h2>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {/* TODO: Display images */}
        <div className="aspect-square rounded-lg bg-dark-brown/5"></div>
      </div>
    </div>
  );
}
