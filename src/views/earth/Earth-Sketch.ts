import Sketch from '@/engines/Three/Three';
import Lights from './entities/Lights';
import Earth from './entities/Earth';
import Galaxy from './entities/Galaxy';
import Clouds from './entities/Clouds';

export default class EarthSketch extends Sketch {

  init(canvasEl: HTMLCanvasElement): void {
    super.init(canvasEl, 'perspective');

    const lights = new Lights();
    const earth = new Earth();
    const galaxy = new Galaxy();
    const clouds = new Clouds();

    this.setEntity(lights);
    this.setEntity(earth);
    this.setEntity(galaxy);
    this.setEntity(clouds);

    this.getCamera().position.x = 1;
    this.getCamera().position.y = 1;
    this.getCamera().position.z = 1;

    this.isReadyToRender = true;
  }

}
