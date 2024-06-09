import Phaser, { Scene } from "phaser"

export class Player extends Phaser.GameObjects.Sprite {

  constructor(scene: Scene, x: number, y: number) {
    super(scene, x, y, 'player');
    this.scene.add.existing(this);
  }

}