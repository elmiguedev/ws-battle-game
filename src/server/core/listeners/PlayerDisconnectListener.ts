import type { PlayerState } from "../states/PlayerState";

export interface PlayerDisconnectListener {
  notify(id:string): void;
}