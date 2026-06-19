import type { SpotifyPlaylist } from "@/shared/types/spotify";

export interface PlaylistsSlice {
  userPlaylists: SpotifyPlaylist[];
  selectedPlaylistId: string | null;
  setUserPlaylists: (playlists: SpotifyPlaylist[]) => void;
  setSelectedPlaylistId: (id: string | null) => void;
}

export const createPlaylistsSlice = (
  set: (
    partial:
      | Partial<PlaylistsSlice>
      | ((state: PlaylistsSlice) => Partial<PlaylistsSlice>),
  ) => void,
): PlaylistsSlice => ({
  userPlaylists: [],
  selectedPlaylistId: null,
  setUserPlaylists: (userPlaylists) => set({ userPlaylists }),
  setSelectedPlaylistId: (selectedPlaylistId) => set({ selectedPlaylistId }),
});
