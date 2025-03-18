import { Scene } from "phaser";
import PlayerPng from "../assets/sprites/player/player.png";
import PlayerJson from "../assets/sprites/player/player.json";
import HealItemPng from "../assets/sprites/heal_item/heal_item.png";
import HealItemJson from "../assets/sprites/heal_item/heal_item.json";

export class BootloaderScene extends Scene {

  constructor() {
    super("BootloaderScene");
  }

  preload() {
    this.load.aseprite("player", PlayerPng, PlayerJson);
    this.load.aseprite("heal_item", HealItemPng, HealItemJson);
    this.load.once("complete", () => {
      this.scene.start("StartScene");
    })
  }
}