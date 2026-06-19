import { useAppStore } from "@/shared/stores/appStore";

export function LyricsPage() {
  const lines = useAppStore((s) => s.lines);
  const isLoading = useAppStore((s) => s.isLoading);
  const currentTrack = useAppStore((s) => s.currentTrack);

  return (
    <section className="content-spacing max-w-2xl">
      <h1 className="text-heading">Lyrics</h1>
      {currentTrack ? (
        <p className="mt-2 text-white/60">
          {currentTrack.name} · {currentTrack.artists.map((a) => a.name).join(", ")}
        </p>
      ) : (
        <p className="mt-2 text-white/60">Play a track to view lyrics.</p>
      )}

      <div className="mt-8 space-y-2">
        {isLoading ? (
          <p className="text-white/50">Loading lyrics...</p>
        ) : lines.length ? (
          lines.map((line, index) => (
            <p key={`${index}-${line}`} className="text-lg text-white/80">
              {line}
            </p>
          ))
        ) : (
          <p className="text-white/50">No lyrics available for the current track.</p>
        )}
      </div>
    </section>
  );
}

export default LyricsPage;
