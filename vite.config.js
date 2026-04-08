import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      external: [
        // Explicitly isolate the server directory from the frontend bundle
        /^server\/.*/,
      ],
    },
  },
  // Ensure Vite only scans the relevant directories
  optimizeDeps: {
    exclude: ['server'],
  },
})
