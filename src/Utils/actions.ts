import { Object3D } from 'three';

export default {
  /**
   *
   * @param obj An Object with x: number, y: number and rotation: number properties
   * @param speed rotation speed, should be a dynamic property like time
   * @param circle On object with x, y position and size
   */
  rotateAroundCircle2D(
    obj: unknown,
    speed: number,
    circle = { x: 100, y: 100, size: 100 },
  ): void {
    if (obj instanceof Phaser.GameObjects.Image) {
      obj.x = circle.x + Math.cos(speed) * circle.size;
      obj.y = circle.y + Math.sin(speed) * circle.size;
      obj.rotation = speed;
    }
  },
  followTarget(obj: unknown, target: unknown, speed = 1): void {
    if (obj instanceof Phaser.GameObjects.Image && target instanceof Phaser.GameObjects.Image) {
      const angle = Math.atan2(target.y - obj.y, target.x - obj.x);
      const diff = obj.rotation - angle;
      // console.log(obj);
      // if (false) {
      //   obj.rotation += Math.sin(angle - obj.rotation);
      //   obj.x += speed * Math.cos(angle);
      //   obj.y += speed * Math.sin(angle);
      // }
    }
  },
};
