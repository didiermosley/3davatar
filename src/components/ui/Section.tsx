import type { ReactNode } from "react";

export function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-3 border-b border-white/10 pb-5">
      <h2 className="text-xs font-semibold uppercase tracking-widest text-white/50">{title}</h2>
      {children}
    </section>
  );
}

export function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm text-white/70">{label}</span>
      {children}
    </div>
  );
}
