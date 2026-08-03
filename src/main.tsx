import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "@/app/App";
import "./index.css";

// Spotify redirect URI uses 127.0.0.1 — sessionStorage is per-origin, so localhost breaks PKCE.
const redirectUri = import.meta.env.VITE_SPOTIFY_REDIRECT_URI;
if (redirectUri) {
  try {
    const expected = new URL(redirectUri);
    const current = window.location;
    if (
      expected.hostname === "127.0.0.1" &&
      current.hostname === "localhost" &&
      current.port === expected.port
    ) {
      window.location.replace(
        `${expected.protocol}//${expected.host}${current.pathname}${current.search}${current.hash}`,
      );
    }
  } catch {
    // ignore malformed redirect URI during local misconfiguration
  }
}

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root element #root not found");
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
