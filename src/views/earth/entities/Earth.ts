import Entity from '@/engines/Three/Three-Entity';
import {
  Mesh, Texture, MeshPhongMaterial, SphereBufferGeometry,
} from 'three';

export default class Earth extends Entity {
  name: 'Earth';
  earthGeometry: SphereBufferGeometry;
  earthMaterial: MeshPhongMaterial;
  earthMesh: Mesh;
  textures: { [key: string]: Texture };

  init(): void {

    this.textures = {
      earthmap1k: this.getSketch().getLoaders().textureLoader.load('./textures/earth/earthmap1k.jpg'),
      earthbump: this.getSketch().getLoaders().textureLoader.load('./textures/earth/earthbump.jpg'),
    };

    this.earthGeometry = new SphereBufferGeometry(0.6, 32, 32);
    // earth material
    this.earthMaterial = new MeshPhongMaterial({
      // roughness: 1,
      // metalness: 0,
      map: this.textures.earthmap1k,
      bumpMap: this.textures.earthbump,
      bumpScale: 0.3,
    });
    this.earthMesh = new Mesh(this.earthGeometry, this.earthMaterial);
    this.getSketch().getScene().add(this.earthMesh);
  }

  // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-empty-function
  update(): void {
    this.earthMesh.rotation.y -= 0.0015;
  }
  destroy(): void {
    this.getSketch().getScene().remove(this.earthMesh);
    this.earthGeometry.dispose();
    this.earthMaterial.dispose();
    this.textures.earthmap1k.dispose();
    this.textures.earthbump.dispose();
    console.log('removed Earth');
  }
}
