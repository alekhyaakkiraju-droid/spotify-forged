import path from "node:path";
import { defineConfig } from "vitest/config";
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
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
    globals: true,
    env: {
      VITE_SPOTIFY_CLIENT_ID: "test-client-id",
      VITE_SPOTIFY_REDIRECT_URI: "http://127.0.0.1:5173/callback",
      VITE_SPOTIFY_SCOPES: "user-read-private streaming",
    },
  },
});
