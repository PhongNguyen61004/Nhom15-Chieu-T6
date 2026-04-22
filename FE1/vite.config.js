import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],

  server: {
    open: true,
    proxy: {
      "/api": {
        target: "https://nhom15-chieu-t6.onrender.com",
        changeOrigin: true,
        secure: true,
      },
    },
  },
})