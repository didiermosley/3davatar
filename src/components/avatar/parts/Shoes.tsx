import { RoundedBox } from "@react-three/drei";
import type { AvatarConfig } from "@/lib/avatar/types";
import { LEG_X } from "../dims";

function Shoe({ config }: { config: AvatarConfig }) {
  const color = config.shoeColor;
  const mat = <meshStandardMaterial color={color} roughness={0.6} />;
  switch (config.shoes) {
    case "sneakers":
      return (
        <>
          <RoundedBox args={[0.25, 0.15, 0.42]} radius={0.06} position={[0, 0.1, 0.06]} castShadow>
            {mat}
          </RoundedBox>
          <RoundedBox args={[0.26, 0.05, 0.44]} radius={0.02} position={[0, 0.025, 0.06]}>
            <meshStandardMaterial color="#f2f2f2" roughness={0.5} />
          </RoundedBox>
        </>
      );
    case "boots":
      return (
        <>
          <RoundedBox args={[0.26, 0.34, 0.42]} radius={0.06} position={[0, 0.17, 0.05]} castShadow>
            {mat}
          </RoundedBox>
          <RoundedBox args={[0.27, 0.04, 0.44]} radius={0.015} position={[0, 0.02, 0.05]}>
            <meshStandardMaterial color="#2a2a2a" roughness={0.6} />
          </RoundedBox>
        </>
      );
    case "sandals":
      return (
        <>
          <RoundedBox args={[0.24, 0.05, 0.42]} radius={0.02} position={[0, 0.025, 0.06]} castShadow>
            {mat}
          </RoundedBox>
          <mesh position={[0, 0.1, 0.16]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.12, 0.018, 8, 16, Math.PI]} />
            {mat}
          </mesh>
        </>
      );
    case "dress":
      return (
        <RoundedBox args={[0.23, 0.12, 0.42]} radius={0.05} position={[0, 0.06, 0.06]} castShadow>
          <meshStandardMaterial color={color} roughness={0.25} metalness={0.2} />
        </RoundedBox>
      );
    case "heels":
      return (
        <>
          <RoundedBox args={[0.22, 0.09, 0.42]} radius={0.035} position={[0, 0.13, 0.05]} rotation={[0.3, 0, 0]} castShadow>
            <meshStandardMaterial color={color} roughness={0.3} metalness={0.2} />
          </RoundedBox>
          <mesh position={[0, 0.08, -0.12]}>
            <cylinderGeometry args={[0.022, 0.016, 0.16, 8]} />
            <meshStandardMaterial color={color} roughness={0.3} metalness={0.2} />
          </mesh>
        </>
      );
  }
}

export function Shoes({ config }: { config: AvatarConfig }) {
  return (
    <>
      {[-1, 1].map((s) => (
        <group key={s} position={[s * LEG_X, 0, 0]}>
          <Shoe config={config} />
        </group>
      ))}
    </>
  );
}
