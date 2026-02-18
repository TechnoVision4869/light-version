import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
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

  // Critical for Huawei SE 11 (older WebView)
  build: {
    target: 'es2018', // Safe for Chromium ≥70 (Huawei SE 11 is ~Chromium 89–95)
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'vendor';
          }
          if (id.includes('node_modules/@mui')) {
            return 'mui';
          }
        }
      }
    }
  },

  // Optional: make dev server compatible too (not strictly needed)
  esbuild: {
    target: 'es2018',
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});