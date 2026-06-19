import type {
  SpotifyAudioAnalysis,
  SpotifyAudioFeatures,
  SpotifyTrack,
} from "@/shared/types/spotify";

export interface PlaybackSlice {
  currentTrack: SpotifyTrack | null;
  isPlaying: boolean;
  positionMs: number;
  durationMs: number;
  volume: number;
  shuffle: boolean;
  repeat: "off" | "track" | "context";
  deviceId: string | null;
  playerReady: boolean;
  audioFeatures: SpotifyAudioFeatures | null;
  audioAnalysis: SpotifyAudioAnalysis | null;
  analysisLoading: boolean;
  setCurrentTrack: (track: SpotifyTrack | null) => void;
  setIsPlaying: (isPlaying: boolean) => void;
  setPositionMs: (positionMs: number) => void;
  setDurationMs: (durationMs: number) => void;
  setVolume: (volume: number) => void;
  setShuffle: (shuffle: boolean) => void;
  setRepeat: (repeat: "off" | "track" | "context") => void;
  setDeviceId: (deviceId: string | null) => void;
  setPlayerReady: (ready: boolean) => void;
  setAudioFeatures: (features: SpotifyAudioFeatures | null) => void;
  setAudioAnalysis: (analysis: SpotifyAudioAnalysis | null) => void;
  setAnalysisLoading: (loading: boolean) => void;
  resetPlayback: () => void;
}

export const createPlaybackSlice = (
  set: (
    partial:
      | Partial<PlaybackSlice>
      | ((state: PlaybackSlice) => Partial<PlaybackSlice>),
  ) => void,
): PlaybackSlice => ({
  currentTrack: null,
  isPlaying: false,
  positionMs: 0,
  durationMs: 0,
  volume: 0.5,
  shuffle: false,
  repeat: "off",
  deviceId: null,
  playerReady: false,
  audioFeatures: null,
  audioAnalysis: null,
  analysisLoading: false,
  setCurrentTrack: (currentTrack) => set({ currentTrack }),
  setIsPlaying: (isPlaying) => set({ isPlaying }),
  setPositionMs: (positionMs) => set({ positionMs }),
  setDurationMs: (durationMs) => set({ durationMs }),
  setVolume: (volume) => set({ volume }),
  setShuffle: (shuffle) => set({ shuffle }),
  setRepeat: (repeat) => set({ repeat }),
  setDeviceId: (deviceId) => set({ deviceId }),
  setPlayerReady: (playerReady) => set({ playerReady }),
  setAudioFeatures: (audioFeatures) => set({ audioFeatures }),
  setAudioAnalysis: (audioAnalysis) => set({ audioAnalysis }),
  setAnalysisLoading: (analysisLoading) => set({ analysisLoading }),
  resetPlayback: () =>
    set({
      currentTrack: null,
      isPlaying: false,
      positionMs: 0,
      durationMs: 0,
      audioFeatures: null,
      audioAnalysis: null,
      analysisLoading: false,
    }),
});
