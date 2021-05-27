/* eslint-disable lines-between-class-members */
import * as dat from 'dat.gui';
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  PCFSoftShadowMap,
  Clock,
  OrthographicCamera,
  AxesHelper,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export default class Sketch {
  canvas: HTMLCanvasElement | null = null;
  renderer!: WebGLRenderer;
  scene!: Scene;
  camera!: PerspectiveCamera | OrthographicCamera;
  controls!: OrbitControls;
  clock = new Clock();
  gui: dat.GUI = new dat.GUI();
  elapsedTime = 0;
  width = window.innerWidth;
  height = window.innerHeight;
  cameraType!: 'perspective' | 'orthographic';
  debug = false;

  init(canvasEl: HTMLCanvasElement, cameraType: 'perspective' | 'orthographic' = 'perspective'): void {
    this.canvas = canvasEl;
    this.cameraType = cameraType;
    this.setRenderer();
    this.setScene();
    this.setCamera();
    this.setControls();
    this.resize = this.resize.bind(this);
    this.addResizeListener();
    this.tick = this.tick.bind(this);
    this.tick();
    this.gui.hide();
    this.gui.add(this, 'debug');
  }

  showGui(): void {
    this.gui.show();
  }
  get aspRatio(): number {
    return this.width / this.height;
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
    const axesHelper = new AxesHelper(3);
    this.scene.add(axesHelper);

    if (this.cameraType === 'orthographic') {
      this.camera = new OrthographicCamera(-1 * this.aspRatio, 1 * this.aspRatio, 1, -1, 0.1, 100);
    } else {
      this.camera = new PerspectiveCamera(75, this.width / this.height, 0.1, 100);
    }
  }
  setScene(): void {
    this.scene = new Scene();
  }
  setControls(): void {
    if (this.canvas) {
      console.log(this.camera);
      this.controls = new OrbitControls(this.camera, this.canvas);
      this.controls.enableDamping = true;
    }
  }

  resize(): void {
    // Update sizes
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    // Update camera
    if (this.camera instanceof OrthographicCamera) {
      this.camera.left = -1 * this.aspRatio;
      this.camera.right = 1 * this.aspRatio;
      this.camera.top = 1;
      this.camera.bottom = -1;
    } else {
      this.camera.aspect = this.width / this.height;
    }
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
    // Remember to remove
    // meshes from scene
    // geometries
    // materials
    // textures
  }
}
