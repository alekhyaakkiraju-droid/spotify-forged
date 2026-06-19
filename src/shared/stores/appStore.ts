import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createAlbumsSlice, type AlbumsSlice } from "./slices/albumsSlice";
import { createAuthSlice, type AuthSlice } from "./slices/authSlice";
import { createBrowseSlice, type BrowseSlice } from "./slices/browseSlice";
import { createLyricsSlice, type LyricsSlice } from "./slices/lyricsSlice";
import { createPlaybackSlice, type PlaybackSlice } from "./slices/playbackSlice";
import { createPlaylistsSlice, type PlaylistsSlice } from "./slices/playlistsSlice";
import { createSearchSlice, type SearchSlice } from "./slices/searchSlice";
import { createSettingsSlice, type SettingsSlice } from "./slices/settingsSlice";
import { createUiSlice, type UiSlice } from "./slices/uiSlice";
import { createVisualizerSlice, type VisualizerSlice } from "./slices/visualizerSlice";

export type AppStore = AuthSlice &
  PlaybackSlice &
  PlaylistsSlice &
  AlbumsSlice &
  BrowseSlice &
  SearchSlice &
  LyricsSlice &
  VisualizerSlice &
  SettingsSlice &
  UiSlice;

export const useAppStore = create<AppStore>()(
  persist(
    (set, get) => ({
      ...createAuthSlice(set),
      ...createPlaybackSlice(set),
      ...createPlaylistsSlice(set),
      ...createAlbumsSlice(set),
      ...createBrowseSlice(set),
      ...createSearchSlice(set),
      ...createLyricsSlice(set),
      ...createVisualizerSlice(set),
      ...createSettingsSlice(set, get),
      ...createUiSlice(set),
    }),
    {
      name: "spotify-forged-settings",
      partialize: (state) => ({ settings: state.settings }),
    },
  ),
);
