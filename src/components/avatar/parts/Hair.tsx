import type { AvatarConfig } from "@/lib/avatar/types";
import { HEAD_R } from "../dims";

const PI = Math.PI;
const R = HEAD_R + 0.05;
const TOP = 0.4;

interface Props {
  color: string;
}

function Mat({ color }: Props) {
  return <meshStandardMaterial color={color} roughness={0.75} />;
}

function Cap({ r = R, length, y = 0.03, color }: Props & { r?: number; length: number; y?: number }) {
  return (
    <group position={[0, y, 0]}>
      <mesh castShadow>
        <sphereGeometry args={[r, 48, 24, 0, PI * 2, 0, PI * TOP]} />
        <Mat color={color} />
      </mesh>
      <mesh castShadow>
        <sphereGeometry args={[r, 48, 24, PI * 0.78, PI * 1.44, PI * TOP, PI * (length - TOP)]} />
        <Mat color={color} />
      </mesh>
    </group>
  );
}

function Sweep({ color, side = 1 }: Props & { side?: number }) {
  return (
    <mesh position={[side * 0.16, R * 0.62, HEAD_R * 0.62]} rotation={[0.2, 0, side * -0.42]} scale={[1.5, 0.5, 1]} castShadow>
      <sphereGeometry args={[0.28, 24, 24]} />
      <Mat color={color} />
    </mesh>
  );
}

function SideLock({ color, side, drop = 0.3 }: Props & { side: number; drop?: number }) {
  return (
    <mesh position={[side * (HEAD_R - 0.06), -drop / 2, 0.06]} rotation={[0, 0, side * 0.06]} scale={[0.5, 1, 0.85]} castShadow>
      <capsuleGeometry args={[0.2, drop, 6, 20]} />
      <Mat color={color} />
    </mesh>
  );
}

function Back({ h, y, taper = 1, color }: Props & { h: number; y: number; taper?: number }) {
  return (
    <mesh position={[0, y, 0]} castShadow>
      <cylinderGeometry args={[R, R * taper, h, 48, 1, false, PI * 0.28, PI * 1.44]} />
      <Mat color={color} />
    </mesh>
  );
}

const curls = [
  [0.1, 5],
  [0.25, 9],
  [0.4, 12],
].flatMap(([theta, count]) =>
  Array.from({ length: count }, (_, i) => {
    const phi = (i / count) * PI * 2 + theta;
    const r = HEAD_R + 0.04;
    return [r * Math.sin(theta * PI) * Math.cos(phi), r * Math.cos(theta * PI) + 0.03, r * Math.sin(theta * PI) * Math.sin(phi)] as const;
  }).filter(([, y, z]) => y > 0.25 || z < 0.15),
);

export function Hair({ config }: { config: AvatarConfig }) {
  const color = config.hairColor;
  switch (config.hairStyle) {
    case "bald":
      return null;
    case "buzz":
      return <Cap r={HEAD_R + 0.015} length={0.58} color={color} />;
    case "short":
      return <Cap length={0.64} color={color} />;
    case "quiff":
      return (
        <>
          <Cap length={0.6} color={color} />
          <mesh position={[0, 0.48, 0.2]} rotation={[-0.45, 0, 0]} scale={[1.35, 0.75, 0.95]} castShadow>
            <sphereGeometry args={[0.3, 24, 24]} />
            <Mat color={color} />
          </mesh>
        </>
      );
    case "sidePart":
      return (
        <>
          <Cap length={0.64} color={color} />
          <Sweep color={color} />
        </>
      );
    case "curly":
      return (
        <>
          <Cap length={0.64} color={color} />
          {curls.map((p, i) => (
            <mesh key={i} position={[p[0], p[1], p[2]]} castShadow>
              <sphereGeometry args={[0.15, 14, 14]} />
              <Mat color={color} />
            </mesh>
          ))}
        </>
      );
    case "pixie":
      return (
        <>
          <Cap length={0.7} color={color} />
          <Sweep color={color} side={-1} />
        </>
      );
    case "bob":
      return (
        <>
          <Cap length={0.6} color={color} />
          <Back h={0.6} y={-0.15} taper={1.08} color={color} />
          {[-1, 1].map((s) => (
            <SideLock key={s} color={color} side={s} drop={0.18} />
          ))}
        </>
      );
    case "long":
      return (
        <>
          <Cap length={0.6} color={color} />
          <Back h={1.3} y={-0.5} taper={0.78} color={color} />
          {[-1, 1].map((s) => (
            <SideLock key={s} color={color} side={s} drop={0.7} />
          ))}
        </>
      );
    case "ponytail":
      return (
        <>
          <Cap length={0.66} color={color} />
          <Sweep color={color} />
          <mesh position={[0, -0.2, -0.62]} rotation={[0.3, 0, 0]} castShadow>
            <capsuleGeometry args={[0.13, 0.8, 6, 16]} />
            <Mat color={color} />
          </mesh>
          <mesh position={[0, 0.2, -0.55]} rotation={[1, 0, 0]}>
            <torusGeometry args={[0.12, 0.04, 8, 20]} />
            <meshStandardMaterial color="#d8425c" roughness={0.6} />
          </mesh>
        </>
      );
    case "bun":
      return (
        <>
          <Cap length={0.64} color={color} />
          <Sweep color={color} />
          <mesh position={[0, 0.45, -0.38]} castShadow>
            <sphereGeometry args={[0.24, 20, 20]} />
            <Mat color={color} />
          </mesh>
        </>
      );
  }
}
