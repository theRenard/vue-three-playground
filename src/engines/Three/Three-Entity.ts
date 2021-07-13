/* eslint-disable import/no-cycle */
import Sketch from './Three';

export default abstract class Entity {

  abstract update(elapsedTime: number): void;
  private sketch: Sketch;

  abstract init(): void;

  setSketch(sketch: Sketch): void {
    this.sketch = sketch;
  }

  getSketch(): Sketch {
    return this.sketch;
  }

  abstract destroy(): void;
}
