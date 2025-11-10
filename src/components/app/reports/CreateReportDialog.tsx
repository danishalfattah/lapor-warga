'use client';

import { useState } from 'react';
import { MapPin, Camera } from 'lucide-react';
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
import ImageUploadField from '@/components/forms/ImageUploadField';
import type { Report, ReportCategory } from '@/types/report';
import { CATEGORIES } from '@/constants/categories';
import { PROVINCES } from '@/constants/locations';

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
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<ReportCategory>('lainnya');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [province, setProvince] = useState('');
  const [images, setImages] = useState<File[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const mockImageUrls = images.map((file) => URL.createObjectURL(file));

    const newReport: Report = {
      id: Date.now().toString(),
      title,
      description,
      category,
      address,
      city,
      province,
      latitude: -6.2 + Math.random() * 0.1,
      longitude: 106.8 + Math.random() * 0.1,
      images: mockImageUrls,
      userId: 'mockUser123',
      upvotes: 0,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    onSubmit(newReport);

    setTitle('');
    setDescription('');
    setCategory('lainnya');
    setAddress('');
    setCity('');
    setProvince('');
    setImages([]);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl text-foreground">
            Buat Laporan Baru
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <Label htmlFor="title">Judul Laporan</Label>
            <Input
              id="title"
              placeholder="Contoh: Jalan berlubang di depan sekolah"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="description">Deskripsi</Label>
            <Textarea
              id="description"
              placeholder="Jelaskan masalah yang Anda laporkan..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              required
            />
          </div>

          <div>
            <Label htmlFor="category">Kategori</Label>
            <Select
              value={category}
              onValueChange={(value) => setCategory(value as ReportCategory)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="province">Provinsi</Label>
              <Select value={province} onValueChange={setProvince}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih provinsi" />
                </SelectTrigger>
                <SelectContent>
                  {PROVINCES.map((prov) => (
                    <SelectItem key={prov.id} value={prov.name}>
                      {prov.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="city">Kota/Kabupaten</Label>
              <Input
                id="city"
                placeholder="Contoh: Jakarta Selatan"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="address">Alamat Lengkap</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="address"
                placeholder="Contoh: Jl. Merdeka No. 45"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>

          {/* Menggunakan ImageUploadField dari proyek Anda */}
          <ImageUploadField images={images} setImages={setImages} />

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
              className="flex-1 bg-primary text-primary-content hover:bg-primary/90"
            >
              Kirim Laporan
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}