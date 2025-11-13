// Report categories with metadata
import { Construction, Trash2, ShieldAlert, Heart, MoreHorizontal } from 'lucide-react';

export const CATEGORIES = [
  {
    id: 'infrastruktur',
    label: 'Infrastruktur',
    description: 'Jalan rusak, jembatan, dll',
    color: '#3B82F6', // blue-500
    icon: Construction,
  },
  {
    id: 'kebersihan',
    label: 'Kebersihan',
    description: 'Sampah, drainase, dll',
    color: '#10B981', // green-500
    icon: Trash2,
  },
  {
    id: 'keamanan',
    label: 'Keamanan',
    description: 'Lampu jalan mati, area rawan, dll',
    color: '#EF4444', // red-500
    icon: ShieldAlert,
  },
  {
    id: 'kesehatan',
    label: 'Kesehatan',
    description: 'Sanitasi, lingkungan tidak sehat',
    color: '#F59E0B', // yellow-500
    icon: Heart,
  },
  {
    id: 'lainnya',
    label: 'Lainnya',
    description: 'Kategori umum',
    color: '#6B7280', // gray-500
    icon: MoreHorizontal,
  },
] as const;

export type CategoryId = typeof CATEGORIES[number]['id'];
