export const SPOTIFY_API_BASE = "https://api.spotify.com/v1";

export class SpotifyApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public retryAfter?: number,
  ) {
    super(message);
    this.name = "SpotifyApiError";
  }
}

export interface SpotifyFetchOptions extends RequestInit {
  accessToken: string;
  retries?: number;
}

async function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function spotifyFetch<T>(
  path: string,
  { accessToken, retries = 1, ...init }: SpotifyFetchOptions,
): Promise<T> {
  const url = path.startsWith("http") ? path : `${SPOTIFY_API_BASE}${path}`;

  const response = await fetch(url, {
    ...init,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      ...init.headers,
    },
  });

  if (response.status === 401 && retries > 0) {
    throw new SpotifyApiError("Unauthorized", 401);
  }

  if (response.status === 429 && retries > 0) {
    const retryAfterHeader = response.headers.get("Retry-After");
    const retryAfter = retryAfterHeader ? Number(retryAfterHeader) * 1000 : 1000;
    await sleep(retryAfter);
    return spotifyFetch<T>(path, { accessToken, retries: retries - 1, ...init });
  }

  if (!response.ok) {
    const body = await response.text();
    throw new SpotifyApiError(
      body || `Spotify API error: ${response.status}`,
      response.status,
    );
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
}
