import path from "path"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      '/cidades': {
        target: 'https://hope-healing-api.onrender.com/v1',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/cidades/, '/cidades'),
      },
      '/pessoa-fisica': {
        target: 'https://hope-healing-api.onrender.com/v1',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/pessoa-fisica/, '/pessoa-fisica'),
      },
    },
  },
})
