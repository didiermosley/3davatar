import type { Gender } from "@/lib/avatar/types";

export const HEAD_Y = 2.0;
export const HEAD_R = 0.32;
export const SHOULDER_Y = 1.5;
export const HIP_Y = 0.95;
export const LEG_X = 0.17;

export interface BodyDims {
  shoulder: number;
  hip: number;
  depth: number;
}

export const bodyDims: Record<Gender, BodyDims> = {
  male: { shoulder: 0.68, hip: 0.5, depth: 0.34 },
  female: { shoulder: 0.56, hip: 0.56, depth: 0.3 },
};

export const armX = (d: BodyDims) => d.shoulder / 2 + 0.08;
