import type { Server } from "socket.io";
import type { Player } from "../../../core/entities/Player";
import type { GameStateListener } from "../../../core/listeners/GameStateListener";
import type { GameState } from "../../../core/states/GameState";

export class GameStateNotifier implements GameStateListener {
  constructor(
    private readonly serverSocket: Server
  ) { }
  public notify(gameState: GameState): void {
    this.serverSocket.emit("game_state", gameState);
  }

}