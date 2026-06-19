import type { SpotifyAlbum, SpotifyArtist, SpotifyTrack } from "@/shared/types/spotify";

export interface SearchSlice {
  query: string;
  trackResults: SpotifyTrack[];
  albumResults: SpotifyAlbum[];
  artistResults: SpotifyArtist[];
  isSearching: boolean;
  setQuery: (query: string) => void;
  setTrackResults: (tracks: SpotifyTrack[]) => void;
  setAlbumResults: (albums: SpotifyAlbum[]) => void;
  setArtistResults: (artists: SpotifyArtist[]) => void;
  setIsSearching: (isSearching: boolean) => void;
  clearResults: () => void;
}

export const createSearchSlice = (
  set: (
    partial: Partial<SearchSlice> | ((state: SearchSlice) => Partial<SearchSlice>),
  ) => void,
): SearchSlice => ({
  query: "",
  trackResults: [],
  albumResults: [],
  artistResults: [],
  isSearching: false,
  setQuery: (query) => set({ query }),
  setTrackResults: (trackResults) => set({ trackResults }),
  setAlbumResults: (albumResults) => set({ albumResults }),
  setArtistResults: (artistResults) => set({ artistResults }),
  setIsSearching: (isSearching) => set({ isSearching }),
  clearResults: () =>
    set({
      query: "",
      trackResults: [],
      albumResults: [],
      artistResults: [],
      isSearching: false,
    }),
});
