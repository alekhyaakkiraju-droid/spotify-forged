import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";

vi.stubGlobal(
  "fetch",
  vi.fn(() =>
    Promise.resolve(
      new Response(JSON.stringify({}), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }),
    ),
  ),
);

class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

vi.stubGlobal("ResizeObserver", ResizeObserverMock);

const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] ?? null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, "localStorage", { value: localStorageMock });

const mockPlayer = {
  connect: vi.fn().mockResolvedValue(true),
  disconnect: vi.fn(),
  addListener: vi.fn(),
  removeListener: vi.fn(),
  getCurrentState: vi.fn().mockResolvedValue(null),
  setName: vi.fn().mockResolvedValue(undefined),
  getVolume: vi.fn().mockResolvedValue(0.5),
  setVolume: vi.fn().mockResolvedValue(undefined),
  pause: vi.fn().mockResolvedValue(undefined),
  resume: vi.fn().mockResolvedValue(undefined),
  togglePlay: vi.fn().mockResolvedValue(undefined),
  seek: vi.fn().mockResolvedValue(undefined),
  previousTrack: vi.fn().mockResolvedValue(undefined),
  nextTrack: vi.fn().mockResolvedValue(undefined),
};

window.Spotify = {
  Player: vi.fn(() => mockPlayer),
};
