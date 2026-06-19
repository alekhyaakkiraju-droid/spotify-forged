export interface AppSettings {
  theme: "dark" | "light";
  language: string;
  showLyrics: boolean;
  enableVisualizer: boolean;
  crossfadeDuration: number;
  normalizeVolume: boolean;
}

export interface SettingsSlice {
  settings: AppSettings;
  updateSettings: (partial: Partial<AppSettings>) => void;
  resetSettings: () => void;
}

export const defaultSettings: AppSettings = {
  theme: "dark",
  language: "en",
  showLyrics: true,
  enableVisualizer: false,
  crossfadeDuration: 0,
  normalizeVolume: true,
};

export const createSettingsSlice = (
  set: (
    partial:
      | Partial<SettingsSlice>
      | ((state: SettingsSlice) => Partial<SettingsSlice>),
  ) => void,
  get: () => SettingsSlice,
): SettingsSlice => ({
  settings: defaultSettings,
  updateSettings: (partial) => set({ settings: { ...get().settings, ...partial } }),
  resetSettings: () => set({ settings: defaultSettings }),
});
