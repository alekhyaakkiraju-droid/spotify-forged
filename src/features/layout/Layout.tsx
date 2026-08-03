import { Outlet } from "react-router-dom";
import { NavBar } from "@/features/layout/NavBar";
import { TopBar } from "@/features/layout/TopBar";
import { NowPlayingBar } from "@/features/playback/NowPlayingBar";
import { AudioVisualizer } from "@/features/playback/AudioVisualizer";
import { UnauthorizedModal } from "@/features/auth/UnauthorizedModal";
import { useLyrics } from "@/features/lyrics/useLyrics";

export function Layout() {
  useLyrics();

  return (
    <div className="app-shell pb-nowPlayingBar">
      <aside className="fixed bottom-nowPlayingBar left-0 top-0 z-20">
        <NavBar />
      </aside>

      <div className="ml-navBar flex min-h-screen flex-1 flex-col">
        <TopBar />
        <main className="main-panel flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>

      <AudioVisualizer />
      <NowPlayingBar />
      <UnauthorizedModal />
    </div>
  );
}
