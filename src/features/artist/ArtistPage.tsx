import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getArtist } from "@/shared/api/spotifyApi";
import { useAuth } from "@/features/auth/useAuth";

export function ArtistPage() {
  const { id } = useParams<{ id: string }>();
  const { accessToken } = useAuth();

  const artistQuery = useQuery({
    queryKey: ["artist", id],
    queryFn: () => getArtist(accessToken!, id!),
    enabled: !!accessToken && !!id,
  });

  const artist = artistQuery.data;

  return (
    <section className="content-spacing">
      {artistQuery.isLoading ? (
        <p className="text-white/50">Loading artist...</p>
      ) : artist ? (
        <div className="flex items-end gap-6">
          {artist.images?.[0]?.url ? (
            <img
              src={artist.images?.[0].url}
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
      ) : (
        <p className="text-white/50">Artist not found.</p>
      )}
    </section>
  );
}

export default ArtistPage;
