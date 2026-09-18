import { RoundedBox } from "@react-three/drei";
import type { AvatarConfig } from "@/lib/avatar/types";
import { HEAD_R } from "../dims";
import { Skin } from "../materials";

const FACE_Z = HEAD_R * 0.96;

function Mouth({ expression }: { expression: AvatarConfig["expression"] }) {
  const lip = <meshStandardMaterial color="#7a2e2e" roughness={0.7} />;
  if (expression === "smile") {
    return (
      <group position={[0, -0.22, FACE_Z - 0.03]}>
        <mesh scale={[1.7, 0.46, 0.4]}>
          <sphereGeometry args={[0.095, 20, 20]} />
          {lip}
        </mesh>
        <RoundedBox args={[0.24, 0.028, 0.03]} radius={0.008} position={[0, 0.028, 0.035]}>
          <meshStandardMaterial color="#ffffff" roughness={0.4} />
        </RoundedBox>
      </group>
    );
  }
  if (expression === "surprised") {
    return (
      <mesh position={[0, -0.24, FACE_Z]} scale={[0.9, 1.2, 0.5]}>
        <sphereGeometry args={[0.07, 16, 16]} />
        {lip}
      </mesh>
    );
  }
  return (
    <RoundedBox args={[0.22, 0.035, 0.03]} radius={0.012} position={[0, -0.24, FACE_Z]}>
      {lip}
    </RoundedBox>
  );
}

export function Head({ config }: { config: AvatarConfig }) {
  const surprised = config.expression === "surprised";
  return (
    <group>
      <mesh scale={[1.02, 0.97, 0.96]} castShadow>
        <sphereGeometry args={[HEAD_R, 48, 48]} />
        <Skin color={config.skinColor} />
      </mesh>
      {[-1, 1].map((s) => (
        <mesh key={s} position={[s * 0.55, -0.04, 0]} scale={[0.45, 1, 0.8]}>
          <sphereGeometry args={[0.11, 16, 16]} />
          <Skin color={config.skinColor} />
        </mesh>
      ))}
      <group position={[0, -0.09, FACE_Z - 0.06]}>
        <mesh scale={[0.85, 1.05, 1.1]} castShadow>
          <sphereGeometry args={[0.08, 20, 20]} />
          <Skin color={config.skinColor} />
        </mesh>
        <mesh position={[0, 0.07, -0.02]} scale={[0.55, 1.3, 0.9]}>
          <sphereGeometry args={[0.06, 16, 16]} />
          <Skin color={config.skinColor} />
        </mesh>
      </group>
      {[-1, 1].map((s) => (
        <group key={s} position={[s * 0.2, 0.03, FACE_Z - 0.04]}>
          <mesh scale={[1, surprised ? 1.6 : 1.35, 0.5]}>
            <sphereGeometry args={[0.065, 20, 20]} />
            <meshStandardMaterial color={config.eyeColor} roughness={0.25} />
          </mesh>
          <mesh position={[0.022, 0.035, 0.035]}>
            <sphereGeometry args={[0.02, 10, 10]} />
            <meshStandardMaterial color="#ffffff" roughness={0.2} />
          </mesh>
          <RoundedBox
            args={[0.16, 0.038, 0.05]}
            radius={0.018}
            position={[s * 0.015, surprised ? 0.22 : 0.18, 0.005]}
            rotation={[0, 0, s * 0.1]}
          >
            <meshStandardMaterial color={config.hairColor} roughness={0.9} />
          </RoundedBox>
          <mesh position={[s * 0.12, -0.16, 0]} scale={[1, 0.7, 0.4]}>
            <sphereGeometry args={[0.09, 16, 16]} />
            <meshStandardMaterial color="#e8907f" transparent opacity={0.35} roughness={1} />
          </mesh>
        </group>
      ))}
      <Mouth expression={config.expression} />
    </group>
  );
}
