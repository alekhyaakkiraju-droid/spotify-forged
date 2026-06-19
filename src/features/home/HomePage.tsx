import { useQuery } from "@tanstack/react-query";
import { getFeaturedPlaylists, getRecentlyPlayed } from "@/shared/api/spotifyApi";
import { useAuth } from "@/features/auth/useAuth";
import { MediaCard } from "@/shared/ui/MediaCard";

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

export function HomePage() {
  const { accessToken, user, isAuthenticated, login } = useAuth();

  const featuredQuery = useQuery({
    queryKey: ["featured-playlists"],
    queryFn: () => getFeaturedPlaylists(accessToken!),
    enabled: !!accessToken,
  });

  const recentQuery = useQuery({
    queryKey: ["recently-played"],
    queryFn: () => getRecentlyPlayed(accessToken!),
    enabled: !!accessToken,
  });

  if (!isAuthenticated) {
    return (
      <section className="content-spacing">
        <h1 className="text-heading">Welcome to SpotifyForged</h1>
        <p className="mt-2 text-white/60">Sign in to start listening.</p>
        <button
          type="button"
          onClick={() => void login()}
          className="mt-6 rounded-full bg-spotify-green px-6 py-2 font-medium text-black"
        >
          Log in with Spotify
        </button>
      </section>
    );
  }

  return (
    <section className="content-spacing">
      <h1 className="text-heading">
        {getGreeting()}
        {user?.display_name ? `, ${user.display_name}` : ""}
      </h1>

      <section className="mt-8">
        <h2 className="mb-4 text-xl font-bold text-white">Featured playlists</h2>
        {featuredQuery.isLoading ? (
          <p className="text-white/50">Loading...</p>
        ) : (
          <div className="common-grid">
            {featuredQuery.data?.playlists.items.map((playlist) => (
              <MediaCard
                key={playlist.id}
                title={playlist.name}
                subtitle={playlist.description ?? undefined}
                imageUrl={playlist.images[0]?.url}
                href={`/playlist/${playlist.id}`}
              />
            ))}
          </div>
        )}
      </section>

      <section className="mt-10">
        <h2 className="mb-4 text-xl font-bold text-white">Recently played</h2>
        {recentQuery.isLoading ? (
          <p className="text-white/50">Loading...</p>
        ) : (
          <div className="common-grid">
            {recentQuery.data?.items.map(({ track }) => (
              <MediaCard
                key={`${track.id}-${track.name}`}
                title={track.name}
                subtitle={track.artists.map((a) => a.name).join(", ")}
                imageUrl={track.album.images[0]?.url}
                href={`/album/${track.album.id}`}
              />
            ))}
          </div>
        )}
      </section>
    </section>
  );
}

export default HomePage;
