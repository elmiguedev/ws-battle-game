import Phaser, { Scene } from "phaser"
import type { PlayerState } from "../sockets/states/PlayerState";

export class Player extends Phaser.GameObjects.Sprite {
  
  constructor(scene: Scene, x: number, y: number) {
    super(scene, x, y, 'player');
    this.anims.createFromAseprite('player');
    this.scene.add.existing(this);
  }

  public setPlayerState(state:PlayerState) {
    this.move(state.x, state.y);
    this.playAnimation(state.action);
  }

  private move(x: number, y: number) {
    if (this.x !== x) {
      this.setFlipX(x < this.x);
    }
    this.x = x;
    this.y = y;
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
    this.play({
      key: "hurt",
      timeScale: 0.3,
      repeat: -1,
    }, true);
  }
}
