import { useInfiniteQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { getCategories } from "@/shared/api/spotifyApi";
import { useAuth } from "@/features/auth/useAuth";
import { MediaCard } from "@/shared/ui/MediaCard";

export function BrowsePage() {
  const { accessToken } = useAuth();

  const categoriesQuery = useInfiniteQuery({
    queryKey: ["browse-categories"],
    queryFn: ({ pageParam = 0 }) =>
      getCategories(accessToken!, 20, pageParam as number),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const next = lastPage.categories.offset + lastPage.categories.limit;
      return next < lastPage.categories.total ? next : undefined;
    },
    enabled: !!accessToken,
  });

  const categories =
    categoriesQuery.data?.pages.flatMap((page) => page.categories.items) ?? [];

  return (
    <section className="content-spacing">
      <h1 className="text-heading">Browse</h1>
      <p className="mt-2 text-white/60">Explore genres and moods.</p>

      {categoriesQuery.isLoading ? (
        <p className="mt-8 text-white/50">Loading categories...</p>
      ) : (
        <>
          <div className="common-grid mt-8">
            {categories.map((category) => (
              <Link key={category.id} to={`/browse/${category.id}`}>
                <MediaCard title={category.name} imageUrl={category.icons[0]?.url} />
              </Link>
            ))}
          </div>
          {categoriesQuery.hasNextPage ? (
            <button
              type="button"
              onClick={() => void categoriesQuery.fetchNextPage()}
              disabled={categoriesQuery.isFetchingNextPage}
              className="mt-8 rounded-full border border-white/20 px-6 py-2 text-sm hover:border-white/40 disabled:opacity-50"
            >
              {categoriesQuery.isFetchingNextPage ? "Loading..." : "Load more"}
            </button>
          ) : null}
        </>
      )}
    </section>
  );
}

export default BrowsePage;
