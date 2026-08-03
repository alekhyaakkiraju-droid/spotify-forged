import { useCallback, useEffect, useRef } from "react";
import { getCurrentUser } from "@/shared/api/spotifyApi";
import {
  buildAuthorizeUrl,
  createPkceChallenge,
  exchangeCodeForTokens,
  isTokenExpiringSoon,
  persistTokens,
  refreshAccessToken,
} from "@/features/auth/authService";
import { TokenVaultService } from "@/shared/services/TokenVaultService";
import { useAppStore } from "@/shared/stores/appStore";

export function useAuth() {
  const {
    user,
    accessToken,
    isAuthenticated,
    isLoading,
    error,
    setUser,
    setAccessToken,
    setLoading,
    setError,
    logout: storeLogout,
    setUnauthorizedModalOpen,
  } = useAppStore();

  const refreshTimerRef = useRef<number | null>(null);

  const scheduleRefresh = useCallback(
    (expiresAt: number, refreshToken: string) => {
      if (refreshTimerRef.current) {
        window.clearTimeout(refreshTimerRef.current);
      }

      const refreshIn = Math.max(expiresAt - Date.now() - 60_000, 0);
      refreshTimerRef.current = window.setTimeout(async () => {
        try {
          const tokenResponse = await refreshAccessToken(refreshToken);
          persistTokens(tokenResponse);
          setAccessToken(tokenResponse.access_token);
          const updated = TokenVaultService.load();
          if (updated) {
            scheduleRefresh(updated.expiresAt, updated.refreshToken);
          }
        } catch {
          setUnauthorizedModalOpen(true);
          storeLogout();
          TokenVaultService.clear();
        }
      }, refreshIn);
    },
    [setAccessToken, setUnauthorizedModalOpen, storeLogout],
  );

  const restoreSession = useCallback(async () => {
    const tokens = TokenVaultService.load();
    if (!tokens) return;

    setLoading(true);
    try {
      let token = tokens.accessToken;
      if (isTokenExpiringSoon(tokens.expiresAt)) {
        const refreshed = await refreshAccessToken(tokens.refreshToken);
        persistTokens(refreshed);
        token = refreshed.access_token;
      }

      setAccessToken(token);
      const profile = await getCurrentUser(token);
      setUser(profile);
      const updated = TokenVaultService.load();
      if (updated) {
        scheduleRefresh(updated.expiresAt, updated.refreshToken);
      }
    } catch {
      TokenVaultService.clear();
      storeLogout();
    } finally {
      setLoading(false);
    }
  }, [scheduleRefresh, setAccessToken, setLoading, setUser, storeLogout]);

  const login = useCallback(async () => {
    const { verifier, challenge } = await createPkceChallenge();
    TokenVaultService.saveCodeVerifier(verifier);
    const state = crypto.randomUUID();
    window.location.href = buildAuthorizeUrl(state, challenge);
  }, []);

  const handleCallback = useCallback(
    async (code: string): Promise<boolean> => {
      const verifier = TokenVaultService.loadCodeVerifier();
      if (!verifier) {
        setError(
          "Missing PKCE verifier. Open http://127.0.0.1:5173 (not localhost) and try again.",
        );
        return false;
      }

      setLoading(true);
      setError(null);
      try {
        const tokenResponse = await exchangeCodeForTokens(code, verifier);
        persistTokens(tokenResponse);
        TokenVaultService.clearCodeVerifier();
        setAccessToken(tokenResponse.access_token);
        const profile = await getCurrentUser(tokenResponse.access_token);
        setUser(profile);
        const stored = TokenVaultService.load();
        if (stored) {
          scheduleRefresh(stored.expiresAt, stored.refreshToken);
        }
        return true;
      } catch (err) {
        setError(err instanceof Error ? err.message : "Authentication failed");
        return false;
      } finally {
        setLoading(false);
      }
    },
    [scheduleRefresh, setAccessToken, setError, setLoading, setUser],
  );

  const logout = useCallback(() => {
    if (refreshTimerRef.current) {
      window.clearTimeout(refreshTimerRef.current);
    }
    TokenVaultService.clear();
    storeLogout();
  }, [storeLogout]);

  useEffect(() => {
    void restoreSession();
    return () => {
      if (refreshTimerRef.current) {
        window.clearTimeout(refreshTimerRef.current);
      }
    };
  }, [restoreSession]);

  return {
    user,
    accessToken,
    isAuthenticated,
    isLoading,
    error,
    login,
    logout,
    handleCallback,
  };
}
