import Entity from '@/engines/Three/Three-Entity';
import {
  Mesh, Texture, SphereBufferGeometry, MeshPhongMaterial,
} from 'three';

export default class Clouds extends Entity {
  name: 'Clouds';
  cloudsGeometry: SphereBufferGeometry;
  cloudsMaterial: MeshPhongMaterial;
  cloudsMesh: Mesh;
  textures: { [key: string]: Texture };

  init(): void {

    this.textures = {
      earthClouds: this.getSketch().getLoaders().textureLoader.load('./textures/earth/earthCloud.png'),
    };

    // cloud Geometry
    this.cloudsGeometry = new SphereBufferGeometry(0.63, 32, 32);

    // clouds metarial
    this.cloudsMaterial = new MeshPhongMaterial({
      map: this.textures.earthClouds,
      transparent: true,
    });

    // clouds mesh
    this.cloudsMesh = new Mesh(this.cloudsGeometry, this.cloudsMaterial);
    this.getSketch().getScene().add(this.cloudsMesh);
  }

  // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-empty-function
  update(): void {
    this.cloudsMesh.rotation.y -= 0.001;
  }
  destroy(): void {
    this.getSketch().getScene().remove(this.cloudsMesh);
    this.cloudsGeometry.dispose();
    this.cloudsMaterial.dispose();
    this.textures.clouds.dispose();
    console.log('removed clouds');
  }
}
