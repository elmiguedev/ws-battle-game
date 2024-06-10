import io, { Socket } from "socket.io-client"
import type { GameSceneEntities } from "../scenes/GameSceneEntities";
import type { GameState } from "./states/GameState";
import { Player } from "../entities/Player";
import type { Scene } from "phaser";
export class SocketManager {
  private socket: Socket;
  constructor(private readonly scene: Scene, private readonly entities: GameSceneEntities) {
    this.socket = io();
    this.socket.on("player_disconnected", (id: string) => {
      const player = this.entities.players[id];
      if (player) {
        player.destroy();
        delete this.entities.players[id];
      }
    });

    this.socket.on("game_state", (state: GameState) => {
      Object.keys(state.players).forEach((playerId: string) => {
        const playerState = state.players[playerId];
        if (playerState.id === this.socket.id) {
          if (this.entities.mainPlayer) {
            this.entities.mainPlayer.setPosition(playerState.x, playerState.y);
          } else {
            this.entities.mainPlayer = new Player(this.scene, playerState.x, playerState.y);
          }
        } else {
          if (this.entities.players[playerState.id]) {
            this.entities.players[playerState.id].setPosition(playerState.x, playerState.y);
          } else {
            this.entities.players[playerState.id] = new Player(this.scene, playerState.x, playerState.y);
          }
        }
      })
    });
  }

  public emit(event: string, data?: any) {
    this.socket.emit(event, data);
  }

}