
import { Point } from '../../types';

/**
 * 绘制连线
 *
 * @param ctx 2D渲染上下文
 * @param points 坐标点列表
 */
export const draw = (ctx: CanvasRenderingContext2D, points: Point[]): void => {
    if (points.length <= 0) return;
    ctx.beginPath();
    points.forEach((v, i) => {
        if (i === 0) ctx.moveTo(v.x, v.y);
        else ctx.lineTo(v.x, v.y);
    });
}
