import { presets } from "@/lib/avatar/options";
import type { Preset } from "@/lib/avatar/types";

export function PresetPicker({ onPick }: { onPick: (preset: Preset) => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      {presets.map((p) => (
        <button
          key={p.id}
          type="button"
          onClick={() => onPick(p.id)}
          className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-white/70 transition hover:border-white/30 hover:text-white"
        >
          {p.label}
        </button>
      ))}
    </div>
  );
}
