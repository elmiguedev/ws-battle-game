import { ARENA_SIZE } from "../../core/utils/Constants";
import type { Player } from "./entities/Player";
import type { GameStateListener } from "./listeners/GameStateListener";
import type { PlayerDeathListener } from "./listeners/PlayerDeathListener";
import type { PlayerDisconnectListener } from "./listeners/PlayerDisconnectListener";
import type { ItemState } from "./states/ItemState";
import { Utils } from "./utils/Utils";

export class Game {
  public players: Record<string, Player> = {};
  public items: Record<string, ItemState> = {};
  private gameStateListener: GameStateListener[] = []
  private playerDisconnectListener: PlayerDisconnectListener[] = []
  private playerDeathListener: PlayerDeathListener[] = []

  public start() {

    for (let i = 0; i < 10; i++) {
      this.createRandomHealItem();
    }

    setInterval(() => {
      this.checkPlayersTimers();
      this.notifyGameState();
    }, 1000 / 30);
  }

  public removePlayer(playerId: string) {
    delete this.players[playerId];
    this.notifyPlayerDisconnected(playerId);
  }

  public addGameStateListener(listener: GameStateListener) {
    this.gameStateListener.push(listener);
  }

  public addPlayerDisconnectListener(listener: PlayerDisconnectListener) {
    this.playerDisconnectListener.push(listener);
  }

  public addPlayerDeathListener(listener: PlayerDeathListener) {
    this.playerDeathListener.push(listener);
  }

  private createRandomHealItem() {
    const x = Utils.getIntBetween(-ARENA_SIZE / 2, ARENA_SIZE / 2);
    const y = Utils.getIntBetween(-ARENA_SIZE / 2, ARENA_SIZE / 2);
    const id = Math.random().toString(36).substring(2, 9);
    this.items[id] = { id, x, y, key: "heal" };
  }

  private checkPlayersTimers() {
    for (const player of Object.values(this.players)) {
      if (player.action === "dead") {
        continue;
      }
      if (player.attackTimer > 0) {
        player.attackTimer--;
        if (player.attackTimer === 0) {
          player.action = "idle";
        }
      }

      if (player.moveTimer > 0) {
        player.moveTimer--;
        if (player.moveTimer === 0) {
          player.action = "idle";
        }
      }

      if (player.hurtTimer > 0) {
        player.hurtTimer--;
        if (player.hurtTimer === 0) {
          player.action = "idle";
        }
      }
    }
  }

  private notifyGameState() {
    for (const listener of this.gameStateListener) {
      listener.notify({
        players: this.players,
        items: this.items
      });
    }
  }

  private notifyPlayerDisconnected(id: string) {
    for (const listener of this.playerDisconnectListener) {
      listener.notify(id);
    }
  }

  public notifyPlayerDeath(id: string) {
    for (const listener of this.playerDeathListener) {
      listener.notify(id);
    }
  }

}