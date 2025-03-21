import type { Server } from "socket.io";
import type { GameState } from "../../../core/states/GameState";
import type { IClient, PeerServer } from "peer";
import type { WebRtcMessage } from "../WebRtcMessage";
import type { WebRtcServer } from "../WebRtcServer";

export const PlayerDisconnectNotifier = (server: WebRtcServer) => {
  return {
    notify: (id: string) => {
      server.broadcast("player_disconnect", id);
    }
  }
}