import { useQuery } from "@tanstack/react-query";
import { getFollowedArtists } from "@/shared/api/spotifyApi";
import { useAuth } from "@/features/auth/useAuth";
import { MediaCard } from "@/shared/ui/MediaCard";

export function CollectionArtistsPage() {
  const { accessToken } = useAuth();

  const artistsQuery = useQuery({
    queryKey: ["followed-artists"],
    queryFn: () => getFollowedArtists(accessToken!),
    enabled: !!accessToken,
  });

  return (
    <section className="content-spacing">
      <h1 className="text-heading">Followed artists</h1>
      {artistsQuery.isLoading ? (
        <p className="mt-8 text-white/50">Loading...</p>
      ) : (
        <div className="common-grid mt-8">
          {artistsQuery.data?.artists.items.map((artist) => (
            <MediaCard
              key={artist.id}
              title={artist.name}
              imageUrl={artist.images?.[0]?.url}
              href={`/artist/${artist.id}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default CollectionArtistsPage;
