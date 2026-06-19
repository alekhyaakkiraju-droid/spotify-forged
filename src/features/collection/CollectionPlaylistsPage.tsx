import { useQuery } from "@tanstack/react-query";
import { getUserPlaylists } from "@/shared/api/spotifyApi";
import { useAuth } from "@/features/auth/useAuth";
import { MediaCard } from "@/shared/ui/MediaCard";

export function CollectionPlaylistsPage() {
  const { accessToken } = useAuth();

  const playlistsQuery = useQuery({
    queryKey: ["user-playlists"],
    queryFn: () => getUserPlaylists(accessToken!),
    enabled: !!accessToken,
  });

  return (
    <section className="content-spacing">
      <h1 className="text-heading">Your playlists</h1>
      {playlistsQuery.isLoading ? (
        <p className="mt-8 text-white/50">Loading...</p>
      ) : (
        <div className="common-grid mt-8">
          {playlistsQuery.data?.items.map((playlist) => (
            <MediaCard
              key={playlist.id}
              title={playlist.name}
              subtitle={`${playlist.tracks.total} tracks`}
              imageUrl={playlist.images[0]?.url}
              href={`/playlist/${playlist.id}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default CollectionPlaylistsPage;
