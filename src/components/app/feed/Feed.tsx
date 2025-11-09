'use client';

import { useState } from 'react';
import FeedFilters from './FeedFilters';
import ReportCard from './ReportCard';
import FeedSkeleton from './FeedSkeleton';

export default function Feed() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);

  return (
    <div className="flex flex-col">
      <FeedFilters />

      <div className="flex-1 space-y-4 p-4">
        {loading ? (
          <FeedSkeleton />
        ) : reports.length > 0 ? (
          reports.map((report: any) => (
            <ReportCard key={report.id} report={report} />
          ))
        ) : (
          <p className="text-center text-dark-brown/50">Belum ada laporan</p>
        )}
      </div>
    </div>
  );
}
