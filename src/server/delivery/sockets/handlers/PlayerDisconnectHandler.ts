import type { Socket } from "socket.io";
import type { PlayerDisconnectAction } from "../../../core/actions/PlayerDisconnectAction";

export const PlayerDisconnectHandler = (socket: Socket, action: PlayerDisconnectAction) => {
  return {
    handle: (id: string) => {
      action.execute(socket.id);
    }
  }
}