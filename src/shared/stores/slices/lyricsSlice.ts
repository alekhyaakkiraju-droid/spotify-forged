export interface LyricsSlice {
  trackId: string | null;
  lines: string[];
  isLoading: boolean;
  setTrackId: (trackId: string | null) => void;
  setLines: (lines: string[]) => void;
  setLoading: (isLoading: boolean) => void;
  clearLyrics: () => void;
}

export const createLyricsSlice = (
  set: (
    partial: Partial<LyricsSlice> | ((state: LyricsSlice) => Partial<LyricsSlice>),
  ) => void,
): LyricsSlice => ({
  trackId: null,
  lines: [],
  isLoading: false,
  setTrackId: (trackId) => set({ trackId }),
  setLines: (lines) => set({ lines }),
  setLoading: (isLoading) => set({ isLoading }),
  clearLyrics: () => set({ trackId: null, lines: [], isLoading: false }),
});
