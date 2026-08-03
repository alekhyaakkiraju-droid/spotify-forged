import { useParams } from "react-router-dom";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getPlaylist, getPlaylistTracks } from "@/shared/api/spotifyApi";
import { useAuth } from "@/features/auth/useAuth";
import { usePlaybackActions } from "@/features/playback/usePlaybackActions";
import { TrackList } from "@/shared/ui/TrackList";
import type { SpotifyTrack } from "@/shared/types/spotify";

function isPlayableTrack(
  track: SpotifyTrack | null | undefined,
): track is SpotifyTrack {
  return Boolean(track?.uri);
}

export function PlaylistPage() {
  const { id } = useParams<{ id: string }>();
  const { accessToken } = useAuth();
  const { canPlay, playContext } = usePlaybackActions();

  const playlistQuery = useQuery({
    queryKey: ["playlist", id],
    queryFn: () => getPlaylist(accessToken!, id!),
    enabled: !!accessToken && !!id,
  });

  const tracksQuery = useInfiniteQuery({
    queryKey: ["playlist-tracks", id],
    queryFn: ({ pageParam = 0 }) =>
      getPlaylistTracks(accessToken!, id!, 50, pageParam as number),
    initialPageParam: 0,
    getNextPageParam: (lastPage) =>
      lastPage.next ? lastPage.offset + lastPage.limit : undefined,
    enabled: !!accessToken && !!id,
  });

  const playlist = playlistQuery.data;
  const tracks = (tracksQuery.data?.pages ?? [])
    .flatMap((page) => page.items)
    .map((item) => item.track)
    .filter(isPlayableTrack);

  const handlePlayTrack = (_track: SpotifyTrack, index: number) => {
    if (!playlist) return;
    void playContext(playlist.uri, index);
  };

  return (
    <section className="content-spacing">
      {playlistQuery.isLoading ? (
        <p className="text-white/50">Loading playlist...</p>
      ) : playlist ? (
        <>
          <div className="flex items-end gap-6">
            {playlist.images[0]?.url ? (
              <img
                src={playlist.images[0].url}
                alt=""
                className="h-48 w-48 rounded object-cover shadow-xl"
              />
            ) : null}
            <div>
              <p className="text-sm uppercase text-white/60">Playlist</p>
              <h1 className="text-4xl font-bold text-white">{playlist.name}</h1>
              <p className="mt-2 text-white/60">
                {playlist.tracks.total} tracks · {playlist.owner.display_name}
              </p>
              <button
                type="button"
                disabled={!canPlay}
                onClick={() => void playContext(playlist.uri)}
                className="mt-4 rounded-full bg-spotify-green px-6 py-2 font-medium text-black disabled:cursor-not-allowed disabled:opacity-50"
              >
                Play
              </button>
            </div>
          </div>

          {tracksQuery.isLoading ? (
            <p className="mt-8 text-white/50">Loading tracks...</p>
          ) : (
            <>
              <TrackList
                tracks={tracks}
                canPlay={canPlay}
                onPlayTrack={handlePlayTrack}
              />
              {tracksQuery.hasNextPage ? (
                <button
                  type="button"
                  onClick={() => void tracksQuery.fetchNextPage()}
                  disabled={tracksQuery.isFetchingNextPage}
                  className="mt-6 rounded-full border border-white/20 px-4 py-2 text-sm hover:border-white/40"
                >
                  {tracksQuery.isFetchingNextPage ? "Loading..." : "Load more tracks"}
                </button>
              ) : null}
            </>
          )}
        </>
      ) : (
        <p className="text-white/50">Playlist not found.</p>
      )}
    </section>
  );
}

export default PlaylistPage;
