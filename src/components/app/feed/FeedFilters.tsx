'use client';

import { useState } from 'react';

export default function FeedFilters() {
  const [province, setProvince] = useState('');
  const [city, setCity] = useState('');
  const [category, setCategory] = useState('');

  return (
    <div className="border-b border-dark-brown/10 bg-white p-4">
      <div className="space-y-3">
        <select
          value={province}
          onChange={(e) => setProvince(e.target.value)}
          className="w-full rounded-lg border border-dark-brown/20 px-4 py-2 text-dark-brown"
        >
          <option value="">Semua Provinsi</option>
          {/* TODO: Add province options */}
        </select>

        <select
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full rounded-lg border border-dark-brown/20 px-4 py-2 text-dark-brown"
          disabled={!province}
        >
          <option value="">Semua Kota</option>
          {/* TODO: Add city options based on province */}
        </select>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full rounded-lg border border-dark-brown/20 px-4 py-2 text-dark-brown"
        >
          <option value="">Semua Kategori</option>
          {/* TODO: Add category options */}
        </select>

        <button
          onClick={() => {
            setProvince('');
            setCity('');
            setCategory('');
          }}
          className="text-sm text-primary-yellow hover:underline"
        >
          Reset Filter
        </button>
      </div>
    </div>
  );
}
