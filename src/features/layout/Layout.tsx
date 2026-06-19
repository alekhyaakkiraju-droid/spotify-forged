import { Outlet } from "react-router-dom";
import { NavBar } from "@/features/layout/NavBar";
import { TopBar } from "@/features/layout/TopBar";
import { NowPlayingBar } from "@/features/playback/NowPlayingBar";
import { UnauthorizedModal } from "@/features/auth/UnauthorizedModal";

export function Layout() {
  return (
    <div className="flex min-h-screen bg-spotify-black pb-nowPlayingBar">
      <aside className="fixed bottom-nowPlayingBar left-0 top-0 z-20">
        <NavBar />
      </aside>

      <div className="ml-navBar flex min-h-screen flex-1 flex-col">
        <TopBar />
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>

      <NowPlayingBar />
      <UnauthorizedModal />
    </div>
  );
}
