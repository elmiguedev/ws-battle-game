import type { Server } from "socket.io";
import type { GameState } from "../../../core/states/GameState";

export const GameStateNotifier = (serverSocket:Server) => {
  return {
    notify: (gameState:GameState) => {
      serverSocket.emit("game_state", gameState);
    }
  }
}