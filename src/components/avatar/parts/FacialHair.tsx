import { RoundedBox } from "@react-three/drei";
import type { AvatarConfig } from "@/lib/avatar/types";
import { HEAD_R } from "../dims";

const PI = Math.PI;
const Z = HEAD_R * 0.95;

function Mat({ color, opacity = 1 }: { color: string; opacity?: number }) {
  return <meshStandardMaterial color={color} roughness={0.9} transparent={opacity < 1} opacity={opacity} />;
}

function Mustache({ style, color }: { style: AvatarConfig["mustache"]; color: string }) {
  switch (style) {
    case "none":
      return null;
    case "chevron":
      return (
        <RoundedBox args={[0.34, 0.08, 0.08]} radius={0.03} position={[0, -0.16, Z]}>
          <Mat color={color} />
        </RoundedBox>
      );
    case "handlebar":
      return (
        <>
          <RoundedBox args={[0.36, 0.06, 0.08]} radius={0.025} position={[0, -0.16, Z]}>
            <Mat color={color} />
          </RoundedBox>
          {[-1, 1].map((s) => (
            <mesh key={s} position={[s * 0.22, -0.13, Z - 0.02]}>
              <sphereGeometry args={[0.055, 12, 12]} />
              <Mat color={color} />
            </mesh>
          ))}
        </>
      );
    case "pencil":
      return (
        <RoundedBox args={[0.28, 0.03, 0.06]} radius={0.012} position={[0, -0.15, Z + 0.01]}>
          <Mat color={color} />
        </RoundedBox>
      );
  }
}

function Beard({ style, color }: { style: AvatarConfig["beard"]; color: string }) {
  switch (style) {
    case "none":
      return null;
    case "stubble":
      return (
        <mesh position={[0, -0.04, 0]} scale={[1.03, 0.98, 0.97]}>
          <sphereGeometry args={[HEAD_R + 0.005, 48, 24, PI * 0.1, PI * 0.8, PI * 0.6, PI * 0.4]} />
          <Mat color={color} opacity={0.35} />
        </mesh>
      );
    case "goatee":
      return (
        <mesh position={[0, -0.33, Z - 0.16]} scale={[0.75, 1.15, 0.7]} castShadow>
          <sphereGeometry args={[0.17, 20, 20]} />
          <Mat color={color} />
        </mesh>
      );
    case "full":
      return (
        <>
          <mesh scale={[1.04, 1.02, 1.02]} castShadow>
            <sphereGeometry args={[HEAD_R + 0.012, 48, 32, PI * 0.14, PI * 0.72, PI * 0.63, PI * 0.37]} />
            <Mat color={color} />
          </mesh>
          <mesh position={[0, -0.34, Z - 0.3]} scale={[1.2, 0.95, 0.85]} castShadow>
            <sphereGeometry args={[0.25, 24, 24]} />
            <Mat color={color} />
          </mesh>
        </>
      );
  }
}

export function FacialHair({ config }: { config: AvatarConfig }) {
  return (
    <>
      <Mustache style={config.mustache} color={config.hairColor} />
      <Beard style={config.beard} color={config.hairColor} />
    </>
  );
}
