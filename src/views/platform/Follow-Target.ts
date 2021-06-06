import {
  Scene,
} from 'phaser';
import debug from '@/debug';
import actions from '@/Utils/actions';

export default class Game extends Scene {
  private fpsText!: Phaser.GameObjects.Text;
  private airplanes: {
    [key: string]: {
      sprite: Phaser.GameObjects.Image;
      speed?: number,
      circle?: { x: number, y: number, size: number }
    }
  } = {};
  private weapons: Phaser.GameObjects.Image[] = [];
  constructor() {
    super({
      key: 'follow-target',
      active: true,
    });
  }

  preload(): void {
    this.load.atlas('weapons', './sprites/weapons.png', './sprites/weapons.json');
    this.load.atlas('airplanes', './sprites/airplanes.png', './sprites/airplanes.json');

  }

  create(): void {
    if (debug) {
      this.fpsText = this.add.text(10, 550, 'FPS: -- \n-- Particles', {
        font: 'bold 26px Arial',
      });
    }

    const halfWidth = this.scale.width / 2;
    const halfHeight = this.scale.height / 2;

    this.airplanes.USb17 = {
      sprite: this.add.image(halfWidth, halfHeight, 'airplanes', 'US_b17.png').setScale(0.5),
      circle: {
        x: halfWidth,
        y: halfHeight,
        size: halfHeight,
      },
      speed: 2000,
    };
    this.airplanes.JAPKi45 = {
      sprite: this.add.image(halfWidth, halfHeight, 'airplanes', 'JAP_Ki45.png').setScale(0.5),
      circle: {
        x: halfWidth,
        y: halfHeight,
        size: halfHeight * 0.8,
      },
      speed: 1000,
    };

    Object.values(this.airplanes).forEach((airplane) => {
      airplane.sprite.flipY = true;
    });

    this.time.addEvent({
      delay: 1000,
      repeat: 10,
      callback: () => {
        const weapon = this.add.image(this.airplanes.USb17.sprite.x, this.airplanes.USb17.sprite.y, 'weapons', 'Missile_1.png');
        weapon.scale = 0.4;
        this.weapons.push(weapon);
        setTimeout(() => {
          this.weapons[0].destroy();
        }, 3000);
      },
    });

  }

  update(time: number, delta: number): void {
    if (debug) this.fpsText.setText(`FPS: ${(1000 / delta).toFixed(3)}\n`);

    Object.values(this.airplanes).forEach((airplane) => {
      actions.rotateAroundCircle2D(airplane.sprite, time / airplane.speed!, airplane.circle!);
    });

    this.weapons.forEach((weapon) => {
      actions.followTarget(weapon, this.airplanes.JAPKi45.sprite);
    });

  }
}
