import type { Game } from "../../core/Game";
import { PlayerCreateAction } from "../../core/actions/PlayerCreateAction";
import { PlayerDisconnectAction } from "../../core/actions/PlayerDisconnectAction";
import { PlayerMoveAction } from "../../core/actions/PlayerMoveAction";

export class ActionProvider {

  constructor(
    private readonly game: Game
  ) { }

  public get PlayerActions() {
    return {
      create: new PlayerCreateAction(this.game),
      move: new PlayerMoveAction(this.game),
      disconnect: new PlayerDisconnectAction(this.game)
    }
  }
}