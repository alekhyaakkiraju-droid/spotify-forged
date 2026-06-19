import { useQuery } from "@tanstack/react-query";
import { getSavedAlbums } from "@/shared/api/spotifyApi";
import { useAuth } from "@/features/auth/useAuth";
import { MediaCard } from "@/shared/ui/MediaCard";

export function CollectionAlbumsPage() {
  const { accessToken } = useAuth();

  const albumsQuery = useQuery({
    queryKey: ["saved-albums"],
    queryFn: () => getSavedAlbums(accessToken!),
    enabled: !!accessToken,
  });

  return (
    <section className="content-spacing">
      <h1 className="text-heading">Saved albums</h1>
      {albumsQuery.isLoading ? (
        <p className="mt-8 text-white/50">Loading...</p>
      ) : (
        <div className="common-grid mt-8">
          {albumsQuery.data?.items.map(({ album }) => (
            <MediaCard
              key={album.id}
              title={album.name}
              subtitle={album.artists.map((a) => a.name).join(", ")}
              imageUrl={album.images[0]?.url}
              href={`/album/${album.id}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default CollectionAlbumsPage;
