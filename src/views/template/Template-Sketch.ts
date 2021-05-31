import Sketch from '@/Sketch';

export default class TemplateSketch extends Sketch {
  init(canvasEl: HTMLCanvasElement): void {
    super.init(canvasEl, 'orthographic');

    this.camera.position.x = 1;
    this.camera.position.y = 1;
    this.camera.position.z = 1;
  }

  destroy(): void {
    super.destroy();
  }
}
