import { Scene } from "phaser";

export class HealItem extends Phaser.GameObjects.Sprite {
  constructor(scene: Scene, x: number, y: number) {
    super(scene, x, y, 'heal_item', 0);
    this.scene.add.rectangle(x, y, 32, 32, 0x000000).setOrigin(0);
    this.scene.add.existing(this);
    this.setScale(2);
    this.setDepth(1000);
  }
}