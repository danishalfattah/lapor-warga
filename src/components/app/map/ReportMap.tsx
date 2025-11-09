'use client';

import { useState } from 'react';

export default function ReportMap() {
  const [selectedReport, setSelectedReport] = useState(null);

  return (
    <div className="relative h-full w-full bg-dark-brown/5">
      {/* TODO: Add Google Maps integration */}
      <div className="flex h-full items-center justify-center">
        <p className="text-dark-brown/50">Google Maps will be integrated here</p>
      </div>

      {/* Map Controls */}
      <div className="absolute right-4 top-4 rounded-lg bg-white p-2 shadow-lg">
        {/* TODO: Add map controls */}
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 rounded-lg bg-white p-4 shadow-lg">
        <h4 className="mb-2 font-semibold text-dark-brown">Kategori</h4>
        {/* TODO: Add category legend */}
      </div>
    </div>
  );
}
