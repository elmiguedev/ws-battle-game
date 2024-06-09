import Phaser from "phaser";
import { GameScene } from "./scenes/GameScene";
import { BootloaderScene } from "./scenes/BootloaderScene";

new Phaser.Game({
  width: 800,
  height: 600,
  render: {
    pixelArt: true
  },
  scene: [
    BootloaderScene,
    GameScene
  ]
})