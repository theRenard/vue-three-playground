import { Color, PerspectiveCamera } from 'three';
import Sketch from '@/engines/Three/Three';
import TerrainChunkManager from './Terrain/TerrainChunkManager';
import Lights from './Entities/Lights';
import Sky from './Entities/Sky';

export default class EarthSketch extends Sketch {

  init(canvasEl: HTMLCanvasElement): void {
    super.init(canvasEl, 'perspective');

    const terrainChunkManager = new TerrainChunkManager();
    const lights = new Lights();
    const sky = new Sky();

    this.setEntity(terrainChunkManager);
    this.setEntity(sky);
    this.setEntity(lights);

    this.getScene().background = new Color(0xaaaaaa);
    const camera = this.getCamera() as PerspectiveCamera;
    camera.fov = 60;
    camera.aspect = canvasEl.width / canvasEl.height;
    camera.near = 0.1;
    camera.far = 10000;
    camera.position.set(75, 20, 0);
    camera.updateProjectionMatrix();
    this.getControls().target.set(0, 50, 0);
    this.getControls().object.position.set(475, 345, 900);
    this.getControls().update();

    this.isReadyToRender = true;
  }

}
