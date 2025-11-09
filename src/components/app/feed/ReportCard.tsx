'use client';

import Link from 'next/link';
import CategoryBadge from '@/components/shared/CategoryBadge';
import LocationBadge from '@/components/shared/LocationBadge';

interface ReportCardProps {
  report: any; // TODO: Add proper type
}

export default function ReportCard({ report }: ReportCardProps) {
  return (
    <Link
      href={`/reports/${report.id}`}
      className="block rounded-lg border border-dark-brown/10 bg-white p-4 shadow-sm transition hover:shadow-md"
    >
      <div className="mb-2 flex items-start justify-between">
        <CategoryBadge category={report.category} />
        <span className="text-sm text-dark-brown/50">{report.timestamp}</span>
      </div>

      <h3 className="mb-2 font-semibold text-dark-brown">{report.title}</h3>
      <p className="mb-3 line-clamp-2 text-sm text-dark-brown/70">{report.description}</p>

      <div className="flex items-center justify-between">
        <LocationBadge location={`${report.city}, ${report.province}`} />
        <div className="flex items-center gap-2">
          <button className="text-sm text-dark-brown/50">
            ↑ {report.upvotes}
          </button>
        </div>
      </div>
    </Link>
  );
}
