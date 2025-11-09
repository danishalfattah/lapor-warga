'use client';

interface MapMarkerProps {
  report: any; // TODO: Add proper type
  onClick?: () => void;
}

export default function MapMarker({ report, onClick }: MapMarkerProps) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer"
    >
      {/* TODO: Add custom marker SVG based on category */}
      <div className="h-6 w-6 rounded-full bg-primary-yellow"></div>
    </div>
  );
}
