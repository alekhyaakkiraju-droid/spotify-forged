import { create } from "zustand";
import type { SpotifyUser } from "@/shared/types/spotify";

export interface AuthSlice {
  user: SpotifyUser | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  setUser: (user: SpotifyUser | null) => void;
  setAccessToken: (token: string | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  logout: () => void;
}

export const createAuthSlice = (
  set: (
    partial: Partial<AuthSlice> | ((state: AuthSlice) => Partial<AuthSlice>),
  ) => void,
): AuthSlice => ({
  user: null,
  accessToken: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  setUser: (user) => set({ user, isAuthenticated: user !== null }),
  setAccessToken: (accessToken) => set({ accessToken, isAuthenticated: !!accessToken }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  logout: () =>
    set({
      user: null,
      accessToken: null,
      isAuthenticated: false,
      error: null,
    }),
});

export type AuthStore = AuthSlice;

export const useAuthStore = create<AuthStore>((set) => ({
  ...createAuthSlice(set),
}));
