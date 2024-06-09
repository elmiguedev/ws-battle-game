import type { Player } from "../entities/Player";

export interface GameStateListener {
  notify(players: Record<string, Player>): void;
}