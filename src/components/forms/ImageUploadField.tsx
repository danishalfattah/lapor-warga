'use client';

import { useRef } from 'react';

interface ImageUploadFieldProps {
  images: File[];
  setImages: (images: File[]) => void;
}

export default function ImageUploadField({ images, setImages }: ImageUploadFieldProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setImages([...images, ...files].slice(0, 5)); // Max 5 images
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <div>
      <label className="block text-sm font-medium text-dark-brown">
        Foto Pendukung (Maksimal 5)
      </label>

      <div className="mt-2 grid grid-cols-3 gap-4 md:grid-cols-5">
        {images.map((file, index) => (
          <div key={index} className="relative aspect-square">
            <img
              src={URL.createObjectURL(file)}
              alt={`Upload ${index + 1}`}
              className="h-full w-full rounded-lg object-cover"
            />
            <button
              type="button"
              onClick={() => removeImage(index)}
              className="absolute -right-2 -top-2 rounded-full bg-red-500 p-1 text-white"
            >
              ✕
            </button>
          </div>
        ))}

        {images.length < 5 && (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="aspect-square rounded-lg border-2 border-dashed border-dark-brown/20 bg-dark-brown/5 transition hover:bg-dark-brown/10"
          >
            <span className="text-2xl text-dark-brown/50">+</span>
          </button>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}
