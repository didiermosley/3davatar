import { create } from "zustand";
import { defaults, normalize } from "./defaults";
import {
  accessories,
  backgrounds,
  beards,
  bottoms,
  clothColors,
  dresses,
  expressions,
  eyeColors,
  forGender,
  hairColors,
  hairStyles,
  mustaches,
  poses,
  shoeColors,
  shoes,
  skinColors,
  tops,
} from "./options";
import { presetPatches } from "./presets";
import type { AvatarConfig, Gender, Option, Preset } from "./types";

interface AvatarState {
  config: AvatarConfig;
  autoRotate: boolean;
  canvas: HTMLCanvasElement | null;
  profileCanvas: HTMLCanvasElement | null;
  set: (patch: Partial<AvatarConfig>) => void;
  setGender: (gender: Gender) => void;
  applyPreset: (preset: Preset) => void;
  load: (config: AvatarConfig) => void;
  reset: () => void;
  randomize: () => void;
  toggleAutoRotate: () => void;
  setCanvas: (canvas: HTMLCanvasElement) => void;
  setProfileCanvas: (canvas: HTMLCanvasElement) => void;
}

const pick = <T,>(list: readonly T[]) => list[Math.floor(Math.random() * list.length)];
const pickId = <T extends string>(list: Option<T>[], gender: Gender) => pick(forGender(list, gender)).id;
const chance = (p: number) => Math.random() < p;

function random(gender: Gender): AvatarConfig {
  const female = gender === "female";
  return normalize({
    gender,
    pregnant: female && chance(0.2),
    pose: pickId(poses, gender),
    skinColor: pick(skinColors),
    hairColor: pick(hairColors),
    eyeColor: pick(eyeColors),
    hairStyle: pickId(hairStyles, gender),
    mustache: chance(0.4) ? pickId(mustaches, gender) : "none",
    beard: chance(0.4) ? pickId(beards, gender) : "none",
    top: pickId(tops, gender),
    topColor: pick(clothColors),
    bottom: pickId(bottoms, gender),
    bottomColor: pick(clothColors),
    dress: female && chance(0.5) ? pickId(dresses, gender) : "none",
    dressColor: pick(clothColors),
    shoes: pickId(shoes, gender),
    shoeColor: pick(shoeColors),
    accessory: chance(0.4) ? pickId(accessories, gender) : "none",
    accessoryColor: pick(clothColors),
    expression: pickId(expressions, gender),
    background: pick(backgrounds),
  });
}

export const useAvatar = create<AvatarState>((set, get) => ({
  config: defaults.male,
  autoRotate: false,
  canvas: null,
  profileCanvas: null,
  set: (patch) => set({ config: normalize({ ...get().config, ...patch }) }),
  setGender: (gender) => set({ config: normalize({ ...get().config, gender }) }),
  applyPreset: (preset) => set({ config: normalize({ ...get().config, ...presetPatches[preset] }) }),
  load: (config) => set({ config: normalize(config) }),
  reset: () => set({ config: defaults[get().config.gender] }),
  randomize: () => set({ config: random(get().config.gender) }),
  toggleAutoRotate: () => set({ autoRotate: !get().autoRotate }),
  setCanvas: (canvas) => set({ canvas }),
  setProfileCanvas: (canvas) => set({ profileCanvas: canvas }),
}));
