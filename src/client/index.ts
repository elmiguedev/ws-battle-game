import Phaser from "phaser";
import { GameScene } from "./scenes/GameScene";
import { BootloaderScene } from "./scenes/BootloaderScene";
import VirtualJoystickPlugin from 'phaser3-rex-plugins/plugins/virtualjoystick-plugin.js';
import { GameSceneHud } from "./huds/GameSceneHud";
import { StartScene } from "./scenes/StartScene";

new Phaser.Game({
  type: Phaser.CANVAS,
  parent: "game",
  scale: {
    mode: Phaser.Scale.RESIZE,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  dom: {
    createContainer: true
  },
  render: {
    pixelArt: true,
  },
  scene: [
    BootloaderScene,
    StartScene,
    GameScene,
    GameSceneHud
  ],
  plugins: {
    global: [
      {
        key: 'rexVirtualJoystick',
        plugin: VirtualJoystickPlugin,
        start: true
      }
    ]
  }
})