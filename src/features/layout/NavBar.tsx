import { NavLink } from "react-router-dom";
import clsx from "clsx";
import { NavIcon } from "@/shared/ui/NavIcon";
import { useAuth } from "@/features/auth/useAuth";

const navItems = [
  { to: "/", label: "Home", icon: "home" as const, end: true },
  { to: "/search", label: "Search", icon: "search" as const },
  { to: "/browse", label: "Browse", icon: "browse" as const },
  { to: "/collection/playlists", label: "Your Library", icon: "library" as const },
  { to: "/lyrics", label: "Lyrics", icon: "lyrics" as const },
];

export function NavBar() {
  const { isAuthenticated, user } = useAuth();
  return (
    <nav className="flex h-full w-navBar flex-col gap-6 border-r border-white/5 bg-black p-6">
      <div className="flex items-center gap-3 px-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-spotify-green shadow-glow">
          <span className="text-lg font-black text-black">S</span>
        </div>
        <span className="text-xl font-bold tracking-tight text-white">
          SpotifyForged
        </span>
      </div>

      <ul className="flex flex-col gap-1">
        {navItems.map((item) => (
          <li key={item.to}>
            <NavLink
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                clsx("nav-pill", isActive && "nav-pill-active")
              }
            >
              <NavIcon name={item.icon} className="h-6 w-6 shrink-0" />
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>

      <div className="mt-auto rounded-xl border border-white/5 bg-white/[0.03] p-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-white/40">
          Now playing
        </p>
        <p className="mt-2 text-sm text-white/50">
          {isAuthenticated
            ? `Signed in as ${user?.display_name ?? "you"}`
            : "Sign in to start listening"}
        </p>
      </div>
    </nav>
  );
}
