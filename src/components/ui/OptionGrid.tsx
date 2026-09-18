import type { Option } from "@/lib/avatar/types";

interface Props<T extends string> {
  options: Option<T>[];
  value: T;
  onChange: (value: T) => void;
}

export function OptionGrid<T extends string>({ options, value, onChange }: Props<T>) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => {
        const active = o.id === value;
        return (
          <button
            key={o.id}
            type="button"
            onClick={() => onChange(o.id)}
            aria-pressed={active}
            className={`rounded-lg border px-3 py-1.5 text-sm transition ${
              active
                ? "border-sky-400 bg-sky-400/20 text-white"
                : "border-white/10 bg-white/5 text-white/70 hover:border-white/30 hover:text-white"
            }`}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
