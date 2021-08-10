import Entity from '@/engines/Three/Three-Entity';
import {
  DirectionalLight,
} from 'three';

export default class Clouds extends Entity {
  name = 'Lights';
  lightOne: DirectionalLight;
  lightTwo: DirectionalLight;
  init(): void {

    this.lightOne = new DirectionalLight(0x808080, 100);
    this.lightOne.position.set(-100, 100, -100);
    this.lightOne.target.position.set(0, 0, 0);
    this.lightOne.castShadow = false;
    this.getSketch().getScene().add(this.lightOne);

    this.lightTwo = new DirectionalLight(0x404040, 100);
    this.lightTwo.position.set(100, 100, -100);
    this.lightTwo.target.position.set(0, 0, 0);
    this.lightTwo.castShadow = false;
    this.getSketch().getScene().add(this.lightTwo);

  }

  // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-empty-function
  update(): void {
  }
  destroy(): void {
    this.getSketch().getScene().remove(this.lightOne);
    this.getSketch().getScene().remove(this.lightTwo);
    console.log('removed lights');
  }
}
