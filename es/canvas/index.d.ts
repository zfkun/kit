declare const _default: {
    utils: {
        newPoint: (x: number, y: number) => import("./types").Point;
        newRGBA: (r: number, g: number, b: number, a: number) => import("./types").Rgba;
        getRGBA: (ctx: CanvasRenderingContext2D, color: string | CanvasGradient | CanvasPattern) => import("./types").Rgba;
    };
    path: {
        line: typeof import("./path/line");
    };
    shape: {
        line: typeof import("./shape/line");
    };
};
export default _default;
