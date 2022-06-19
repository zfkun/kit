import { Rgba } from '../types';
export declare const newRGBA: (r: number, g: number, b: number, a: number) => Rgba;
export declare const getRGBA: (ctx: CanvasRenderingContext2D, color: string | CanvasGradient | CanvasPattern) => Rgba;
