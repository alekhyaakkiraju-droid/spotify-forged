import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getPlaylist } from "@/shared/api/spotifyApi";
import { useAuth } from "@/features/auth/useAuth";

export function PlaylistPage() {
  const { id } = useParams<{ id: string }>();
  const { accessToken } = useAuth();

  const playlistQuery = useQuery({
    queryKey: ["playlist", id],
    queryFn: () => getPlaylist(accessToken!, id!),
    enabled: !!accessToken && !!id,
  });

  const playlist = playlistQuery.data;

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
            </div>
          </div>
        </>
      ) : (
        <p className="text-white/50">Playlist not found.</p>
      )}
    </section>
  );
}

export default PlaylistPage;
