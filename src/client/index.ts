import Phaser from "phaser";
import { GameScene } from "./scenes/GameScene";
import { BootloaderScene } from "./scenes/BootloaderScene";
import VirtualJoystickPlugin from 'phaser3-rex-plugins/plugins/virtualjoystick-plugin.js';
import { GameSceneHud } from "./huds/GameSceneHud";

new Phaser.Game({
  type: Phaser.CANVAS,
  scale: {
    mode: Phaser.Scale.RESIZE,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  render: {
    pixelArt: true
  },
  scene: [
    BootloaderScene,
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