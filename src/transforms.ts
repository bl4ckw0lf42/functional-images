import { Texture, Image } from './types.js';
export type Transform<T extends Texture<any> = Texture<any> > = (tex: T) => T  

export function renderTransform(width: number, height: number): Transform<Image> {
  const halfWidth = width / 2;
  const halfHeight = height / 2;
  return (image: Image) => 
    (x: number, y: number) => 
      image(
        (x - halfWidth) / halfWidth,
        (y - halfHeight) / halfHeight
      );
}

export function translate(tx: number, ty: number): Transform {
  return (tex) =>
    (x, y) => tex(x - tx, y - ty);
}

export function scale(sx: number, sy: number): Transform {
  return (tex) =>
    (x, y) => tex(x / sx, y / sy)
}

export function rotate(phi: number): Transform {
  return (tex) =>
    (x, y) => {
      const sinPhi = Math.sin(phi);
      const cosPhi = Math.cos(phi);
      return tex(
        cosPhi * x - sinPhi * y,
        sinPhi * x + cosPhi * y
      )
    };
}