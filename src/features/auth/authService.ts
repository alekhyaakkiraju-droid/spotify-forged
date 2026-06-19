import { spotifyAuthConfig } from "@/shared/config/env";
import { TokenVaultService } from "@/shared/services/TokenVaultService";
import type { SpotifyTokenResponse } from "@/shared/types/spotify";

const REFRESH_BUFFER_MS = 60_000;

function generateRandomString(length: number): string {
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);
  return Array.from(array, (byte) => byte.toString(16).padStart(2, "0")).join("");
}

async function sha256(plain: string): Promise<ArrayBuffer> {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  return crypto.subtle.digest("SHA-256", data);
}

function base64UrlEncode(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export async function createPkceChallenge(): Promise<{
  verifier: string;
  challenge: string;
}> {
  const verifier = generateRandomString(64);
  const hashed = await sha256(verifier);
  const challenge = base64UrlEncode(hashed);
  return { verifier, challenge };
}

export function buildAuthorizeUrl(state: string, codeChallenge: string): string {
  const params = new URLSearchParams({
    client_id: spotifyAuthConfig.clientId,
    response_type: "code",
    redirect_uri: spotifyAuthConfig.redirectUri,
    scope: spotifyAuthConfig.scopes.join(" "),
    state,
    code_challenge_method: "S256",
    code_challenge: codeChallenge,
  });
  return `${spotifyAuthConfig.authorizeUrl}?${params.toString()}`;
}

export async function exchangeCodeForTokens(
  code: string,
  codeVerifier: string,
): Promise<SpotifyTokenResponse> {
  const body = new URLSearchParams({
    client_id: spotifyAuthConfig.clientId,
    grant_type: "authorization_code",
    code,
    redirect_uri: spotifyAuthConfig.redirectUri,
    code_verifier: codeVerifier,
  });

  const response = await fetch(spotifyAuthConfig.tokenUrl, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });

  if (!response.ok) {
    throw new Error(`Token exchange failed: ${response.status}`);
  }

  return (await response.json()) as SpotifyTokenResponse;
}

export async function refreshAccessToken(
  refreshToken: string,
): Promise<SpotifyTokenResponse> {
  const body = new URLSearchParams({
    client_id: spotifyAuthConfig.clientId,
    grant_type: "refresh_token",
    refresh_token: refreshToken,
  });

  const response = await fetch(spotifyAuthConfig.tokenUrl, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });

  if (!response.ok) {
    throw new Error(`Token refresh failed: ${response.status}`);
  }

  return (await response.json()) as SpotifyTokenResponse;
}

export function persistTokens(tokenResponse: SpotifyTokenResponse): void {
  const expiresAt = Date.now() + tokenResponse.expires_in * 1000;
  const existing = TokenVaultService.load();
  TokenVaultService.save({
    accessToken: tokenResponse.access_token,
    refreshToken: tokenResponse.refresh_token ?? existing?.refreshToken ?? "",
    expiresAt,
    scope: tokenResponse.scope,
  });
}

export function isTokenExpiringSoon(expiresAt: number): boolean {
  return Date.now() >= expiresAt - REFRESH_BUFFER_MS;
}

export function getStoredAccessToken(): string | null {
  const tokens = TokenVaultService.load();
  if (!tokens) return null;
  return tokens.accessToken;
}
