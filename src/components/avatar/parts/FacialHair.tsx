import { RoundedBox } from "@react-three/drei";
import type { AvatarConfig } from "@/lib/avatar/types";

const PI = Math.PI;

function Mat({ color, opacity = 1 }: { color: string; opacity?: number }) {
  return <meshStandardMaterial color={color} roughness={0.9} transparent={opacity < 1} opacity={opacity} />;
}

function Mustache({ style, color }: { style: AvatarConfig["mustache"]; color: string }) {
  switch (style) {
    case "none":
      return null;
    case "chevron":
      return (
        <RoundedBox args={[0.19, 0.045, 0.05]} radius={0.015} position={[0, -0.085, 0.3]}>
          <Mat color={color} />
        </RoundedBox>
      );
    case "handlebar":
      return (
        <>
          <RoundedBox args={[0.2, 0.035, 0.05]} radius={0.012} position={[0, -0.085, 0.3]}>
            <Mat color={color} />
          </RoundedBox>
          {[-1, 1].map((s) => (
            <mesh key={s} position={[s * 0.12, -0.07, 0.29]}>
              <sphereGeometry args={[0.03, 12, 12]} />
              <Mat color={color} />
            </mesh>
          ))}
        </>
      );
    case "pencil":
      return (
        <RoundedBox args={[0.16, 0.016, 0.04]} radius={0.006} position={[0, -0.08, 0.305]}>
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
        <mesh position={[0, -0.03, 0]} scale={[1, 1.08, 1]}>
          <sphereGeometry args={[0.326, 32, 16, 0, PI, PI * 0.52, PI * 0.48]} />
          <Mat color={color} opacity={0.35} />
        </mesh>
      );
    case "goatee":
      return (
        <RoundedBox args={[0.13, 0.11, 0.07]} radius={0.03} position={[0, -0.27, 0.22]}>
          <Mat color={color} />
        </RoundedBox>
      );
    case "full":
      return (
        <>
          {[0, 0.68].map((start) => (
            <mesh key={start} position={[0, -0.02, 0]} scale={[1.04, 1.1, 1.04]}>
              <sphereGeometry args={[0.33, 16, 16, PI * start, PI * 0.32, PI * 0.5, PI * 0.5]} />
              <Mat color={color} />
            </mesh>
          ))}
          <RoundedBox args={[0.3, 0.13, 0.2]} radius={0.05} position={[0, -0.27, 0.17]}>
            <Mat color={color} />
          </RoundedBox>
          <RoundedBox args={[0.42, 0.16, 0.34]} radius={0.07} position={[0, -0.34, 0.02]}>
            <Mat color={color} />
          </RoundedBox>
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
