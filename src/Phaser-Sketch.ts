import Phaser, { Game } from 'phaser';

export default class PhaserSketch {
  phaserGame: Game;

  init(): void {
    this.phaserGame = new Phaser.Game({
      type: Phaser.AUTO,
      scale: {
        mode: Phaser.Scale.FIT,
        parent: 'phaser',
        width: 1200,
        height: 600,
        max: {
          width: 2400,
          height: 1200,
        },
      },
      // pixelArt: true,
      physics: {
        default: 'arcade',
        arcade: {
          useTree: false,
        },
      },
    });
  }
  destroy(): void {
    this.phaserGame.destroy(true);
  }
}
