import { RoundedBox } from "@react-three/drei";
import type { AvatarConfig } from "@/lib/avatar/types";

const PI = Math.PI;

interface Props {
  color: string;
}

function Mat({ color }: Props) {
  return <meshStandardMaterial color={color} roughness={0.85} />;
}

const TOP = 0.38;

function Cap({ r, length, y = 0, color }: Props & { r: number; length: number; y?: number }) {
  return (
    <group position={[0, y, 0]}>
      <mesh castShadow>
        <sphereGeometry args={[r, 32, 16, 0, PI * 2, 0, PI * TOP]} />
        <Mat color={color} />
      </mesh>
      <mesh castShadow>
        <sphereGeometry args={[r, 32, 16, PI * 0.8, PI * 1.4, PI * TOP, PI * (length - TOP)]} />
        <Mat color={color} />
      </mesh>
    </group>
  );
}

function Bangs({ r, color }: Props & { r: number }) {
  return (
    <mesh position={[0, 0.03, 0]}>
      <sphereGeometry args={[r, 32, 8, PI * 0.22, PI * 0.56, PI * 0.3, PI * 0.14]} />
      <Mat color={color} />
    </mesh>
  );
}

function Back({ r, h, y, taper = 1, color }: Props & { r: number; h: number; y: number; taper?: number }) {
  return (
    <mesh position={[0, y, 0]} castShadow>
      <cylinderGeometry args={[r, r * taper, h, 32, 1, false, PI * 0.32, PI * 1.36]} />
      <Mat color={color} />
    </mesh>
  );
}

const curls = [
  [0.12, 5],
  [0.27, 9],
  [0.42, 12],
].flatMap(([theta, count]) =>
  Array.from({ length: count }, (_, i) => {
    const phi = (i / count) * PI * 2 + theta;
    const r = 0.34;
    return [r * Math.sin(theta * PI) * Math.cos(phi), r * Math.cos(theta * PI) + 0.02, r * Math.sin(theta * PI) * Math.sin(phi)] as const;
  }).filter(([, y, z]) => y > 0.12 || z < 0.1),
);

export function Hair({ config }: { config: AvatarConfig }) {
  const color = config.hairColor;
  switch (config.hairStyle) {
    case "bald":
      return null;
    case "buzz":
      return <Cap r={0.328} length={0.56} y={0.02} color={color} />;
    case "short":
      return <Cap r={0.345} length={0.6} y={0.03} color={color} />;
    case "quiff":
      return (
        <>
          <Cap r={0.345} length={0.52} y={0.02} color={color} />
          <RoundedBox args={[0.3, 0.16, 0.18]} radius={0.06} position={[0, 0.32, 0.15]} rotation={[-0.5, 0, 0]} castShadow>
            <Mat color={color} />
          </RoundedBox>
        </>
      );
    case "sidePart":
      return (
        <>
          <Cap r={0.345} length={0.55} y={0.02} color={color} />
          <RoundedBox args={[0.3, 0.09, 0.3]} radius={0.04} position={[0.08, 0.31, 0.06]} rotation={[0, 0, -0.35]} castShadow>
            <Mat color={color} />
          </RoundedBox>
        </>
      );
    case "curly":
      return (
        <>
          <Cap r={0.35} length={0.62} y={0.02} color={color} />
          {curls.map((p, i) => (
            <mesh key={i} position={[p[0], p[1], p[2]]} castShadow>
              <sphereGeometry args={[0.085, 12, 12]} />
              <Mat color={color} />
            </mesh>
          ))}
        </>
      );
    case "pixie":
      return (
        <>
          <Cap r={0.35} length={0.66} y={0.02} color={color} />
          <Bangs r={0.35} color={color} />
        </>
      );
    case "bob":
      return (
        <>
          <Cap r={0.36} length={0.55} y={0.03} color={color} />
          <Back r={0.36} h={0.42} y={-0.13} taper={1.05} color={color} />
          <Bangs r={0.36} color={color} />
        </>
      );
    case "long":
      return (
        <>
          <Cap r={0.36} length={0.55} y={0.03} color={color} />
          <Back r={0.36} h={0.95} y={-0.4} taper={0.75} color={color} />
        </>
      );
    case "ponytail":
      return (
        <>
          <Cap r={0.35} length={0.58} y={0.02} color={color} />
          <mesh position={[0, -0.1, -0.42]} rotation={[0.35, 0, 0]} castShadow>
            <capsuleGeometry args={[0.075, 0.5, 6, 12]} />
            <Mat color={color} />
          </mesh>
          <mesh position={[0, 0.14, -0.33]} rotation={[0.9, 0, 0]}>
            <torusGeometry args={[0.07, 0.025, 8, 16]} />
            <meshStandardMaterial color="#222222" roughness={0.6} />
          </mesh>
        </>
      );
    case "bun":
      return (
        <>
          <Cap r={0.345} length={0.58} y={0.02} color={color} />
          <mesh position={[0, 0.26, -0.24]} castShadow>
            <sphereGeometry args={[0.14, 16, 16]} />
            <Mat color={color} />
          </mesh>
        </>
      );
  }
}
