import Sketch from '@/Sketch';
import floor from './floor';
import fog from './fog';
import house from './house/house';
import { ghost1, ghost2, ghost3 } from './ghosts';
import createLights from './lights';

export default class HauntedHouse extends Sketch {
  init(canvasEl: HTMLCanvasElement): void {
    super.init(canvasEl);
    this.scene.add(floor);
    this.scene.add(house);
    this.scene.add(ghost1);
    this.scene.add(ghost2);
    this.scene.add(ghost3);
    const { ambientLight, moonLight, doorLight } = createLights(this.gui);
    this.scene.add(moonLight);
    this.scene.add(ambientLight);
    this.scene.add(doorLight);
    this.scene.fog = fog;

    this.camera.position.x = 4;
    this.camera.position.y = 2;
    this.camera.position.z = 5;
  }

  // eslint-disable-next-line class-methods-use-this
  update(elapsedTime: number): void {
    const ghost1Angle = elapsedTime * 0.5;
    ghost1.position.x = Math.cos(ghost1Angle) * 4;
    ghost1.position.z = Math.sin(ghost1Angle) * 4;
    ghost1.position.y = Math.sin(elapsedTime * 3);

    const ghost2Angle = -elapsedTime * 0.32;
    ghost2.position.x = Math.cos(ghost2Angle) * 5;
    ghost2.position.z = Math.sin(ghost2Angle) * 5;
    ghost2.position.y = Math.sin(elapsedTime * 4) * Math.sin(elapsedTime * 2.5);

    const ghost3Angle = elapsedTime * 0.10;
    ghost3.position.x = Math.cos(ghost3Angle) * 4;
    ghost3.position.z = Math.sin(ghost3Angle) * 4;
    ghost3.position.y = Math.sin(elapsedTime * 3);
  }
}
