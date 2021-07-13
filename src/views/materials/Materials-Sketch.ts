// import Sketch from '@/engines/Three';
// import {
//   AmbientLight,
//   BoxGeometry,
//   CameraHelper,
//   DirectionalLight,
//   DirectionalLightHelper,
//   Mesh,
//   MeshBasicMaterial,
//   MeshDepthMaterial,
//   MeshLambertMaterial,
//   MeshNormalMaterial,
//   MeshPhongMaterial,
//   MeshToonMaterial,
//   PlaneGeometry,
//   SpotLight,
//   Texture,
//   TextureLoader,
// } from 'three';

// type GeometryMaterial =
//   | MeshBasicMaterial
//   | MeshDepthMaterial
//   | MeshPhongMaterial
//   | MeshNormalMaterial
//   | MeshToonMaterial
//   | MeshLambertMaterial;

// type GeometryMaterialNames =
// | 'meshBasicMaterial'
// | 'meshDepthMaterial'
// | 'meshPhongMaterial'
// | 'meshNormalMaterial'
// | 'meshToonMaterial'
// | 'meshLambertMaterial';

// export default class MaterialsSketch extends Sketch {
//   materials: { [k in GeometryMaterialNames]: GeometryMaterial };
//   alphaMaps: { [key: string]: Texture | null };
//   ambientLight: AmbientLight;
//   spotLight: SpotLight;
//   spotLightCameraHelper: CameraHelper;
//   directionalLight: DirectionalLight;
//   directionalLightHelper: DirectionalLightHelper;
//   cubeGeometry: BoxGeometry;
//   cubeMesh: Mesh;
//   planeGeometry: PlaneGeometry;
//   planeMesh: Mesh;
//   textureLoader: TextureLoader;
//   options = {
//     meshMaterial: 'meshPhongMaterial' as GeometryMaterialNames,
//     color: '#186691',
//     wireframe: false,
//     alphaMap: 'none',
//     wireframeLinewidth: 3,
//   }

//   init(canvasEl: HTMLCanvasElement): void {
//     super.init(canvasEl, 'orthographic');
//     this.loadTextures();
//     this.createMaterials();
//     // this.addPlane();
//     this.addCube();
//     this.addSpotLight();
//     // this.addLights();
//     this.addMoreGui();
//     this.camera.position.x = 1;
//     this.camera.position.y = 1;
//     this.camera.position.z = 1;
//     this.isReadyToRender = true;
//   }

//   loadTextures(): void {
//     const textureLoader = new TextureLoader();

//     this.alphaMaps = {
//       none: null,
//       alphaMap_One: textureLoader.load('./textures/cube/cube_alphaMap.jpg'),
//       alphaMap_Two: textureLoader.load('./textures/cube/cube_alphaMap_2.png'),
//     };
//   }

//   createMaterials(): void {

//     this.materials = {

//       // A material for drawing geometries in a simple shaded (flat or wireframe) way.
//       // This material is not affected by lights.
//       meshBasicMaterial: new MeshBasicMaterial({
//         color: this.options.color,
//         wireframe: this.options.wireframe,
//         alphaMap: this.alphaMaps[this.options.alphaMap],
//         transparent: true,
//       }),

//       // A MeshDepthMaterial
//       meshDepthMaterial: new MeshDepthMaterial(),

//       // A material for non-shiny surfaces, without specular highlights.
//       meshLambertMaterial: new MeshLambertMaterial({
//         color: this.options.color,
//         alphaMap: this.alphaMaps[this.options.alphaMap],
//         transparent: true,
//         wireframe: this.options.wireframe,
//       }),

//       // A material for shiny surfaces with specular highlights.
//       meshPhongMaterial: new MeshPhongMaterial({
//         color: this.options.color,
//         alphaMap: this.alphaMaps[this.options.alphaMap],
//         transparent: true,
//         wireframe: this.options.wireframe,
//       }),

//       meshNormalMaterial: new MeshNormalMaterial(),
//       meshToonMaterial: new MeshToonMaterial({
//         color: this.options.color,
//         alphaMap: this.alphaMaps[this.options.alphaMap],
//         transparent: true,
//         wireframe: this.options.wireframe,
//       }),

//     };
//   }

//   addLights(): void {
//     this.ambientLight = new AmbientLight('#b9d5ff', 0.12);
//     this.directionalLight = new DirectionalLight('#ffffff', 0.5);
//     this.directionalLight.position.set(4, 5, -2);
//     this.directionalLightHelper = new DirectionalLightHelper(this.directionalLight, 5);
//     this.scene.add(this.ambientLight);
//     this.scene.add(this.directionalLightHelper);
//     this.scene.add(this.directionalLight);
//   }

//   removeLights(): void {
//     this.scene.remove(this.ambientLight);
//     this.scene.remove(this.directionalLight);
//     this.scene.remove(this.directionalLightHelper);
//   }

//   addSpotLight(): void {
//     this.spotLight = new SpotLight(0xffffff, 1, 1, Math.PI * 0.3);

//     this.spotLight.castShadow = true;
//     this.spotLight.shadow.mapSize.width = 1024;
//     this.spotLight.shadow.mapSize.height = 1024;
//     this.spotLight.shadow.camera.fov = 30;
//     this.spotLight.shadow.camera.near = 1;
//     this.spotLight.shadow.camera.far = 6;
//     this.scene.add(this.spotLight);
//     this.scene.add(this.spotLight.target);

//     this.spotLightCameraHelper = new CameraHelper(this.spotLight.shadow.camera);
//     this.scene.add(this.spotLightCameraHelper);

//   }

//   removeSpotLight(): void {
//     this.scene.remove(this.spotLight.target);
//     this.scene.remove(this.spotLight);
//     this.scene.remove(this.spotLightCameraHelper);
//   }

//   addCube(): void {
//     this.cubeGeometry = new BoxGeometry(0.7, 0.7, 0.7, 5, 5, 6);
//     this.cubeMesh = new Mesh(this.cubeGeometry, this.materials[this.options.meshMaterial]);
//     this.scene.add(this.cubeMesh);
//   }

//   addPlane(): void {
//     this.planeGeometry = new PlaneGeometry(3, 3, 1);
//     this.planeMesh = new Mesh(this.planeGeometry, new MeshPhongMaterial({
//       color: 0xff0000,
//     }));
//     this.scene.add(this.planeMesh);
//   }

//   removePlane(): void {
//     this.planeGeometry.dispose();
//     this.scene.remove(this.planeMesh);
//   }

//   removeCube(): void {
//     this.scene.remove(this.cubeMesh);
//   }

//   addMoreGui(): void {

//     const materialNames = Object.keys(this.materials) as GeometryMaterialNames[];
//     const alphaMapNames = Object.keys(this.alphaMaps);
//     this.gui.add(this.options, 'meshMaterial', materialNames).onChange(() => {
//       this.cubeMesh.material = this.materials[this.options.meshMaterial];
//       this.cubeMesh.material.needsUpdate = true;
//     });

//     this.gui.add(this.options, 'wireframe').onChange(() => {
//       materialNames.forEach((materialName) => {
//         const material = this.materials[materialName] as GeometryMaterial;
//         material.wireframe = this.options.wireframe;
//       });
//     });

//     this.gui.add(this.options, 'alphaMap', alphaMapNames).onChange(() => {
//       if (this.cubeMesh.material instanceof MeshBasicMaterial) {
//         this.cubeMesh.material.alphaMap = this.alphaMaps[this.options.alphaMap];
//         this.cubeMesh.material.needsUpdate = true;
//       }
//     });

//     this.gui
//       .addColor(this.options, 'color')
//       .name('Material Color')
//       .onChange(() => {

//         materialNames.forEach((materialName) => {
//           const material = this.materials[materialName] as GeometryMaterial;
//           if (!(material instanceof MeshNormalMaterial)
//           && !(material instanceof MeshDepthMaterial)
//           ) {
//             material.color.set(this.options.color);
//           }
//         });
//       });

//   }

//   update(elapsedTime: number): void {
//     this.cubeMesh.rotation.y -= 0.01;
//     this.spotLight.position.x = Math.sin(elapsedTime * 0.5) * 3;
//     this.spotLight.position.z = Math.cos(elapsedTime * 0.5) * 3;
//     this.spotLight.position.y = 1;
//     this.spotLight.lookAt(this.cubeMesh.position);
//   }

//   destroy(): void {
//     super.destroy();
//     this.removeCube();
//   }
// }
