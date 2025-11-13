"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import {
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
  useMap,
} from "@vis.gl/react-google-maps";
import { MapPin, Layers, ArrowBigUp, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Report } from "@/types/report";
import { CATEGORIES } from "@/constants/categories";
import { defaultMapCenter, defaultMapZoom } from "@/lib/google-maps/client";
import StatusBadge from "@/components/shared/StatusBadge";
import { calculateBounds } from "@/lib/google-maps/utils";
import Image from "next/image";
import { TopSearchBar } from "./TopSearchBar";
import { MapSkeleton } from "@/components/shared/MapSkeleton";

// Ambil warna dari file constants Anda
const categoryColors: Record<string, string> = CATEGORIES.reduce((acc, cat) => {
  acc[cat.id] = cat.color;
  return acc;
}, {} as Record<string, string>);

interface InteractiveMapProps {
  reports: Report[];
  hoveredReportId: string | null;
  selectedReport: Report | null;
  onReportHover: (id: string | null) => void;
  onReportClick: (report: Report | null) => void;
  onUpvote: (id: string) => void;
  isLoggedIn: boolean;
  // Optional search props for mobile
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  upvotedReportIds?: string[];
  isLoading?: boolean;
}

function MapView({
  reports,
  hoveredReportId,
  selectedReport,
  onReportHover,
  onReportClick,
  onUpvote,
  isLoggedIn,
  upvotedReportIds = [],
  viewMode,
}: InteractiveMapProps & { viewMode: "pin" | "heatmap" }) {
  const map = useMap();
  const prevReportIdsRef = useRef<string>('');

  // Memoized report IDs untuk detect changes in actual report list
  const reportIds = useMemo(
    () => reports.map(r => r.id).sort().join(','),
    [reports]
  );

  // Heatmap effect - create/destroy based on viewMode
  useEffect(() => {
    if (!map || viewMode !== "heatmap" || reports.length === 0) {
      return;
    }

    // Buat heatmap data points
    const heatmapData = reports.map(
      (report) => new google.maps.LatLng(report.latitude, report.longitude)
    );

    // Buat HeatmapLayer dengan Google Maps Visualization API
    const heatmapLayer = new google.maps.visualization.HeatmapLayer({
      data: heatmapData,
      radius: 40,
      opacity: 0.7,
      gradient: [
        "rgba(0, 255, 255, 0)",
        "rgba(0, 255, 255, 1)",
        "rgba(0, 191, 255, 1)",
        "rgba(0, 127, 255, 1)",
        "rgba(0, 63, 255, 1)",
        "rgba(0, 0, 255, 1)",
        "rgba(0, 0, 223, 1)",
        "rgba(0, 0, 191, 1)",
        "rgba(0, 0, 159, 1)",
        "rgba(0, 0, 127, 1)",
        "rgba(63, 0, 91, 1)",
        "rgba(127, 0, 63, 1)",
        "rgba(191, 0, 31, 1)",
        "rgba(255, 0, 0, 1)",
      ],
    });

    heatmapLayer.setMap(map);

    // Cleanup: remove heatmap when switching mode or unmounting
    return () => {
      heatmapLayer.setMap(null);
    };
  }, [map, viewMode, reports]);

  useEffect(() => {
    // Keluar jika map belum siap atau tidak ada laporan untuk ditampilkan
    if (!map || !reports) return;

    // Check if report list actually changed (not just upvote counts)
    if (reportIds === prevReportIdsRef.current) {
      return; // Skip fitBounds if same reports, prevents camera movement on upvote
    }

    prevReportIdsRef.current = reportIds;

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
  }, [map, reportIds]); // Changed from 'reports' to 'reportIds' for stability

  useEffect(() => {
    if (selectedReport && map) {
      map.panTo({
        lat: selectedReport.latitude,
        lng: selectedReport.longitude,
      });
      map.setZoom(15);
    }
  }, [selectedReport, map]);

  // Handler untuk mengklik pin
  const handleMarkerClick = (report: Report) => {
    onReportClick(report);
  };

  return (
    <>
      {viewMode === "pin" &&
        reports.map((report) => (
          <AdvancedMarker
            key={report.id}
            position={{ lat: report.latitude, lng: report.longitude }}
            onClick={() => handleMarkerClick(report)}
          >
            <div
              onMouseOver={() => onReportHover(report.id)}
              onMouseOut={() => onReportHover(null)}
              style={{
                transition: "transform 0.2s ease-in-out",
                transform:
                  hoveredReportId === report.id ? "scale(1.2)" : "scale(1)",
              }}
            >
              <Pin
                background={
                  categoryColors[report.category] || categoryColors.lainnya
                }
                borderColor={
                  categoryColors[report.category] || categoryColors.lainnya
                }
                glyphColor={"#100d00"}
              />
            </div>
          </AdvancedMarker>
        ))}

      {selectedReport && (
        <InfoWindow
          position={{
            lat: selectedReport.latitude,
            lng: selectedReport.longitude,
          }}
          pixelOffset={[0, -40]}
          onCloseClick={() => onReportClick(null)}
        >
          <div className="w-80 max-w-[calc(100vw-2rem)] rounded-lg bg-card p-0">
            {selectedReport.images && selectedReport.images[0] && (
              <Image
                src={selectedReport.images[0]}
                alt={selectedReport.title}
                width={320}
                height={128}
                className="mb-3 h-32 w-full rounded-t-lg object-cover"
              />
            )}
            <div className="p-3">
              <p className="inter-semibold mb-2 text-sm text-foreground">
                {selectedReport.title}
              </p>

              {/* Creation Date */}
              <div className="mb-2 flex items-center gap-1.5">
                <Calendar className="h-3 w-3 text-muted-foreground" />
                <p className="text-xs text-muted-foreground">
                  {new Date(selectedReport.createdAt).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>

              <div className="mb-2 flex items-start gap-2">
                <MapPin className="mt-0.5 h-3 w-3 shrink-0 text-muted-foreground" />
                <p className="text-xs text-muted-foreground">
                  {selectedReport.address}, {selectedReport.city}
                </p>
              </div>

              {/* Actions Section */}
              <div className="mt-3 flex items-center gap-3 border-t border-border pt-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onUpvote(selectedReport.id);
                  }}
                  className={`h-8 px-3 cursor-pointer transition-all ${
                    !isLoggedIn
                      ? "text-gray-400 cursor-not-allowed"
                      : upvotedReportIds.includes(selectedReport.id)
                      ? "text-[#FACC15] bg-[#FACC15]/10 hover:bg-[#FACC15]/20 hover:scale-105 active:scale-95"
                      : "text-gray-600 hover:text-[#FACC15] hover:bg-[#FACC15]/10 hover:scale-105 active:scale-95"
                  }`}
                >
                  <ArrowBigUp
                    className={`w-4 h-4 mr-1 transition-all ${
                      upvotedReportIds.includes(selectedReport.id) && isLoggedIn ? "fill-[#FACC15]" : ""
                    }`}
                  />
                  <span className="inter-semibold text-sm">{selectedReport.upvotes}</span>
                </Button>

                <Badge
                  variant="outline"
                  className="text-xs"
                  style={{
                    borderColor:
                      categoryColors[selectedReport.category] ||
                      categoryColors.lainnya,
                    color:
                      categoryColors[selectedReport.category] ||
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
    </>
  );
}

// Komponen Kontrol UI terpisah
function MapControls({
  viewMode,
  onViewModeChange,
}: {
  viewMode: "pin" | "heatmap";
  onViewModeChange: (mode: "pin" | "heatmap") => void;
}) {
  const map = useMap();

  return (
    <div className="absolute right-2 top-2 md:right-4 md:top-4 z-30 flex flex-col items-end gap-1.5 md:gap-2">
      {/* Pin/Heatmap Toggle */}
      <div className="flex gap-0.5 md:gap-1 rounded-lg bg-card p-0.5 md:p-1 shadow-lg">
        <Button
          variant={viewMode === "pin" ? "default" : "ghost"}
          size="sm"
          onClick={() => onViewModeChange("pin")}
          className={`h-10 px-2 text-xs md:h-10 md:px-3 md:text-sm gap-0 sm:gap-2 ${
            viewMode === "pin"
              ? "bg-[#FACC15] text-[#2c2c21] hover:bg-[#FACC15]/90"
              : ""
          }`}
        >
          <MapPin className="h-4 w-4 md:h-4 md:w-4" />
          <span className="hidden sm:inline">Pin</span>
        </Button>
        <Button
          variant={viewMode === "heatmap" ? "default" : "ghost"}
          size="sm"
          onClick={() => onViewModeChange("heatmap")}
          className={`h-10 px-2 text-xs md:h-10 md:px-3 md:text-sm gap-0 sm:gap-2 ${
            viewMode === "heatmap"
              ? "bg-[#FACC15] text-[#2c2c21] hover:bg-[#FACC15]/90"
              : ""
          }`}
        >
          <Layers className="h-4 w-4 md:h-4 md:w-4" />
          <span className="hidden sm:inline">Heatmap</span>
        </Button>
      </div>

      {/* Zoom Controls */}
      <div className="flex gap-0.5 md:gap-1">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => map?.setZoom(Math.min(20, (map.getZoom() || 0) + 1))} // Zoom In
          className="h-8 w-8 md:h-10 md:w-10 rounded-lg bg-card p-0 text-base md:text-lg shadow-lg hover:bg-accent"
          title="Zoom in"
        >
          +
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => map?.setZoom(Math.max(3, (map.getZoom() || 0) - 1))} // Zoom Out
          className="h-8 w-8 md:h-10 md:w-10 rounded-lg bg-card p-0 text-base md:text-lg shadow-lg hover:bg-accent"
          title="Zoom out"
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
          className="h-8 w-8 md:h-10 md:w-10 rounded-lg bg-card p-0 text-sm md:text-base shadow-lg hover:bg-accent"
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
  const [viewMode, setViewMode] = useState<"pin" | "heatmap">("pin");

  // Show loading skeleton if isLoading is true
  if (props.isLoading) {
    return <MapSkeleton />;
  }

  return (
    <div className="relative h-full w-full bg-muted">
      {/* Top Search Bar - Absolute positioned over map (mobile only) */}
      {props.searchValue !== undefined && props.onSearchChange && (
        <div className="absolute top-0 left-0 right-0 z-20">
          <TopSearchBar
            value={props.searchValue}
            onChange={props.onSearchChange}
          />
        </div>
      )}

      <Map
        mapId="laporwarga_map_style" // ID untuk styling
        className="h-full w-full"
        defaultCenter={defaultMapCenter}
        defaultZoom={defaultMapZoom}
        gestureHandling={"greedy"}
        disableDefaultUI={true}
        onClick={() => props.onReportClick(null)} // Klik di peta = tutup InfoWindow
      >
        {/* Render Peta dan Pin */}
        <MapView {...props} viewMode={viewMode} />

        {/* Map Controls (Pin/Heatmap, Zoom) */}
        <MapControls viewMode={viewMode} onViewModeChange={setViewMode} />
      </Map>
    </div>
  );
}
