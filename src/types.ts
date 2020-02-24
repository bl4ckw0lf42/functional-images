
export type Texture<T> = (x: number, y: number) => T

export type BoolFn = (...p :any[]) => boolean

export type Shape = Texture<boolean>

export type Color = [number, number, number]

export type Image = Texture<Color>