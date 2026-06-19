import { lazy, Suspense, type ReactNode } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { PageLoader } from "@/app/PageLoader";
import { Layout } from "@/features/layout/Layout";

const HomePage = lazy(() => import("@/features/home/HomePage"));
const SearchPage = lazy(() => import("@/features/search/SearchPage"));
const BrowsePage = lazy(() => import("@/features/browse/BrowsePage"));
const CategoryPage = lazy(() => import("@/features/browse/CategoryPage"));
const CollectionPlaylistsPage = lazy(
  () => import("@/features/collection/CollectionPlaylistsPage"),
);
const CollectionAlbumsPage = lazy(
  () => import("@/features/collection/CollectionAlbumsPage"),
);
const CollectionArtistsPage = lazy(
  () => import("@/features/collection/CollectionArtistsPage"),
);
const PlaylistPage = lazy(() => import("@/features/playlist/PlaylistPage"));
const AlbumPage = lazy(() => import("@/features/album/AlbumPage"));
const ArtistPage = lazy(() => import("@/features/artist/ArtistPage"));
const SettingsPage = lazy(() => import("@/features/settings/SettingsPage"));
const LyricsPage = lazy(() => import("@/features/lyrics/LyricsPage"));
const AuthCallbackPage = lazy(() => import("@/features/auth/AuthCallbackPage"));

function withSuspense(element: ReactNode) {
  return <Suspense fallback={<PageLoader />}>{element}</Suspense>;
}

export const router = createBrowserRouter([
  {
    path: "/callback",
    element: withSuspense(<AuthCallbackPage />),
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: withSuspense(<HomePage />) },
      { path: "search", element: withSuspense(<SearchPage />) },
      { path: "browse", element: withSuspense(<BrowsePage />) },
      { path: "browse/:categoryId", element: withSuspense(<CategoryPage />) },
      {
        path: "collection",
        element: <Navigate to="/collection/playlists" replace />,
      },
      {
        path: "collection/playlists",
        element: withSuspense(<CollectionPlaylistsPage />),
      },
      {
        path: "collection/albums",
        element: withSuspense(<CollectionAlbumsPage />),
      },
      {
        path: "collection/artists",
        element: withSuspense(<CollectionArtistsPage />),
      },
      { path: "playlist/:id", element: withSuspense(<PlaylistPage />) },
      { path: "album/:id", element: withSuspense(<AlbumPage />) },
      { path: "artist/:id", element: withSuspense(<ArtistPage />) },
      { path: "settings", element: withSuspense(<SettingsPage />) },
      { path: "lyrics", element: withSuspense(<LyricsPage />) },
    ],
  },
]);
