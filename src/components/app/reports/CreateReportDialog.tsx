import { useState, useRef } from "react";
import { X, Camera, Navigation, Map as MapIcon, CheckCircle2 } from "lucide-react";
import { Map, AdvancedMarker, Pin } from "@vis.gl/react-google-maps";
import { reverseGeocode } from "@/lib/google-maps/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Report } from "@/types/report";

interface CreateReportDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (report: Report) => void;
}


export function CreateReportDialog({
  open,
  onClose,
  onSubmit,
}: CreateReportDialogProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<Report["category"]>("lainnya");
  const [address, setAddress] = useState("");
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Location states for GPS & Map
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [showMapPicker, setShowMapPicker] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      setUploadedImages([files[0]]); // Only allow 1 image
    }
  };

  const removeImage = (index: number) => {
    setUploadedImages((prev) => prev.filter((_, i) => i !== index));
  };

  // GPS: Get current location
  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      setLocationError("GPS tidak tersedia di browser Anda");
      return;
    }

    setIsGettingLocation(true);
    setLocationError(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        setLatitude(lat);
        setLongitude(lng);
        setIsGettingLocation(false);

        // Reverse geocode to get human-readable address
        const formattedAddress = await reverseGeocode(lat, lng);
        if (formattedAddress) {
          setAddress(formattedAddress);
        }
      },
      (error) => {
        setIsGettingLocation(false);

        switch (error.code) {
          case error.PERMISSION_DENIED:
            setLocationError("Izin lokasi ditolak. Silakan pilih lokasi di peta.");
            break;
          case error.POSITION_UNAVAILABLE:
            setLocationError("Informasi lokasi tidak tersedia.");
            break;
          case error.TIMEOUT:
            setLocationError("Waktu permintaan lokasi habis. Coba lagi.");
            break;
          default:
            setLocationError("Gagal mendapatkan lokasi. Pastikan GPS aktif.");
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newReport: Report = {
      id: Date.now().toString(),
      title,
      description,
      category,
      status: "pending",
      province: "",
      city: "",
      address,
      location: "",
      latitude: latitude || -6.2088, // Use GPS/Map or default Jakarta
      longitude: longitude || 106.8228,
      images: [
        "https://images.unsplash.com/photo-1709934730506-fba12664d4e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYW1hZ2VkJTIwcm9hZCUyMHBvdGhvbGV8ZW58MXx8fHwxNzYxOTgxMTA3fDA&ixlib=rb-4.1.0&q=80&w=1080",
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1709934730506-fba12664d4e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYW1hZ2VkJTIwcm9hZCUyMHBvdGhvbGV8ZW58MXx8fHwxNzYxOTgxMTA3fDA&ixlib=rb-4.1.0&q=80&w=1080",
      upvotes: 0,
      userId: "user-demo",
      reporterName: "Pengguna Baru",
      reporterAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=New",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    onSubmit(newReport);

    // Reset form
    setTitle("");
    setDescription("");
    setCategory("lainnya");
    setAddress("");
    setUploadedImages([]);
    setLatitude(null);
    setLongitude(null);
    setLocationError(null);
    setShowMapPicker(false);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-[calc(100%-2rem)] sm:max-w-[calc(100%-3rem)] md:max-w-2xl max-h-[90vh] overflow-y-auto scrollbar-hide">
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl text-[#1E293B]">
            Buat Laporan Baru
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 mt-4 pb-2">
          {/* Title */}
          <div className="space-y-2">
            <Label
              htmlFor="title"
              className="text-sm font-semibold text-gray-700"
            >
              Judul Laporan
            </Label>
            <Input
              id="title"
              placeholder="Contoh: Jalan berlubang di depan sekolah"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-white"
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label
              htmlFor="description"
              className="text-sm font-semibold text-gray-700"
            >
              Deskripsi
            </Label>
            <Textarea
              id="description"
              placeholder="Jelaskan masalah yang Anda laporkan..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="bg-white"
              required
            />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label
              htmlFor="category"
              className="text-sm font-semibold text-gray-700"
            >
              Kategori
            </Label>
            <Select
              value={category}
              onValueChange={(value) =>
                setCategory(value as Report["category"])
              }
            >
              <SelectTrigger className="bg-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="infrastruktur">Infrastruktur</SelectItem>
                <SelectItem value="kebersihan">Kebersihan</SelectItem>
                <SelectItem value="keamanan">Keamanan</SelectItem>
                <SelectItem value="kesehatan">Kesehatan</SelectItem>
                <SelectItem value="lainnya">Lainnya</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Address */}
          <div className="space-y-2">
            <Label
              htmlFor="address"
              className="text-sm font-semibold text-gray-700"
            >
              Alamat Lengkap
            </Label>
            <Input
              id="address"
              placeholder="Contoh: Jl. Sudirman No. 123, Jakarta Pusat"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="bg-white"
              required
            />
          </div>

          {/* GPS Location Picker */}
          <div className="space-y-3 pt-2">
            <Label className="text-sm font-semibold text-gray-700">
              Koordinat Lokasi
            </Label>

            {/* GPS & Map Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <Button
                type="button"
                onClick={handleUseCurrentLocation}
                disabled={isGettingLocation}
                variant="outline"
                className="w-full"
              >
                {isGettingLocation ? (
                  <>
                    <span className="animate-spin mr-2">⏳</span>
                    Mencari...
                  </>
                ) : (
                  <>
                    <Navigation className="w-4 h-4 mr-2" />
                    Gunakan Lokasi Saya
                  </>
                )}
              </Button>

              <Button
                type="button"
                onClick={() => setShowMapPicker(!showMapPicker)}
                variant="outline"
                className="w-full"
              >
                <MapIcon className="w-4 h-4 mr-2" />
                {showMapPicker ? "Sembunyikan" : "Pilih di"} Peta
              </Button>
            </div>

            {/* Error Message */}
            {locationError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start gap-2">
                <X className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-red-800">{locationError}</span>
              </div>
            )}

            {/* Success: Show Address */}
            {latitude && longitude && address && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm text-green-800 font-medium">
                    Lokasi dipilih
                  </p>
                  <p className="text-xs text-green-700">
                    {address}
                  </p>
                </div>
              </div>
            )}

            {/* Interactive Map Picker */}
            {showMapPicker && (
              <div className="border-2 border-gray-300 rounded-lg overflow-hidden">
                <div className="h-64 sm:h-80 w-full relative">
                  <Map
                    mapId="laporwarga_map_create"
                    defaultCenter={{
                      lat: latitude || -6.2088,
                      lng: longitude || 106.8228,
                    }}
                    defaultZoom={15}
                    gestureHandling="greedy"
                    disableDefaultUI={true}
                    onClick={async (e) => {
                      if (e.detail.latLng) {
                        const lat = e.detail.latLng.lat;
                        const lng = e.detail.latLng.lng;

                        setLatitude(lat);
                        setLongitude(lng);
                        setLocationError(null);

                        // Reverse geocode to get address
                        const formattedAddress = await reverseGeocode(lat, lng);
                        if (formattedAddress) {
                          setAddress(formattedAddress);
                        }
                      }
                    }}
                    className="h-full w-full"
                  >
                    {latitude && longitude && (
                      <AdvancedMarker
                        position={{ lat: latitude, lng: longitude }}
                        draggable={true}
                        onDragEnd={async (e) => {
                          if (e.latLng) {
                            // AdvancedMarker returns Google Maps LatLng object with lat() and lng() methods
                            const lat = typeof e.latLng.lat === 'function' ? e.latLng.lat() : Number(e.latLng.lat);
                            const lng = typeof e.latLng.lng === 'function' ? e.latLng.lng() : Number(e.latLng.lng);

                            setLatitude(lat);
                            setLongitude(lng);

                            // Reverse geocode to get address
                            const formattedAddress = await reverseGeocode(lat, lng);
                            if (formattedAddress) {
                              setAddress(formattedAddress);
                            }
                          }
                        }}
                      >
                        <Pin
                          background="#FACC15"
                          borderColor="#FACC15"
                          glyphColor="#2c2c21"
                        />
                      </AdvancedMarker>
                    )}
                  </Map>
                </div>
                <div className="bg-gray-50 px-4 py-3 border-t border-gray-200">
                  <p className="text-xs text-gray-600 text-center">
                    💡 Klik pada peta atau seret pin untuk memilih lokasi
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Photo Upload */}
          <div className="space-y-2">
            <Label className="text-sm font-semibold text-gray-700">
              Foto Bukti
            </Label>

            {uploadedImages.length > 0 ? (
              <div className="relative w-full aspect-video max-w-md mx-auto">
                <img
                  src={URL.createObjectURL(uploadedImages[0])}
                  alt="Upload"
                  className="w-full h-full rounded-lg object-cover border-2 border-gray-200"
                />
                <button
                  type="button"
                  onClick={() => removeImage(0)}
                  className="absolute -right-2 -top-2 rounded-full bg-red-500 p-1.5 text-white shadow-lg hover:bg-red-600 transition-colors cursor-pointer"
                  aria-label="Hapus foto"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full aspect-video max-w-md mx-auto rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 hover:border-[#FACC15] transition-all flex flex-col items-center justify-center gap-2 cursor-pointer"
              >
                <Camera className="w-12 h-12 text-gray-400" />
                <div className="text-center">
                  <p className="text-sm text-gray-600">
                    Klik untuk upload foto
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    PNG, JPG, JPEG (Maksimal 5MB)
                  </p>
                </div>
              </button>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Batal
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-[#FACC15] text-black hover:bg-[#FACC15]/90"
            >
              Kirim Laporan
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
