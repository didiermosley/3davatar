interface Props {
  presets: string[];
  value: string;
  onChange: (value: string) => void;
}

export function ColorPicker({ presets, value, onChange }: Props) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {presets.map((c) => {
        const active = c.toLowerCase() === value.toLowerCase();
        return (
          <button
            key={c}
            type="button"
            aria-label={c}
            aria-pressed={active}
            onClick={() => onChange(c)}
            style={{ background: c }}
            className={`h-7 w-7 rounded-full border-2 transition ${
              active ? "scale-110 border-white" : "border-white/20 hover:border-white/60"
            }`}
          />
        );
      })}
      <label className="relative h-7 w-7 cursor-pointer overflow-hidden rounded-full border-2 border-dashed border-white/40">
        <span
          className="absolute inset-0"
          style={{ background: "conic-gradient(red, yellow, lime, cyan, blue, magenta, red)" }}
        />
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
        />
      </label>
    </div>
  );
}
