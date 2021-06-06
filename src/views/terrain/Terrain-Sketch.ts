import Sketch from '@/Three-Sketch';
import CreateTerrain from './Create-Terrain';

export default class TerrainSketch extends Sketch {
  init(canvasEl: HTMLCanvasElement): void {
    super.init(canvasEl, 'orthographic');

    this.camera.position.x = 1;
    this.camera.position.y = 1;
    this.camera.position.z = 1;
    const { land } = new CreateTerrain();
    this.scene.add(land);
  }

  destroy(): void {
    super.destroy();
  }
}
