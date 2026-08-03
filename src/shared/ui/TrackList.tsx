import type { SpotifyTrack } from "@/shared/types/spotify";
import { formatTime } from "@/shared/utils/formatTime";

interface TrackListProps {
  tracks: SpotifyTrack[];
  onPlayTrack: (track: SpotifyTrack, index: number) => void;
  canPlay: boolean;
}

export function TrackList({ tracks, onPlayTrack, canPlay }: TrackListProps) {
  if (!tracks.length) {
    return <p className="text-white/50">No tracks available.</p>;
  }

  return (
    <ol className="mt-8 divide-y divide-white/10">
      {tracks.map((track, index) => (
        <li
          key={`${track.id}-${index}`}
          className="flex items-center gap-4 py-3 text-sm text-white/80"
        >
          <span className="w-8 text-right text-white/40">{index + 1}</span>
          <div className="min-w-0 flex-1">
            <p className="truncate font-medium text-white">{track.name}</p>
            <p className="truncate text-white/50">
              {track.artists.map((artist) => artist.name).join(", ")}
            </p>
          </div>
          <span className="text-white/40">{formatTime(track.duration_ms)}</span>
          <button
            type="button"
            disabled={!canPlay}
            aria-label={`Play ${track.name}`}
            onClick={() => onPlayTrack(track, index)}
            className="rounded-full px-3 py-1 text-white/70 hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            ▶
          </button>
        </li>
      ))}
    </ol>
  );
}
