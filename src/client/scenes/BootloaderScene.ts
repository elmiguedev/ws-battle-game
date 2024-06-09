import { Scene } from "phaser";
import PlayerPng from "../assets/player.png";

export class BootloaderScene extends Scene {

  constructor() {
    super("BootloaderScene");
  }

  preload() {
    this.load.image("player", PlayerPng);
    this.load.once("complete", () => {
      this.scene.start("GameScene");
    })
  }
}