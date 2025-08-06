import { defineConfig } from 'vite'
import wasm from 'vite-plugin-wasm';
import react from '@vitejs/plugin-react'
import topLevelAwait from 'vite-plugin-top-level-await';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), wasm(), topLevelAwait()],
  assetsInclude: ['**/*.glsl'],
  server: {
    proxy: {
      '/api': 'http://localhost:4000',
    },
  },
})
