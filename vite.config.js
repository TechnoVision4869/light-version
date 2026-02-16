import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
// import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
    tailwindcss(),
    // visualizer(),
  ],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  // Critical for Huawei SE 11 (older WebView)
  build: {
    target: 'es2018', // Safe for Chromium ≥70 (Huawei SE 11 is ~Chromium 89–95)
  },

  // Optional: make dev server compatible too (not strictly needed)
  esbuild: {
    target: 'es2018',
  },
});