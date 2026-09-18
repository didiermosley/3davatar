"use client";

import dynamic from "next/dynamic";
import { useEffect } from "react";
import { decode } from "@/lib/avatar/share";
import { useAvatar } from "@/lib/avatar/store";
import { Panel } from "./Panel";

const AvatarCanvas = dynamic(() => import("@/components/avatar/AvatarCanvas"), {
  ssr: false,
  loading: () => <div className="flex h-full items-center justify-center text-white/50">Loading scene…</div>,
});

export function Creator() {
  const load = useAvatar((s) => s.load);

  useEffect(() => {
    const hash = location.hash.slice(1);
    if (!hash) return;
    const config = decode(hash);
    if (config) load(config);
  }, [load]);

  return (
    <div className="flex h-dvh flex-col bg-zinc-950 text-white lg:flex-row">
      <div className="relative h-[52dvh] shrink-0 lg:h-full lg:flex-1">
        <AvatarCanvas />
        <h1 className="pointer-events-none absolute left-4 top-4 text-lg font-semibold tracking-tight text-white/90">
          Avatar Creator
        </h1>
      </div>
      <aside className="flex-1 overflow-y-auto border-t border-white/10 bg-zinc-900 p-5 lg:w-96 lg:flex-none lg:border-l lg:border-t-0">
        <Panel />
      </aside>
    </div>
  );
}
