import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@/features": path.resolve(__dirname, "src/features"),
      "@/shared": path.resolve(__dirname, "src/shared"),
      "@/app": path.resolve(__dirname, "src/app"),
    },
  },
  server: {
    host: "127.0.0.1",
    port: 5173,
    strictPort: true,
  },
  build: {
    outDir: "dist",
    sourcemap: true,
  },
});
