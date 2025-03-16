import { Utils } from "../utils/Utils";
import type { Game } from "../Game";
import { MAX_HP } from "../../../core/utils/Constants";

interface PlayerCreateActionParams {
  id: string;
  name: string;
}

export class PlayerCreateAction {
  constructor(
    private readonly game: Game
  ) {
  }

  public execute(params: PlayerCreateActionParams) {
    const { id, name } = params;
    console.log("player connected", id, name);
    this.game.players[id] = {
      id: id,
      name,
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