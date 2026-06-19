export interface SpotifyImage {
  url: string;
  height: number | null;
  width: number | null;
}

export interface SpotifyExternalUrls {
  spotify: string;
}

export interface SpotifyArtist {
  id: string;
  name: string;
  uri: string;
  external_urls: SpotifyExternalUrls;
  images?: SpotifyImage[];
  genres?: string[];
  popularity?: number;
}

export interface SpotifyAlbum {
  id: string;
  name: string;
  uri: string;
  album_type: string;
  artists: SpotifyArtist[];
  images: SpotifyImage[];
  release_date: string;
  total_tracks?: number;
  external_urls: SpotifyExternalUrls;
}

export interface SpotifyTrack {
  id: string;
  name: string;
  uri: string;
  duration_ms: number;
  explicit: boolean;
  preview_url: string | null;
  artists: SpotifyArtist[];
  album: SpotifyAlbum;
  external_urls: SpotifyExternalUrls;
  track_number?: number;
}

export interface SpotifyPlaylist {
  id: string;
  name: string;
  uri: string;
  description: string | null;
  images: SpotifyImage[];
  owner: { id: string; display_name: string };
  tracks: { total: number };
  external_urls: SpotifyExternalUrls;
  public: boolean;
}

export interface SpotifyUser {
  id: string;
  display_name: string;
  email?: string;
  images: SpotifyImage[];
  product?: string;
  country?: string;
  external_urls: SpotifyExternalUrls;
}

export interface SpotifyCategory {
  id: string;
  name: string;
  icons: SpotifyImage[];
}

export interface SpotifyPaging<T> {
  href: string;
  items: T[];
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
}

export interface SpotifyAudioFeatures {
  id: string;
  danceability: number;
  energy: number;
  key: number;
  loudness: number;
  mode: number;
  speechiness: number;
  acousticness: number;
  instrumentalness: number;
  liveness: number;
  valence: number;
  tempo: number;
  duration_ms: number;
  time_signature: number;
}

export interface SpotifyAudioAnalysis {
  meta: { analyzer_version: string; platform: string; detailed_status: string };
  track: { num_samples: number; duration: number; tempo: number };
  sections: Array<{ start: number; duration: number; confidence: number }>;
  segments: Array<{ start: number; duration: number; loudness_start: number }>;
}

export interface SpotifyTokenResponse {
  access_token: string;
  token_type: string;
  scope: string;
  expires_in: number;
  refresh_token?: string;
}

export interface SpotifyPlaybackState {
  device: { id: string; is_active: boolean; name: string; type: string };
  is_playing: boolean;
  item: SpotifyTrack | null;
  progress_ms: number | null;
  shuffle_state: boolean;
  repeat_state: "off" | "track" | "context";
}

export interface SpotifyPlayerState {
  paused: boolean;
  position: number;
  duration: number;
  track_window: {
    current_track: {
      id: string;
      uri: string;
      name: string;
      artists: Array<{ name: string; uri: string }>;
      album: { name: string; uri: string; images: SpotifyImage[] };
      duration_ms: number;
    };
  };
}

export interface SpotifyPlayer {
  connect: () => Promise<boolean>;
  disconnect: () => void;
  addListener: (event: string, callback: (state: unknown) => void) => void;
  removeListener: (event: string, callback?: (state: unknown) => void) => void;
  getCurrentState: () => Promise<SpotifyPlayerState | null>;
  setName: (name: string) => Promise<void>;
  getVolume: () => Promise<number>;
  setVolume: (volume: number) => Promise<void>;
  pause: () => Promise<void>;
  resume: () => Promise<void>;
  togglePlay: () => Promise<void>;
  seek: (positionMs: number) => Promise<void>;
  previousTrack: () => Promise<void>;
  nextTrack: () => Promise<void>;
}

declare global {
  interface Window {
    Spotify?: {
      Player: new (options: {
        name: string;
        getOAuthToken: (cb: (token: string) => void) => void;
        volume?: number;
      }) => SpotifyPlayer;
    };
    onSpotifyWebPlaybackSDKReady?: () => void;
  }
}

export {};
