'use client';

import { useState, useRef, useEffect } from 'react';
import { X, MapPin, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import type { Report } from '@/types/report';

interface EditReportDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (report: Report) => void;
  report: Report | null;
}

// Mock data for cities based on province
const cityByProvince: Record<string, string[]> = {
  'DKI Jakarta': [
    'Jakarta Pusat',
    'Jakarta Utara',
    'Jakarta Barat',
    'Jakarta Selatan',
    'Jakarta Timur',
    'Kepulauan Seribu',
  ],
  Banten: [
    'Tangerang',
    'Tangerang Selatan',
    'Serang',
    'Cilegon',
    'Pandeglang',
    'Lebak',
  ],
  'Jawa Barat': [
    'Bandung',
    'Bogor',
    'Depok',
    'Bekasi',
    'Cimahi',
    'Sukabumi',
    'Cirebon',
    'Tasikmalaya',
  ],
  'Jawa Tengah': [
    'Semarang',
    'Surakarta',
    'Magelang',
    'Salatiga',
    'Pekalongan',
    'Tegal',
  ],
  'Jawa Timur': [
    'Surabaya',
    'Malang',
    'Kediri',
    'Mojokerto',
    'Madiun',
    'Blitar',
    'Pasuruan',
  ],
  'DI Yogyakarta': [
    'Yogyakarta',
    'Sleman',
    'Bantul',
    'Kulon Progo',
    'Gunung Kidul',
  ],
};

export function EditReportDialog({
  open,
  onClose,
  onSubmit,
  report,
}: EditReportDialogProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<Report['category']>('lainnya');
  const [location, setLocation] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [province, setProvince] = useState('');
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Prefill form when report changes
  useEffect(() => {
    if (report) {
      setTitle(report.title);
      setDescription(report.description);
      setCategory(report.category);
      setLocation(report.location);
      setAddress(report.address);
      setCity(report.city);
      setProvince(report.province);
      setUploadedImages([]);
    }
  }, [report]);

  // Get cities for selected province
  const availableCities = province ? cityByProvince[province] || [] : [];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      setUploadedImages([files[0]]);
    }
  };

  const removeImage = (index: number) => {
    setUploadedImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleProvinceChange = (value: string) => {
    setProvince(value);
    setCity('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!report) return;

    const updatedReport: Report = {
      ...report,
      title,
      description,
      category,
      location,
      address,
      city,
      province,
      // Keep existing images if no new upload, otherwise use new image
      images:
        uploadedImages.length > 0
          ? [URL.createObjectURL(uploadedImages[0])]
          : report.images,
      imageUrl:
        uploadedImages.length > 0
          ? URL.createObjectURL(uploadedImages[0])
          : report.imageUrl,
      updatedAt: new Date().toISOString(),
    };

    onSubmit(updatedReport);
    handleClose();
  };

  const handleClose = () => {
    setUploadedImages([]);
    onClose();
  };

  if (!report) return null;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-[#2c2c21]">
            Edit Laporan
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Judul */}
          <div className="space-y-2">
            <Label htmlFor="edit-title" className="text-sm font-semibold text-gray-700">
              Judul Laporan
            </Label>
            <Input
              id="edit-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Contoh: Jalan Berlubang di Depan Pasar"
              required
              className="border-gray-300 focus:border-[#FACC15]"
            />
          </div>

          {/* Kategori */}
          <div className="space-y-2">
            <Label htmlFor="edit-category" className="text-sm font-semibold text-gray-700">
              Kategori
            </Label>
            <Select value={category} onValueChange={(value) => setCategory(value as Report['category'])}>
              <SelectTrigger className="border-gray-300 focus:border-[#FACC15]">
                <SelectValue placeholder="Pilih kategori" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="infrastruktur">🏗️ Infrastruktur</SelectItem>
                <SelectItem value="kebersihan">🗑️ Kebersihan</SelectItem>
                <SelectItem value="keamanan">🚨 Keamanan</SelectItem>
                <SelectItem value="kesehatan">🏥 Kesehatan</SelectItem>
                <SelectItem value="lainnya">📝 Lainnya</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Provinsi dan Kota */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="edit-province" className="text-sm font-semibold text-gray-700">
                Provinsi
              </Label>
              <Select value={province} onValueChange={handleProvinceChange}>
                <SelectTrigger className="border-gray-300 focus:border-[#FACC15]">
                  <SelectValue placeholder="Pilih provinsi" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="DKI Jakarta">DKI Jakarta</SelectItem>
                  <SelectItem value="Banten">Banten</SelectItem>
                  <SelectItem value="Jawa Barat">Jawa Barat</SelectItem>
                  <SelectItem value="Jawa Tengah">Jawa Tengah</SelectItem>
                  <SelectItem value="Jawa Timur">Jawa Timur</SelectItem>
                  <SelectItem value="DI Yogyakarta">DI Yogyakarta</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-city" className="text-sm font-semibold text-gray-700">
                Kota/Kabupaten
              </Label>
              <Select value={city} onValueChange={setCity} disabled={!province}>
                <SelectTrigger className="border-gray-300 focus:border-[#FACC15] disabled:opacity-50">
                  <SelectValue placeholder={province ? 'Pilih kota' : 'Pilih provinsi dulu'} />
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

          {/* Lokasi dan Alamat */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="edit-location" className="text-sm font-semibold text-gray-700">
                Lokasi/Kelurahan
              </Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  id="edit-location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Contoh: Menteng"
                  className="pl-10 border-gray-300 focus:border-[#FACC15]"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-address" className="text-sm font-semibold text-gray-700">
                Alamat Lengkap
              </Label>
              <Input
                id="edit-address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Contoh: Jl. Sudirman No. 123"
                className="border-gray-300 focus:border-[#FACC15]"
                required
              />
            </div>
          </div>

          {/* Deskripsi */}
          <div className="space-y-2">
            <Label htmlFor="edit-description" className="text-sm font-semibold text-gray-700">
              Deskripsi Lengkap
            </Label>
            <Textarea
              id="edit-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Jelaskan detail masalah yang Anda laporkan..."
              rows={4}
              required
              className="border-gray-300 focus:border-[#FACC15] resize-none"
            />
          </div>

          {/* Foto Bukti */}
          <div className="space-y-2">
            <Label className="text-sm font-semibold text-gray-700">
              Foto Bukti {uploadedImages.length === 0 && '(Opsional - gunakan foto lama)'}
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
              <div className="space-y-2">
                {/* Show current image */}
                {report.imageUrl && (
                  <div className="relative w-full aspect-video max-w-md mx-auto mb-3">
                    <img
                      src={report.imageUrl}
                      alt="Current"
                      className="w-full h-full rounded-lg object-cover border-2 border-gray-200"
                    />
                    <div className="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
                      Foto saat ini
                    </div>
                  </div>
                )}

                {/* Upload new button */}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full aspect-video max-w-md mx-auto rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 hover:border-[#FACC15] transition-all flex flex-col items-center justify-center gap-2 cursor-pointer"
                >
                  <Camera className="w-12 h-12 text-gray-400" />
                  <div className="text-center">
                    <p className="text-sm text-gray-600">
                      Klik untuk upload foto baru
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      PNG, JPG, JPEG (Maksimal 5MB)
                    </p>
                  </div>
                </button>
              </div>
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
              onClick={handleClose}
              className="flex-1 border-gray-300 hover:bg-gray-50"
            >
              Batal
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-[#FACC15] hover:bg-[#e6b800] text-[#2c2c21] font-semibold"
            >
              Simpan Perubahan
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
