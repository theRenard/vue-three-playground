/* eslint-disable newline-per-chained-call */
import {
  AmbientLight, DirectionalLight, SpotLight, DirectionalLightHelper, CameraHelper,
} from 'three';
import Entity from '@/engines/Three/Three-Entity';
import Material from './Materials';

export default class Lights extends Entity {
  name = 'Lights';
  private ambientLight: AmbientLight;
  private directionalLight: DirectionalLight;
  private directionalLightHelper: DirectionalLightHelper;
  public spotLight: SpotLight;

  private spotLightCameraHelper: CameraHelper;
  init(): void {

    this.ambientLight = new AmbientLight('#b9d5ff', 0.12);
    this.directionalLight = new DirectionalLight('#ffffff', 0.5);
    this.directionalLight.position.set(4, 5, -2);
    this.directionalLightHelper = new DirectionalLightHelper(this.directionalLight, 5);

    this.getSketch().getScene().add(this.ambientLight);
    this.getSketch().getScene().add(this.directionalLightHelper);
    this.getSketch().getScene().add(this.directionalLight);

    this.spotLight = new SpotLight(0xffffff, 1, 1, Math.PI * 0.3);

    this.spotLight.castShadow = true;
    this.spotLight.shadow.mapSize.width = 1024;
    this.spotLight.shadow.mapSize.height = 1024;
    this.spotLight.shadow.camera.fov = 30;
    this.spotLight.shadow.camera.near = 1;
    this.spotLight.shadow.camera.far = 6;
    this.getSketch().getScene().add(this.spotLight);
    this.getSketch().getScene().add(this.spotLight.target);

    this.spotLightCameraHelper = new CameraHelper(this.spotLight.shadow.camera);
    this.getSketch().getScene().add(this.spotLightCameraHelper);

    console.log('add ligths');

  }

  update(elapsedTime: number): void {
    this.spotLight.position.x = Math.sin(elapsedTime * 0.5) * 3;
    this.spotLight.position.z = Math.cos(elapsedTime * 0.5) * 3;
    this.spotLight.position.y = 1;
    const cubeEntity = this.getSketch().getEntityByName('cube') as Material;
    if (cubeEntity) this.spotLight.lookAt(cubeEntity.cubeMesh.position);
  }

  destroy(): void {
    this.getSketch().getScene().remove(this.ambientLight);
    this.getSketch().getScene().remove(this.directionalLight);
    this.getSketch().getScene().remove(this.directionalLightHelper);

    this.getSketch().getScene().remove(this.spotLight.target);
    this.getSketch().getScene().remove(this.spotLight);
    this.getSketch().getScene().remove(this.spotLightCameraHelper);
    console.log('removed lights');

  }
}
