import { Shape, Texture } from "./types.js";

export function fill<T>(shape: Shape, texture: Texture<T>): Texture<T|undefined> {
  return (x, y) => shape(x, y) ? texture(x, y) : undefined;
} 

export function circle (r: number = 1, cx: number = 0, cy: number = 0): Shape {
  return (x, y) => {
    const dx = x - cx;
    const dy = y - cy;
    return Math.sqrt(dx * dx + dy * dy) < r 
  }
}