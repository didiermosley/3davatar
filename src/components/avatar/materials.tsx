import { useMemo } from "react";
import { CanvasTexture, Color, RepeatWrapping } from "three";
import type { AvatarConfig } from "@/lib/avatar/types";

export function Skin({ color }: { color: string }) {
  return <meshStandardMaterial color={color} roughness={0.55} />;
}

export function Cloth({ color }: { color: string }) {
  return <meshStandardMaterial color={color} roughness={0.8} />;
}

export function darken(hex: string, amount = 0.25) {
  return `#${new Color(hex).multiplyScalar(1 - amount).getHexString()}`;
}

const camoPalette = ["#4b5d3a", "#2f3d25", "#7a6a44", "#1f261a"];

function makeCamo() {
  const size = 256;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;
  let seed = 7;
  const rand = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
  ctx.fillStyle = camoPalette[0];
  ctx.fillRect(0, 0, size, size);
  for (let i = 0; i < 60; i++) {
    ctx.fillStyle = camoPalette[1 + Math.floor(rand() * 3)];
    ctx.beginPath();
    ctx.ellipse(rand() * size, rand() * size, 14 + rand() * 30, 10 + rand() * 20, rand() * Math.PI, 0, Math.PI * 2);
    ctx.fill();
  }
  const texture = new CanvasTexture(canvas);
  texture.wrapS = RepeatWrapping;
  texture.wrapT = RepeatWrapping;
  texture.repeat.set(2, 2);
  return texture;
}

export function Camo() {
  const map = useMemo(() => makeCamo(), []);
  return <meshStandardMaterial map={map} roughness={0.9} />;
}

export function TopMaterial({ config }: { config: AvatarConfig }) {
  if (config.dress !== "none") return <Cloth color={config.dressColor} />;
  if (config.top === "uniform") return <Camo />;
  return <Cloth color={config.topColor} />;
}

export function BottomMaterial({ config }: { config: AvatarConfig }) {
  if (config.bottom === "cargo") return <Camo />;
  return <Cloth color={config.bottomColor} />;
}
