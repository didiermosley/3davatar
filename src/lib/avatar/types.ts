export type Gender = "male" | "female";

export type HairStyle =
  | "bald"
  | "buzz"
  | "short"
  | "quiff"
  | "sidePart"
  | "curly"
  | "pixie"
  | "bob"
  | "long"
  | "ponytail"
  | "bun";

export type Mustache = "none" | "chevron" | "handlebar" | "pencil";
export type Beard = "none" | "stubble" | "goatee" | "full";
export type Top = "tshirt" | "vneck" | "tank" | "longsleeve" | "hoodie" | "uniform";
export type Bottom = "pants" | "shorts" | "cargo" | "skirt";
export type Dress = "none" | "sundress" | "gown";
export type Shoes = "sneakers" | "boots" | "sandals" | "heels" | "dress";
export type Accessory = "none" | "glasses" | "sunglasses" | "cap" | "beanie" | "hat" | "helmet";
export type Expression = "smile" | "neutral" | "surprised";
export type Pose = "idle" | "walk" | "wave";
export type Preset = "casual" | "soldier" | "formal" | "sporty";

export interface AvatarConfig {
  gender: Gender;
  pregnant: boolean;
  pose: Pose;
  skinColor: string;
  hairColor: string;
  eyeColor: string;
  hairStyle: HairStyle;
  mustache: Mustache;
  beard: Beard;
  top: Top;
  topColor: string;
  bottom: Bottom;
  bottomColor: string;
  dress: Dress;
  dressColor: string;
  shoes: Shoes;
  shoeColor: string;
  accessory: Accessory;
  accessoryColor: string;
  expression: Expression;
  background: string;
}

export interface Option<T extends string> {
  id: T;
  label: string;
  genders?: Gender[];
}
