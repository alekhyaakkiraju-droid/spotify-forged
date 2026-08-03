import { useEffect } from "react";
import { fetchLyrics } from "@/features/lyrics/lyricsService";
import { useAppStore } from "@/shared/stores/appStore";

export function useLyrics() {
  const currentTrack = useAppStore((s) => s.currentTrack);
  const showLyrics = useAppStore((s) => s.settings.showLyrics);
  const setTrackId = useAppStore((s) => s.setTrackId);
  const setLines = useAppStore((s) => s.setLines);
  const setLoading = useAppStore((s) => s.setLoading);
  const clearLyrics = useAppStore((s) => s.clearLyrics);

  useEffect(() => {
    if (!showLyrics || !currentTrack) {
      clearLyrics();
      return;
    }

    let cancelled = false;
    setTrackId(currentTrack.id);
    setLoading(true);

    void fetchLyrics(currentTrack)
      .then((lines) => {
        if (!cancelled) setLines(lines);
      })
      .catch(() => {
        if (!cancelled) setLines([]);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [clearLyrics, currentTrack, setLines, setLoading, setTrackId, showLyrics]);
}
