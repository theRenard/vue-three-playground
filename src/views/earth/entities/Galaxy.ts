import Entity from '@/engines/Three/Three-Entity';
import {
  Mesh, Texture, SphereBufferGeometry, BackSide, MeshBasicMaterial,
} from 'three';

export default class Earth extends Entity {
  galaxyGeometry: SphereBufferGeometry;
  galaxyMaterial: MeshBasicMaterial;
  galaxyMesh: Mesh;
  textures: { [key: string]: Texture };

  init(): void {

    this.textures = {
      galaxy: this.getSketch().getLoaders().textureLoader.load('./textures/earth/galaxy.png'),
    };

    this.galaxyGeometry = new SphereBufferGeometry(80, 64, 64);

    // galaxy material
    this.galaxyMaterial = new MeshBasicMaterial({
      map: this.textures.galaxy,
      side: BackSide,
    });

    // galaxy mesh
    this.galaxyMesh = new Mesh(this.galaxyGeometry, this.galaxyMaterial);

    this.getSketch().getScene().add(this.galaxyMesh);
  }

  // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-empty-function
  update(): void {
    this.galaxyMesh.rotation.y -= 0.002;
  }
  destroy(): void {
    this.getSketch().getScene().remove(this.galaxyMesh);
    this.galaxyGeometry.dispose();
    this.galaxyMaterial.dispose();
    this.textures.galaxy.dispose();
    console.log('removed Galaxy');
  }
}
