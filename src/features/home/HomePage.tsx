import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { getFeaturedPlaylists, getRecentlyPlayed } from "@/shared/api/spotifyApi";
import { useAuth } from "@/features/auth/useAuth";
import { MediaCard } from "@/shared/ui/MediaCard";

const GREETING_EMOJIS = ["🎧", "🎵", "🎶", "🔊", "✨"];

const FEATURE_HIGHLIGHTS = [
  {
    title: "Browse & search",
    description: "Explore categories and find tracks, albums, artists, and playlists.",
    icon: "🔍",
  },
  {
    title: "Your library",
    description: "Access saved playlists, albums, and artists after you sign in.",
    icon: "📚",
  },
  {
    title: "Playback",
    description: "Control music from the player bar. Spotify Premium required.",
    icon: "▶",
  },
];

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

export function HomePage() {
  const { accessToken, user, isAuthenticated, login, error } = useAuth();
  const greetingEmoji = useMemo(
    () => GREETING_EMOJIS[Math.floor(Math.random() * GREETING_EMOJIS.length)],
    [],
  );

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
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-spotify-green/20 via-spotify-card to-black p-10 shadow-card md:p-14">
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-spotify-green/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-16 left-1/3 h-48 w-48 rounded-full bg-indigo-500/10 blur-3xl" />

          <p className="text-sm font-semibold uppercase tracking-widest text-spotify-green">
            SpotifyForged
          </p>
          <h1 className="mt-4 max-w-xl text-4xl font-extrabold leading-tight tracking-tight text-white md:text-5xl">
            Millions of songs.
            <br />
            Free on SpotifyForged.
          </h1>
          <p className="mt-4 max-w-lg text-lg text-white/60">
            Browse, search, and play your library with a modern React client built for
            speed.
          </p>

          <div className="mt-8">
            <button type="button" onClick={() => void login()} className="btn-primary">
              Log in with Spotify
            </button>
          </div>

          {error ? (
            <p className="mt-6 max-w-xl rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
              {error}
            </p>
          ) : null}
        </div>

        <section className="mt-12">
          <h2 className="section-title">What you get after sign-in</h2>
          <p className="mt-2 text-white/50">
            Your real Spotify data replaces these placeholders once login succeeds.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {FEATURE_HIGHLIGHTS.map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-white/10 bg-white/[0.04] p-6 shadow-card"
              >
                <span className="text-2xl" aria-hidden>
                  {item.icon}
                </span>
                <h3 className="mt-4 text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/55">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      </section>
    );
  }

  return (
    <section className="content-spacing">
      <div className="mb-10">
        <h1 className="text-heading">
          {greetingEmoji} {getGreeting()}
          {user?.display_name ? `, ${user.display_name}` : ""}
        </h1>
      </div>

      <section className="mb-12">
        <h2 className="section-title">Featured playlists</h2>
        {featuredQuery.isLoading ? (
          <div className="common-grid mt-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-square rounded-xl bg-white/10" />
                <div className="mt-3 h-4 w-3/4 rounded bg-white/10" />
              </div>
            ))}
          </div>
        ) : (
          <div className="common-grid mt-6">
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

      <section>
        <h2 className="section-title">Recently played</h2>
        {recentQuery.isLoading ? (
          <div className="common-grid mt-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-square rounded-xl bg-white/10" />
                <div className="mt-3 h-4 w-3/4 rounded bg-white/10" />
              </div>
            ))}
          </div>
        ) : (
          <div className="common-grid mt-6">
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
