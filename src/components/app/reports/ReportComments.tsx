'use client';

interface ReportCommentsProps {
  reportId: string;
}

export default function ReportComments({ reportId }: ReportCommentsProps) {
  // TODO: Implement comments feature (future enhancement)

  return (
    <div className="mt-6 rounded-lg bg-white p-6 shadow-sm">
      <h2 className="mb-4 font-semibold text-dark-brown">Komentar</h2>
      <p className="text-sm text-dark-brown/50">
        Fitur komentar akan segera hadir
      </p>
    </div>
  );
}
