import { RoundedBox } from "@react-three/drei";
import type { AvatarConfig } from "@/lib/avatar/types";

export function Shoe({ config }: { config: AvatarConfig }) {
  const color = config.shoeColor;
  const mat = <meshStandardMaterial color={color} roughness={0.6} />;
  switch (config.shoes) {
    case "sneakers":
      return (
        <>
          <RoundedBox args={[0.3, 0.19, 0.5]} radius={0.08} smoothness={6} position={[0, 0.12, 0.07]} castShadow>
            {mat}
          </RoundedBox>
          <RoundedBox args={[0.31, 0.06, 0.52]} radius={0.025} position={[0, 0.03, 0.07]}>
            <meshStandardMaterial color="#ffffff" roughness={0.5} />
          </RoundedBox>
          <RoundedBox args={[0.14, 0.03, 0.14]} radius={0.01} position={[0, 0.215, 0.14]}>
            <meshStandardMaterial color="#ffffff" roughness={0.6} />
          </RoundedBox>
        </>
      );
    case "boots":
      return (
        <>
          <RoundedBox args={[0.32, 0.42, 0.5]} radius={0.08} smoothness={6} position={[0, 0.22, 0.05]} castShadow>
            {mat}
          </RoundedBox>
          <RoundedBox args={[0.33, 0.05, 0.52]} radius={0.02} position={[0, 0.025, 0.05]}>
            <meshStandardMaterial color="#2a2a2a" roughness={0.6} />
          </RoundedBox>
          <mesh position={[0, 0.36, 0.06]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.15, 0.03, 8, 24]} />
            <meshStandardMaterial color="#2a2a2a" roughness={0.7} />
          </mesh>
        </>
      );
    case "sandals":
      return (
        <>
          <RoundedBox args={[0.3, 0.06, 0.5]} radius={0.025} position={[0, 0.03, 0.07]} castShadow>
            {mat}
          </RoundedBox>
          <mesh position={[0, 0.11, 0.2]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.15, 0.022, 8, 20, Math.PI]} />
            {mat}
          </mesh>
        </>
      );
    case "dress":
      return (
        <>
          <RoundedBox args={[0.28, 0.14, 0.5]} radius={0.06} smoothness={6} position={[0, 0.08, 0.07]} castShadow>
            <meshStandardMaterial color={color} roughness={0.25} metalness={0.2} />
          </RoundedBox>
          <RoundedBox args={[0.29, 0.03, 0.52]} radius={0.01} position={[0, 0.015, 0.07]}>
            <meshStandardMaterial color="#2a2a2a" roughness={0.6} />
          </RoundedBox>
        </>
      );
    case "heels":
      return (
        <>
          <RoundedBox args={[0.27, 0.1, 0.5]} radius={0.04} position={[0, 0.16, 0.06]} rotation={[0.3, 0, 0]} castShadow>
            <meshStandardMaterial color={color} roughness={0.3} metalness={0.2} />
          </RoundedBox>
          <mesh position={[0, 0.1, -0.14]}>
            <cylinderGeometry args={[0.025, 0.018, 0.2, 8]} />
            <meshStandardMaterial color={color} roughness={0.3} metalness={0.2} />
          </mesh>
        </>
      );
  }
}
