import { Point } from '../../types';
/**
 * 双线配置
 */
export declare interface ShapeLineTowParams {
    color?: string;
    lineWidth?: number;
    borderWidth?: number;
    shadowBlur?: number;
    reflectOffset?: boolean;
}
/**
 * 绘制空心连线
 *
 * @param ctx 2D渲染上下文
 * @param points 坐标点列表
 * @param options 绘制配置
 */
export declare const drawHollow: (ctx: CanvasRenderingContext2D, points: Point[], options: ShapeLineTowParams) => void;
