import { RoundedBox } from "@react-three/drei";
import type { AvatarConfig } from "@/lib/avatar/types";
import { armX, bodyDims, HEAD_Y, HIP_Y, LEG_X, SHOULDER_Y } from "../dims";

export function Body({ config }: { config: AvatarConfig }) {
  const d = bodyDims[config.gender];
  const skin = <meshStandardMaterial color={config.skinColor} roughness={0.65} />;
  return (
    <group>
      <mesh position={[0, HEAD_Y - 0.38, 0]} castShadow>
        <cylinderGeometry args={[0.09, 0.11, 0.18, 16]} />
        {skin}
      </mesh>
      <RoundedBox args={[d.shoulder, 0.62, d.depth]} radius={0.1} position={[0, SHOULDER_Y - 0.28, 0]} castShadow>
        {skin}
      </RoundedBox>
      <RoundedBox args={[d.hip, 0.32, d.depth]} radius={0.1} position={[0, HIP_Y, 0]} castShadow>
        {skin}
      </RoundedBox>
      {[-1, 1].map((s) => (
        <group key={s} position={[s * armX(d), SHOULDER_Y - 0.02, 0]} rotation={[0, 0, s * -0.14]}>
          <mesh position={[0, -0.3, 0]} castShadow>
            <capsuleGeometry args={[0.085, 0.5, 6, 16]} />
            {skin}
          </mesh>
          <mesh position={[0, -0.63, 0]} castShadow>
            <sphereGeometry args={[0.09, 16, 16]} />
            {skin}
          </mesh>
        </group>
      ))}
      {[-1, 1].map((s) => (
        <mesh key={s} position={[s * LEG_X, 0.55, 0]} castShadow>
          <capsuleGeometry args={[0.145, 0.62, 6, 16]} />
          {skin}
        </mesh>
      ))}
    </group>
  );
}
