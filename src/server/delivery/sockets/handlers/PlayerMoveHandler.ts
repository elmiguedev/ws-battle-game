import type { Socket } from "socket.io";
import type { PlayerMoveAction } from "../../../core/actions/PlayerMoveAction";

export class PlayerMoveHandler {
  constructor(
    private socket: Socket,
    private action: PlayerMoveAction
  ) {
  }

  public handle(direction: string) {
    this.action.execute(this.socket.id, direction);
  }

}