import Entity from '@/engines/Three/Three-Entity';
import {
  Texture, sRGBEncoding, MeshBasicMaterial, Mesh, Group,
} from 'three';

export default class Street extends Entity {
  street: Group;
  streetTexture: Texture;
  roadTexture: Texture;
  streetMaterial: MeshBasicMaterial;
  roadMaterial: MeshBasicMaterial;

  init(): void {

    this.streetTexture = this.getSketch().getLoaders().textureLoader.load('./textures/street/street.jpg');
    this.streetTexture.flipY = false;
    this.streetTexture.encoding = sRGBEncoding;

    this.roadTexture = this.getSketch().getLoaders().textureLoader.load('./textures/street/road.jpg');
    this.roadTexture.flipY = false;
    this.roadTexture.encoding = sRGBEncoding;

    this.streetMaterial = new MeshBasicMaterial({ map: this.streetTexture });
    this.roadMaterial = new MeshBasicMaterial({ map: this.roadTexture });

    this.getSketch().getLoaders().gltfLoader.load(
      './models/street/street.glb',
      (gltf) => {

        this.street = gltf.scene;

        gltf.scene.traverse((child) => {
          const c = child as Mesh;
          c.material = this.streetMaterial;
        });

        const road = gltf.scene.children.find((child) => child.name === 'lines') as Mesh;

        if (road) {
          road.position.y += 0.0001;
          road.material = this.roadMaterial;
        }

        this.getSketch().getScene().add(this.street);

      },
      (xhr) => {
        console.log(`${(xhr.loaded / xhr.total) * 100}% loaded`);
      },
      (error) => {
        console.log('An error happened');
      },
    );
    console.log('added street');

  }

  // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-empty-function
  update(): void {
  }

  destroy(): void {
    this.getSketch().getScene().remove(this.street);
    this.streetTexture.dispose();
    this.roadTexture.dispose();
    this.streetMaterial.dispose();
    this.roadMaterial.dispose();
    console.log('removed airplane');
  }
}
