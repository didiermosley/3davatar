import { bottoms, forGender, hairStyles, shoes } from "./options";
import type { AvatarConfig, Gender } from "./types";

const base: Omit<AvatarConfig, "gender" | "hairStyle"> = {
  skinColor: "#e0ac69",
  hairColor: "#3b2a1a",
  eyeColor: "#3b2314",
  mustache: "none",
  beard: "none",
  top: "tshirt",
  topColor: "#1565c0",
  bottom: "pants",
  bottomColor: "#1a1a1a",
  dress: "none",
  dressColor: "#c62828",
  shoes: "sneakers",
  shoeColor: "#ffffff",
  accessory: "none",
  accessoryColor: "#c62828",
  expression: "smile",
  background: "#1c1f2b",
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
  }
  return next;
}
