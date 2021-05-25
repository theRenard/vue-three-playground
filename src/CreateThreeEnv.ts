/* eslint-disable lines-between-class-members */
import * as dat from 'dat.gui';
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  PCFSoftShadowMap,
  Clock,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export default class CreateThreeEnv {
  canvas: HTMLCanvasElement | null = null;
  renderer!: WebGLRenderer;
  scene!: Scene;
  camera!: PerspectiveCamera;
  controls!: OrbitControls;
  clock = new Clock();
  gui: dat.GUI = new dat.GUI();
  elapsedTime = 0;
  width = window.innerWidth;
  height = window.innerHeight;

  init(canvasEl: HTMLCanvasElement): void {
    this.canvas = canvasEl;
    this.setRenderer();
    this.setScene();
    this.setCamera();
    this.setControls();
    this.resize = this.resize.bind(this);
    this.addResizeListener();
    this.tick = this.tick.bind(this);
    this.tick();
  }

  setRenderer(): void {
    if (this.canvas) {
      this.renderer = new WebGLRenderer({
        canvas: this.canvas,
      });
      this.renderer.setSize(this.width,
        this.height);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      this.renderer.setClearColor('#262837');
      this.renderer.shadowMap.enabled = true;
      this.renderer.shadowMap.type = PCFSoftShadowMap;
    }
  }
  setCamera(): void {
    this.camera = new PerspectiveCamera(75, this.width / this.height, 0.1, 100);
  }
  setScene(): void {
    this.scene = new Scene();
  }
  setControls(): void {
    if (this.canvas) {
      this.controls = new OrbitControls(this.camera, this.canvas);
      this.controls.enableDamping = true;
    }
  }

  resize(): void {
    // Update sizes
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    // Update camera
    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();

    // Update renderer
    this.renderer.setSize(this.width, this.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }

  addResizeListener(): void {
    window.addEventListener('resize', this.resize);
  }

  removeResizeListener(): void {
    window.removeEventListener('resize', this.resize);
  }

  // eslint-disable-next-line class-methods-use-this
  update(elapsedTime: number): void {
    (() => elapsedTime)(); // noop
  }

  tick(): void {
    this.elapsedTime = this.clock.getElapsedTime();

    this.update(this.elapsedTime);

    // Update controls
    this.controls.update();

    // Render
    this.renderer.render(this.scene, this.camera);

    // Call tick again on the next frame
    window.requestAnimationFrame(this.tick);
  }

  destroy(): void {
    this.gui.destroy();
  }
}
