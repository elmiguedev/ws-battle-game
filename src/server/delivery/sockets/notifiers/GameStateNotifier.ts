import type { Server } from "socket.io";
import type { Player } from "../../../core/entities/Player";
import type { GameStateListener } from "../../../core/listeners/GameStateListener";

export class GameStateNotifier implements GameStateListener {
  constructor(
    private readonly serverSocket: Server
  ) { }
  public notify(players: Record<string, Player>): void {
    this.serverSocket.emit("game_state", players);
  }

}