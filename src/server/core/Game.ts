import type { Player } from "./entities/Player";
import type { GameStateListener } from "./listeners/GameStateListener";

export class Game {
  public players: Record<string, Player> = {};
  private gameStateListener: GameStateListener[] = []

  public start() {
    setInterval(() => {
      this.notifyGameState();
    }, 1000 / 30);
  }

  public addGameStateListener(listener: GameStateListener) {
    this.gameStateListener.push(listener);
  }

  private notifyGameState() {
    for (const listener of this.gameStateListener) {
      listener.notify(this.players);
    }
  }

}