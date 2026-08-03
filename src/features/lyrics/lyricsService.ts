import type { SpotifyTrack } from "@/shared/types/spotify";

interface LrcLibResponse {
  syncedLyrics?: string;
  plainLyrics?: string;
}

function parseLyricsText(text: string): string[] {
  return text
    .split("\n")
    .map((line) => line.replace(/^\[\d+:\d+(?:\.\d+)?\]\s*/, "").trim())
    .filter(Boolean);
}

export async function fetchLyrics(track: SpotifyTrack): Promise<string[]> {
  const params = new URLSearchParams({
    track_name: track.name,
    artist_name: track.artists[0]?.name ?? "",
    album_name: track.album.name,
    duration: String(Math.round(track.duration_ms / 1000)),
  });

  const response = await fetch(`https://lrclib.net/api/get?${params.toString()}`);
  if (response.status === 404) return [];
  if (!response.ok) {
    throw new Error(`Lyrics fetch failed: ${response.status}`);
  }

  const data = (await response.json()) as LrcLibResponse;
  const text = data.syncedLyrics ?? data.plainLyrics;
  return text ? parseLyricsText(text) : [];
}
