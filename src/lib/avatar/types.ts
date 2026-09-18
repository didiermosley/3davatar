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
export type Top = "tshirt" | "vneck" | "tank" | "longsleeve" | "hoodie";
export type Bottom = "pants" | "shorts" | "skirt";
export type Dress = "none" | "sundress" | "gown";
export type Shoes = "sneakers" | "boots" | "sandals" | "heels" | "dress";
export type Accessory = "none" | "glasses" | "sunglasses" | "cap" | "beanie" | "hat";
export type Expression = "smile" | "neutral" | "surprised";

export interface AvatarConfig {
  gender: Gender;
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
