import { RoundedBox } from "@react-three/drei";
import type { AvatarConfig } from "@/lib/avatar/types";
import { armX, bodyDims, HIP_Y, LEG_X, SHOULDER_Y } from "../dims";

function Cloth({ color }: { color: string }) {
  return <meshStandardMaterial color={color} roughness={0.8} />;
}

function Sleeves({ length, color, x }: { length: number; color: string; x: number }) {
  return (
    <>
      {[-1, 1].map((s) => (
        <group key={s} position={[s * x, SHOULDER_Y - 0.02, 0]} rotation={[0, 0, s * -0.14]}>
          <mesh position={[0, -length / 2 - 0.02, 0]} castShadow>
            <capsuleGeometry args={[0.105, length, 4, 16]} />
            <Cloth color={color} />
          </mesh>
        </group>
      ))}
    </>
  );
}

function Straps({ color, width }: { color: string; width: number }) {
  return (
    <>
      {[-1, 1].map((s) => (
        <RoundedBox key={s} args={[0.06, 0.2, 0.06]} radius={0.02} position={[s * width, SHOULDER_Y - 0.07, 0.11]}>
          <Cloth color={color} />
        </RoundedBox>
      ))}
    </>
  );
}

function Top({ config }: { config: AvatarConfig }) {
  const d = bodyDims[config.gender];
  const color = config.topColor;
  const torso = (w: number, h: number, y: number) => (
    <RoundedBox args={[w, h, d.depth + 0.04]} radius={0.1} position={[0, y, 0]} castShadow>
      <Cloth color={color} />
    </RoundedBox>
  );
  switch (config.top) {
    case "tshirt":
      return (
        <>
          {torso(d.shoulder + 0.04, 0.68, SHOULDER_Y - 0.3)}
          <Sleeves length={0.18} color={color} x={armX(d)} />
        </>
      );
    case "vneck":
      return (
        <>
          {torso(d.shoulder + 0.04, 0.68, SHOULDER_Y - 0.3)}
          <Sleeves length={0.18} color={color} x={armX(d)} />
          <mesh position={[0, SHOULDER_Y + 0.02, d.depth / 2 + 0.02]} rotation={[0, 0, Math.PI]}>
            <coneGeometry args={[0.1, 0.16, 3]} />
            <meshStandardMaterial color={config.skinColor} roughness={0.65} />
          </mesh>
        </>
      );
    case "tank":
      return (
        <>
          {torso(d.shoulder - 0.12, 0.62, SHOULDER_Y - 0.34)}
          <Straps color={color} width={d.shoulder / 2 - 0.12} />
        </>
      );
    case "longsleeve":
      return (
        <>
          {torso(d.shoulder + 0.04, 0.68, SHOULDER_Y - 0.3)}
          <Sleeves length={0.5} color={color} x={armX(d)} />
        </>
      );
    case "hoodie":
      return (
        <>
          {torso(d.shoulder + 0.08, 0.7, SHOULDER_Y - 0.3)}
          <Sleeves length={0.5} color={color} x={armX(d)} />
          <mesh position={[0, SHOULDER_Y + 0.1, -0.1]} rotation={[0.4, 0, 0]}>
            <torusGeometry args={[0.2, 0.07, 10, 24, Math.PI]} />
            <Cloth color={color} />
          </mesh>
          <RoundedBox args={[0.26, 0.14, 0.05]} radius={0.02} position={[0, HIP_Y + 0.1, d.depth / 2 + 0.04]}>
            <Cloth color={color} />
          </RoundedBox>
        </>
      );
  }
}

function Bottom({ config }: { config: AvatarConfig }) {
  const d = bodyDims[config.gender];
  const color = config.bottomColor;
  const hips = (
    <RoundedBox args={[d.hip + 0.04, 0.34, d.depth + 0.04]} radius={0.1} position={[0, HIP_Y - 0.02, 0]} castShadow>
      <Cloth color={color} />
    </RoundedBox>
  );
  switch (config.bottom) {
    case "pants":
      return (
        <>
          {hips}
          {[-1, 1].map((s) => (
            <mesh key={s} position={[s * LEG_X, 0.53, 0]} castShadow>
              <cylinderGeometry args={[0.16, 0.15, 0.78, 20]} />
              <Cloth color={color} />
            </mesh>
          ))}
        </>
      );
    case "shorts":
      return (
        <>
          {hips}
          {[-1, 1].map((s) => (
            <mesh key={s} position={[s * LEG_X, 0.72, 0]} castShadow>
              <cylinderGeometry args={[0.165, 0.16, 0.4, 20]} />
              <Cloth color={color} />
            </mesh>
          ))}
        </>
      );
    case "skirt":
      return (
        <mesh position={[0, HIP_Y - 0.25, 0]} castShadow>
          <cylinderGeometry args={[d.hip / 2 + 0.02, 0.42, 0.5, 32]} />
          <Cloth color={color} />
        </mesh>
      );
  }
}

function Dress({ config }: { config: AvatarConfig }) {
  const d = bodyDims[config.gender];
  const color = config.dressColor;
  const gown = config.dress === "gown";
  const height = gown ? 0.9 : 0.5;
  return (
    <>
      <RoundedBox args={[d.shoulder - 0.08, 0.6, d.depth + 0.04]} radius={0.1} position={[0, SHOULDER_Y - 0.36, 0]} castShadow>
        <Cloth color={color} />
      </RoundedBox>
      <Straps color={color} width={d.shoulder / 2 - 0.12} />
      <mesh position={[0, HIP_Y + 0.05 - height / 2, 0]} castShadow>
        <cylinderGeometry args={[d.hip / 2 + 0.04, gown ? 0.55 : 0.45, height, 32]} />
        <Cloth color={color} />
      </mesh>
    </>
  );
}

export function Outfit({ config }: { config: AvatarConfig }) {
  if (config.dress !== "none") return <Dress config={config} />;
  return (
    <>
      <Top config={config} />
      <Bottom config={config} />
    </>
  );
}
