import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      // Proxy API calls sang backend — tránh CORS khi dev
      // TODO: đổi target thành URL backend thật của bạn
      "/api": {
        target: "https://nhom15-chieu-t6.onrender.com",
        changeOrigin: true,
        secure: true,
      },
    },
  },
});
