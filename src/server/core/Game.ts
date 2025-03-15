import type { Player } from "./entities/Player";
import type { GameStateListener } from "./listeners/GameStateListener";
import type { PlayerDisconnectListener } from "./listeners/PlayerDisconnectListener";

export class Game {
  public players: Record<string, Player> = {};
  private gameStateListener: GameStateListener[] = []
  private playerDisconnectListener: PlayerDisconnectListener[] = []

  public start() {
    setInterval(() => {
      this.notifyGameState();
    }, 1000 / 30);
  }

  public removePlayer(playerId:string) {
    delete this.players[playerId];
    this.notifyPlayerDisconnected(playerId);
  }

  public addGameStateListener(listener: GameStateListener) {
    this.gameStateListener.push(listener);
  }

  public addPlayerDisconnectListener(listener: PlayerDisconnectListener) {
    this.playerDisconnectListener.push(listener);
  }

  private notifyGameState() {
    for (const listener of this.gameStateListener) {
      listener.notify({
        players: this.players
      });
    }
  }

  private notifyPlayerDisconnected(id: string) {
    for (const listener of this.playerDisconnectListener) {
      listener.notify(id);
    }
  }

}