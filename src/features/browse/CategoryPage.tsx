import { useInfiniteQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getCategoryPlaylists } from "@/shared/api/spotifyApi";
import { useAuth } from "@/features/auth/useAuth";
import { MediaCard } from "@/shared/ui/MediaCard";

export function CategoryPage() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const { accessToken } = useAuth();

  const playlistsQuery = useInfiniteQuery({
    queryKey: ["category-playlists", categoryId],
    queryFn: ({ pageParam = 0 }) =>
      getCategoryPlaylists(accessToken!, categoryId!, 20, pageParam as number),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const paging = lastPage.playlists;
      const next = paging.offset + paging.limit;
      return next < paging.total ? next : undefined;
    },
    enabled: !!accessToken && !!categoryId,
  });

  const playlists =
    playlistsQuery.data?.pages.flatMap((page) => page.playlists.items) ?? [];

  return (
    <section className="content-spacing">
      <h1 className="text-heading">Category</h1>
      <p className="mt-2 capitalize text-white/60">{categoryId?.replace(/-/g, " ")}</p>

      {playlistsQuery.isLoading ? (
        <p className="mt-8 text-white/50">Loading playlists...</p>
      ) : (
        <>
          <div className="common-grid mt-8">
            {playlists.map((playlist) => (
              <MediaCard
                key={playlist.id}
                title={playlist.name}
                subtitle={playlist.owner.display_name}
                imageUrl={playlist.images[0]?.url}
                href={`/playlist/${playlist.id}`}
              />
            ))}
          </div>
          {playlistsQuery.hasNextPage ? (
            <button
              type="button"
              onClick={() => void playlistsQuery.fetchNextPage()}
              disabled={playlistsQuery.isFetchingNextPage}
              className="mt-8 rounded-full border border-white/20 px-6 py-2 text-sm hover:border-white/40 disabled:opacity-50"
            >
              {playlistsQuery.isFetchingNextPage ? "Loading..." : "Load more"}
            </button>
          ) : null}
        </>
      )}
    </section>
  );
}

export default CategoryPage;
