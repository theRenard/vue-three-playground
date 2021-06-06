import Sketch from '@/Phaser-Sketch';
// import Game from './Game';
import FollowTarget from './Follow-Target';

export default class PlatformSketch extends Sketch {
  init(): void {
    super.init();
    // this.phaserGame.scene.add('Game', Game);
    this.phaserGame.scene.add('FollowTarget', FollowTarget);
  }
}
