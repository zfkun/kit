import { Point } from '../../types';
import { draw } from '../../path/line';

/**
 * 双线配置
 */
export declare interface ShapeLineTowParams {
    color?: string,
    lineWidth?: number,
    borderWidth?: number,
    shadowBlur?: number,
    reflectOffset?: boolean,
}

/**
 * 绘制空心连线
 *
 * @param ctx 2D渲染上下文
 * @param points 坐标点列表
 * @param options 绘制配置
 */
export const drawHollow = (ctx: CanvasRenderingContext2D, points: Point[], options: ShapeLineTowParams) => {
    //  绘制底层连线
    draw(ctx, points);

    // 绘制上层空心
    ctx.lineWidth = options.lineWidth;
    ctx.strokeStyle = options.color;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  
    ctx.shadowColor = options.color;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.shadowBlur = options.shadowBlur;
    ctx.stroke();

    ctx.globalCompositeOperation = 'destination-out';
    ctx.lineWidth -= options.borderWidth;
    ctx.strokeStyle = options.color;
    ctx.stroke();

    ctx.globalCompositeOperation = 'source-over';
}