import Sketch from '@/Three-Sketch';
import {
  AmbientLight, BoxBufferGeometry,
  Mesh, MeshStandardMaterial, NearestFilter, PlaneBufferGeometry, PointLight, PointLightHelper, RepeatWrapping, Texture, TextureLoader, Vector2,
} from 'three';

export default class EarthSketch extends Sketch {
  textures: { [key: string]: Texture };
  doorGeometry: PlaneBufferGeometry;
  doorhMaterial: MeshStandardMaterial;
  doorMesh: Mesh;
  ambientlight: AmbientLight;
  pointLight: PointLight;
  Helper: PointLightHelper;

  init(canvasEl: HTMLCanvasElement): void {
    super.init(canvasEl, 'perspective');

    this.loadTextures();
    this.createDoor();
    this.createLights();

    this.camera.position.z = 2;

    this.isReadyToRender = true;
  }

  loadTextures(): void {
    const textureLoader = new TextureLoader();

    this.textures = {
      doorColorTexture: textureLoader.load('/textures/door/color.jpg'),
      doorAlphaTexture: textureLoader.load('/textures/door/alpha.jpg'),
      doorHeightTexture: textureLoader.load('/textures/door/height.jpg'),
      doorNormalTexture: textureLoader.load('/textures/door/normal.jpg'),
      doorAmbientOcclusionTexture: textureLoader.load('/textures/door/ambientOcclusion.jpg'),
      doorMetalnessTexture: textureLoader.load('/textures/door/metalness.jpg'),
      doorRoughnessTexture: textureLoader.load('/textures/door/roughness.jpg'),
    };

    // this.textures.doorColorTexture.repeat.x = 2;
    // this.textures.doorColorTexture.repeat.y = 3;
    // this.textures.doorColorTexture.wrapS = RepeatWrapping;
    // this.textures.doorColorTexture.wrapT = RepeatWrapping;

    // this.textures.doorColorTexture.rotation = Math.PI / 3;
    // this.textures.doorColorTexture.minFilter = NearestFilter;
    this.textures.doorColorTexture.center.x = 0.5;
    this.textures.doorColorTexture.center.y = 0.5;

  }

  createDoor(): void {
    this.doorGeometry = new PlaneBufferGeometry(2.2, 2.2, 100, 100);
    this.doorhMaterial = new MeshStandardMaterial({
      roughness: 1,
      metalness: 0,
      map: this.textures.doorColorTexture,
      alphaMap: this.textures.doorAlphaTexture, // needs transparent: true
      transparent: true,
      aoMap: this.textures.doorAmbientOcclusionTexture, // needs uv2 attribute
      displacementMap: this.textures.doorHeightTexture, // needs some vertices
      displacementScale: 0.2,
      normalMap: this.textures.doorNormalTexture,
      metalnessMap: this.textures.doorMetalnessTexture,
      roughnessMap: this.textures.doorRoughnessTexture,
    });
    this.doorMesh = new Mesh(this.doorGeometry, this.doorhMaterial);
    this.scene.add(this.doorMesh);
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
    this.doorMesh.rotation.z -= 0.0015;
  }

  destroy(): void {
    super.destroy();
    this.scene.remove(this.doorMesh);
    this.scene.remove(this.ambientlight);
    this.scene.remove(this.pointLight);
    this.scene.remove(this.Helper);
    this.doorGeometry.dispose();
    this.doorhMaterial.dispose();
  }
}
