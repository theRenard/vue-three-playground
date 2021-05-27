import Sketch from '@/Sketch';
import { Mesh, AxesHelper } from 'three';
// import clouds from './clouds';
import createSea from './sea';
import createLights from './lights';
import createAirplane from './airplane';

export default class AirplaneSketch extends Sketch {
  sea!: any;

  init(canvasEl: HTMLCanvasElement): void {
    super.init(canvasEl, 'orthographic');

    const { ambientLight, moonLight, doorLight } = createLights(this.gui);
    this.sea = createSea(this.gui);
    const airplane = createAirplane(this.scene);
    this.scene.add(moonLight);
    this.scene.add(this.sea);
    this.scene.add(ambientLight);
    this.scene.add(doorLight);
    // this.scene.add(clouds);

    this.camera.position.x = 1;
    this.camera.position.y = 1;
    this.camera.position.z = 1;

    const axesHelper = new AxesHelper(3);
    this.scene.add(axesHelper);
  }

  update(elapsedTime: number): void {
    if (this.sea) {
      this.sea.material.uniforms.uTime.value = elapsedTime;
    }
  }
}
