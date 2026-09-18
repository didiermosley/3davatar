import { RoundedBox } from "@react-three/drei";
import type { AvatarConfig } from "@/lib/avatar/types";
import { HEAD_R } from "../dims";

const PI = Math.PI;
const Z = HEAD_R * 0.96;

function Frames({ dark }: { dark: boolean }) {
  const mat = <meshStandardMaterial color="#1a1a1a" roughness={0.4} metalness={0.3} />;
  return (
    <group position={[0, 0.04, Z]}>
      {[-1, 1].map((s) =>
        dark ? (
          <RoundedBox key={s} args={[0.26, 0.17, 0.05]} radius={0.04} position={[s * 0.2, 0, 0]}>
            <meshStandardMaterial color="#111111" roughness={0.2} metalness={0.4} />
          </RoundedBox>
        ) : (
          <mesh key={s} position={[s * 0.2, 0, 0]}>
            <torusGeometry args={[0.13, 0.016, 8, 28]} />
            {mat}
          </mesh>
        ),
      )}
      <mesh>
        <boxGeometry args={[0.14, 0.022, 0.022]} />
        {mat}
      </mesh>
      {[-1, 1].map((s) => (
        <mesh key={s} position={[s * 0.42, 0.02, -0.26]} rotation={[0, s * 0.12, 0]}>
          <boxGeometry args={[0.02, 0.02, 0.52]} />
          {mat}
        </mesh>
      ))}
    </group>
  );
}

export function Accessory({ config }: { config: AvatarConfig }) {
  const color = config.accessoryColor;
  const mat = <meshStandardMaterial color={color} roughness={0.8} />;
  const r = HEAD_R + 0.08;
  switch (config.accessory) {
    case "none":
      return null;
    case "glasses":
      return <Frames dark={false} />;
    case "sunglasses":
      return <Frames dark />;
    case "cap":
      return (
        <group position={[0, 0.06, 0]}>
          <mesh castShadow>
            <sphereGeometry args={[r, 48, 24, 0, PI * 2, 0, PI * 0.46]} />
            {mat}
          </mesh>
          <RoundedBox args={[0.54, 0.05, 0.42]} radius={0.02} position={[0, 0.14, 0.62]} rotation={[0.18, 0, 0]} castShadow>
            {mat}
          </RoundedBox>
          <mesh position={[0, r, 0]}>
            <sphereGeometry args={[0.04, 10, 10]} />
            {mat}
          </mesh>
        </group>
      );
    case "beanie":
      return (
        <group position={[0, 0.08, 0]}>
          <mesh castShadow>
            <sphereGeometry args={[r + 0.02, 48, 24, 0, PI * 2, 0, PI * 0.55]} />
            {mat}
          </mesh>
          <mesh position={[0, 0.02, 0]} rotation={[PI / 2, 0, 0]}>
            <torusGeometry args={[r + 0.01, 0.08, 12, 48]} />
            {mat}
          </mesh>
          <mesh position={[0, r + 0.1, 0]}>
            <sphereGeometry args={[0.11, 14, 14]} />
            <meshStandardMaterial color="#f2f2f2" roughness={0.95} />
          </mesh>
        </group>
      );
    case "hat":
      return (
        <group position={[0, 0.14, 0]}>
          <mesh position={[0, 0.2, 0]} castShadow>
            <cylinderGeometry args={[0.5, 0.56, 0.42, 48]} />
            {mat}
          </mesh>
          <mesh position={[0, 0.41, 0]}>
            <sphereGeometry args={[0.5, 48, 24, 0, PI * 2, 0, PI * 0.4]} />
            {mat}
          </mesh>
          <mesh position={[0, 0.02, 0]} castShadow>
            <cylinderGeometry args={[0.98, 0.98, 0.04, 64]} />
            {mat}
          </mesh>
          <mesh position={[0, 0.06, 0]} rotation={[PI / 2, 0, 0]}>
            <torusGeometry args={[0.56, 0.04, 10, 48]} />
            <meshStandardMaterial color="#1a1a1a" roughness={0.7} />
          </mesh>
        </group>
      );
    case "helmet":
      return (
        <group position={[0, 0.2, 0]}>
          <mesh castShadow>
            <sphereGeometry args={[r + 0.06, 48, 24, 0, PI * 2, 0, PI * 0.46]} />
            {mat}
          </mesh>
          <mesh position={[0, 0.02, 0]} rotation={[PI / 2, 0, 0]}>
            <torusGeometry args={[r + 0.04, 0.055, 12, 48]} />
            <meshStandardMaterial color="#2a2f22" roughness={0.9} />
          </mesh>
          <mesh position={[0, 0.2, 0]} rotation={[PI / 2, 0, 0]}>
            <torusGeometry args={[r - 0.02, 0.03, 8, 48]} />
            <meshStandardMaterial color="#7a6a44" roughness={0.9} />
          </mesh>
          {[-1, 1].map((s) => (
            <mesh key={s} position={[s * (HEAD_R - 0.09), -0.36, 0.2]} rotation={[0.1, 0, s * 0.3]}>
              <cylinderGeometry args={[0.018, 0.018, 0.42, 8]} />
              <meshStandardMaterial color="#2a2418" roughness={0.9} />
            </mesh>
          ))}
        </group>
      );
  }
}
