import type { Server } from "socket.io";
import type { GameState } from "../../../core/states/GameState";
import type { IClient, PeerServer } from "peer";
import type { WebRtcMessage } from "../WebRtcMessage";
import type Peer from "peerjs";
import type { WebRtcServer } from "../WebRtcServer";

export const GameStateNotifier = (server: WebRtcServer) => {
  return {
    notify: (gameState: GameState) => {
      server.broadcast("game_state", gameState);
    }
  }
}