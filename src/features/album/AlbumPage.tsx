import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getAlbum } from "@/shared/api/spotifyApi";
import { useAuth } from "@/features/auth/useAuth";

export function AlbumPage() {
  const { id } = useParams<{ id: string }>();
  const { accessToken } = useAuth();

  const albumQuery = useQuery({
    queryKey: ["album", id],
    queryFn: () => getAlbum(accessToken!, id!),
    enabled: !!accessToken && !!id,
  });

  const album = albumQuery.data;

  return (
    <section className="content-spacing">
      {albumQuery.isLoading ? (
        <p className="text-white/50">Loading album...</p>
      ) : album ? (
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
          </div>
        </div>
      ) : (
        <p className="text-white/50">Album not found.</p>
      )}
    </section>
  );
}

export default AlbumPage;
