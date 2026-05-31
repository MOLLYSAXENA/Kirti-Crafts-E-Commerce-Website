import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/upload': {
        target: 'http://localhost:4000',
        changeOrigin: true,
      },
      '/addproduct': 'http://localhost:4000',
      '/removeproduct': 'http://localhost:4000',
      '/allproducts': 'http://localhost:4000',
    }
  }
})
