import { useParams } from "react-router-dom";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getAlbum, getAlbumTracks } from "@/shared/api/spotifyApi";
import { useAuth } from "@/features/auth/useAuth";
import { usePlaybackActions } from "@/features/playback/usePlaybackActions";
import { TrackList } from "@/shared/ui/TrackList";
import type { SpotifyTrack } from "@/shared/types/spotify";

export function AlbumPage() {
  const { id } = useParams<{ id: string }>();
  const { accessToken } = useAuth();
  const { canPlay, playContext } = usePlaybackActions();

  const albumQuery = useQuery({
    queryKey: ["album", id],
    queryFn: () => getAlbum(accessToken!, id!),
    enabled: !!accessToken && !!id,
  });

  const tracksQuery = useInfiniteQuery({
    queryKey: ["album-tracks", id],
    queryFn: ({ pageParam = 0 }) =>
      getAlbumTracks(accessToken!, id!, 50, pageParam as number),
    initialPageParam: 0,
    getNextPageParam: (lastPage) =>
      lastPage.next ? lastPage.offset + lastPage.limit : undefined,
    enabled: !!accessToken && !!id,
  });

  const album = albumQuery.data;
  const tracks = (tracksQuery.data?.pages ?? []).flatMap((page) => page.items);

  const handlePlayTrack = (_track: SpotifyTrack, index: number) => {
    if (!album) return;
    void playContext(album.uri, index);
  };

  return (
    <section className="content-spacing">
      {albumQuery.isLoading ? (
        <p className="text-white/50">Loading album...</p>
      ) : album ? (
        <>
          <div className="flex items-end gap-6">
            {album.images[0]?.url ? (
              <img
                src={album.images[0].url}
                alt=""
                className="h-48 w-48 rounded object-cover shadow-xl"
              />
            ) : null}
            <div>
              <p className="text-sm uppercase text-white/60">Album</p>
              <h1 className="text-4xl font-bold text-white">{album.name}</h1>
              <p className="mt-2 text-white/60">
                {album.artists.map((a) => a.name).join(", ")} · {album.release_date}
              </p>
              <button
                type="button"
                disabled={!canPlay}
                onClick={() => void playContext(album.uri)}
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
        <p className="text-white/50">Album not found.</p>
      )}
    </section>
  );
}

export default AlbumPage;
