/* eslint-disable max-len */
/* eslint-disable newline-per-chained-call */
import Sketch from '@/Sketch';
import {
  AmbientLight, DirectionalLight, PointLight, PlaneGeometry, ShaderMaterial, Vector2, Color, Mesh, LoadingManager, TextureLoader, Texture,
} from 'three';
import waterVertexShader from '@/shaders/water/vertex.glsl';
import waterFragmentShader from '@/shaders/water/fragment.glsl';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { DDSLoader } from 'three/examples/jsm/loaders/DDSLoader';
import { gsap } from 'gsap';

export default class AirplaneSketch extends Sketch {
  sea: any;
  airplane: any;
  airplaneAnimation: gsap.core.Tween;
  waterGeometry: PlaneGeometry;
  waterMaterial: ShaderMaterial;
  jetColorTexture: Texture;
  jetNormalTexture: Texture;
  ambientLight: AmbientLight;
  moonLight: DirectionalLight;
  doorLight: PointLight;
  debugObject = {
    depthColor: '#186691',
    surfaceColor: '#9bd8ff',
  };
  init(canvasEl: HTMLCanvasElement): void {
    super.init(canvasEl, 'orthographic');
    this.addLights();
    this.addSea();
    this.addGui();
    this.addAirplane();

    this.camera.position.x = 1;
    this.camera.position.y = 1;
    this.camera.position.z = 1;
  }

  addLights(): void {
    this.ambientLight = new AmbientLight('#b9d5ff', 0.12);

    this.moonLight = new DirectionalLight('#ffffff', 0.5);
    this.moonLight.position.set(4, 5, -2);
    this.moonLight.castShadow = true;

    this.doorLight = new PointLight('#ff7d46', 1, 7);
    this.doorLight.position.set(0, 2.2, 2.7);
    this.doorLight.castShadow = true;
    this.scene.add(this.ambientLight);
    this.scene.add(this.moonLight);
    this.scene.add(this.doorLight);
  }

  removeLights(): void {
    this.scene.remove(this.ambientLight);
    this.scene.remove(this.moonLight);
    this.scene.remove(this.doorLight);
  }

  addAirplane(): void {
    const manager = new LoadingManager();
    manager.addHandler(/\.dds$/i, new DDSLoader());
    const jetObjLoader = new OBJLoader(manager);
    const textureLoader = new TextureLoader(manager);

    this.jetColorTexture = textureLoader.load('./textures/airplane/diffuse.jpg');
    this.jetNormalTexture = textureLoader.load('./textures/airplane/normal.png');

    jetObjLoader.load(
      './models/airplane/airplane.obj',
      (airplane) => {

        this.airplane = airplane;

        this.airplane.scale.set(0.0035, 0.0035, 0.0035);
        this.airplane.traverse((c: any) => {
          const child = c as any;
          if (child.isMesh) {
            child.material.map = this.jetColorTexture;
            child.material.normalMap = this.jetNormalTexture;
          }
        });

        this.scene.add(this.airplane);

        this.airplaneAnimation = gsap.to([this.airplane.position, this.airplane.rotation], {
          duration: 'random(1, 5)',
          x: 'random(-0.3, 0.3)',
          y: 'random(-0.1, 0.2)',
          z: 'random(-0.05, 0.05)',
          ease: 'power1.inOut',
          repeatRefresh: true,
          repeat: -1,
        });

      },
      (xhr) => {
        console.log(`${(xhr.loaded / xhr.total) * 100}% loaded`);
      },
      (error) => {
        console.log('An error happened');
      },
    );
  }

  removeAirplane(): void {
    this.scene.remove(this.airplane);
    this.jetColorTexture.dispose();
    this.jetNormalTexture.dispose();
    this.airplaneAnimation.kill();

  }

  addSea(): void {
    this.waterGeometry = new PlaneGeometry(2, 2, 512, 512);

    // Material
    this.waterMaterial = new ShaderMaterial({
      vertexShader: waterVertexShader,
      fragmentShader: waterFragmentShader,
      uniforms: {
        uTime: { value: 0 },

        uBigWavesElevation: { value: 0.2 },
        uBigWavesFrequency: { value: new Vector2(4, 1.5) },
        uBigWavesSpeed: { value: 0.75 },

        uSmallWavesElevation: { value: 0.15 },
        uSmallWavesFrequency: { value: 3 },
        uSmallWavesSpeed: { value: 0.2 },
        uSmallIterations: { value: 4 },

        uDepthColor: { value: new Color(this.debugObject.depthColor) },
        uSurfaceColor: { value: new Color(this.debugObject.surfaceColor) },
        uColorOffset: { value: 0.08 },
        uColorMultiplier: { value: 5 },
      },
    });

    this.sea = new Mesh(this.waterGeometry, this.waterMaterial);
    this.sea.rotation.x = -Math.PI * 0.5;
    this.scene.add(this.sea);
  }

  removeSea(): void {
    this.scene.remove(this.sea);
    this.waterGeometry.dispose();
    this.waterMaterial.dispose();
  }

  update(elapsedTime: number): void {
    if (this.sea) {
      this.sea.material.uniforms.uTime.value = elapsedTime;
    }
  }

  addGui(): void {
    this.gui.add(this.ambientLight, 'intensity').min(0).max(1).step(0.001);

    this.gui.add(this.moonLight, 'intensity').min(0).max(1).step(0.001);
    this.gui.add(this.moonLight.position, 'x').min(-5).max(5).step(0.001);
    this.gui.add(this.moonLight.position, 'y').min(-5).max(5).step(0.001);
    this.gui.add(this.moonLight.position, 'z').min(-5).max(5).step(0.001);

    this.gui.add(this.waterMaterial.uniforms.uBigWavesElevation, 'value').min(0).max(1).step(0.001).name('uBigWavesElevation');
    this.gui.add(this.waterMaterial.uniforms.uBigWavesFrequency.value, 'x').min(0).max(10).step(0.001).name('uBigWavesFrequencyX');
    this.gui.add(this.waterMaterial.uniforms.uBigWavesFrequency.value, 'y').min(0).max(10).step(0.001).name('uBigWavesFrequencyY');
    this.gui.add(this.waterMaterial.uniforms.uBigWavesSpeed, 'value').min(0).max(4).step(0.001).name('uBigWavesSpeed');

    this.gui.add(this.waterMaterial.uniforms.uSmallWavesElevation, 'value').min(0).max(1).step(0.001).name('uSmallWavesElevation');
    this.gui.add(this.waterMaterial.uniforms.uSmallWavesFrequency, 'value').min(0).max(30).step(0.001).name('uSmallWavesFrequency');
    this.gui.add(this.waterMaterial.uniforms.uSmallWavesSpeed, 'value').min(0).max(4).step(0.001).name('uSmallWavesSpeed');
    this.gui.add(this.waterMaterial.uniforms.uSmallIterations, 'value').min(0).max(5).step(1).name('uSmallIterations');

    this.gui.add(this.waterMaterial.uniforms.uColorOffset, 'value').min(0).max(1).step(0.001).name('uColorOffset');
    this.gui.add(this.waterMaterial.uniforms.uColorMultiplier, 'value').min(0).max(10).step(0.001).name('uColorMultiplier');

    this.gui.addColor(this.debugObject, 'depthColor').onChange(() => { this.waterMaterial.uniforms.uDepthColor.value.set(this.debugObject.depthColor); });
    this.gui.addColor(this.debugObject, 'surfaceColor').onChange(() => { this.waterMaterial.uniforms.uSurfaceColor.value.set(this.debugObject.surfaceColor); });
  }

  destroy(): void {
    super.destroy();
    this.removeLights();
    this.removeSea();
    this.removeAirplane();

  }
}
