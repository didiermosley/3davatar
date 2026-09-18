import type { AvatarConfig } from "@/lib/avatar/types";
import { HEAD_R } from "../dims";

function Mouth({ expression }: { expression: AvatarConfig["expression"] }) {
  const lip = <meshStandardMaterial color="#8a3a3a" roughness={0.8} />;
  if (expression === "smile") {
    return (
      <mesh position={[0, -0.11, 0.29]} rotation={[0, 0, Math.PI]}>
        <torusGeometry args={[0.07, 0.016, 8, 16, Math.PI]} />
        {lip}
      </mesh>
    );
  }
  if (expression === "surprised") {
    return (
      <mesh position={[0, -0.15, 0.29]} scale={[1, 1.3, 0.6]}>
        <sphereGeometry args={[0.04, 16, 16]} />
        {lip}
      </mesh>
    );
  }
  return (
    <mesh position={[0, -0.15, 0.3]}>
      <boxGeometry args={[0.13, 0.02, 0.02]} />
      {lip}
    </mesh>
  );
}

export function Head({ config }: { config: AvatarConfig }) {
  const skin = <meshStandardMaterial color={config.skinColor} roughness={0.65} />;
  const browY = config.expression === "surprised" ? 0.17 : 0.13;
  return (
    <group>
      <mesh scale={[1, 1.08, 1]} castShadow>
        <sphereGeometry args={[HEAD_R, 32, 32]} />
        {skin}
      </mesh>
      {[-1, 1].map((s) => (
        <mesh key={s} position={[s * 0.31, -0.02, 0]} scale={[0.5, 1, 0.8]}>
          <sphereGeometry args={[0.07, 16, 16]} />
          {skin}
        </mesh>
      ))}
      <mesh position={[0, -0.04, 0.31]}>
        <sphereGeometry args={[0.04, 16, 16]} />
        {skin}
      </mesh>
      {[-1, 1].map((s) => (
        <group key={s} position={[s * 0.11, 0.04, 0.26]}>
          <mesh scale={[1, 1.1, 0.6]}>
            <sphereGeometry args={[0.055, 16, 16]} />
            <meshStandardMaterial color="#ffffff" roughness={0.3} />
          </mesh>
          <mesh position={[0, 0, 0.03]} scale={config.expression === "surprised" ? 1.25 : 1}>
            <sphereGeometry args={[0.028, 16, 16]} />
            <meshStandardMaterial color={config.eyeColor} roughness={0.3} />
          </mesh>
          <mesh position={[0, 0, 0.055]}>
            <sphereGeometry args={[0.014, 12, 12]} />
            <meshStandardMaterial color="#111111" roughness={0.2} />
          </mesh>
          <mesh position={[0, browY - 0.04, 0.02]} rotation={[0, 0, s * 0.15]}>
            <boxGeometry args={[0.1, 0.022, 0.025]} />
            <meshStandardMaterial color={config.hairColor} roughness={0.9} />
          </mesh>
        </group>
      ))}
      <Mouth expression={config.expression} />
    </group>
  );
}
