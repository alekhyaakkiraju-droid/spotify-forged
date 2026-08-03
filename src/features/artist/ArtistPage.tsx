import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getArtist, getArtistTopTracks } from "@/shared/api/spotifyApi";
import { useAuth } from "@/features/auth/useAuth";
import { usePlaybackActions } from "@/features/playback/usePlaybackActions";
import { TrackList } from "@/shared/ui/TrackList";

export function ArtistPage() {
  const { id } = useParams<{ id: string }>();
  const { accessToken } = useAuth();
  const { canPlay, playTrack } = usePlaybackActions();

  const artistQuery = useQuery({
    queryKey: ["artist", id],
    queryFn: () => getArtist(accessToken!, id!),
    enabled: !!accessToken && !!id,
  });

  const topTracksQuery = useQuery({
    queryKey: ["artist-top-tracks", id],
    queryFn: () => getArtistTopTracks(accessToken!, id!),
    enabled: !!accessToken && !!id,
  });

  const artist = artistQuery.data;
  const tracks = topTracksQuery.data?.tracks ?? [];

  return (
    <section className="content-spacing">
      {artistQuery.isLoading ? (
        <p className="text-white/50">Loading artist...</p>
      ) : artist ? (
        <>
          <div className="flex items-end gap-6">
            {artist.images?.[0]?.url ? (
              <img
                src={artist.images[0].url}
                alt=""
                className="h-48 w-48 rounded-full object-cover shadow-xl"
              />
            ) : null}
            <div>
              <p className="text-sm uppercase text-white/60">Artist</p>
              <h1 className="text-4xl font-bold text-white">{artist.name}</h1>
              {artist.genres?.length ? (
                <p className="mt-2 text-white/60">{artist.genres.join(", ")}</p>
              ) : null}
            </div>
          </div>

          <h2 className="mt-10 text-xl font-bold text-white">Popular tracks</h2>
          {topTracksQuery.isLoading ? (
            <p className="mt-4 text-white/50">Loading tracks...</p>
          ) : (
            <TrackList
              tracks={tracks}
              canPlay={canPlay}
              onPlayTrack={(track) => void playTrack(track.uri)}
            />
          )}
        </>
      ) : (
        <p className="text-white/50">Artist not found.</p>
      )}
    </section>
  );
}

export default ArtistPage;
