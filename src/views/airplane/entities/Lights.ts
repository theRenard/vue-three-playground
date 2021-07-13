/* eslint-disable newline-per-chained-call */
import { AmbientLight, DirectionalLight, PointLight } from 'three';
import Entity from '@/engines/Three/Three-Entity';

export default class Airplane extends Entity {
  ambientLight: AmbientLight;
  moonLight: DirectionalLight;
  doorLight: PointLight;
  init(): void {

    this.ambientLight = new AmbientLight('#b9d5ff', 0.12);

    this.moonLight = new DirectionalLight('#ffffff', 0.5);
    this.moonLight.position.set(4, 5, -2);
    this.moonLight.castShadow = true;

    this.doorLight = new PointLight('#ff7d46', 1, 7);
    this.doorLight.position.set(0, 2.2, 2.7);
    this.doorLight.castShadow = true;
    this.getSketch().getScene().add(this.ambientLight);
    this.getSketch().getScene().add(this.moonLight);
    this.getSketch().getScene().add(this.doorLight);

    this.getSketch().getGui().add(this.ambientLight, 'intensity').min(0).max(1).step(0.001);
    this.getSketch().getGui().add(this.moonLight, 'intensity').min(0).max(1).step(0.001);
    this.getSketch().getGui().add(this.moonLight.position, 'x').min(-5).max(5).step(0.001);
    this.getSketch().getGui().add(this.moonLight.position, 'y').min(-5).max(5).step(0.001);
    this.getSketch().getGui().add(this.moonLight.position, 'z').min(-5).max(5).step(0.001);
    console.log('add ligths');

  }

  // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-empty-function
  update(): void {
  }

  destroy(): void {
    this.getSketch().getScene().remove(this.ambientLight);
    this.getSketch().getScene().remove(this.moonLight);
    this.getSketch().getScene().remove(this.doorLight);
    console.log('removed lights');

  }
}
