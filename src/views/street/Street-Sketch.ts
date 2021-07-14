import Sketch from '@/engines/Three/Three';
import Street from './entities/Street';

export default class StreetSketch extends Sketch {

  init(canvasEl: HTMLCanvasElement): void {
    super.init(canvasEl, 'orthographic');

    const street = new Street();

    this.setEntity(street);

    this.getCamera().position.x = 1;
    this.getCamera().position.y = 1;
    this.getCamera().position.z = 1;

    this.isReadyToRender = true;
  }

}
