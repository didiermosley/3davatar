import { defaults, normalize } from "./defaults";
import type { AvatarConfig } from "./types";

const keys = Object.keys(defaults.male) as (keyof AvatarConfig)[];

export function encode(config: AvatarConfig): string {
  return btoa(JSON.stringify(keys.map((k) => config[k])));
}

export function decode(hash: string): AvatarConfig | null {
  try {
    const values = JSON.parse(atob(hash)) as unknown[];
    if (!Array.isArray(values) || values.length !== keys.length) return null;
    const entries = keys.map((k, i) => [k, values[i]]);
    const config = Object.fromEntries(entries) as AvatarConfig;
    if (config.gender !== "male" && config.gender !== "female") return null;
    return normalize(config);
  } catch {
    return null;
  }
}
