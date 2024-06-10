import type { Socket } from "socket.io";
import type { PlayerAttackAction } from "../../../core/actions/PlayerAttackAction";

export const PlayerAttackHandler = (socket: Socket, action: PlayerAttackAction) => {
  return {
    handle: (enemyId: string) => {
      action.execute({
        playerId: socket.id,
        enemyId
      });
    }
  }
}