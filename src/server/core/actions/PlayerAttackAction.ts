import { DAMAGE } from "../../../core/utils/Constants";
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
    if (!player || player.action === "dead") {
      return;
    }

    const enemy = this.getNearestPlayer(props.playerId);
    if (player && player.action !== "attack" && player.attackTimer === 0) {
      player.action = "attack";
      player.attackTimer = 10;

      if (enemy && enemy.action !== "hurt" && enemy.action !== "dead") {
        enemy.hp = enemy.hp - DAMAGE;
        enemy.action = "hurt";
        enemy.hurtTimer = 10;
        if (enemy.hp <= 0) {
          this.game.notifyPlayerDeath(enemy.id);
          enemy.action = "dead";
          player.score++;
        }
      }
    }

  }

  private getNearestPlayer(playerId: string): Player | undefined {
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