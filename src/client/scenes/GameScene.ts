import type { GameSceneEntities } from "./GameSceneEntities";
import { SocketManager } from "../sockets/SocketManager";
import type { GameSceneHud } from "../huds/GameSceneHud";
import { ARENA_SIZE } from "../../core/utils/Constants";

export class GameScene extends Phaser.Scene {
  private socketManager!: SocketManager;
  private controls!: Phaser.Types.Input.Keyboard.CursorKeys;
  private attackKey!: Phaser.Input.Keyboard.Key;
  private entities: GameSceneEntities;
  private hud!: GameSceneHud;

  constructor() {
    super("GameScene");
  }

  create() {
    this.entities = {
      players: {},
      mainPlayer: null
    }
    this.controls = this.input.keyboard.createCursorKeys();
    this.attackKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.socketManager = new SocketManager(this, this.entities);

    this.createHud();
    this.createGrid();
  }

  update() {
    if (this.entities.mainPlayer) {
      if (this.controls.left.isDown) {
        this.socketManager.emit("move", "left");
      }
      if (this.controls.right.isDown) {
        this.socketManager.emit("move", "right");
      }
      if (this.controls.up.isDown) {
        this.socketManager.emit("move", "up");
      }
      if (this.controls.down.isDown) {
        this.socketManager.emit("move", "down");
      }
    }



    if (this.attackKey.isDown) {
      this.socketManager.emit("attack");
    }
  }

  private createHud() {
    this.scene.run("GameSceneHud", {
      onAttack: () => {
        this.socketManager.emit("attack");
      },
      onMove: (direction: any) => {
        this.socketManager.emit("move", direction);
      }
    });


    this.hud = this.scene.get("HudScene") as GameSceneHud;


  }

  private createGrid() {
    this.add.grid(0, 0, ARENA_SIZE, ARENA_SIZE, 50, 50, 0x000000, 0, 0xffffff, 0.3);
  }
}