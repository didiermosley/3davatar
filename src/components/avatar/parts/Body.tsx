import { RoundedBox } from "@react-three/drei";
import type { AvatarConfig } from "@/lib/avatar/types";
import { bodyDims, HEAD_Y, HIP_Y, SHOULDER_Y } from "../dims";
import { Skin } from "../materials";
import { Arm, Leg } from "./Limbs";

export function Body({ config }: { config: AvatarConfig }) {
  const d = bodyDims[config.gender];
  return (
    <group>
      <mesh position={[0, HEAD_Y - 0.6, 0]} castShadow>
        <cylinderGeometry args={[0.16, 0.18, 0.3, 24]} />
        <Skin color={config.skinColor} />
      </mesh>
      <RoundedBox args={[d.shoulder, 0.68, d.depth]} radius={0.17} smoothness={6} position={[0, SHOULDER_Y - 0.3, 0]} castShadow>
        <Skin color={config.skinColor} />
      </RoundedBox>
      <RoundedBox args={[d.hip, 0.32, d.depth - 0.02]} radius={0.12} smoothness={6} position={[0, HIP_Y, 0]} castShadow>
        <Skin color={config.skinColor} />
      </RoundedBox>
      {[-1, 1].map((s) => (
        <Arm key={s} side={s} config={config} />
      ))}
      {[-1, 1].map((s) => (
        <Leg key={s} side={s} config={config} />
      ))}
    </group>
  );
}
