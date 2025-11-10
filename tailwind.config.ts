import type { Config } from 'tailwindcss';

const config: Config = {
  // 1. BAGIAN PALING PENTING:
  // Memberi tahu Tailwind untuk memindai file-file ini
  // untuk mencari nama class.
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],

  // 2. KOSONGKAN 'theme' DAN 'plugins'
  // Ini karena file globals.css Anda sudah menangani
  // semuanya dengan @theme inline (cara Tailwind 4).
  theme: {},
  plugins: [],
};
export default config;