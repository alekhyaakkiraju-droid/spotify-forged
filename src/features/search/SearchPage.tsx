import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { search } from "@/shared/api/spotifyApi";
import { useAuth } from "@/features/auth/useAuth";
import { MediaCard } from "@/shared/ui/MediaCard";
import { useAppStore } from "@/shared/stores/appStore";

export function SearchPage() {
  const { accessToken, isAuthenticated, login } = useAuth();
  const [query, setQuery] = useState("");
  const setSearchQuery = useAppStore((s) => s.setQuery);

  const searchQuery = useQuery({
    queryKey: ["search", query],
    queryFn: () =>
      search(accessToken!, query, ["track", "album", "artist", "playlist"]),
    enabled: !!accessToken && query.trim().length > 0,
  });

  if (!isAuthenticated) {
    return (
      <section className="content-spacing">
        <h1 className="text-heading">Search</h1>
        <p className="mt-2 text-white/60">Sign in to search Spotify.</p>
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
      <h1 className="text-heading">Search</h1>
      <input
        type="search"
        value={query}
        onChange={(event) => {
          const value = event.target.value;
          setQuery(value);
          setSearchQuery(value);
        }}
        placeholder="What do you want to listen to?"
        className="mt-6 w-full max-w-md rounded-full border border-white/20 bg-white/10 px-4 py-2 text-white placeholder:text-white/40"
      />

      {query.trim().length === 0 ? (
        <p className="mt-8 text-white/50">Start typing to search.</p>
      ) : searchQuery.isLoading ? (
        <p className="mt-8 text-white/50">Searching...</p>
      ) : (
        <div className="mt-8 space-y-10">
          {searchQuery.data?.tracks?.items.length ? (
            <section>
              <h2 className="mb-4 text-xl font-bold text-white">Tracks</h2>
              <div className="common-grid">
                {searchQuery.data.tracks.items.map((track) => (
                  <MediaCard
                    key={track.id}
                    title={track.name}
                    subtitle={track.artists.map((a) => a.name).join(", ")}
                    imageUrl={track.album.images[0]?.url}
                    href={`/album/${track.album.id}`}
                  />
                ))}
              </div>
            </section>
          ) : null}

          {searchQuery.data?.albums?.items.length ? (
            <section>
              <h2 className="mb-4 text-xl font-bold text-white">Albums</h2>
              <div className="common-grid">
                {searchQuery.data.albums.items.map((album) => (
                  <MediaCard
                    key={album.id}
                    title={album.name}
                    subtitle={album.artists.map((a) => a.name).join(", ")}
                    imageUrl={album.images[0]?.url}
                    href={`/album/${album.id}`}
                  />
                ))}
              </div>
            </section>
          ) : null}

          {searchQuery.data?.artists?.items.length ? (
            <section>
              <h2 className="mb-4 text-xl font-bold text-white">Artists</h2>
              <div className="common-grid">
                {searchQuery.data.artists.items.map((artist) => (
                  <MediaCard
                    key={artist.id}
                    title={artist.name}
                    imageUrl={artist.images?.[0]?.url}
                    href={`/artist/${artist.id}`}
                  />
                ))}
              </div>
            </section>
          ) : null}

          {searchQuery.data?.playlists?.items.length ? (
            <section>
              <h2 className="mb-4 text-xl font-bold text-white">Playlists</h2>
              <div className="common-grid">
                {searchQuery.data.playlists.items.map((playlist) => (
                  <MediaCard
                    key={playlist.id}
                    title={playlist.name}
                    subtitle={playlist.owner.display_name}
                    imageUrl={playlist.images[0]?.url}
                    href={`/playlist/${playlist.id}`}
                  />
                ))}
              </div>
            </section>
          ) : null}
        </div>
      )}
    </section>
  );
}

export default SearchPage;
