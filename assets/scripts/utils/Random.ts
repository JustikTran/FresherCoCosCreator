import { Vec3 } from "cc";

export function RandomPosition(minX: number, maxX: number, minY: number, maxY: number): Vec3 {
  const x = randomRange(minX, maxX);
  const y = randomRange(minY, maxY);

  return new Vec3(x, y);
}

export function RandomIndex(param: number): number {
  return Math.floor(randomRange(0, param));
}

function randomRange(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}