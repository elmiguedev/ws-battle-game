import type { Player } from "../entities/Player";

export interface GameSceneEntities {
  players: Record<string, Player>;
  mainPlayer: Player;
}