'use client';

export default function MapControls() {
  return (
    <div className="space-y-2">
      <button className="rounded-lg bg-white p-2 shadow hover:bg-cream">
        <span className="text-dark-brown">+</span>
      </button>
      <button className="rounded-lg bg-white p-2 shadow hover:bg-cream">
        <span className="text-dark-brown">−</span>
      </button>
    </div>
  );
}
