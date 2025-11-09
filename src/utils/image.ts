// Image processing utilities
import { APP_CONFIG } from '@/constants/config';

export function validateImageFile(file: File): {
  valid: boolean;
  error?: string;
} {
  // Check file type
  if (!file.type.startsWith('image/')) {
    return { valid: false, error: 'File harus berupa gambar' };
  }

  // Check file size
  if (file.size > APP_CONFIG.maxImageSize) {
    return {
      valid: false,
      error: `Ukuran file maksimal ${APP_CONFIG.maxImageSize / (1024 * 1024)}MB`,
    };
  }

  return { valid: true };
}

export async function compressImage(file: File, maxWidth: number = 1920): Promise<File> {
  // TODO: Implement image compression
  // This is a placeholder - implement using canvas API or a library
  return file;
}

export function getImageDimensions(file: File): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      resolve({ width: img.width, height: img.height });
    };
    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });
}
