import { useState, useRef } from "react";
import { X, MapPin, Camera } from "lucide-react";
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

// Mock data for cities based on province
const cityByProvince: Record<string, string[]> = {
  "DKI Jakarta": [
    "Jakarta Pusat",
    "Jakarta Utara",
    "Jakarta Barat",
    "Jakarta Selatan",
    "Jakarta Timur",
    "Kepulauan Seribu",
  ],
  "Jawa Barat": [
    "Bandung",
    "Bogor",
    "Depok",
    "Bekasi",
    "Cimahi",
    "Sukabumi",
    "Cirebon",
    "Tasikmalaya",
  ],
  "Jawa Tengah": [
    "Semarang",
    "Surakarta",
    "Magelang",
    "Salatiga",
    "Pekalongan",
    "Tegal",
  ],
  "Jawa Timur": [
    "Surabaya",
    "Malang",
    "Kediri",
    "Mojokerto",
    "Madiun",
    "Blitar",
    "Pasuruan",
  ],
  "DI Yogyakarta": [
    "Yogyakarta",
    "Sleman",
    "Bantul",
    "Kulon Progo",
    "Gunung Kidul",
  ],
};

export function CreateReportDialog({
  open,
  onClose,
  onSubmit,
}: CreateReportDialogProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<Report["category"]>("lainnya");
  const [location, setLocation] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Get cities for selected province
  const availableCities = province ? cityByProvince[province] || [] : [];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      setUploadedImages([files[0]]); // Only allow 1 image
    }
  };

  const removeImage = (index: number) => {
    setUploadedImages((prev) => prev.filter((_, i) => i !== index));
  };

  // Reset city when province changes
  const handleProvinceChange = (value: string) => {
    setProvince(value);
    setCity(""); // Reset city selection
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newReport: Report = {
      id: Date.now().toString(),
      title,
      description,
      category,
      status: "pending",
      province,
      city,
      address,
      location,
      latitude: -6.2 + Math.random() * 2,
      longitude: 106.8 + Math.random() * 2,
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
    setLocation("");
    setAddress("");
    setCity("");
    setProvince("");
    setUploadedImages([]);
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

          {/* Location */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label
                htmlFor="province"
                className="text-sm font-semibold text-gray-700"
              >
                Provinsi
              </Label>
              <Select value={province} onValueChange={handleProvinceChange}>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Pilih provinsi" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="DKI Jakarta">DKI Jakarta</SelectItem>
                  <SelectItem value="Jawa Barat">Jawa Barat</SelectItem>
                  <SelectItem value="Jawa Tengah">Jawa Tengah</SelectItem>
                  <SelectItem value="Jawa Timur">Jawa Timur</SelectItem>
                  <SelectItem value="DI Yogyakarta">DI Yogyakarta</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="city"
                className="text-sm font-semibold text-gray-700"
              >
                Kota/Kabupaten
              </Label>
              <Select
                value={city}
                onValueChange={setCity}
                disabled={!province || availableCities.length === 0}
              >
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder={!province ? "Pilih provinsi dulu" : "Pilih kota"} />
                </SelectTrigger>
                <SelectContent>
                  {availableCities.map((cityName) => (
                    <SelectItem key={cityName} value={cityName}>
                      {cityName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="location"
              className="text-sm font-semibold text-gray-700"
            >
              Lokasi Singkat
            </Label>
            <Input
              id="location"
              placeholder="Contoh: Tanah Abang"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="bg-white"
              required
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="address"
              className="text-sm font-semibold text-gray-700"
            >
              Alamat Lengkap
            </Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                id="address"
                placeholder="Contoh: Jl. Merdeka No. 45"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="pl-10 bg-white"
                required
              />
            </div>
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
                  className="absolute -right-2 -top-2 rounded-full bg-red-500 p-1.5 text-white shadow-lg hover:bg-red-600 transition-colors"
                  aria-label="Hapus foto"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full aspect-video max-w-md mx-auto rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 hover:border-[#FACC15] transition-all flex flex-col items-center justify-center gap-2"
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
