'use client';

import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

interface StatusFilterProps {
  selectedStatus: 'all' | 'pending' | 'resolved';
  onStatusChange: (status: 'all' | 'pending' | 'resolved') => void;
  reportCounts?: {
    all: number;
    pending: number;
    resolved: number;
  };
}

export function StatusFilter({
  selectedStatus,
  onStatusChange,
  reportCounts,
}: StatusFilterProps) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-3 flex-wrap">
        <span className="text-sm font-medium text-[#2c2c21]">Filter Status:</span>
        <ToggleGroup
          type="single"
          value={selectedStatus}
          onValueChange={(value) => {
            if (value) onStatusChange(value as 'all' | 'pending' | 'resolved');
          }}
          className="justify-start"
        >
          <ToggleGroupItem
            value="all"
            className="data-[state=on]:bg-[#FACC15] data-[state=on]:text-[#2c2c21] data-[state=on]:font-semibold data-[state=off]:bg-white data-[state=off]:text-gray-600 border border-gray-200 cursor-pointer transition-colors"
          >
            Semua
            {reportCounts && (
              <span className="ml-1.5 text-xs opacity-75">
                ({reportCounts.all})
              </span>
            )}
          </ToggleGroupItem>
          <ToggleGroupItem
            value="resolved"
            className="data-[state=on]:bg-[#35750f] data-[state=on]:text-white data-[state=on]:font-semibold data-[state=off]:bg-white data-[state=off]:text-gray-600 border border-gray-200 cursor-pointer transition-colors"
          >
            Selesai
            {reportCounts && (
              <span className="ml-1.5 text-xs opacity-75">
                ({reportCounts.resolved})
              </span>
            )}
          </ToggleGroupItem>
          <ToggleGroupItem
            value="pending"
            className="data-[state=on]:bg-[#fbbf24] data-[state=on]:text-[#2c2c21] data-[state=on]:font-semibold data-[state=off]:bg-white data-[state=off]:text-gray-600 border border-gray-200 cursor-pointer transition-colors"
          >
            Belum Selesai
            {reportCounts && (
              <span className="ml-1.5 text-xs opacity-75">
                ({reportCounts.pending})
              </span>
            )}
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
  );
}
