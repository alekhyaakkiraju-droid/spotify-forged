import { NavLink } from "react-router-dom";
import clsx from "clsx";

const navItems = [
  { to: "/", label: "Home", end: true },
  { to: "/search", label: "Search" },
  { to: "/browse", label: "Browse" },
  { to: "/collection/playlists", label: "Your Library" },
  { to: "/lyrics", label: "Lyrics" },
];

export function NavBar() {
  return (
    <nav className="flex h-full w-navBar flex-col gap-2 border-r border-white/10 bg-black p-4">
      <div className="mb-6 px-2">
        <span className="text-xl font-bold text-white">SpotifyForged</span>
      </div>
      <ul className="flex flex-col gap-1">
        {navItems.map((item) => (
          <li key={item.to}>
            <NavLink
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                clsx(
                  "block rounded-md px-3 py-2 text-sm font-medium transition",
                  isActive
                    ? "bg-white/10 text-white"
                    : "text-white/60 hover:text-white",
                )
              }
            >
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
