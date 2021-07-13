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
  LoadingManager, TextureLoader,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import Config from './Three-config';
import Entity from './Three-Entity';
import orthographic from './Three-Orto';
import perspective from './Three-Perspective';
import { manager, jetObjLoader, textureLoader } from './Three-TextureLoader';

export default class Sketch {
  private canvas: HTMLCanvasElement | null = null;
  private renderer!: WebGLRenderer;
  private scene!: Scene;
  private camera!: PerspectiveCamera | OrthographicCamera;
  private controls!: OrbitControls;

  private manager = manager;
  private jetObjLoader = jetObjLoader;
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
  private entities: Entity[] = [];
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

  public setEntity(entity: Entity): void {
    entity.setSketch(this);
    entity.init();
    this.entities.push(entity);
  }

  public getLoaders(): { manager: LoadingManager, jetObjLoader: OBJLoader, textureLoader: TextureLoader } {
    return {
      manager: this.manager,
      jetObjLoader: this.jetObjLoader,
      textureLoader: this.textureLoader,
    };
  }

  public getEntities(): Entity[] {
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
    }
  }
  private setCamera(): void {
    const axesHelper = new AxesHelper(3);
    this.scene.add(axesHelper);

    if (this.cameraType === 'orthographic') {
      this.camera = orthographic;
    } else {
      this.camera = perspective;
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
    for (let i = 0; i < this.entities.length; i += 1) {
      this.entities[i].update(elapsedTime);
    }
  }

  private destroyEntities(): void {
    for (let i = 0; i < this.entities.length; i += 1) {
      this.entities[i].destroy();
    }
    this.entities = [];
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
