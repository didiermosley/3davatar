import { RoundedBox } from "@react-three/drei";
import type { AvatarConfig } from "@/lib/avatar/types";

const PI = Math.PI;

function Frames({ dark }: { dark: boolean }) {
  const mat = <meshStandardMaterial color="#1a1a1a" roughness={0.4} metalness={0.3} />;
  return (
    <group position={[0, 0.04, 0.3]}>
      {[-1, 1].map((s) =>
        dark ? (
          <RoundedBox key={s} args={[0.15, 0.1, 0.03]} radius={0.02} position={[s * 0.115, 0, 0]}>
            <meshStandardMaterial color="#111111" roughness={0.2} metalness={0.4} />
          </RoundedBox>
        ) : (
          <mesh key={s} position={[s * 0.115, 0, 0]}>
            <torusGeometry args={[0.075, 0.01, 8, 24]} />
            {mat}
          </mesh>
        ),
      )}
      <mesh>
        <boxGeometry args={[0.08, 0.014, 0.014]} />
        {mat}
      </mesh>
      {[-1, 1].map((s) => (
        <mesh key={s} position={[s * 0.24, 0.01, -0.14]} rotation={[0, s * 0.15, 0]}>
          <boxGeometry args={[0.012, 0.012, 0.3]} />
          {mat}
        </mesh>
      ))}
    </group>
  );
}

export function Accessory({ config }: { config: AvatarConfig }) {
  const color = config.accessoryColor;
  const mat = <meshStandardMaterial color={color} roughness={0.8} />;
  switch (config.accessory) {
    case "none":
      return null;
    case "glasses":
      return <Frames dark={false} />;
    case "sunglasses":
      return <Frames dark />;
    case "cap":
      return (
        <group position={[0, 0.03, 0]}>
          <mesh castShadow>
            <sphereGeometry args={[0.36, 32, 16, 0, PI * 2, 0, PI * 0.47]} />
            {mat}
          </mesh>
          <RoundedBox args={[0.32, 0.03, 0.26]} radius={0.012} position={[0, 0.08, 0.36]} rotation={[0.15, 0, 0]} castShadow>
            {mat}
          </RoundedBox>
        </group>
      );
    case "beanie":
      return (
        <group position={[0, 0.05, 0]}>
          <mesh castShadow>
            <sphereGeometry args={[0.37, 32, 16, 0, PI * 2, 0, PI * 0.55]} />
            {mat}
          </mesh>
          <mesh position={[0, 0.02, 0]} rotation={[PI / 2, 0, 0]}>
            <torusGeometry args={[0.36, 0.05, 10, 32]} />
            {mat}
          </mesh>
          <mesh position={[0, 0.4, 0]}>
            <sphereGeometry args={[0.07, 12, 12]} />
            <meshStandardMaterial color="#f2f2f2" roughness={0.9} />
          </mesh>
        </group>
      );
    case "hat":
      return (
        <group position={[0, 0.08, 0]}>
          <mesh position={[0, 0.12, 0]} castShadow>
            <cylinderGeometry args={[0.3, 0.33, 0.26, 32]} />
            {mat}
          </mesh>
          <mesh position={[0, 0.25, 0]}>
            <sphereGeometry args={[0.3, 32, 16, 0, PI * 2, 0, PI * 0.4]} />
            {mat}
          </mesh>
          <mesh position={[0, 0.02, 0]} castShadow>
            <cylinderGeometry args={[0.58, 0.58, 0.025, 48]} />
            {mat}
          </mesh>
          <mesh position={[0, 0.04, 0]} rotation={[PI / 2, 0, 0]}>
            <torusGeometry args={[0.33, 0.025, 8, 32]} />
            <meshStandardMaterial color="#1a1a1a" roughness={0.7} />
          </mesh>
        </group>
      );
  }
}
