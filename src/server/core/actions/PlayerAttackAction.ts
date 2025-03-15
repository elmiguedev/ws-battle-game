import type { Player } from "../entities/Player";
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
    const enemy = this.getNearestPlayer(props.playerId);

    if (player) {
      player.action = "attack";
      player.attackTimer = 10;
      
      if (enemy) {
          enemy.hp = enemy.hp - 10;
          enemy.action = "hurt";
          enemy.hurtTimer = 10;
      }
    }

  }

  private getNearestPlayer(playerId: string):Player | undefined {
    const player = this.game.players[playerId];
    for (const enemy of Object.values(this.game.players)) {
      if (enemy.id !== playerId) {
          const distance = Utils.distanceBetween(player.x, player.y, enemy.x, enemy.y);
          if (distance < 50) {
            return enemy;
          }
        }
      
    } 
    return undefined;
  }
}