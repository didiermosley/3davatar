import type {
  Accessory,
  Beard,
  Bottom,
  Dress,
  Expression,
  Gender,
  HairStyle,
  Mustache,
  Option,
  Shoes,
  Top,
} from "./types";

export const skinColors = [
  "#f9dcc4",
  "#f1c27d",
  "#e0ac69",
  "#c68642",
  "#8d5524",
  "#5c3a21",
  "#3b2314",
];

export const hairColors = [
  "#0f0f0f",
  "#3b2a1a",
  "#6b4423",
  "#a0522d",
  "#c9a24e",
  "#e8d7a8",
  "#b5b5b5",
  "#d8425c",
  "#3d6bd6",
  "#7b3fbf",
];

export const eyeColors = ["#3b2314", "#6b4a2b", "#2e7d32", "#3b6fd6", "#5c6bc0", "#7d7d7d"];

export const clothColors = [
  "#ffffff",
  "#1a1a1a",
  "#c62828",
  "#ef6c00",
  "#f9a825",
  "#2e7d32",
  "#00838f",
  "#1565c0",
  "#6a1b9a",
  "#ad1457",
  "#795548",
  "#607d8b",
  "#f8bbd0",
  "#b2dfdb",
];

export const shoeColors = ["#ffffff", "#1a1a1a", "#5d4037", "#c62828", "#1565c0", "#f9a825", "#9e9e9e"];

export const backgrounds = ["#1c1f2b", "#2b2438", "#0f3d3e", "#3d1f2b", "#e9e4d6", "#cfe8ff", "#fde2c8"];

export const hairStyles: Option<HairStyle>[] = [
  { id: "bald", label: "Bald", genders: ["male"] },
  { id: "buzz", label: "Buzz", genders: ["male"] },
  { id: "short", label: "Short", genders: ["male", "female"] },
  { id: "quiff", label: "Quiff", genders: ["male"] },
  { id: "sidePart", label: "Side part", genders: ["male"] },
  { id: "curly", label: "Curly", genders: ["male", "female"] },
  { id: "pixie", label: "Pixie", genders: ["female"] },
  { id: "bob", label: "Bob", genders: ["female"] },
  { id: "long", label: "Long", genders: ["female"] },
  { id: "ponytail", label: "Ponytail", genders: ["female"] },
  { id: "bun", label: "Bun", genders: ["female"] },
];

export const mustaches: Option<Mustache>[] = [
  { id: "none", label: "None" },
  { id: "chevron", label: "Chevron" },
  { id: "handlebar", label: "Handlebar" },
  { id: "pencil", label: "Pencil" },
];

export const beards: Option<Beard>[] = [
  { id: "none", label: "None" },
  { id: "stubble", label: "Stubble" },
  { id: "goatee", label: "Goatee" },
  { id: "full", label: "Full" },
];

export const tops: Option<Top>[] = [
  { id: "tshirt", label: "T-shirt" },
  { id: "vneck", label: "V-neck" },
  { id: "tank", label: "Tank" },
  { id: "longsleeve", label: "Long sleeve" },
  { id: "hoodie", label: "Hoodie" },
];

export const bottoms: Option<Bottom>[] = [
  { id: "pants", label: "Pants" },
  { id: "shorts", label: "Shorts" },
  { id: "skirt", label: "Skirt", genders: ["female"] },
];

export const dresses: Option<Dress>[] = [
  { id: "none", label: "None" },
  { id: "sundress", label: "Sundress" },
  { id: "gown", label: "Gown" },
];

export const shoes: Option<Shoes>[] = [
  { id: "sneakers", label: "Sneakers" },
  { id: "boots", label: "Boots" },
  { id: "sandals", label: "Sandals" },
  { id: "dress", label: "Dress shoes" },
  { id: "heels", label: "Heels", genders: ["female"] },
];

export const accessories: Option<Accessory>[] = [
  { id: "none", label: "None" },
  { id: "glasses", label: "Glasses" },
  { id: "sunglasses", label: "Sunglasses" },
  { id: "cap", label: "Cap" },
  { id: "beanie", label: "Beanie" },
  { id: "hat", label: "Hat" },
];

export const expressions: Option<Expression>[] = [
  { id: "smile", label: "Smile" },
  { id: "neutral", label: "Neutral" },
  { id: "surprised", label: "Surprised" },
];

export function forGender<T extends string>(list: Option<T>[], gender: Gender) {
  return list.filter((o) => !o.genders || o.genders.includes(gender));
}
