import type { Game } from "../Game";

export class PlayerDisconnectAction {
  constructor(
    private readonly game: Game
  ) {
  }

  public execute(id: string) {
     this.game.removePlayer(id);
  }
}