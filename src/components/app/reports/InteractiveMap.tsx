'use client';

import { useState, useEffect } from 'react';
import {
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
  useMap, // Import hook useMap
} from '@vis.gl/react-google-maps';
import { MapPin, Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Report } from '@/types/report';
import { CATEGORIES } from '@/constants/categories';
import {
  defaultMapCenter,
  defaultMapZoom,
} from '@/lib/google-maps/client';
import StatusBadge from '@/components/shared/StatusBadge';
import { calculateBounds } from '@/lib/google-maps/utils';


// Ambil warna dari file constants Anda
const categoryColors: Record<string, string> = CATEGORIES.reduce(
  (acc, cat) => {
    acc[cat.id] = cat.color;
    return acc;
  },
  {} as Record<string, string>
);

// Koordinat kota (tetap digunakan untuk auto-fokus)
const cityCenterCoordinates: Record<string, { lat: number; lng: number }> = {
  'Jakarta Selatan': { lat: -6.2615, lng: 106.8106 },
  'Jakarta Pusat': { lat: -6.1868, lng: 106.8342 },
  'Jakarta Timur': { lat: -6.2297, lng: 106.9122 },
  'Jakarta Utara': { lat: -6.138, lng: 106.8584 },
  'Jakarta Barat': { lat: -6.1668, lng: 106.7792 },
  Bandung: { lat: -6.9175, lng: 107.6191 },
  Surabaya: { lat: -7.2575, lng: 112.7521 },
  Yogyakarta: { lat: -7.7956, lng: 110.3695 },
  Semarang: { lat: -6.9932, lng: 110.4203 },
  Tangerang: { lat: -6.1781, lng: 106.6298 },
  'Tangerang Selatan': { lat: -6.3018, lng: 106.6535 },
  Depok: { lat: -6.3927, lng: 106.8196 },
  Bekasi: { lat: -6.2615, lng: 106.9447 },
};

interface InteractiveMapProps {
  reports: Report[];
  hoveredReportId: string | null;
  selectedReportId: string | null;
  onReportHover: (id: string | null) => void;
  onReportClick: (id: string | null) => void;
}

// Komponen Peta Internal untuk mengakses hook useMap()
// Komponen Peta Internal untuk mengakses hook useMap()
function MapView({
  reports,
  hoveredReportId,
  selectedReportId,
  onReportHover,
  onReportClick,
  viewMode,
}: InteractiveMapProps & { viewMode: 'pin' | 'heatmap' }) {
  const map = useMap();
  const selectedReport = reports.find((r) => r.id === selectedReportId);
  useEffect(() => {
    // Keluar jika map belum siap atau tidak ada laporan untuk ditampilkan
    if (!map || !reports) return;

    const points = reports.map((r) => ({
      lat: r.latitude,
      lng: r.longitude,
    }));

    if (points.length === 1) {
      // Kasus 1: Hanya ada 1 hasil pencarian
      // Langsung zoom ke titik spesifik tersebut
      map.panTo(points[0]);
      map.setZoom(15); // Zoom lebih dekat untuk 1 laporan
    } else if (points.length > 1) {
      // Kasus 2: Ada BANYAK (2+) hasil pencarian
      // Hitung batas (bounds) untuk semua titik
      const bounds = calculateBounds(points); //
      if (bounds && google.maps) {
        // Buat objek Google Maps LatLngBounds
        const googleBounds = new google.maps.LatLngBounds(
          { lat: bounds.south, lng: bounds.west }, // Titik southwest
          { lat: bounds.north, lng: bounds.east } // Titik northeast
        );

        // Perintahkan peta untuk menyesuaikan zoom agar semua titik terlihat
        map.fitBounds(googleBounds, 100); // 100 adalah padding (opsional)
      }
    }
    // Jika points.length === 0 (tidak ada hasil),
    // kita tidak melakukan apa-apa, biarkan peta di posisi terakhirnya.
  }, [map, reports]); // Bergantung pada map dan 'reports' (filteredMapReports)
  // --- AKHIR DARI PERUBAHAN ---

  // Efek untuk pan/zoom saat SATU report dipilih (biarkan)
  useEffect(() => {
    if (selectedReport && map) {
      map.panTo({
        lat: selectedReport.latitude,
        lng: selectedReport.longitude,
      });
      map.setZoom(15);
    }
  }, [selectedReport, map]);

  // Handler untuk mengklik pin (biarkan)
  const handleMarkerClick = (report: Report) => {
    onReportClick(report.id);
  };

  return (
    <>
      {/* ... (Sisa kode <AdvancedMarker> dan <InfoWindow> biarkan saja) ... */}
      {/* Render Pin Laporan */}
      {viewMode === 'pin' &&
        reports.map((report) => (
          <AdvancedMarker
            key={report.id}
            position={{ lat: report.latitude, lng: report.longitude }}
            onClick={() => handleMarkerClick(report)}
          >
            <div
              onMouseOver={() => onReportHover(report.id)}
              onMouseOut={() => onReportHover(null)}
            >
              <Pin
                background={
                  categoryColors[report.category] || categoryColors.lainnya
                }
                borderColor={
                  categoryColors[report.category] || categoryColors.lainnya
                }
                glyphColor={'#100d00'}
                scale={hoveredReportId === report.id ? 1.2 : 1.0}
              />
            </div>
          </AdvancedMarker>
        ))}

      {/* Tampilkan InfoWindow jika ada laporan yang dipilih */}
      {selectedReport && (
        <InfoWindow
          position={{
            lat: selectedReport.latitude,
            lng: selectedReport.longitude,
          }}
          pixelOffset={[0, -40]}
          onCloseClick={() => onReportClick(null)}
        >
          <div className="w-80 rounded-lg bg-card p-0">
            {selectedReport.images && selectedReport.images[0] && (
              <img
                src={selectedReport.images[0]}
                alt={selectedReport.title}
                className="mb-3 h-32 w-full rounded-t-lg object-cover"
              />
            )}
            <div className="p-3">
              <p className="inter-semibold mb-2 text-sm text-foreground">
                {selectedReport.title}
              </p>
              <div className="mb-2 flex items-start gap-2">
                <MapPin className="mt-0.5 h-3 w-3 shrink-0 text-muted-foreground" />
                <p className="text-xs text-muted-foreground">
                  {selectedReport.address}, {selectedReport.city}
                </p>
              </div>
              <div className="mt-3 flex items-center gap-3 border-t border-border pt-3">
                <Badge variant="secondary" className="text-xs">
                  {selectedReport.upvotes} upvotes
                </Badge>
                <Badge
                  variant="outline"
                  className="text-xs"
                  style={{
                    borderColor:
                      categoryColors[selectedReport.category] ||
                      categoryColors.lainnya,
                    color:
                      // VVV INI PERBAIKANNYA VVV
                      categoryColors[selectedReport.category] || // Diubah dari selectedGmaps.report.category
                      // ^^^ INI PERBAIKANNYA ^^^
                      categoryColors.lainnya,
                  }}
                >
                  {selectedReport.category}
                </Badge>
                <div className="ml-auto">
                  <StatusBadge status={selectedReport.status} />
                </div>
              </div>
            </div>
          </div>
        </InfoWindow>
      )}

      {/* TODO: Implementasi Heatmap (biarkan) */}
    </>
  );
}

// Komponen Kontrol UI terpisah
function MapControls({
  viewMode,
  onViewModeChange,
}: {
  viewMode: 'pin' | 'heatmap';
  onViewModeChange: (mode: 'pin' | 'heatmap') => void;
}) {
  const map = useMap();

  return (
    <div className="absolute right-4 top-4 z-10 flex flex-col items-end gap-2">
      <div className="flex gap-1 rounded-lg bg-card p-1 shadow-lg">
        <Button
          variant={viewMode === 'pin' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => onViewModeChange('pin')}
          className={
            viewMode === 'pin'
              ? 'bg-primary text-primary-content hover:bg-primary/90'
              : ''
          }
        >
          <MapPin className="mr-1 h-4 w-4" />
          Pin
        </Button>
        <Button
          variant={viewMode === 'heatmap' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => onViewModeChange('heatmap')}
          className={
            viewMode === 'heatmap'
              ? 'bg-primary text-primary-content hover:bg-primary/90'
              : ''
          }
        >
          <Layers className="mr-1 h-4 w-4" />
          Heatmap
        </Button>
      </div>

      <div className="flex gap-1">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => map?.setZoom(Math.min(20, (map.getZoom() || 0) + 1))} // Zoom In
          className="h-10 w-10 rounded-lg bg-card p-0 shadow-lg hover:bg-accent"
        >
          +
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => map?.setZoom(Math.max(3, (map.getZoom() || 0) - 1))} // Zoom Out
          className="h-10 w-10 rounded-lg bg-card p-0 shadow-lg hover:bg-accent"
        >
          −
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            map?.setZoom(defaultMapZoom);
            map?.panTo(defaultMapCenter);
          }}
          className="h-10 w-10 rounded-lg bg-card p-0 text-xs shadow-lg hover:bg-accent"
          title="Reset view"
        >
          ⟲
        </Button>
      </div>
    </div>
  );
}

// Komponen wrapper utama
export function InteractiveMap(props: InteractiveMapProps) {
  const [viewMode, setViewMode] = useState<'pin' | 'heatmap'>('pin');

  return (
    <div className="relative h-full w-full bg-muted">
      <Map
        mapId="laporwarga_map_style" // ID untuk styling
        className="h-full w-full"
        defaultCenter={defaultMapCenter}
        defaultZoom={defaultMapZoom}
        gestureHandling={'greedy'}
        disableDefaultUI={true}
        onClick={() => props.onReportClick(null)} // Klik di peta = tutup InfoWindow
      >
        {/* Render Peta dan Pin */}
        <MapView {...props} viewMode={viewMode} />

        {/* VVV INI PERBAIKANNYA VVV
          Pindahkan MapControls ke DALAM komponen <Map>
        */}
        <MapControls viewMode={viewMode} onViewModeChange={setViewMode} />
        {/* ^^^ AKHIR PERBAIKAN ^^^ */}

      </Map>
      
      {/* HAPUS DARI SINI: <MapControls viewMode={viewMode} onViewModeChange={setViewMode} /> */}
    </div>
  );
}