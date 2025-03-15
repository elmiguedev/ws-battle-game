import type { Game } from "../Game";

export class PlayerMoveAction {
  constructor(
    private readonly game: Game
  ) {
  }

  public execute(id: string, direction: string) {
    const player = this.game.players[id];
    if (player) {
      player.moveTimer = 10;
      player.action = "move";
      switch (direction) {
        case "left": player.x -= 2; break;
        case "right": player.x += 2; break;
        case "up": player.y -= 2; break;
        case "down": player.y += 2; break;
        default:
          break;
      }
    }
  }
}