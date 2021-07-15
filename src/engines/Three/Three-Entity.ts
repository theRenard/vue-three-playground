/* eslint-disable import/no-cycle */
import Sketch from './Three';

export default abstract class Entity {
/**
 * This function is called by the sketch at every requestAnimationFrame.
 *
 * @abstract
 * @param {number} elapsedTime
 * @memberof Entity
 */
abstract update(elapsedTime: number): void;
  private sketch: Sketch;
/**
 * This function is called by the sketch once the entity is added to it.
 *
 * @abstract
 * @memberof Entity
 */
abstract init(): void;

setSketch(sketch: Sketch): void {
  this.sketch = sketch;
}
/**
 * This function returns the parent sketch and its members (camera, scene, etc)
 *
 * @return {*}  {Sketch}
 * @memberof Entity
 */
getSketch(): Sketch {
  return this.sketch;
}
/**
 * This function is called by the sketch when the entity is removed from it.
 *
 * @abstract
 * @memberof Entity
 */
abstract destroy(): void;
}
