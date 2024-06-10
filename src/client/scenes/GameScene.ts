import { Player } from "../entities/Player";
import io, { Socket } from "socket.io-client";
import type { GameState } from "../sockets/states/GameState";
import type { GameSceneEntities } from "./GameSceneEntities";
import { SocketManager } from "../sockets/SocketManager";

export class GameScene extends Phaser.Scene {
  private socketManager!: SocketManager;
  private controls!: Phaser.Types.Input.Keyboard.CursorKeys;
  private attackKey!: Phaser.Input.Keyboard.Key;
  private entities: GameSceneEntities;

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
}