import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';

const REQUIRED = ['VITE_GAME_URL', 'VITE_SITE_URL'];

// `base: './'` keeps every asset URL relative, so `dist/` works from any folder
// of a static host (Hostinger public_html, a subfolder, or opened from disk).
export default defineConfig(({ command, mode }) => {
  if (command === 'build') {
    // A build without these would ship dead "Play now" links and a broken og:image.
    const env = loadEnv(mode, process.cwd());
    const missing = REQUIRED.filter((key) => !env[key]);
    if (missing.length > 0) {
      throw new Error(`Missing ${missing.join(', ')}: copy .env.example to .env and fill it in.`);
    }
  }
  return {
    base: './',
    plugins: [react(), tailwindcss()],
    build: {
      assetsInlineLimit: 0,
    },
  };
});
