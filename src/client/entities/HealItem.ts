import { Scene } from "phaser";

export class HealItem extends Phaser.GameObjects.Sprite {
  constructor(scene: Scene, x: number, y: number) {
    super(scene, x, y, 'heal_item', 0);
    this.scene.add.existing(this);
    this.setScale(1.5);
    this.setDepth(y);
  }
}