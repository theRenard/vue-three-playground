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
  followTarget(obj: unknown, target: unknown, speed = 2, time: number): void {
    if (obj instanceof Phaser.GameObjects.Image && target instanceof Phaser.GameObjects.Image) {
      const angle = Math.atan2(target.y - obj.y, target.x - obj.x);
      const distance = Math.hypot(target.x - obj.x, target.y - obj.y);
      const newAngle = angle - obj.rotation;
      if (
        (distance > 100 && Math.abs(newAngle) < 0.5)
        || distance > 300) {
        obj.rotation += Math.sin(newAngle);
        obj.x += speed * Math.cos(angle);
        obj.y += speed * Math.sin(angle);
      } else {
        obj.x += speed * Math.cos(obj.rotation);
        obj.y += speed * Math.sin(obj.rotation);
      }
    }
  },
};
