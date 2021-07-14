import Sketch from '@/engines/Three/Three';
import Config from '@/engines/Three/Three-config';
import { Vector3 } from 'three';
import Street from './entities/Street';
import Fireflies from './entities/Fireflies';

export default class StreetSketch extends Sketch {

  init(canvasEl: HTMLCanvasElement): void {
    super.init(canvasEl, 'orthographic');

    const street = new Street();
    const fireflies = new Fireflies();

    this.setEntity(street);
    this.setEntity(fireflies);

    const camera = this.getCamera() as THREE.OrthographicCamera;

    camera.position.set(1, 1.5, 1);

    camera.left = -3 * Config.aspRatio;
    camera.right = 3 * Config.aspRatio;
    camera.top = 3;
    camera.bottom = -3;

    camera.far = 1e4;
    camera.near = -10;

    this.getControls().target = new Vector3(0, 1, 0);

    camera.updateProjectionMatrix();

    this.isReadyToRender = true;
  }

}
