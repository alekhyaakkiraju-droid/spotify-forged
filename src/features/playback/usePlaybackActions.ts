import { useCallback } from "react";
import { startPlayback, transferPlayback } from "@/shared/api/spotifyApi";
import { useAppStore } from "@/shared/stores/appStore";

export function usePlaybackActions() {
  const accessToken = useAppStore((s) => s.accessToken);
  const deviceId = useAppStore((s) => s.deviceId);
  const playerReady = useAppStore((s) => s.playerReady);

  const playContext = useCallback(
    async (contextUri: string, offset = 0) => {
      if (!accessToken || !deviceId || !playerReady) return;
      await transferPlayback(accessToken, deviceId, false);
      await startPlayback(
        accessToken,
        { context_uri: contextUri, offset: { position: offset } },
        deviceId,
      );
    },
    [accessToken, deviceId, playerReady],
  );

  const playTrack = useCallback(
    async (uri: string) => {
      if (!accessToken || !deviceId || !playerReady) return;
      await transferPlayback(accessToken, deviceId, false);
      await startPlayback(accessToken, { uris: [uri] }, deviceId);
    },
    [accessToken, deviceId, playerReady],
  );

  return {
    canPlay: Boolean(accessToken && deviceId && playerReady),
    playContext,
    playTrack,
  };
}
