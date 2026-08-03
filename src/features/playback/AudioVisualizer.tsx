import { useEffect } from "react";
import { useAppStore } from "@/shared/stores/appStore";

export function AudioVisualizer() {
  const enabled = useAppStore((s) => s.settings.enableVisualizer);
  const isPlaying = useAppStore((s) => s.isPlaying);
  const energy = useAppStore((s) => s.audioFeatures?.energy ?? 0.5);
  const barCount = useAppStore((s) => s.barCount);
  const frequencyData = useAppStore((s) => s.frequencyData);
  const setActive = useAppStore((s) => s.setActive);
  const setFrequencyData = useAppStore((s) => s.setFrequencyData);

  useEffect(() => {
    setActive(enabled && isPlaying);
  }, [enabled, isPlaying, setActive]);

  useEffect(() => {
    if (!enabled || !isPlaying) {
      setFrequencyData([]);
      return;
    }

    const interval = window.setInterval(() => {
      const bars = Array.from({ length: barCount }, (_, index) => {
        const wave = Math.sin(Date.now() / 200 + index * 0.4) * 0.5 + 0.5;
        return Math.min(1, wave * (0.4 + energy * 0.6));
      });
      setFrequencyData(bars);
    }, 80);

    return () => window.clearInterval(interval);
  }, [barCount, enabled, energy, isPlaying, setFrequencyData]);

  if (!enabled || !isPlaying || frequencyData.length === 0) {
    return null;
  }

  return (
    <div
      className="fixed bottom-nowPlayingBar left-navBar right-0 z-30 flex h-16 items-end gap-0.5 bg-gradient-to-t from-spotify-black/90 to-transparent px-8 pb-1"
      aria-hidden
    >
      {frequencyData.map((value, index) => (
        <span
          key={index}
          className="flex-1 rounded-t bg-spotify-green/80 transition-[height] duration-75"
          style={{ height: `${Math.max(8, value * 100)}%` }}
        />
      ))}
    </div>
  );
}
