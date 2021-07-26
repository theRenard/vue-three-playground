import Sketch from '@/engines/Three/Three';
import Materials from './entities/Materials';
import Lights from './entities/Lights';

export default class AirplaneSketch extends Sketch {

  lights: Lights;
  init(canvasEl: HTMLCanvasElement): void {
    super.init(canvasEl, 'perspective');

    this.lights = new Lights();
    const materials = new Materials();

    this.setEntity(this.lights);
    this.setEntity(materials);

    this.getCamera().position.x = 10;
    this.getCamera().position.y = 10;
    this.getCamera().position.z = 10;

    this.isReadyToRender = true;
  }

}
