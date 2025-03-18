import type { Server } from "socket.io";
import type { Player } from "../../../core/entities/Player";
import type { ItemState } from "../../../core/states/ItemState";
export const PlayerItemNotifier = (serverSocket: Server) => {
  return {
    notify: (player: Player, item: ItemState) => {
      serverSocket.emit("item_collected", item);
    }
  }
}