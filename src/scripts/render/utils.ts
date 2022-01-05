import { Ball, Paddle } from "../entities";
import { Entity } from "../entities/entity";

export function drawEntity(ctx: CanvasRenderingContext2D, entity: Entity): void {
    if(entity instanceof Paddle) {
        ctx.fillRect(entity.xPos, entity.yPos, entity.width, entity.height);
    } else if(entity instanceof Ball) {
        const fullCircle = 2 * Math.PI;

        ctx.beginPath();
        ctx.arc(entity.xPos, entity.yPos, entity.radius, 0, fullCircle);
        ctx.fill();
    }
};
