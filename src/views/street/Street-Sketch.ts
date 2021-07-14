import Sketch from '@/engines/Three/Three';
import Config from '@/engines/Three/Three-config';
import Street from './entities/Street';

export default class StreetSketch extends Sketch {

  init(canvasEl: HTMLCanvasElement): void {
    super.init(canvasEl, 'orthographic');

    const street = new Street();

    this.setEntity(street);

    const camera = this.getCamera() as THREE.OrthographicCamera;

    camera.position.set(1, 1, 1);

    camera.left = -3 * Config.aspRatio;
    camera.right = 3 * Config.aspRatio;
    camera.top = 3;
    camera.bottom = -3;

    camera.far = 1e4;
    camera.near = -10;

    camera.updateProjectionMatrix();

    this.isReadyToRender = true;
  }

}
