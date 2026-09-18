import { RoundedBox } from "@react-three/drei";
import type { AvatarConfig } from "@/lib/avatar/types";
import { bodyDims, HIP_Y, SHOULDER_Y } from "../dims";
import { BottomMaterial, Cloth, darken, Skin, TopMaterial } from "../materials";

function Straps({ color, width }: { color: string; width: number }) {
  return (
    <>
      {[-1, 1].map((s) => (
        <RoundedBox key={s} args={[0.09, 0.26, 0.09]} radius={0.03} position={[s * width, SHOULDER_Y - 0.1, 0.14]}>
          <Cloth color={color} />
        </RoundedBox>
      ))}
    </>
  );
}

function Collar({ color, depth }: { color: string; depth: number }) {
  return (
    <mesh position={[0, SHOULDER_Y + 0.02, 0]} rotation={[Math.PI / 2, 0, 0]} scale={[1, depth / 0.5, 1]}>
      <torusGeometry args={[0.2, 0.04, 10, 32]} />
      <Cloth color={color} />
    </mesh>
  );
}

export const BELLY_SPAN = 0.33;
export const BELLY_Y = HIP_Y + 0.26;

function Belly({ config }: { config: AvatarConfig }) {
  const d = bodyDims[config.gender];
  return (
    <mesh
      position={[0, BELLY_Y, 0.12]}
      scale={[(d.shoulder + 0.06) / 2, BELLY_SPAN, (d.depth + 0.34) / 2]}
      castShadow
    >
      <sphereGeometry args={[1, 40, 40]} />
      <TopMaterial config={config} />
    </mesh>
  );
}

function Torso({
  config,
  width,
  height,
  y,
  children,
}: {
  config: AvatarConfig;
  width: number;
  height: number;
  y: number;
  children: React.ReactNode;
}) {
  const d = bodyDims[config.gender];
  return (
    <RoundedBox args={[width, height, d.depth + 0.05]} radius={0.16} smoothness={6} position={[0, y, 0]} castShadow>
      {children}
    </RoundedBox>
  );
}

function Top({ config }: { config: AvatarConfig }) {
  const d = bodyDims[config.gender];
  const color = config.topColor;
  const torso = (w: number, h: number, y: number) => (
    <Torso config={config} width={w} height={h} y={y}>
      <TopMaterial config={config} />
    </Torso>
  );
  switch (config.top) {
    case "tshirt":
      return (
        <>
          {torso(d.shoulder + 0.05, 0.72, SHOULDER_Y - 0.3)}
          <Collar color={darken(color)} depth={d.depth} />
        </>
      );
    case "vneck":
      return (
        <>
          {torso(d.shoulder + 0.05, 0.72, SHOULDER_Y - 0.3)}
          <mesh position={[0, SHOULDER_Y + 0.02, d.depth / 2 + 0.03]} rotation={[0, 0, Math.PI]}>
            <coneGeometry args={[0.14, 0.22, 3]} />
            <Skin color={config.skinColor} />
          </mesh>
        </>
      );
    case "tank":
      return (
        <>
          {torso(d.shoulder - 0.16, 0.66, SHOULDER_Y - 0.34)}
          <Straps color={color} width={d.shoulder / 2 - 0.16} />
        </>
      );
    case "longsleeve":
      return (
        <>
          {torso(d.shoulder + 0.05, 0.72, SHOULDER_Y - 0.3)}
          <Collar color={darken(color)} depth={d.depth} />
        </>
      );
    case "hoodie":
      return (
        <>
          {torso(d.shoulder + 0.1, 0.74, SHOULDER_Y - 0.3)}
          <mesh position={[0, SHOULDER_Y + 0.12, -0.14]} rotation={[0.45, 0, 0]}>
            <torusGeometry args={[0.28, 0.1, 12, 28, Math.PI]} />
            <Cloth color={color} />
          </mesh>
          <RoundedBox args={[0.4, 0.2, 0.06]} radius={0.03} position={[0, HIP_Y + 0.12, d.depth / 2 + 0.05]}>
            <Cloth color={darken(color, 0.15)} />
          </RoundedBox>
          {[-1, 1].map((s) => (
            <mesh key={s} position={[s * 0.08, SHOULDER_Y - 0.12, d.depth / 2 + 0.06]}>
              <cylinderGeometry args={[0.015, 0.015, 0.3, 8]} />
              <Cloth color="#f2f2f2" />
            </mesh>
          ))}
        </>
      );
    case "uniform":
      return (
        <>
          {torso(d.shoulder + 0.05, 0.72, SHOULDER_Y - 0.3)}
          <RoundedBox
            args={[d.shoulder - 0.24, 0.52, d.depth + 0.16]}
            radius={0.13}
            smoothness={6}
            position={[0, SHOULDER_Y - 0.3, 0]}
            castShadow
          >
            <Cloth color="#3a3f2e" />
          </RoundedBox>
          {[-1, 1].map((s) => (
            <RoundedBox key={s} args={[0.1, 0.42, 0.1]} radius={0.04} position={[s * 0.26, SHOULDER_Y - 0.14, 0]} castShadow>
              <Cloth color="#2f3326" />
            </RoundedBox>
          ))}
          {[-1, 1].map((s) => (
            <RoundedBox key={s} args={[0.15, 0.13, 0.05]} radius={0.03} position={[s * 0.15, SHOULDER_Y - 0.26, d.depth / 2 + 0.11]}>
              <Cloth color="#2a2f22" />
            </RoundedBox>
          ))}
          <RoundedBox args={[d.hip + 0.1, 0.08, d.depth + 0.06]} radius={0.02} position={[0, HIP_Y + 0.12, 0]}>
            <Cloth color="#2a2418" />
          </RoundedBox>
          <RoundedBox args={[0.1, 0.07, 0.03]} radius={0.01} position={[0, HIP_Y + 0.12, d.depth / 2 + 0.04]}>
            <meshStandardMaterial color="#c9a24e" metalness={0.6} roughness={0.35} />
          </RoundedBox>
        </>
      );
  }
}

function Bottom({ config }: { config: AvatarConfig }) {
  const d = bodyDims[config.gender];
  if (config.bottom === "skirt") {
    return (
      <mesh position={[0, HIP_Y - 0.2, 0]} castShadow>
        <cylinderGeometry args={[d.hip / 2 + 0.03, 0.55, 0.56, 40]} />
        <BottomMaterial config={config} />
      </mesh>
    );
  }
  return (
    <RoundedBox args={[d.hip + 0.05, 0.36, d.depth + 0.03]} radius={0.12} smoothness={6} position={[0, HIP_Y - 0.02, 0]} castShadow>
      <BottomMaterial config={config} />
    </RoundedBox>
  );
}

function Dress({ config }: { config: AvatarConfig }) {
  const d = bodyDims[config.gender];
  const gown = config.dress === "gown";
  const hem = gown ? HIP_Y - 0.85 : HIP_Y - 0.42;
  const waistY = config.pregnant ? SHOULDER_Y - 0.24 : HIP_Y + 0.1;
  const waist = config.pregnant ? (d.shoulder + 0.1) / 2 : d.hip / 2 + 0.05;
  const height = waistY - hem;
  return (
    <>
      <Torso config={config} width={d.shoulder - 0.06} height={config.pregnant ? 0.4 : 0.66} y={SHOULDER_Y - 0.18}>
        <Cloth color={config.dressColor} />
      </Torso>
      <Straps color={config.dressColor} width={d.shoulder / 2 - 0.16} />
      <mesh position={[0, waistY - height / 2, 0]} castShadow>
        <cylinderGeometry args={[waist, waist + (gown ? 0.28 : 0.2), height, 40]} />
        <Cloth color={config.dressColor} />
      </mesh>
      <mesh position={[0, waistY, 0]} rotation={[Math.PI / 2, 0, 0]} scale={[1, d.depth / d.hip, 1]}>
        <torusGeometry args={[waist, 0.035, 10, 40]} />
        <Cloth color={darken(config.dressColor)} />
      </mesh>
    </>
  );
}

export function Outfit({ config }: { config: AvatarConfig }) {
  return (
    <>
      {config.dress !== "none" ? (
        <Dress config={config} />
      ) : (
        <>
          <Top config={config} />
          <Bottom config={config} />
        </>
      )}
      {config.pregnant && <Belly config={config} />}
    </>
  );
}
