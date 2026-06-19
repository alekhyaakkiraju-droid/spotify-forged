import { env } from "@/shared/config/env";

if (!env.VITE_SPOTIFY_CLIENT_ID) {
  throw new Error("VITE_SPOTIFY_CLIENT_ID is required");
}

console.log("Environment validation passed");
