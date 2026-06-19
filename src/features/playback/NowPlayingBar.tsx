import * as Slider from "@radix-ui/react-slider";
import { useAppStore } from "@/shared/stores/appStore";
import { formatTime } from "@/shared/utils/formatTime";
import { useSpotifyPlayer } from "@/features/playback/useSpotifyPlayer";

export function NowPlayingBar() {
  const accessToken = useAppStore((s) => s.accessToken);
  const currentTrack = useAppStore((s) => s.currentTrack);
  const isPlaying = useAppStore((s) => s.isPlaying);
  const positionMs = useAppStore((s) => s.positionMs);
  const durationMs = useAppStore((s) => s.durationMs);
  const volume = useAppStore((s) => s.volume);

  const { togglePlay, next, previous, seek, setPlayerVolume } =
    useSpotifyPlayer(accessToken);

  const imageUrl = currentTrack?.album.images[0]?.url;

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-40 flex h-nowPlayingBar items-center gap-4 border-t border-white/10 bg-spotify-black px-4">
      <div className="flex min-w-0 flex-1 items-center gap-3">
        {currentTrack ? (
          <>
            {imageUrl ? (
              <img src={imageUrl} alt="" className="h-14 w-14 rounded object-cover" />
            ) : (
              <div className="h-14 w-14 rounded bg-spotify-highlight" />
            )}
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-white">
                {currentTrack.name}
              </p>
              <p className="truncate text-xs text-white/60">
                {currentTrack.artists.map((a) => a.name).join(", ")}
              </p>
            </div>
          </>
        ) : (
          <p className="text-sm text-white/50">Nothing playing</p>
        )}
      </div>

      <div className="flex max-w-xl flex-1 flex-col items-center gap-1">
        <div className="flex items-center gap-4">
          <button
            type="button"
            aria-label="Previous"
            onClick={() => void previous()}
            className="text-white/70 hover:text-white"
          >
            ⏮
          </button>
          <button
            type="button"
            aria-label={isPlaying ? "Pause" : "Play"}
            onClick={() => void togglePlay()}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-black"
          >
            {isPlaying ? "⏸" : "▶"}
          </button>
          <button
            type="button"
            aria-label="Next"
            onClick={() => void next()}
            className="text-white/70 hover:text-white"
          >
            ⏭
          </button>
        </div>
        <div className="flex w-full items-center gap-2 text-xs text-white/60">
          <span>{formatTime(positionMs)}</span>
          <Slider.Root
            className="relative flex h-4 flex-1 touch-none select-none items-center"
            value={[positionMs]}
            max={durationMs || 1}
            step={1000}
            onValueChange={([value]) => {
              if (value !== undefined) void seek(value);
            }}
            aria-label="Seek"
          >
            <Slider.Track className="relative h-1 grow rounded-full bg-white/20">
              <Slider.Range className="absolute h-full rounded-full bg-white" />
            </Slider.Track>
            <Slider.Thumb className="block h-3 w-3 rounded-full bg-white shadow focus:outline-none" />
          </Slider.Root>
          <span>{formatTime(durationMs)}</span>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-end gap-2">
        <span className="text-xs text-white/60">🔊</span>
        <Slider.Root
          className="relative flex h-4 w-24 touch-none select-none items-center"
          value={[volume * 100]}
          max={100}
          step={1}
          onValueChange={([value]) => {
            if (value !== undefined) void setPlayerVolume(value / 100);
          }}
          aria-label="Volume"
        >
          <Slider.Track className="relative h-1 grow rounded-full bg-white/20">
            <Slider.Range className="absolute h-full rounded-full bg-white" />
          </Slider.Track>
          <Slider.Thumb className="block h-3 w-3 rounded-full bg-white shadow focus:outline-none" />
        </Slider.Root>
      </div>
    </footer>
  );
}
