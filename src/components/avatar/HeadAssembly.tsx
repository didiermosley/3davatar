import type { AvatarConfig } from "@/lib/avatar/types";
import { Accessory } from "./parts/Accessory";
import { FacialHair } from "./parts/FacialHair";
import { Hair } from "./parts/Hair";
import { Head } from "./parts/Head";

export function HeadAssembly({ config }: { config: AvatarConfig }) {
  return (
    <group>
      <Head config={config} />
      <Hair config={config} />
      <FacialHair config={config} />
      <Accessory config={config} />
    </group>
  );
}
