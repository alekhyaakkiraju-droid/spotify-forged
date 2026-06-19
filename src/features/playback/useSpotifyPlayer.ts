import { useEffect, useRef } from "react";
import { getAudioAnalysis, getAudioFeatures } from "@/shared/api/spotifyApi";
import type { SpotifyPlayer, SpotifyPlayerState } from "@/shared/types/spotify";
import { useAppStore } from "@/shared/stores/appStore";

export function useSpotifyPlayer(accessToken: string | null) {
  const playerRef = useRef<SpotifyPlayer | null>(null);
  const currentTrackId = useAppStore((s) => s.currentTrack?.id ?? null);
  const {
    setDeviceId,
    setPlayerReady,
    setIsPlaying,
    setPositionMs,
    setDurationMs,
    setCurrentTrack,
    volume,
    setVolume,
    setAudioFeatures,
    setAudioAnalysis,
    setAnalysisLoading,
  } = useAppStore();

  useEffect(() => {
    if (!accessToken || !window.Spotify) return;

    const player = new window.Spotify.Player({
      name: "SpotifyForged Web Player",
      getOAuthToken: (cb) => cb(accessToken),
      volume,
    });

    playerRef.current = player;

    player.addListener("ready", (state: unknown) => {
      const { device_id } = state as { device_id: string };
      setDeviceId(device_id);
      setPlayerReady(true);
    });

    player.addListener("not_ready", () => {
      setPlayerReady(false);
    });

    player.addListener("player_state_changed", (state: unknown) => {
      const playerState = state as SpotifyPlayerState | null;
      if (!playerState) return;

      setIsPlaying(!playerState.paused);
      setPositionMs(playerState.position);
      setDurationMs(playerState.duration);

      const track = playerState.track_window.current_track;
      if (track) {
        setCurrentTrack({
          id: track.id,
          name: track.name,
          uri: track.uri,
          duration_ms: track.duration_ms,
          explicit: false,
          preview_url: null,
          artists: track.artists.map((a) => ({
            id: "",
            name: a.name,
            uri: a.uri,
            external_urls: { spotify: "" },
          })),
          album: {
            id: "",
            name: track.album.name,
            uri: track.album.uri,
            album_type: "album",
            artists: [],
            images: track.album.images,
            release_date: "",
            external_urls: { spotify: "" },
          },
          external_urls: { spotify: "" },
        });
      }
    });

    void player.connect();

    return () => {
      player.disconnect();
      playerRef.current = null;
      setDeviceId(null);
      setPlayerReady(false);
    };
  }, [
    accessToken,
    setCurrentTrack,
    setDeviceId,
    setDurationMs,
    setIsPlaying,
    setPlayerReady,
    setPositionMs,
    volume,
  ]);

  useEffect(() => {
    if (!accessToken || !currentTrackId) return;

    let cancelled = false;
    setAnalysisLoading(true);

    void (async () => {
      try {
        const [features, analysis] = await Promise.all([
          getAudioFeatures(accessToken, currentTrackId),
          getAudioAnalysis(accessToken, currentTrackId),
        ]);
        if (!cancelled) {
          setAudioFeatures(features);
          setAudioAnalysis(analysis);
        }
      } catch {
        if (!cancelled) {
          setAudioFeatures(null);
          setAudioAnalysis(null);
        }
      } finally {
        if (!cancelled) {
          setAnalysisLoading(false);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [
    accessToken,
    currentTrackId,
    setAnalysisLoading,
    setAudioFeatures,
    setAudioAnalysis,
  ]);

  const togglePlay = async () => {
    await playerRef.current?.togglePlay();
  };

  const next = async () => {
    await playerRef.current?.nextTrack();
  };

  const previous = async () => {
    await playerRef.current?.previousTrack();
  };

  const seek = async (positionMs: number) => {
    await playerRef.current?.seek(positionMs);
    setPositionMs(positionMs);
  };

  const setPlayerVolume = async (value: number) => {
    setVolume(value);
    await playerRef.current?.setVolume(value);
  };

  return {
    player: playerRef.current,
    togglePlay,
    next,
    previous,
    seek,
    setPlayerVolume,
  };
}
