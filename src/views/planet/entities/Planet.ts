import Entity from '@/engines/Three/Three-Entity';
import {
  Texture, sRGBEncoding, MeshBasicMaterial, Mesh, Group,
} from 'three';

export default class Planet extends Entity {
  planet: Group;
  planetTexture: Texture;
  roadTexture: Texture;
  planetMaterial: MeshBasicMaterial;
  // roadMaterial: MeshBasicMaterial;

  init(): void {

    this.planetTexture = this.getSketch().getLoaders().textureLoader.load('./textures/planet/planet.jpg');
    this.planetTexture.flipY = false;
    this.planetTexture.encoding = sRGBEncoding;

    this.roadTexture = this.getSketch().getLoaders().textureLoader.load('./textures/planet/road.jpg');
    this.roadTexture.flipY = false;
    this.roadTexture.encoding = sRGBEncoding;

    this.planetMaterial = new MeshBasicMaterial({
      color: 0xffffff,
      // map: this.planetTexture,
    });
    // this.roadMaterial = new MeshBasicMaterial({ map: this.roadTexture });

    this.getSketch().getLoaders().gltfLoader.load(
      './models/planet/planet.glb',
      (gltf) => {

        this.planet = gltf.scene;

        gltf.scene.traverse((child) => {
          const c = child as Mesh;
          c.material = this.planetMaterial;
        });

        const road = gltf.scene.children.find((child) => child.name === 'lines') as Mesh;

        if (road) {
          road.position.y += 0.001;
          // road.material = this.roadMaterial;
        }

        this.getSketch().getScene().add(this.planet);

      },
      (xhr) => {
        console.log(`${(xhr.loaded / xhr.total) * 100}% loaded`);
      },
      (error) => {
        console.log('An error happened');
      },
    );
    console.log('added planet');

  }

  // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-empty-function
  update(): void {
  }

  destroy(): void {
    this.getSketch().getScene().remove(this.planet);
    this.planetTexture.dispose();
    this.roadTexture.dispose();
    this.planetMaterial.dispose();
    // this.roadMaterial.dispose();
    console.log('removed planet');
  }
}
