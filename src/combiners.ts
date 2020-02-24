import * as colors from "./colors.js";
import {Color, Shape, Texture} from './types.js';

export function finalize<T, U>(notComplete: Texture<T|undefined>, background: Texture<U>): Texture<T|U> {
  return (x, y) => notComplete(x, y) || background(x,y);
}

export function layer<T>(...textures: Texture<T|undefined>[]): Texture<T|undefined> {
  return (x, y) => {
    for (const tex of textures) {
      const res = tex(x, y);
      if (res) {
        return res
      }
    }
  }
}

export function union(shape1: Shape, shape2: Shape): Shape {
  return (x, y) => shape1(x, y) || shape2(x, y)
}

export function intesect(shape1: Shape, shape2: Shape): Shape {
  return (x, y) => shape1(x, y) && shape2(x, y)
}

export function cut(shape1: Shape, shape2: Shape): Shape {
  return (x, y) => shape1(x, y) && !shape2(x, y);
}