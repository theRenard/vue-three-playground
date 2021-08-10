/* eslint-disable import/no-cycle */
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
  LoadingManager, TextureLoader, sRGBEncoding,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import Config from './Three-config';
import Entity from './Three-Entity';
import {
  manager, objLoader, gltfLoader, textureLoader,
} from './Three-TextureLoader';

export default class Sketch {
  private canvas: HTMLCanvasElement | null = null;
  private renderer!: WebGLRenderer;
  private scene!: Scene;
  private camera!: PerspectiveCamera | OrthographicCamera;
  private controls!: OrbitControls;

  private manager = manager;
  private objLoader = objLoader;
  private gltfLoader = gltfLoader;
  private textureLoader = textureLoader;
  private clock = new Clock();
  private animationReq: number;
  public gui: dat.GUI = new dat.GUI({
    width: 300,
  });
  private elapsedTime = 0;
  private cameraType!: 'perspective' | 'orthographic';
  private debug = false;
  public isReadyToRender = false;
  private entities: Map<string, any> = new Map();
  public init(canvasEl: HTMLCanvasElement, cameraType: 'perspective' | 'orthographic' = 'perspective'): void {
    this.canvas = canvasEl;
    this.cameraType = cameraType;
    this.setRenderer();
    this.setScene();
    this.setCamera();
    this.setControls();
    this.resize = this.resize.bind(this);
    this.addResizeListener();
    this.addInitialGui();
    this.tick = this.tick.bind(this);
    this.tick();
  }

  public setEntity<T extends Entity>(entity: T): void {
    entity.setSketch(this);
    entity.init();
    this.entities.set(entity.name, entity);
  }

  public getLoaders(): { manager: LoadingManager, objLoader: OBJLoader, gltfLoader: GLTFLoader, textureLoader: TextureLoader } {
    return {
      manager: this.manager,
      objLoader: this.objLoader,
      gltfLoader: this.gltfLoader,
      textureLoader: this.textureLoader,
    };
  }

  public getEntities<T extends Entity>(): Map<string, T> {
    return this.entities;
  }

  public getScene(): Scene { return this.scene; }
  public getCamera(): PerspectiveCamera | OrthographicCamera { return this.camera; }
  public getGui(): dat.GUI {
    return this.gui;
  }

  private showGui(): void {
    this.gui.show();
  }

  private setRenderer(): void {
    if (this.canvas) {
      this.renderer = new WebGLRenderer({
        canvas: this.canvas,
      });
      this.renderer.setSize(Config.width,
        Config.height);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      this.renderer.setClearColor('#262837');
      this.renderer.shadowMap.enabled = true;
      this.renderer.shadowMap.type = PCFSoftShadowMap;
      this.renderer.outputEncoding = sRGBEncoding;

    }
  }
  private setCamera(): void {
    const axesHelper = new AxesHelper(3);
    this.scene.add(axesHelper);

    if (this.cameraType === 'orthographic') {
      this.camera = new OrthographicCamera(-3 * Config.aspRatio, 3 * Config.aspRatio, 3, -3, 0.1, 100);
    } else {
      this.camera = new PerspectiveCamera(75, Config.width / Config.height, 0.1, 2000);
    }
  }
  private setScene(): void {
    this.scene = new Scene();
  }
  private setControls(): void {
    if (this.canvas) {
      this.controls = new OrbitControls(this.camera, this.canvas);
      this.controls.enableDamping = true;
    }
  }

  public getControls(): OrbitControls {
    return this.controls;
  }

  public getEntityByName<T extends Entity>(name: string): T | null {
    return this.entities.get(name) || null;
  }

  private resize(): void {
    // Update sizes
    Config.width = window.innerWidth;
    Config.height = window.innerHeight;

    // Update camera
    if (this.camera instanceof OrthographicCamera) {
      this.camera.left = -1 * Config.aspRatio;
      this.camera.right = 1 * Config.aspRatio;
      this.camera.top = 1;
      this.camera.bottom = -1;
    } else {
      this.camera.aspect = Config.width / Config.height;
    }
    this.camera.updateProjectionMatrix();

    // Update renderer
    this.renderer.setSize(Config.width, Config.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }

  private addResizeListener(): void {
    window.addEventListener('resize', this.resize);
  }

  private removeResizeListener(): void {
    window.removeEventListener('resize', this.resize);
  }

  // eslint-disable-next-line class-methods-use-this
  private update(elapsedTime: number): void {
    // eslint-disable-next-line no-restricted-syntax
    for (const entity of this.entities.values()) {
      entity.update(elapsedTime);
    }
  }

  private destroyEntities(): void {
    // eslint-disable-next-line no-restricted-syntax
    for (const entity of this.entities.values()) {
      entity.destroy();
    }
  }

  private tick(): void {
    this.elapsedTime = this.clock.getElapsedTime();

    if (this.isReadyToRender) this.update(this.elapsedTime);

    this.controls.update();
    this.renderer.render(this.scene, this.camera);
    this.animationReq = window.requestAnimationFrame(this.tick);
  }

  // eslint-disable-next-line class-methods-use-this
  private addInitialGui(): void {
    // this.gui.hide();
    // this.gui.add(this, 'debug');
  }

  public destroy(): void {
    this.gui.destroy();
    this.destroyEntities();
    this.removeResizeListener();
    window.cancelAnimationFrame(this.animationReq);
    // Remember to remove
    // meshes from scene
    // geometries
    // materials
    // textures
  }
}
