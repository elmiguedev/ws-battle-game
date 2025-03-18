import type { ItemState } from "./ItemState";
import type { PlayerState } from "./PlayerState";

export interface GameState {
  players: Record<string, PlayerState>;
  items: Record<string, ItemState>;
}