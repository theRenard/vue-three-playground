import Sketch from '@/engines/Three/Three';
import Planet from './entities/Planet';
import Lights from './entities/Lights';

export default class AirplaneSketch extends Sketch {

  init(canvasEl: HTMLCanvasElement): void {
    super.init(canvasEl, 'perspective');

    const lights = new Lights();
    const planet = new Planet();

    this.setEntity(lights);
    this.setEntity(planet);

    this.getCamera().position.x = 10;
    this.getCamera().position.y = 10;
    this.getCamera().position.z = 10;

    this.isReadyToRender = true;
  }

}
