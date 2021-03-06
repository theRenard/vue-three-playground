import Sketch from '@/engines/Three/Three';
import Lights from './entities/Lights';
import Airplane from './entities/Airplane';
import Sea from './entities/Sea';

export default class AirplaneSketch extends Sketch {

  init(canvasEl: HTMLCanvasElement): void {
    super.init(canvasEl, 'orthographic');

    const lights = new Lights();
    const airplane = new Airplane();
    const sea = new Sea();

    this.setEntity(lights);
    this.setEntity(airplane);
    this.setEntity(sea);

    this.getCamera().position.x = 1;
    this.getCamera().position.y = 1;
    this.getCamera().position.z = 1;

    this.isReadyToRender = true;
  }

}
