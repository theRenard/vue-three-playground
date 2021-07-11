import Sketch from '@/Three-Sketch';

export default class TerrainSketch extends Sketch {
  init(canvasEl: HTMLCanvasElement): void {
    super.init(canvasEl, 'orthographic');

    this.camera.position.x = 1;
    this.camera.position.y = 1;
    this.camera.position.z = 1;
    this.isReadyToRender = true;
  }

  destroy(): void {
    super.destroy();
  }
}
