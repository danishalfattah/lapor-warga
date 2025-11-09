// Design system colors - LaporWarga
// Full color palette documentation: See COLOR_PALETTE.md

// Brand Colors (Core)
export const BRAND_COLORS = {
  primaryYellow: '#75710f',
  secondaryGreen: '#35750f',
  backgroundCream: '#f2f2ed',
  textDarkBrown: '#2c2c21',
} as const;

// Category Colors (For Pin Maps & Badge Kategori)
export const CATEGORY_COLORS = {
  infrastruktur: '#ef4444', // Red/Orange - jalan rusak, jembatan rusak
  kebersihan: '#10b981',    // Emerald Green - sampah menumpuk, drainase tersumbat
  keamanan: '#f59e0b',      // Amber/Orange - lampu jalan mati, area rawan kriminal
  kesehatan: '#3b82f6',     // Blue - sanitasi buruk, lingkungan tidak sehat
  lainnya: '#8b5cf6',       // Purple - laporan umum
} as const;

// Status Colors
export const STATUS_COLORS = {
  pending: {
    main: '#fbbf24',                    // Yellow/Amber
    background: 'rgba(251, 191, 36, 0.1)',
  },
  inProgress: {
    main: '#3b82f6',                    // Blue
    background: 'rgba(59, 130, 246, 0.1)',
  },
  resolved: {
    main: '#10b981',                    // Green
    background: 'rgba(16, 185, 129, 0.1)',
  },
  rejected: {
    main: '#ef4444',                    // Red
    background: 'rgba(239, 68, 68, 0.1)',
  },
} as const;

// Neutral Colors
export const NEUTRAL_COLORS = {
  white: '#ffffff',
  gray50: '#f9fafb',
  gray100: '#f3f4f6',
  gray200: '#e5e7eb',
  gray300: '#d1d5db',
  gray400: '#9ca3af',
  gray500: '#6b7280',
  gray600: '#4b5563',
  gray700: '#374151',
  gray800: '#1f2937',
  gray900: '#111827',
} as const;

// Interactive States
export const INTERACTIVE_COLORS = {
  primaryHover: '#5a5a0c',      // Darker shade of primary yellow
  secondaryHover: '#2a5c0c',    // Darker shade of secondary green
  primaryActive: '#4a4a09',
  secondaryActive: '#1f460a',
  focusRing: 'rgba(117, 113, 15, 0.5)',
} as const;

// Glassmorphism Effects
export const GLASSMORPHISM = {
  background: 'rgba(255, 255, 255, 0.7)',
  border: 'rgba(255, 255, 255, 0.3)',
  shadow: 'rgba(0, 0, 0, 0.1)',
} as const;

// Map Specific Colors (Dark Mode)
export const MAP_COLORS = {
  darkBase: '#1a1a1a',
  roads: '#2d3748',
  water: '#0f172a',
  borders: '#374151',
  markerShadow: 'rgba(0, 0, 0, 0.3)',
} as const;

// Special Use Cases
export const SPECIAL_COLORS = {
  upvote: {
    default: '#9ca3af',     // Gray 400
    upvoted: '#75710f',     // Primary Yellow
    hover: '#d1d5db',       // Gray 300
  },
  notifications: {
    info: '#3b82f6',        // Blue
    success: '#10b981',     // Green
    warning: '#f59e0b',     // Amber
    error: '#ef4444',       // Red
  },
} as const;

// Gradients
export const GRADIENTS = {
  hero: 'linear-gradient(135deg, #75710f 0%, #35750f 100%)',
  cardHover: 'linear-gradient(180deg, rgba(117, 113, 15, 0.05) 0%, rgba(53, 117, 15, 0.05) 100%)',
  mapOverlay: 'linear-gradient(180deg, rgba(44, 44, 33, 0.8) 0%, rgba(44, 44, 33, 0.4) 100%)',
} as const;

// Legacy export for backward compatibility
export const COLORS = BRAND_COLORS;

export type BrandColorKey = keyof typeof BRAND_COLORS;
export type CategoryColorKey = keyof typeof CATEGORY_COLORS;
export type StatusColorKey = keyof typeof STATUS_COLORS;
export type NeutralColorKey = keyof typeof NEUTRAL_COLORS;
