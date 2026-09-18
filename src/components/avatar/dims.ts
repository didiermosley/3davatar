import type { Gender, Pose } from "@/lib/avatar/types";

export const HEAD_Y = 2.08;
export const HEAD_R = 0.56;
export const SHOULDER_Y = 1.32;
export const HIP_Y = 0.78;
export const LEG_PIVOT_Y = 0.74;
export const LEG_X = 0.2;

export interface BodyDims {
  shoulder: number;
  hip: number;
  depth: number;
}

export const bodyDims: Record<Gender, BodyDims> = {
  male: { shoulder: 0.84, hip: 0.64, depth: 0.5 },
  female: { shoulder: 0.72, hip: 0.7, depth: 0.46 },
};

export const armX = (d: BodyDims) => d.shoulder / 2 + 0.1;

type Euler = [number, number, number];

export const poseRotations: Record<Pose, { arm: (side: number) => Euler; leg: (side: number) => Euler }> = {
  idle: { arm: (s) => [0, 0, s * 0.16], leg: () => [0, 0, 0] },
  walk: { arm: (s) => [s * 0.62, 0, s * 0.12], leg: (s) => [-s * 0.5, 0, 0] },
  wave: { arm: (s) => (s > 0 ? [0, 0, 2.45] : [0.1, 0, -0.16]), leg: () => [0, 0, 0] },
};
