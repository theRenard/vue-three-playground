import Entity from '@/engines/Three/Three-Entity';
import {
  AmbientLight, PointLight, PointLightHelper,
} from 'three';

export default class Clouds extends Entity {
  name = 'Lights';
  ambientlight: AmbientLight;
  pointLight: PointLight;
  Helper: PointLightHelper;

  init(): void {

    // ambient light
    this.ambientlight = new AmbientLight(0xffffff, 0.2);
    this.getSketch().getScene().add(this.ambientlight);

    // point light
    this.pointLight = new PointLight(0xffffff, 1);
    this.pointLight.position.set(5, 3, 5);
    this.getSketch().getScene().add(this.pointLight);

    // point light helper
    this.Helper = new PointLightHelper(this.pointLight);
    this.getSketch().getScene().add(this.Helper);
  }

  // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-empty-function
  update(): void {
  }
  destroy(): void {
    this.getSketch().getScene().remove(this.ambientlight);
    this.getSketch().getScene().remove(this.pointLight);
    this.getSketch().getScene().remove(this.Helper);
    console.log('removed lights');
  }
}
