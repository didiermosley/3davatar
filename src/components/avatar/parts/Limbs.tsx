import { RoundedBox } from "@react-three/drei";
import type { AvatarConfig } from "@/lib/avatar/types";
import { armX, bodyDims, LEG_PIVOT_Y, LEG_X, poseRotations, SHOULDER_Y } from "../dims";
import { BottomMaterial, Camo, Cloth, darken, Skin, TopMaterial } from "../materials";
import { Shoe } from "./Shoe";

const ARM_R = 0.12;
const SLEEVE_R = 0.14;

function Sleeve({ config, length }: { config: AvatarConfig; length: number }) {
  const cuff = config.top === "uniform" ? "#2f3d25" : darken(config.topColor);
  return (
    <>
      <mesh position={[0, -length / 2 - 0.02, 0]} castShadow>
        <capsuleGeometry args={[SLEEVE_R, length, 6, 20]} />
        <TopMaterial config={config} />
      </mesh>
      <mesh position={[0, -length - 0.04, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[SLEEVE_R - 0.01, 0.035, 10, 24]} />
        <Cloth color={cuff} />
      </mesh>
    </>
  );
}

function sleeveLength(config: AvatarConfig) {
  if (config.dress !== "none") return 0;
  switch (config.top) {
    case "tank":
      return 0;
    case "tshirt":
    case "vneck":
      return 0.16;
    default:
      return 0.42;
  }
}

export function Arm({ side, config }: { side: number; config: AvatarConfig }) {
  const d = bodyDims[config.gender];
  const length = sleeveLength(config);
  return (
    <group position={[side * armX(d), SHOULDER_Y - 0.02, 0]} rotation={poseRotations[config.pose].arm(side)}>
      <mesh position={[0, -0.28, 0]} castShadow>
        <capsuleGeometry args={[ARM_R, 0.4, 6, 20]} />
        <Skin color={config.skinColor} />
      </mesh>
      {length > 0 && <Sleeve config={config} length={length} />}
      <mesh position={[0, -0.58, 0.02]} scale={[0.95, 1.15, 0.8]} castShadow>
        <sphereGeometry args={[0.125, 20, 20]} />
        <Skin color={config.skinColor} />
      </mesh>
      <mesh position={[side * -0.085, -0.52, 0.07]} castShadow>
        <sphereGeometry args={[0.048, 12, 12]} />
        <Skin color={config.skinColor} />
      </mesh>
    </group>
  );
}

function Pants({ config, side }: { config: AvatarConfig; side: number }) {
  if (config.dress !== "none" || config.bottom === "skirt") return null;
  const short = config.bottom === "shorts";
  const height = short ? 0.32 : 0.62;
  const y = -0.04 - height / 2;
  return (
    <>
      <mesh position={[0, y, 0]} castShadow>
        <cylinderGeometry args={[0.185, 0.17, height, 24]} />
        <BottomMaterial config={config} />
      </mesh>
      {!short && (
        <mesh position={[0, y - height / 2 + 0.02, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.16, 0.03, 10, 24]} />
          <Cloth color={config.bottom === "cargo" ? "#2f3d25" : darken(config.bottomColor)} />
        </mesh>
      )}
      {config.bottom === "cargo" && (
        <RoundedBox args={[0.08, 0.16, 0.18]} radius={0.02} position={[side * 0.17, -0.36, 0.02]} castShadow>
          <Camo />
        </RoundedBox>
      )}
    </>
  );
}

export function Leg({ side, config }: { side: number; config: AvatarConfig }) {
  return (
    <group position={[side * LEG_X, LEG_PIVOT_Y, 0]} rotation={poseRotations[config.pose].leg(side)}>
      <mesh position={[0, -0.32, 0]} castShadow>
        <capsuleGeometry args={[0.17, 0.36, 6, 20]} />
        <Skin color={config.skinColor} />
      </mesh>
      <Pants config={config} side={side} />
      <group position={[0, -LEG_PIVOT_Y, 0]}>
        <Shoe config={config} />
      </group>
    </group>
  );
}
