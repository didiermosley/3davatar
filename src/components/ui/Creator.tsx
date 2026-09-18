"use client";

import dynamic from "next/dynamic";
import { useEffect } from "react";
import { decode } from "@/lib/avatar/share";
import { useAvatar } from "@/lib/avatar/store";
import { Panel } from "./Panel";

const loading = <div className="flex h-full items-center justify-center text-sm text-white/50">Loading…</div>;

const AvatarCanvas = dynamic(() => import("@/components/avatar/AvatarCanvas"), {
  ssr: false,
  loading: () => loading,
});

const ProfileCanvas = dynamic(() => import("@/components/avatar/ProfileCanvas"), {
  ssr: false,
  loading: () => loading,
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
        <h1 className="pointer-events-none absolute left-5 top-4 text-lg font-semibold tracking-tight text-white/90 drop-shadow">
          Avatar Creator
        </h1>
        <div className="absolute bottom-4 left-5 flex flex-col gap-1">
          <div className="h-28 w-28 overflow-hidden rounded-2xl border border-white/20 shadow-lg sm:h-32 sm:w-32">
            <ProfileCanvas />
          </div>
          <span className="text-[11px] uppercase tracking-widest text-white/60">Profile</span>
        </div>
      </div>
      <aside className="min-h-0 flex-1 overflow-y-auto overscroll-contain border-t border-white/10 bg-zinc-900 p-5 lg:h-full lg:w-96 lg:flex-none lg:border-l lg:border-t-0">
        <Panel />
      </aside>
    </div>
  );
}
