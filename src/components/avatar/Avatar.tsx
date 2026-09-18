import { useAvatar } from "@/lib/avatar/store";
import { HEAD_Y } from "./dims";
import { Accessory } from "./parts/Accessory";
import { Body } from "./parts/Body";
import { FacialHair } from "./parts/FacialHair";
import { Hair } from "./parts/Hair";
import { Head } from "./parts/Head";
import { Outfit } from "./parts/Outfit";
import { Shoes } from "./parts/Shoes";

export function Avatar() {
  const config = useAvatar((s) => s.config);
  return (
    <group>
      <Body config={config} />
      <Outfit config={config} />
      <Shoes config={config} />
      <group position={[0, HEAD_Y, 0]}>
        <Head config={config} />
        <Hair config={config} />
        <FacialHair config={config} />
        <Accessory config={config} />
      </group>
    </group>
  );
}
