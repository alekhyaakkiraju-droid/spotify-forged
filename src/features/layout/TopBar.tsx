import { Link } from "react-router-dom";
import { useAuth } from "@/features/auth/useAuth";
import { NavIcon } from "@/shared/ui/NavIcon";

export function TopBar() {
  const { user, isAuthenticated, login, logout } = useAuth();

  return (
    <header className="glass-bar sticky top-0 z-30 flex h-topBar items-center justify-between gap-4 px-6">
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <button
          type="button"
          aria-label="Go back"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-black/50 text-white/60 transition hover:bg-black hover:text-white"
        >
          ←
        </button>
        <button
          type="button"
          aria-label="Go forward"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-black/50 text-white/60 transition hover:bg-black hover:text-white"
        >
          →
        </button>

        <Link to="/search" className="search-pill ml-2 no-underline outline-none">
          <NavIcon name="search" className="h-5 w-5 shrink-0 text-white/70" />
          <span>What do you want to listen to?</span>
        </Link>
      </div>

      <div className="flex shrink-0 items-center gap-3">
        {isAuthenticated && user ? (
          <>
            {user.images[0]?.url ? (
              <img
                src={user.images[0].url}
                alt=""
                className="h-8 w-8 rounded-full object-cover ring-2 ring-white/10"
              />
            ) : null}
            <span className="hidden text-sm font-medium text-white/80 sm:inline">
              {user.display_name}
            </span>
            <button
              type="button"
              onClick={logout}
              className="btn-secondary px-4 py-1.5"
            >
              Log out
            </button>
          </>
        ) : (
          <button
            type="button"
            onClick={() => void login()}
            className="rounded-full bg-white px-5 py-2 text-sm font-bold text-black transition hover:scale-105"
          >
            Log in
          </button>
        )}
        <Link
          to="/settings"
          className="flex h-9 w-9 items-center justify-center rounded-full text-white/60 transition hover:bg-white/10 hover:text-white"
          aria-label="Settings"
        >
          ⚙
        </Link>
      </div>
    </header>
  );
}
