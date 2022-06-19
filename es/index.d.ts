declare const _default: {
    canvas: {
        utils: {
            newPoint: (x: number, y: number) => import("./canvas/types").Point;
            newRGBA: (r: number, g: number, b: number, a: number) => import("./canvas/types").Rgba;
            getRGBA: (ctx: CanvasRenderingContext2D, color: string | CanvasGradient | CanvasPattern) => import("./canvas/types").Rgba;
        };
        path: {
            line: typeof import("./canvas/path/line");
        };
        shape: {
            line: typeof import("./canvas/shape/line");
        };
    };
};
export default _default;
