import { Entity } from "../entities/entity";
import { drawEntity } from "./utils";

export type CanvasDimensions = { w: number, h: number };
export type ColorScheme = { main: string, background: string };

export class Renderer {
    public readonly canvas: HTMLCanvasElement;
    private readonly context: CanvasRenderingContext2D;
    private readonly dimensions: CanvasDimensions;
    private readonly color: ColorScheme;

    constructor(dimensions: CanvasDimensions, color?: ColorScheme) {
        const canvas = document.createElement('canvas');
        canvas.width = dimensions.w;
        canvas.height = dimensions.h;
        canvas.id = 'field';
        document.body.appendChild(canvas);

        this.canvas = canvas;
        this.dimensions = dimensions;

        const ctx = canvas.getContext('2d');
        if(ctx) this.context = ctx;
        else throw new Error('cannot get context');

        if(color) this.color = color;
        else this.color = {
            main: 'white',
            background: 'black'
        };
    };

    clear(): void {
        this.context.fillStyle = this.color.background;
        this.context.clearRect(0, 0, this.dimensions.w, this.dimensions.h);
        this.context.fillRect(0, 0, this.dimensions.w, this.dimensions.h);
    };

    drawFrame(entities: Entity[]): void {
        this.clear();

        this.context.fillStyle = this.color.main;
        entities.forEach(entity => {
            drawEntity(this.context, entity);
        });
    };
};