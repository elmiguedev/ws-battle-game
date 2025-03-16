import Phaser, { Scene } from "phaser"
import type { PlayerState } from "../sockets/states/PlayerState";
import { HpBar } from "./HpBar";

export class Player extends Phaser.GameObjects.Sprite {

  private hpBar: HpBar;

  constructor(scene: Scene, x: number, y: number) {
    super(scene, x, y, 'player');
    this.anims.createFromAseprite('player');
    this.scene.add.existing(this);
    this.createHpBar();
  }

  public setPlayerState(state: PlayerState) {
    this.move(state.x, state.y);
    this.playAnimation(state.action);
    this.hpBar.setValue(state.hp);
  }

  public destroy() {
    super.destroy(true);
    this.hpBar.destroy();
  }

  private createHpBar() {
    this.hpBar = new HpBar(this.scene, this.x - 25, this.y - 40);
  }

  private move(x: number, y: number) {
    if (this.x !== x) {
      this.setFlipX(x < this.x);
    }
    this.x = x;
    this.y = y;
    this.setDepth(this.y);
    this.hpBar.setPosition(this.x - 25, this.y - 40);
    this.hpBar.setDepth(this.y);
  }

  private playAnimation(key: string) {
    switch (key) {

      case "idle":
        this.playIdleAnimation();
        break;

      case "move":
        this.playWalkAnimation();
        break;

      case "attack":
        this.playAttackAnimation();
        break;

      case "hurt":
        this.playHurtAnimation();
        break;

      case "dead":
        this.playDeathAnimation();
        break;

      default:
        break;
    }
  }

  private playIdleAnimation() {
    this.play({ key: "idle", timeScale: 0.3, repeat: -1 }, true);
  }

  private playWalkAnimation() {
    this.play({ key: "walk", timeScale: 0.7, repeat: -1 }, true);
  }

  private playAttackAnimation() {
    this.play({ key: "attack", timeScale: 0.7, repeat: -1 }, true);
  }

  private playHurtAnimation() {
    this.play({ key: "hurt", timeScale: 0.9, repeat: -1, }, true);
  }

  private playDeathAnimation() {
    this.play({ key: "dead", timeScale: 0.9 }, true);
  }

}
