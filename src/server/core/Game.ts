import { ARENA_SIZE, GAME_FPS, ITEM_HEAL_VALUE, ITEMS_MAX_COUNT, ITEMS_TIME, MAX_HP } from "../../core/utils/Constants";
import type { Player } from "./entities/Player";
import type { GameStateListener } from "./listeners/GameStateListener";
import type { PlayerDeathListener } from "./listeners/PlayerDeathListener";
import type { PlayerDisconnectListener } from "./listeners/PlayerDisconnectListener";
import type { PlayerItemListener } from "./listeners/PlayerItemListener";
import type { ItemState } from "./states/ItemState";
import { Utils } from "./utils/Utils";

export class Game {
  public players: Record<string, Player> = {};
  public items: Record<string, ItemState> = {};
  private gameStateListener: GameStateListener[] = []
  private playerDisconnectListener: PlayerDisconnectListener[] = []
  private playerDeathListener: PlayerDeathListener[] = []
  private playerItemListener: PlayerItemListener[] = []

  private itemsTimer: any;
  private gameTimer: any;

  public start() {
    this.gameTimer = setInterval(() => {
      this.checkPlayers();
      this.notifyGameState();
    }, 1000 / GAME_FPS);

    this.itemsTimer = setInterval(() => {
      this.createRandomHealItem();
    }, 1000 * ITEMS_TIME);
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

  public addPlayerItemListener(listener: PlayerItemListener) {
    this.playerItemListener.push(listener);
  }

  private createRandomHealItem() {
    if (Object.keys(this.items).length >= ITEMS_MAX_COUNT) return;
    const halfArena = ARENA_SIZE / 2;
    const x = Utils.getIntBetween(-halfArena, halfArena);
    const y = Utils.getIntBetween(-halfArena, halfArena);
    const id = Math.random().toString(36).substring(2, 9);
    this.items[id] = { id, x, y, key: "heal" };
  }

  private checkPlayers() {
    for (const player of Object.values(this.players)) {
      this.checkPlayerTimers(player);
      this.checkPlayerItemCollisions(player);
    }
  }
  private checkPlayerTimers(player: Player) {
    if (player.action === "dead") {
      return;
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

  private checkPlayerItemCollisions(player: Player) {
    for (const item of Object.values(this.items)) {
      const distance = Utils.distanceBetween(player.x, player.y, item.x, item.y);
      if (distance < 20) {
        delete this.items[item.id];
        player.hp += ITEM_HEAL_VALUE;
        if (player.hp > MAX_HP) {
          player.hp = MAX_HP;
        }
        this.notifyPlayerItem(player, item);
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

  public notifyPlayerItem(player: Player, item: ItemState) {
    for (const listener of this.playerItemListener) {
      listener.notify(player, item);
    }
  }

}