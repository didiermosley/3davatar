import type { Gender } from "@/lib/avatar/types";

const genders: { id: Gender; label: string }[] = [
  { id: "male", label: "Man" },
  { id: "female", label: "Woman" },
];

export function GenderToggle({ value, onChange }: { value: Gender; onChange: (g: Gender) => void }) {
  return (
    <div className="grid grid-cols-2 rounded-xl bg-white/5 p-1">
      {genders.map((g) => (
        <button
          key={g.id}
          type="button"
          onClick={() => onChange(g.id)}
          aria-pressed={value === g.id}
          className={`rounded-lg py-2 text-sm font-medium transition ${
            value === g.id ? "bg-sky-500 text-white shadow" : "text-white/60 hover:text-white"
          }`}
        >
          {g.label}
        </button>
      ))}
    </div>
  );
}
