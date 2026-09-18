export function Toggle({ label, value, onChange }: { label: string; value: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={value}
      onClick={() => onChange(!value)}
      className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 transition hover:border-white/30"
    >
      <span>{label}</span>
      <span className={`relative h-5 w-9 rounded-full transition ${value ? "bg-sky-500" : "bg-white/20"}`}>
        <span
          className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-all ${value ? "left-4.5" : "left-0.5"}`}
        />
      </span>
    </button>
  );
}
