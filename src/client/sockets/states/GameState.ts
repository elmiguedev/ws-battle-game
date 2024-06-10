import type { PlayerState } from "./PlayerState";

export interface GameState {
  players: Record<string, PlayerState>;
}