import type { Game } from "../Game";

export class PlayerDisconnectAction {
  constructor(
    private readonly game: Game
  ) {
  }

  public execute(id: string) {
    delete this.game.players[id];
  }
}