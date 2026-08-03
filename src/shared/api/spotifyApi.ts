import { spotifyFetch } from "@/shared/api/spotifyFetch";
import type {
  SpotifyAlbum,
  SpotifyArtist,
  SpotifyAudioAnalysis,
  SpotifyAudioFeatures,
  SpotifyCategory,
  SpotifyPaging,
  SpotifyPlaybackState,
  SpotifyPlaylist,
  SpotifyTrack,
  SpotifyUser,
} from "@/shared/types/spotify";

type Token = string;

export async function getCurrentUser(accessToken: Token): Promise<SpotifyUser> {
  return spotifyFetch<SpotifyUser>("/me", { accessToken });
}

export async function getUserProfile(
  accessToken: Token,
  userId: string,
): Promise<SpotifyUser> {
  return spotifyFetch<SpotifyUser>(`/users/${userId}`, { accessToken });
}

export async function getPlaybackState(
  accessToken: Token,
): Promise<SpotifyPlaybackState | null> {
  try {
    return await spotifyFetch<SpotifyPlaybackState>("/me/player", { accessToken });
  } catch {
    return null;
  }
}

export async function getCurrentlyPlaying(
  accessToken: Token,
): Promise<{ item: SpotifyTrack | null; is_playing: boolean } | null> {
  try {
    return await spotifyFetch("/me/player/currently-playing", { accessToken });
  } catch {
    return null;
  }
}

export async function startPlayback(
  accessToken: Token,
  body?: { uris?: string[]; context_uri?: string; offset?: { position: number } },
  deviceId?: string,
): Promise<void> {
  const deviceQuery = deviceId ? `?device_id=${encodeURIComponent(deviceId)}` : "";
  await spotifyFetch<void>(`/me/player/play${deviceQuery}`, {
    accessToken,
    method: "PUT",
    body: body ? JSON.stringify(body) : undefined,
  });
}

export async function pausePlayback(accessToken: Token): Promise<void> {
  await spotifyFetch<void>("/me/player/pause", { accessToken, method: "PUT" });
}

export async function skipToNext(accessToken: Token): Promise<void> {
  await spotifyFetch<void>("/me/player/next", { accessToken, method: "POST" });
}

export async function skipToPrevious(accessToken: Token): Promise<void> {
  await spotifyFetch<void>("/me/player/previous", {
    accessToken,
    method: "POST",
  });
}

export async function seekPlayback(
  accessToken: Token,
  positionMs: number,
): Promise<void> {
  await spotifyFetch<void>(`/me/player/seek?position_ms=${positionMs}`, {
    accessToken,
    method: "PUT",
  });
}

export async function setPlaybackVolume(
  accessToken: Token,
  volumePercent: number,
): Promise<void> {
  await spotifyFetch<void>(`/me/player/volume?volume_percent=${volumePercent}`, {
    accessToken,
    method: "PUT",
  });
}

export async function getUserPlaylists(
  accessToken: Token,
  limit = 20,
  offset = 0,
): Promise<SpotifyPaging<SpotifyPlaylist>> {
  return spotifyFetch<SpotifyPaging<SpotifyPlaylist>>(
    `/me/playlists?limit=${limit}&offset=${offset}`,
    { accessToken },
  );
}

export async function getPlaylist(
  accessToken: Token,
  playlistId: string,
): Promise<SpotifyPlaylist> {
  return spotifyFetch<SpotifyPlaylist>(`/playlists/${playlistId}`, { accessToken });
}

export async function getPlaylistTracks(
  accessToken: Token,
  playlistId: string,
  limit = 50,
  offset = 0,
): Promise<SpotifyPaging<{ track: SpotifyTrack }>> {
  return spotifyFetch(
    `/playlists/${playlistId}/tracks?limit=${limit}&offset=${offset}`,
    {
      accessToken,
    },
  );
}

export async function getFeaturedPlaylists(
  accessToken: Token,
  limit = 20,
  offset = 0,
): Promise<{ playlists: SpotifyPaging<SpotifyPlaylist> }> {
  return spotifyFetch(`/browse/featured-playlists?limit=${limit}&offset=${offset}`, {
    accessToken,
  });
}

export async function getNewReleases(
  accessToken: Token,
  limit = 20,
  offset = 0,
): Promise<{ albums: SpotifyPaging<SpotifyAlbum> }> {
  return spotifyFetch(`/browse/new-releases?limit=${limit}&offset=${offset}`, {
    accessToken,
  });
}

export async function getCategories(
  accessToken: Token,
  limit = 20,
  offset = 0,
): Promise<{ categories: SpotifyPaging<SpotifyCategory> }> {
  return spotifyFetch(`/browse/categories?limit=${limit}&offset=${offset}`, {
    accessToken,
  });
}

export async function getCategoryPlaylists(
  accessToken: Token,
  categoryId: string,
  limit = 20,
  offset = 0,
): Promise<{ playlists: SpotifyPaging<SpotifyPlaylist> }> {
  return spotifyFetch(
    `/browse/categories/${categoryId}/playlists?limit=${limit}&offset=${offset}`,
    { accessToken },
  );
}

export async function getAlbum(
  accessToken: Token,
  albumId: string,
): Promise<SpotifyAlbum> {
  return spotifyFetch<SpotifyAlbum>(`/albums/${albumId}`, { accessToken });
}

export async function getAlbumTracks(
  accessToken: Token,
  albumId: string,
  limit = 50,
  offset = 0,
): Promise<SpotifyPaging<SpotifyTrack>> {
  return spotifyFetch(`/albums/${albumId}/tracks?limit=${limit}&offset=${offset}`, {
    accessToken,
  });
}

export async function getArtist(
  accessToken: Token,
  artistId: string,
): Promise<SpotifyArtist> {
  return spotifyFetch<SpotifyArtist>(`/artists/${artistId}`, { accessToken });
}

export async function getArtistTopTracks(
  accessToken: Token,
  artistId: string,
  market = "US",
): Promise<{ tracks: SpotifyTrack[] }> {
  return spotifyFetch(`/artists/${artistId}/top-tracks?market=${market}`, {
    accessToken,
  });
}

export async function getArtistAlbums(
  accessToken: Token,
  artistId: string,
  limit = 20,
  offset = 0,
): Promise<SpotifyPaging<SpotifyAlbum>> {
  return spotifyFetch(`/artists/${artistId}/albums?limit=${limit}&offset=${offset}`, {
    accessToken,
  });
}

export async function search(
  accessToken: Token,
  query: string,
  types: string[],
  limit = 20,
  offset = 0,
): Promise<{
  tracks?: SpotifyPaging<SpotifyTrack>;
  albums?: SpotifyPaging<SpotifyAlbum>;
  artists?: SpotifyPaging<SpotifyArtist>;
  playlists?: SpotifyPaging<SpotifyPlaylist>;
}> {
  const params = new URLSearchParams({
    q: query,
    type: types.join(","),
    limit: String(limit),
    offset: String(offset),
  });
  return spotifyFetch(`/search?${params.toString()}`, { accessToken });
}

export async function getRecentlyPlayed(
  accessToken: Token,
  limit = 20,
): Promise<{ items: Array<{ track: SpotifyTrack; played_at: string }> }> {
  return spotifyFetch(`/me/player/recently-played?limit=${limit}`, { accessToken });
}

export async function getSavedTracks(
  accessToken: Token,
  limit = 20,
  offset = 0,
): Promise<SpotifyPaging<{ added_at: string; track: SpotifyTrack }>> {
  return spotifyFetch(`/me/tracks?limit=${limit}&offset=${offset}`, { accessToken });
}

export async function getSavedAlbums(
  accessToken: Token,
  limit = 20,
  offset = 0,
): Promise<SpotifyPaging<{ added_at: string; album: SpotifyAlbum }>> {
  return spotifyFetch(`/me/albums?limit=${limit}&offset=${offset}`, { accessToken });
}

export async function getFollowedArtists(
  accessToken: Token,
  limit = 20,
): Promise<{ artists: SpotifyPaging<SpotifyArtist> }> {
  return spotifyFetch(`/me/following?type=artist&limit=${limit}`, { accessToken });
}

export async function getTopTracks(
  accessToken: Token,
  timeRange: "short_term" | "medium_term" | "long_term" = "medium_term",
  limit = 20,
): Promise<{ items: SpotifyTrack[] }> {
  return spotifyFetch(`/me/top/tracks?time_range=${timeRange}&limit=${limit}`, {
    accessToken,
  });
}

export async function getTopArtists(
  accessToken: Token,
  timeRange: "short_term" | "medium_term" | "long_term" = "medium_term",
  limit = 20,
): Promise<{ items: SpotifyArtist[] }> {
  return spotifyFetch(`/me/top/artists?time_range=${timeRange}&limit=${limit}`, {
    accessToken,
  });
}

export async function getTrack(
  accessToken: Token,
  trackId: string,
): Promise<SpotifyTrack> {
  return spotifyFetch<SpotifyTrack>(`/tracks/${trackId}`, { accessToken });
}

export async function getAudioFeatures(
  accessToken: Token,
  trackId: string,
): Promise<SpotifyAudioFeatures> {
  return spotifyFetch<SpotifyAudioFeatures>(`/audio-features/${trackId}`, {
    accessToken,
  });
}

export async function getAudioAnalysis(
  accessToken: Token,
  trackId: string,
): Promise<SpotifyAudioAnalysis> {
  return spotifyFetch<SpotifyAudioAnalysis>(`/audio-analysis/${trackId}`, {
    accessToken,
  });
}

export async function getRecommendations(
  accessToken: Token,
  params: {
    seed_tracks?: string[];
    seed_artists?: string[];
    seed_genres?: string[];
    limit?: number;
  },
): Promise<{ tracks: SpotifyTrack[] }> {
  const searchParams = new URLSearchParams();
  if (params.seed_tracks?.length) {
    searchParams.set("seed_tracks", params.seed_tracks.join(","));
  }
  if (params.seed_artists?.length) {
    searchParams.set("seed_artists", params.seed_artists.join(","));
  }
  if (params.seed_genres?.length) {
    searchParams.set("seed_genres", params.seed_genres.join(","));
  }
  searchParams.set("limit", String(params.limit ?? 20));
  return spotifyFetch(`/recommendations?${searchParams.toString()}`, { accessToken });
}

export async function getAvailableDevices(accessToken: Token): Promise<{
  devices: Array<{ id: string; is_active: boolean; name: string; type: string }>;
}> {
  return spotifyFetch("/me/player/devices", { accessToken });
}

export async function transferPlayback(
  accessToken: Token,
  deviceId: string,
  play = false,
): Promise<void> {
  await spotifyFetch<void>("/me/player", {
    accessToken,
    method: "PUT",
    body: JSON.stringify({ device_ids: [deviceId], play }),
  });
}
