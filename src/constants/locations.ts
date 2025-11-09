// Indonesian provinces and cities
// TODO: Add complete list of provinces and cities

export const PROVINCES = [
  { id: 'dki-jakarta', name: 'DKI Jakarta' },
  { id: 'jawa-barat', name: 'Jawa Barat' },
  { id: 'jawa-tengah', name: 'Jawa Tengah' },
  { id: 'jawa-timur', name: 'Jawa Timur' },
  { id: 'banten', name: 'Banten' },
  // Add more provinces...
] as const;

export const CITIES: Record<string, { id: string; name: string }[]> = {
  'dki-jakarta': [
    { id: 'jakarta-pusat', name: 'Jakarta Pusat' },
    { id: 'jakarta-utara', name: 'Jakarta Utara' },
    { id: 'jakarta-barat', name: 'Jakarta Barat' },
    { id: 'jakarta-selatan', name: 'Jakarta Selatan' },
    { id: 'jakarta-timur', name: 'Jakarta Timur' },
  ],
  'jawa-barat': [
    { id: 'bandung', name: 'Bandung' },
    { id: 'bogor', name: 'Bogor' },
    { id: 'bekasi', name: 'Bekasi' },
    // Add more cities...
  ],
  // Add more province-city mappings...
};
