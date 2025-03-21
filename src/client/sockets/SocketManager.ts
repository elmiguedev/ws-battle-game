import io, { Socket } from "socket.io-client"
import type { GameSceneEntities } from "../scenes/GameSceneEntities";
import type { GameState } from "./states/GameState";
import { Player } from "../entities/Player";
import type { Scene } from "phaser";
import type { GameSceneHud } from "../huds/GameSceneHud";
import { HealItem } from "../entities/HealItem";
import type { ItemState } from "../../server/core/states/ItemState";
import type { CommunicationManager } from "../CommunicationManager";

export class SocketManager implements CommunicationManager {
  private socket: Socket;

  constructor(private readonly scene: Scene, private readonly entities: GameSceneEntities, private readonly hud: GameSceneHud, data: any) {
    this.socket = io({
      query: {
        name: data.name
      }
    });
    this.socket.on("player_disconnect", (id: string) => {
      const player = this.entities.players[id];

      if (player) {
        player.destroy();
        delete this.entities.players[id];
      }
    });

    this.socket.on("item_collected", (item: ItemState) => {
      const itemEntity = this.entities.items[item.id];

      if (itemEntity) {
        itemEntity.destroy();
        delete this.entities.items[item.id];
      }

    });

    this.socket.on("game_state", (state: GameState) => {
      if (hud) {
        hud.updateState(state);
      }
      Object.keys(state.players).forEach((playerId: string) => {
        const playerState = state.players[playerId];
        if (playerState.id === this.socket.id) {
          if (this.entities.mainPlayer) {
            this.entities.mainPlayer.setPlayerState(playerState);
          } else {
            this.entities.mainPlayer = new Player(this.scene, playerState.x, playerState.y);
            this.scene.cameras.main.startFollow(this.entities.mainPlayer);
            this.hud.setMainPlayer(this.entities.mainPlayer);
          }
        } else {
          if (this.entities.players[playerState.id]) {
            this.entities.players[playerState.id].setPlayerState(playerState);
          } else {
            this.entities.players[playerState.id] = new Player(this.scene, playerState.x, playerState.y);
          }
        }
      })

      // pone los items
      Object.keys(state.items).forEach((itemId: string) => {
        const item = state.items[itemId];
        if (!this.entities.items[itemId]) {
          this.entities.items[itemId] = new HealItem(
            this.scene,
            item.x,
            item.y
          )
        }
      })
    });
  }

  public destroy() {
    if (!this.socket.disconnected) {
      this.socket.disconnect();
      this.socket.close();
    }
  }

  public emit(event: string, data?: any) {
    this.socket.emit(event, data);
  }

}