import { bottoms, forGender, hairStyles, shoes } from "./options";
import type { AvatarConfig, Gender } from "./types";

const base: Omit<AvatarConfig, "gender" | "hairStyle"> = {
  pregnant: false,
  pose: "idle",
  skinColor: "#f6d3b3",
  hairColor: "#4a3728",
  eyeColor: "#2a1a10",
  mustache: "none",
  beard: "none",
  top: "longsleeve",
  topColor: "#5b9ee8",
  bottom: "pants",
  bottomColor: "#2c3e8f",
  dress: "none",
  dressColor: "#c62828",
  shoes: "sneakers",
  shoeColor: "#f4f1ea",
  accessory: "none",
  accessoryColor: "#c62828",
  expression: "smile",
  background: "#d08a73",
};

export const defaults: Record<Gender, AvatarConfig> = {
  male: { ...base, gender: "male", hairStyle: "short" },
  female: { ...base, gender: "female", hairStyle: "long", dress: "sundress" },
};

export function normalize(config: AvatarConfig): AvatarConfig {
  const { gender } = config;
  const next = { ...config };
  if (!forGender(hairStyles, gender).some((o) => o.id === next.hairStyle)) {
    next.hairStyle = defaults[gender].hairStyle;
  }
  if (!forGender(bottoms, gender).some((o) => o.id === next.bottom)) next.bottom = "pants";
  if (!forGender(shoes, gender).some((o) => o.id === next.shoes)) next.shoes = "sneakers";
  if (gender === "female") {
    next.mustache = "none";
    next.beard = "none";
  } else {
    next.dress = "none";
    next.pregnant = false;
  }
  return next;
}
