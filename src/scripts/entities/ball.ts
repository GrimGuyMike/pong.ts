import { Entity } from "./entity";

export class Ball extends Entity {
	private readonly dimensions: { r: number };
	private _launched = false;
	
	constructor(params: { x?: number, y?: number, r?: number }) {
		super();

		const {
			x = 0,
			y = 0,
			r = 5
		} = params;

		this.position = { x, y };
		this.dimensions = { r };
		this.velocity = { x: 0, y: 0 };
		this.launched = false;
	};

	get radius(): number {
		return this.dimensions.r;
	};

	get launched(): boolean {
		return this._launched;
	};
	set launched(val: boolean) {
		if(!val) {
			this.velocity.x = 0;
			this.velocity.y = 0;
		}
		this._launched = val;
	};

	get yCenter(): number {
		return this.position.y;
	};
	set yCenter(val: number) {
		this.position.y = val;
	};

	get top(): number {
		return this.position.y - this.dimensions.r;
	}
	set top(val: number) {
		this.position.y = val + this.dimensions.r;
	};

	get bottom(): number {
		return this.position.y + this.dimensions.r;
	};
	set bottom(val: number) {
		this.position.y = val - this.dimensions.r;
	};

	get left(): number {
		return this.position.x - this.dimensions.r;
	};
	set left(val: number) {
		this.position.x = val + this.dimensions.r;
	};

	get right(): number {
		return this.position.x + this.dimensions.r;
	};
	set right(val: number) {
		this.position.x = val - this.dimensions.r;
	};
};
