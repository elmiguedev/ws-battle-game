import type { GameSceneEntities } from "./GameSceneEntities";
import { SocketManager } from "../sockets/SocketManager";
import type { GameSceneHud } from "../huds/GameSceneHud";
import { ARENA_SIZE } from "../../core/utils/Constants";
import type { CommunicationManager } from "../CommunicationManager";
import { WebRtcManager } from "../webrtc/WebRtcManager";


export class GameScene extends Phaser.Scene {
  private communicationManager!: CommunicationManager;
  private controls!: Phaser.Types.Input.Keyboard.CursorKeys;
  private keyControls!: {
    up: Phaser.Input.Keyboard.Key;
    down: Phaser.Input.Keyboard.Key;
    left: Phaser.Input.Keyboard.Key;
    right: Phaser.Input.Keyboard.Key;
  };
  private attackKey!: Phaser.Input.Keyboard.Key;
  private entities: GameSceneEntities;
  private hud!: GameSceneHud;
  private sceneData: any;

  constructor() {
    super("GameScene");
  }

  init(data: any) {
    this.sceneData = data;
  }

  create() {
    this.createEntities();
    this.createControls();
    this.createHud();
    this.createGrid();
    this.createCommunicationManager();
    this.createShutdownHandler();
  }

  update() {
    this.checkControls();
    this.checkRestartButton();
  }

  private createEntities() {
    this.entities = {
      players: {},
      items: {},
      mainPlayer: null
    }
  }

  private createControls() {
    this.controls = this.input.keyboard.createCursorKeys();
    this.keyControls = {
      up: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
      down: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
      left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
      right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
    }
    this.attackKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
  }

  private createHud() {
    this.scene.run("GameSceneHud", {
      onAttack: () => {
        this.communicationManager.emit("attack");
      },
      onMove: (direction: any) => {
        this.communicationManager.emit("move", direction);
      },
      onRestart: () => {
        this.restartGame();
      }
    });


    this.hud = this.scene.get("GameSceneHud") as GameSceneHud;


  }

  private createCommunicationManager() {
    //this.communicationManager = new SocketManager(this, this.entities, this.hud, this.sceneData);
    this.communicationManager = new WebRtcManager(this, this.entities, this.hud, this.sceneData);
  }

  private checkRestartButton() {
    if (this.entities.mainPlayer && this.entities.mainPlayer.isDead()) {
      this.hud.showRestartButton();
    }
  }

  private checkControls() {
    if (this.entities.mainPlayer) {
      if (this.controls.left.isDown || this.keyControls.left.isDown) {
        this.communicationManager.emit("move", "left");
      }
      if (this.controls.right.isDown || this.keyControls.right.isDown) {
        this.communicationManager.emit("move", "right");
      }
      if (this.controls.up.isDown || this.keyControls.up.isDown) {
        this.communicationManager.emit("move", "up");
      }
      if (this.controls.down.isDown || this.keyControls.down.isDown) {
        this.communicationManager.emit("move", "down");
      }
    }

    if (this.attackKey.isDown) {
      this.communicationManager.emit("attack");
    }
  }

  private createGrid() {
    this.add.grid(0, 0, ARENA_SIZE, ARENA_SIZE, 50, 50, 0x000000, 0, 0xffffff, 0.3);
  }

  private restartGame() {
    this.communicationManager.destroy();
    this.scene.restart(this.sceneData);
  }

  private createShutdownHandler() {
    this.events.on('shutdown', () => {
      console.log('Escena cerrada (shutdown)');
      this.communicationManager.destroy();
    });
  }
}