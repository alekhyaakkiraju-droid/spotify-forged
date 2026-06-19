import type { SpotifyAlbum } from "@/shared/types/spotify";

export interface AlbumsSlice {
  savedAlbums: SpotifyAlbum[];
  currentAlbumId: string | null;
  setSavedAlbums: (albums: SpotifyAlbum[]) => void;
  setCurrentAlbumId: (id: string | null) => void;
}

export const createAlbumsSlice = (
  set: (
    partial: Partial<AlbumsSlice> | ((state: AlbumsSlice) => Partial<AlbumsSlice>),
  ) => void,
): AlbumsSlice => ({
  savedAlbums: [],
  currentAlbumId: null,
  setSavedAlbums: (savedAlbums) => set({ savedAlbums }),
  setCurrentAlbumId: (currentAlbumId) => set({ currentAlbumId }),
});
