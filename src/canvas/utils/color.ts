import { Rgba } from '../types';

export const newRGBA = (r: number, g: number, b: number, a: number): Rgba => {
    return { r, g, b, a, }
}

export const getRGBA = (ctx: CanvasRenderingContext2D, color: string | CanvasGradient | CanvasPattern): Rgba => {
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, 1, 1);
  const d = ctx.getImageData(0, 0, 1, 1).data;
  return newRGBA(d[0], d[1], d[2], d[3]);
}
