import { Utils } from "../utils/Utils";
import type { Game } from "../Game";

export class PlayerCreateAction {
  constructor(
    private readonly game: Game
  ) {
  }

  public execute(id: string) {
    console.log("player connected", id);
    this.game.players[id] = {
      id: id,
      x: Utils.getIntBetween(200, 400),
      y: Utils.getIntBetween(200, 400),
      hp: 100,
      action: "idle",
      moveTimer: 0,
      attackTimer: 0,
      hurtTimer: 0
    }
  }
}