interface LocationBadgeProps {
  location: string;
}

export default function LocationBadge({ location }: LocationBadgeProps) {
  return (
    <span className="inline-flex items-center gap-1 text-sm text-dark-brown/70">
      <span>📍</span>
      <span>{location}</span>
    </span>
  );
}
