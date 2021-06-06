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
  constructor() {
    super({
      key: 'game',
      active: true,
    });
  }

  preload(): void {
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
      sprite: this.add.image(halfWidth, halfHeight, 'airplanes', 'US_b17.png'),
    };
    this.airplanes.JAPKi45 = {
      sprite: this.add.image(halfWidth, halfHeight, 'airplanes', 'JAP_Ki45.png'),
    };
    this.airplanes.USSRPe3 = {
      sprite: this.add.image(halfWidth, halfHeight, 'airplanes', 'USSR_Pe3.png'),
    };
    this.airplanes.UKLancaster = {
      sprite: this.add.image(halfWidth, halfHeight, 'airplanes', 'UK_Lancaster.png'),
    };
    this.airplanes.GERbf110 = {
      sprite: this.add.image(halfWidth, halfHeight, 'airplanes', 'GER_bf110.png'),
    };
    this.airplanes.UKBeaufighter = {
      sprite: this.add.image(halfWidth, halfHeight, 'airplanes', 'UK_Beaufighter.png'),
    };
    this.airplanes.UKVeligton = {
      sprite: this.add.image(halfWidth, halfHeight, 'airplanes', 'UK_Veligton.png'),
    };
    this.airplanes.USa26 = {
      sprite: this.add.image(halfWidth, halfHeight, 'airplanes', 'US_a26.png'),
    };
    this.airplanes.JAPKi21 = {
      sprite: this.add.image(halfWidth, halfHeight, 'airplanes', 'JAP_Ki21.png'),
    };
    this.airplanes.GERHe111 = {
      sprite: this.add.image(halfWidth, halfHeight, 'airplanes', 'GER_He111.png'),
    };
    this.airplanes.USSRTu2 = {
      sprite: this.add.image(halfWidth, halfHeight, 'airplanes', 'USSR_Tu2.png'),
    };
    this.airplanes.UKBlenheim = {
      sprite: this.add.image(halfWidth, halfHeight, 'airplanes', 'UK_Blenheim.png'),
    };
    this.airplanes.USp47 = {
      sprite: this.add.image(halfWidth, halfHeight, 'airplanes', 'US_p47.png'),
    };
    this.airplanes.GERJu87 = {
      sprite: this.add.image(halfWidth, halfHeight, 'airplanes', 'GER_Ju87.png'),
    };
    this.airplanes.USp38 = {
      sprite: this.add.image(halfWidth, halfHeight, 'airplanes', 'US_p38.png'),
    };
    this.airplanes.USSRIl2 = {
      sprite: this.add.image(halfWidth, halfHeight, 'airplanes', 'USSR_Il2.png'),
    };
    this.airplanes.UKtyphoon = {
      sprite: this.add.image(halfWidth, halfHeight, 'airplanes', 'UK_typhoon.png'),
    };
    this.airplanes.JAPa6m = {
      sprite: this.add.image(halfWidth, halfHeight, 'airplanes', 'JAP_a6m.png'),
    };
    this.airplanes.JAPKi51 = {
      sprite: this.add.image(halfWidth, halfHeight, 'airplanes', 'JAP_Ki51.png'),
    };
    this.airplanes.USp40 = {
      sprite: this.add.image(halfWidth, halfHeight, 'airplanes', 'US_p40.png'),
    };
    this.airplanes.USSRLa5 = {
      sprite: this.add.image(halfWidth, halfHeight, 'airplanes', 'USSR_La5.png'),
    };
    this.airplanes.UKSpitfire = {
      sprite: this.add.image(halfWidth, halfHeight, 'airplanes', 'UK_Spitfire.png'),
    };
    this.airplanes.JAPKi61 = {
      sprite: this.add.image(halfWidth, halfHeight, 'airplanes', 'JAP_Ki61.png'),
    };
    this.airplanes.USp51 = {
      sprite: this.add.image(halfWidth, halfHeight, 'airplanes', 'US_p51.png'),
    };
    this.airplanes.GERFW190 = {
      sprite: this.add.image(halfWidth, halfHeight, 'airplanes', 'GER_FW190.png'),
    };
    this.airplanes.GERbf109 = {
      sprite: this.add.image(halfWidth, halfHeight, 'airplanes', 'GER_bf109.png'),
    };
    this.airplanes.USSRLagg3 = {
      sprite: this.add.image(halfWidth, halfHeight, 'airplanes', 'USSR_Lagg3.png'),
    };

    Object.values(this.airplanes).forEach((airplane) => {
      airplane.sprite.flipY = true;
      airplane.circle = {
        x: Math.random() * halfWidth * 2,
        y: Math.random() * halfHeight * 2,
        size: Math.random() * halfHeight * 2,
      };
      airplane.speed = (Math.random() + 0.5) * 2000;
    });
  }

  update(time: number, delta: number): void {
    if (debug) this.fpsText.setText(`FPS: ${(1000 / delta).toFixed(3)}\n`);

    Object.values(this.airplanes).forEach((airplane) => {
      actions.rotateAroundCircle2D(airplane.sprite, time / airplane.speed!, airplane.circle!);
    });

  }
}
