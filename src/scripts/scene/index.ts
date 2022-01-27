import { Controller } from "../controller";
import { FieldDimensions, ColorScheme, Renderer } from "../render";

export class Scene {
	private readonly renderer: Renderer;
	private readonly controller: Controller;

	constructor(dimensions: FieldDimensions, color?: ColorScheme) {
		this.renderer = new Renderer(dimensions, color);
		this.controller = new Controller(dimensions);
	};

	start(): void {
		let last = performance.now();

		const loop = () => {
			const now = performance.now();
			const dt = now - last;
			last = now;

			this.renderer.drawFrame(this.controller.getEntities());
			this.controller.update(dt);

			requestAnimationFrame(loop);
		};

		loop();
	};
};