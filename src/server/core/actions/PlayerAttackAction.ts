import type { Game } from "../Game";
import { Utils } from "../utils/Utils";

export interface PlayerAttackActionProps {
  playerId: string;
  enemyId: string;
}

export class PlayerAttackAction {

  constructor(
    private readonly game: Game
  ) { }

  public execute(props: PlayerAttackActionProps) {
    const player = this.game.players[props.playerId];
    const enemy = this.game.players[props.enemyId];
    if (player && enemy) {
      const distance = Utils.distanceBetween(player.x, player.y, enemy.x, enemy.y);
      if (distance < 50) {
        enemy.hp = enemy.hp - 10;
      }
    }
  }
}