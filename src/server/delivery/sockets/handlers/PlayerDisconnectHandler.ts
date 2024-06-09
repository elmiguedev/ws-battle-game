import type { Socket } from "socket.io";
import type { PlayerDisconnectAction } from "../../../core/actions/PlayerDisconnectAction";

export class PlayerDisconnectHandler {
  constructor(
    private socket: Socket,
    private action: PlayerDisconnectAction
  ) {
  }

  public handle() {
    this.action.execute(this.socket.id);
  }

}