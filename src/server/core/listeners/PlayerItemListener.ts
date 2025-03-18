import type { Player } from "../entities/Player";
import type { ItemState } from "../states/ItemState";

export interface PlayerItemListener {
  notify(player: Player, item: ItemState): void;
}