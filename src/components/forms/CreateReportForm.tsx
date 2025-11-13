'use client';

import { useState } from 'react';
import ImageUploadField from './ImageUploadField';

export default function CreateReportForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [province, setProvince] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // TODO: Upload images first
    // TODO: Create report with image URLs

    console.log('Create report:', {
      title,
      description,
      category,
      province,
      city,
      address,
      images,
    });

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6 rounded-lg bg-white p-4 sm:p-6 shadow-sm">
      <div className="space-y-1.5 sm:space-y-2">
        <label htmlFor="title" className="block text-xs sm:text-sm font-semibold text-dark-brown">
          Judul Laporan
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 w-full rounded-lg border border-dark-brown/20 px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base text-dark-brown bg-white placeholder:text-sm"
          placeholder="Contoh: Jalan rusak di depan pasar"
          required
        />
      </div>

      <div className="space-y-1.5 sm:space-y-2">
        <label htmlFor="category" className="block text-xs sm:text-sm font-semibold text-dark-brown">
          Kategori
        </label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="mt-1 w-full rounded-lg border border-dark-brown/20 px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base text-dark-brown bg-white"
          required
        >
          <option value="">Pilih Kategori</option>
          <option value="infrastruktur">Infrastruktur</option>
          <option value="kebersihan">Kebersihan</option>
          <option value="keamanan">Keamanan</option>
          <option value="kesehatan">Kesehatan</option>
          <option value="lainnya">Lainnya</option>
        </select>
      </div>

      <div className="space-y-1.5 sm:space-y-2">
        <label htmlFor="description" className="block text-xs sm:text-sm font-semibold text-dark-brown">
          Deskripsi
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          className="mt-1 w-full rounded-lg border border-dark-brown/20 px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base text-dark-brown bg-white placeholder:text-sm"
          placeholder="Jelaskan masalah yang Anda temukan..."
          required
        />
      </div>

      <div className="grid gap-3 sm:gap-4 md:grid-cols-2">
        <div className="space-y-1.5 sm:space-y-2">
          <label htmlFor="province" className="block text-xs sm:text-sm font-semibold text-dark-brown">
            Provinsi
          </label>
          <select
            id="province"
            value={province}
            onChange={(e) => setProvince(e.target.value)}
            className="mt-1 w-full rounded-lg border border-dark-brown/20 px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base text-dark-brown bg-white"
            required
          >
            <option value="">Pilih Provinsi</option>
            {/* TODO: Add province options */}
          </select>
        </div>

        <div className="space-y-1.5 sm:space-y-2">
          <label htmlFor="city" className="block text-xs sm:text-sm font-semibold text-dark-brown">
            Kota/Kabupaten
          </label>
          <select
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="mt-1 w-full rounded-lg border border-dark-brown/20 px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base text-dark-brown bg-white"
            required
            disabled={!province}
          >
            <option value="">Pilih Kota</option>
            {/* TODO: Add city options based on province */}
          </select>
        </div>
      </div>

      <div className="space-y-1.5 sm:space-y-2">
        <label htmlFor="address" className="block text-xs sm:text-sm font-semibold text-dark-brown">
          Alamat Detail
        </label>
        <input
          type="text"
          id="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="mt-1 w-full rounded-lg border border-dark-brown/20 px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base text-dark-brown bg-white placeholder:text-sm"
          placeholder="Jalan, nomor, atau landmark"
          required
        />
      </div>

      <ImageUploadField images={images} setImages={setImages} />

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 rounded-lg bg-primary-yellow py-2.5 sm:py-3 text-sm sm:text-base font-semibold text-dark-brown transition hover:bg-primary-yellow/90 disabled:opacity-50"
        >
          {loading ? 'Mengirim...' : 'Kirim Laporan'}
        </button>
        <button
          type="button"
          onClick={() => window.history.back()}
          className="rounded-lg border border-dark-brown/20 px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base text-dark-brown transition hover:bg-cream"
        >
          Batal
        </button>
      </div>
    </form>
  );
}
