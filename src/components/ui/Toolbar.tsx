"use client";

import { useState } from "react";
import { encode } from "@/lib/avatar/share";
import { useAvatar } from "@/lib/avatar/store";

function Button({ onClick, children, active }: { onClick: () => void; children: string; active?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-lg border px-3 py-1.5 text-sm transition ${
        active
          ? "border-sky-400 bg-sky-400/20 text-white"
          : "border-white/10 bg-white/5 text-white/80 hover:border-white/30 hover:text-white"
      }`}
    >
      {children}
    </button>
  );
}

export function Toolbar() {
  const { config, canvas, autoRotate, randomize, reset, toggleAutoRotate } = useAvatar();
  const [copied, setCopied] = useState(false);

  const share = async () => {
    const url = `${location.origin}${location.pathname}#${encode(config)}`;
    history.replaceState(null, "", url);
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const download = () => {
    if (!canvas) return;
    const a = document.createElement("a");
    a.href = canvas.toDataURL("image/png");
    a.download = "avatar.png";
    a.click();
  };

  return (
    <div className="flex flex-wrap gap-2">
      <Button onClick={randomize}>Randomize</Button>
      <Button onClick={reset}>Reset</Button>
      <Button onClick={toggleAutoRotate} active={autoRotate}>
        Rotate
      </Button>
      <Button onClick={share}>{copied ? "Copied!" : "Share"}</Button>
      <Button onClick={download}>Download PNG</Button>
    </div>
  );
}
