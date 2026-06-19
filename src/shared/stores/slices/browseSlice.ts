import type { SpotifyCategory, SpotifyPlaylist } from "@/shared/types/spotify";

export interface BrowseSlice {
  categories: SpotifyCategory[];
  featuredPlaylists: SpotifyPlaylist[];
  newReleases: SpotifyPlaylist[];
  setCategories: (categories: SpotifyCategory[]) => void;
  setFeaturedPlaylists: (playlists: SpotifyPlaylist[]) => void;
  setNewReleases: (playlists: SpotifyPlaylist[]) => void;
}

export const createBrowseSlice = (
  set: (
    partial: Partial<BrowseSlice> | ((state: BrowseSlice) => Partial<BrowseSlice>),
  ) => void,
): BrowseSlice => ({
  categories: [],
  featuredPlaylists: [],
  newReleases: [],
  setCategories: (categories) => set({ categories }),
  setFeaturedPlaylists: (featuredPlaylists) => set({ featuredPlaylists }),
  setNewReleases: (newReleases) => set({ newReleases }),
});
