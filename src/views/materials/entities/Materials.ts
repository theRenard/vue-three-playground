import Entity from '@/engines/Three/Three-Entity';

import {
  BoxGeometry,
  Mesh,
  MeshBasicMaterial,
  MeshDepthMaterial,
  MeshLambertMaterial,
  MeshNormalMaterial,
  MeshPhongMaterial,
  MeshToonMaterial,
  Texture,
} from 'three';

type GeometryMaterial =
  | MeshBasicMaterial
  | MeshDepthMaterial
  | MeshPhongMaterial
  | MeshNormalMaterial
  | MeshToonMaterial
  | MeshLambertMaterial;

type GeometryMaterialNames =
| 'meshBasicMaterial'
| 'meshDepthMaterial'
| 'meshPhongMaterial'
| 'meshNormalMaterial'
| 'meshToonMaterial'
| 'meshLambertMaterial';

export default class Materials extends Entity {
  name: 'Materials';
  materials: { [k in GeometryMaterialNames]: GeometryMaterial };
  alphaMaps: { [key: string]: Texture | null };
  cubeGeometry: BoxGeometry;
  cubeMesh: Mesh;
  options = {
    meshMaterial: 'meshPhongMaterial' as GeometryMaterialNames,
    color: '#186691',
    wireframe: false,
    alphaMap: 'none',
    wireframeLinewidth: 3,
  }

  init(): void {
    this.loadTextures();
    this.createMaterials();
    this.addCube();
    this.addMoreGui();
  }

  loadTextures(): void {

    this.alphaMaps = {
      none: null,
      alphaMap_One: this.getSketch().getLoaders().textureLoader.load('./textures/cube/cube_alphaMap.jpg'),
      alphaMap_Two: this.getSketch().getLoaders().textureLoader.load('./textures/cube/cube_alphaMap_2.png'),
    };
  }

  createMaterials(): void {

    this.materials = {

      // A material for drawing geometries in a simple shaded (flat or wireframe) way.
      // This material is not affected by lights.
      meshBasicMaterial: new MeshBasicMaterial({
        color: this.options.color,
        wireframe: this.options.wireframe,
        alphaMap: this.alphaMaps[this.options.alphaMap],
        transparent: true,
      }),

      // A MeshDepthMaterial
      meshDepthMaterial: new MeshDepthMaterial(),

      // A material for non-shiny surfaces, without specular highlights.
      meshLambertMaterial: new MeshLambertMaterial({
        color: this.options.color,
        alphaMap: this.alphaMaps[this.options.alphaMap],
        transparent: true,
        wireframe: this.options.wireframe,
      }),

      // A material for shiny surfaces with specular highlights.
      meshPhongMaterial: new MeshPhongMaterial({
        color: this.options.color,
        alphaMap: this.alphaMaps[this.options.alphaMap],
        transparent: true,
        wireframe: this.options.wireframe,
      }),

      meshNormalMaterial: new MeshNormalMaterial(),
      meshToonMaterial: new MeshToonMaterial({
        color: this.options.color,
        alphaMap: this.alphaMaps[this.options.alphaMap],
        transparent: true,
        wireframe: this.options.wireframe,
      }),

    };
  }

  addCube(): void {
    this.cubeGeometry = new BoxGeometry(0.7, 0.7, 0.7, 5, 5, 6);
    this.cubeMesh = new Mesh(this.cubeGeometry, this.materials[this.options.meshMaterial]);
    this.getSketch().getScene().add(this.cubeMesh);
  }

  removeCube(): void {
    this.getSketch().getScene().remove(this.cubeMesh);
  }

  addMoreGui(): void {

    const materialNames = Object.keys(this.materials) as GeometryMaterialNames[];
    const alphaMapNames = Object.keys(this.alphaMaps);
    this.getSketch().getGui().add(this.options, 'meshMaterial', materialNames).onChange(() => {
      this.cubeMesh.material = this.materials[this.options.meshMaterial];
      this.cubeMesh.material.needsUpdate = true;
    });

    this.getSketch().getGui().add(this.options, 'wireframe').onChange(() => {
      materialNames.forEach((materialName) => {
        const material = this.materials[materialName] as GeometryMaterial;
        material.wireframe = this.options.wireframe;
      });
    });

    this.getSketch().getGui().add(this.options, 'alphaMap', alphaMapNames).onChange(() => {
      if (this.cubeMesh.material instanceof MeshBasicMaterial) {
        this.cubeMesh.material.alphaMap = this.alphaMaps[this.options.alphaMap];
        this.cubeMesh.material.needsUpdate = true;
      }
    });

    this.getSketch().getGui()
      .addColor(this.options, 'color')
      .name('Material Color')
      .onChange(() => {

        materialNames.forEach((materialName) => {
          const material = this.materials[materialName] as GeometryMaterial;
          if (!(material instanceof MeshNormalMaterial)
          && !(material instanceof MeshDepthMaterial)
          ) {
            material.color.set(this.options.color);
          }
        });
      });

  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(elapsedTime: number): void {
    this.cubeMesh.rotation.y -= 0.01;
  }

  destroy(): void {
    this.removeCube();
  }
}
