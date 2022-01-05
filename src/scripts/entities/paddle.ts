import { Entity } from "./entity";

export class Paddle extends Entity {
    private readonly dimensions: { w: number, h: number };

    constructor(params: { x?: number, y?: number, w?: number, h?: number }) {
        super();

        const {
            x = 0,
            y = 0,
            w = 20,
            h = 100
        } = params;

        this.position = { x, y };
        this.dimensions = { w, h };
        this.velocity = { x: 0, y: 0 };
    };

    get width(): number {
        return this.dimensions.w;
    };

    get height(): number {
        return this.dimensions.h;
    };

    get yCenter(): number {
        return this.position.y + this.dimensions.h / 2;
    };
    set yCenter(val: number) {
        this.position.y = val - this.dimensions.h / 2;
    };

    get top(): number {
        return this.position.y;
    };
    set top(val: number) {
        this.position.y = val;
    };

    get bottom(): number {
        return this.position.y + this.dimensions.h;
    };
    set bottom(val: number) {
        this.position.y = val - this.dimensions.h;
    };

    get left(): number {
        return this.position.x;
    };
    set left(val: number) {
        this.position.x = val;
    };

    get right(): number {
        return this.position.x + this.dimensions.w;
    };
    set right(val: number) {
        this.position.x = val - this.dimensions.w;
    };
};
