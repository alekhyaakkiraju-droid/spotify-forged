import { useAppStore } from "@/shared/stores/appStore";

export function SettingsPage() {
  const settings = useAppStore((s) => s.settings);
  const updateSettings = useAppStore((s) => s.updateSettings);
  const resetSettings = useAppStore((s) => s.resetSettings);

  return (
    <section className="content-spacing max-w-xl">
      <h1 className="text-heading">Settings</h1>
      <p className="mt-2 text-white/60">Preferences are saved to localStorage.</p>

      <div className="mt-8 space-y-6">
        <label className="flex items-center justify-between">
          <span>Show lyrics panel</span>
          <input
            type="checkbox"
            checked={settings.showLyrics}
            onChange={(e) => updateSettings({ showLyrics: e.target.checked })}
          />
        </label>

        <label className="flex items-center justify-between">
          <span>Enable visualizer</span>
          <input
            type="checkbox"
            checked={settings.enableVisualizer}
            onChange={(e) => updateSettings({ enableVisualizer: e.target.checked })}
          />
        </label>

        <label className="flex items-center justify-between">
          <span>Normalize volume</span>
          <input
            type="checkbox"
            checked={settings.normalizeVolume}
            onChange={(e) => updateSettings({ normalizeVolume: e.target.checked })}
          />
        </label>

        <label className="block">
          <span className="mb-2 block">Crossfade (seconds)</span>
          <input
            type="number"
            min={0}
            max={12}
            value={settings.crossfadeDuration}
            onChange={(e) =>
              updateSettings({ crossfadeDuration: Number(e.target.value) })
            }
            className="w-full rounded border border-white/10 bg-white/5 px-3 py-2"
          />
        </label>

        <button
          type="button"
          onClick={resetSettings}
          className="rounded-full border border-white/20 px-4 py-2 text-sm hover:border-white/40"
        >
          Reset to defaults
        </button>
      </div>
    </section>
  );
}

export default SettingsPage;
