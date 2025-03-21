import type { Server } from "socket.io";
import type { GameState } from "../../../core/states/GameState";
import type { IClient, PeerServer } from "peer";
import type { WebRtcMessage } from "../WebRtcMessage";
import type { Player } from "../../../core/entities/Player";
import type { ItemState } from "../../../core/states/ItemState";
import type { WebRtcServer } from "../WebRtcServer";

export const PlayerItemNotifier = (server: WebRtcServer) => {
  return {
    notify: (player: Player, item: ItemState) => {
      server.broadcast("item_collected", item);
    }
  }
}