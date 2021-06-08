import Sketch from '@/Three-Sketch';
import {
  AmbientLight,
  BackSide,
  Mesh, MeshBasicMaterial, MeshPhongMaterial, PointLight, PointLightHelper, SphereBufferGeometry, Texture, TextureLoader,
} from 'three';

export default class EarthSketch extends Sketch {
  textures: { [key: string]: Texture };
  earthGeometry: SphereBufferGeometry;
  earthMaterial: MeshPhongMaterial;
  earthMesh: Mesh;
  cloudGeometry: SphereBufferGeometry;
  cloudMetarial: MeshPhongMaterial;
  cloudMesh: Mesh;
  starGeometry: SphereBufferGeometry;
  starMaterial: MeshBasicMaterial;
  starMesh: Mesh;
  ambientlight: AmbientLight;
  pointLight: PointLight;
  Helper: PointLightHelper;

  init(canvasEl: HTMLCanvasElement): void {
    super.init(canvasEl, 'perspective');

    this.loadTextures();
    this.createEarth();
    this.createCloud();
    this.createStar();
    this.createLights();

    this.camera.position.z = 2;

    this.isReadyToRender = true;
  }

  loadTextures(): void {
    const textureLoader = new TextureLoader();

    this.textures = {
      earthmap1k: textureLoader.load('./textures/earth/earthmap1k.jpg'),
      earthbump: textureLoader.load('./textures/earth/earthbump.jpg'),
      earthCloud: textureLoader.load('./textures/earth/earthCloud.png'),
      galaxy: textureLoader.load('./textures/earth/galaxy.png'),
    };
  }

  createEarth(): void {
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
    this.scene.add(this.earthMesh);
  }

  createCloud(): void {
  // cloud Geometry
    this.cloudGeometry = new SphereBufferGeometry(0.63, 32, 32);

    // cloud metarial
    this.cloudMetarial = new MeshPhongMaterial({
      map: this.textures.earthCloud,
      transparent: true,
    });

    // cloud mesh
    this.cloudMesh = new Mesh(this.cloudGeometry, this.cloudMetarial);
    this.scene.add(this.cloudMesh);
  }

  createStar(): void {
    // galaxy geometry
    this.starGeometry = new SphereBufferGeometry(80, 64, 64);

    // galaxy material
    this.starMaterial = new MeshBasicMaterial({
      map: this.textures.galaxy,
      side: BackSide,
    });

    // galaxy mesh
    this.starMesh = new Mesh(this.starGeometry, this.starMaterial);
    this.scene.add(this.starMesh);
  }

  createLights(): void {
    // ambient light
    this.ambientlight = new AmbientLight(0xffffff, 0.2);
    this.scene.add(this.ambientlight);

    // point light
    this.pointLight = new PointLight(0xffffff, 1);
    this.pointLight.position.set(5, 3, 5);
    this.scene.add(this.pointLight);

    // point light helper
    this.Helper = new PointLightHelper(this.pointLight);
    this.scene.add(this.Helper);
  }

  update(): void {
    this.starMesh.rotation.y -= 0.002;
    this.earthMesh.rotation.y -= 0.0015;
    this.cloudMesh.rotation.y -= 0.001;
  }

  destroy(): void {
    super.destroy();
  }
}
