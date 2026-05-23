/**
 * Vite geliştirme sunucusu: React eklentisi, 3000 portu, `/api` istekleri
 * backend 5000’e vekil edilir.
 */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
          charts: ['recharts'],
          pdf: ['pdfmake/build/pdfmake', 'pdfmake/build/vfs_fonts'],
          icons: ['react-icons/hi'],
        },
      },
    },
  },
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      }
    }
  }
})
