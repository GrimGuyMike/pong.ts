import '../styles/index.css';
import { Scene } from './scene';

(function(): void {
    const scene = new Scene(
        { w: 1600, h: 900 }
    );

    scene.start();
})();
