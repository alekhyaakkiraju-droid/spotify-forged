import { Link } from "react-router-dom";
import { useAuth } from "@/features/auth/useAuth";

export function TopBar() {
  const { user, isAuthenticated, login, logout } = useAuth();

  return (
    <header className="sticky top-0 z-30 flex h-topBar items-center justify-between border-b border-white/10 bg-spotify-black/80 px-6 backdrop-blur">
      <div className="flex items-center gap-2">
        <button
          type="button"
          aria-label="Go back"
          className="rounded-full bg-black/40 p-2 text-white/70 hover:text-white"
        >
          ←
        </button>
        <button
          type="button"
          aria-label="Go forward"
          className="rounded-full bg-black/40 p-2 text-white/70 hover:text-white"
        >
          →
        </button>
      </div>

      <div className="flex items-center gap-4">
        {isAuthenticated && user ? (
          <>
            <span className="text-sm text-white/70">{user.display_name}</span>
            <button
              type="button"
              onClick={logout}
              className="rounded-full border border-white/20 px-4 py-1 text-sm hover:border-white/40"
            >
              Log out
            </button>
          </>
        ) : (
          <button
            type="button"
            onClick={() => void login()}
            className="rounded-full bg-white px-4 py-1 text-sm font-medium text-black hover:scale-105"
          >
            Log in
          </button>
        )}
        <Link to="/settings" className="text-sm text-white/70 hover:text-white">
          Settings
        </Link>
      </div>
    </header>
  );
}
