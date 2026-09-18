import { useAvatar } from "@/lib/avatar/store";
import { HEAD_Y } from "./dims";
import { HeadAssembly } from "./HeadAssembly";
import { Body } from "./parts/Body";
import { Outfit } from "./parts/Outfit";

export function Avatar() {
  const config = useAvatar((s) => s.config);
  const lean = config.pose === "walk" ? 0.06 : 0;
  return (
    <group rotation={[lean, 0, 0]}>
      <Body config={config} />
      <Outfit config={config} />
      <group position={[0, HEAD_Y, 0]} rotation={[config.pose === "wave" ? 0 : 0.04, 0, config.pose === "wave" ? 0.08 : 0]}>
        <HeadAssembly config={config} />
      </group>
    </group>
  );
}
