export type Vector = {
    x: number,
    y: number
};

export abstract class Entity {
    protected position: Vector;
    protected velocity: Vector;

    abstract yCenter: number;
    abstract top: number;
    abstract bottom: number;
    abstract left: number;
    abstract right: number;

    get xPos(): number {
        return this.position.x;
    };

    get yPos(): number {
        return this.position.y;
    };

    get xVelocity(): number {
        return this.velocity.x;
    };
    set xVelocity(val: number) {
        this.velocity.x = val;
    };

    get yVelocity(): number {
        return this.velocity.y;
    };
    set yVelocity(val: number) {
        this.velocity.y = val;
    };

    move(dt: number): void {
        this.position.x += this.velocity.x * dt;
        this.position.y += this.velocity.y * dt;
    };
};
