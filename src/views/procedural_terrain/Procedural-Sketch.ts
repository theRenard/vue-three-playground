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

    this.getCamera().position.x = 1;
    this.getCamera().position.y = 1;
    this.getCamera().position.z = 1;

    this.isReadyToRender = true;
  }

}
