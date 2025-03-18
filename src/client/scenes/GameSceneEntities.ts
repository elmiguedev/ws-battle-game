import type { HealItem } from "../entities/HealItem";
import type { Player } from "../entities/Player";

export interface GameSceneEntities {
  players: Record<string, Player>;
  items: Record<string, HealItem>;
  mainPlayer: Player;
}