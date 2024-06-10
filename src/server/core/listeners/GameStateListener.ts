import type { GameState } from "../states/GameState";

export interface GameStateListener {
  notify(gameState: GameState): void;
}