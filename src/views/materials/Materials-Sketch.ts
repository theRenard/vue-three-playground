import Sketch from '@/Sketch';
import {
  AmbientLight,
  BoxGeometry,
  DirectionalLight,
  DirectionalLightHelper,
  LineBasicMaterial,
  Mesh,
  MeshBasicMaterial,
  MeshDepthMaterial,
  MeshLambertMaterial,
  MeshPhongMaterial,
  PlaneGeometry,
} from 'three';

type GeometryMaterial =
  | LineBasicMaterial
  | MeshBasicMaterial
  | MeshDepthMaterial
  | MeshPhongMaterial
  | MeshLambertMaterial;

type GeometryMaterialNames =
| 'lineBasicMaterial'
| 'meshBasicMaterial'
| 'meshDepthMaterial'
| 'meshPhongMaterial'
| 'meshLambertMaterial';

export default class MaterialsSketch extends Sketch {
  materials: { [k in GeometryMaterialNames]: GeometryMaterial };
  ambientLight: AmbientLight;
  directionalLight: DirectionalLight;
  directionalLightHelper: DirectionalLightHelper;
  cubeGeometry: BoxGeometry;
  cubeMesh: Mesh;
  planeGeometry: PlaneGeometry;
  planeMesh: Mesh;
  options = {
    meshMaterial: 'meshBasicMaterial' as GeometryMaterialNames,
    color: '#186691',
    wireframe: true,
  }

  init(canvasEl: HTMLCanvasElement): void {
    super.init(canvasEl, 'perspective');
    this.createMaterials();
    // this.addPlane();
    this.addCube();
    this.addLights();
    this.addMoreGui();
    this.camera.position.x = 1;
    this.camera.position.y = 1;
    this.camera.position.z = 1;
    this.isReadyToRender = true;
  }

  createMaterials(): void {
    this.materials = {

      // A material for drawing wireframe-style geometries.
      lineBasicMaterial: new LineBasicMaterial({
        color: this.options.color,
        linewidth: 2,
        linecap: 'square',
        linejoin: 'bevel',
      }),

      // A material for drawing geometries in a simple shaded (flat or wireframe) way.
      // This material is not affected by lights.
      meshBasicMaterial: new MeshBasicMaterial({
        color: this.options.color,
        wireframe: this.options.wireframe,
      }),

      // A MeshDepthMaterial
      meshDepthMaterial: new MeshDepthMaterial(),

      // A material for non-shiny surfaces, without specular highlights.
      meshLambertMaterial: new MeshLambertMaterial({
        color: this.options.color,
        wireframe: this.options.wireframe,
      }),

      // A material for shiny surfaces with specular highlights.
      meshPhongMaterial: new MeshPhongMaterial({
        color: this.options.color,
        wireframe: this.options.wireframe,
      }),

    };
  }

  addLights(): void {
    this.ambientLight = new AmbientLight('#b9d5ff', 0.12);
    this.directionalLight = new DirectionalLight('#ffffff', 0.5);
    this.directionalLight.position.set(4, 5, -2);
    this.directionalLightHelper = new DirectionalLightHelper(this.directionalLight, 5);
    this.scene.add(this.ambientLight);
    this.scene.add(this.directionalLightHelper);
    this.scene.add(this.directionalLight);
  }

  removeLights(): void {
    this.scene.remove(this.ambientLight);
    this.scene.remove(this.directionalLight);
    this.scene.remove(this.directionalLightHelper);
  }

  addCube(): void {
    this.cubeGeometry = new BoxGeometry(0.7, 0.7, 0.7, 5, 5, 6);
    this.cubeMesh = new Mesh(this.cubeGeometry, this.materials[this.options.meshMaterial]);
    this.scene.add(this.cubeMesh);
  }

  addPlane(): void {
    this.planeGeometry = new PlaneGeometry(3, 3, 1);
    this.planeMesh = new Mesh(this.planeGeometry, new MeshPhongMaterial({
      color: 0xff0000,
    }));
    this.scene.add(this.planeMesh);
  }

  removePlane(): void {
    this.planeGeometry.dispose();
    this.scene.remove(this.planeMesh);
  }

  removeCube(): void {
    this.scene.remove(this.cubeMesh);
  }

  addMoreGui(): void {

    const materialNames = Object.keys(this.materials) as GeometryMaterialNames[];
    this.gui.add(this.options, 'meshMaterial', materialNames).onChange(() => {
      this.cubeMesh.material = this.materials[this.options.meshMaterial];
      this.cubeMesh.material.needsUpdate = true;
    });

    this.gui.add(this.options, 'wireframe').onChange(() => {
      materialNames.forEach((materialName) => {
        const material = this.materials[materialName] as GeometryMaterial;
        if (material instanceof MeshBasicMaterial
          || material instanceof MeshLambertMaterial
          || material instanceof MeshPhongMaterial) {
          material.wireframe = this.options.wireframe;
        }
      });
    });

    this.gui
      .addColor(this.options, 'color')
      .name('Material Color')
      .onChange(() => {

        materialNames.forEach((materialName) => {
          const material = this.materials[materialName] as GeometryMaterial;
          if (material instanceof MeshBasicMaterial
            || material instanceof MeshLambertMaterial
            || material instanceof MeshPhongMaterial) {
            material.color.set(this.options.color);
          }
        });
      });

  }

  update(elapsedTime: number): void {
    this.cubeMesh.rotation.y = Math.sin(elapsedTime);
  }

  destroy(): void {
    super.destroy();
    this.removeCube();
  }
}
