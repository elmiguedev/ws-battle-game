import { Utils } from "../utils/Utils";
import type { Game } from "../Game";
import { MAX_HP } from "../../../core/utils/Constants";

export class PlayerCreateAction {
  constructor(
    private readonly game: Game
  ) {
  }

  public execute(id: string) {
    console.log("player connected", id);
    this.game.players[id] = {
      id: id,
      x: 0,
      y: 0,
      hp: MAX_HP,
      action: "idle",
      moveTimer: 0,
      attackTimer: 0,
      hurtTimer: 0
    }
  }
}