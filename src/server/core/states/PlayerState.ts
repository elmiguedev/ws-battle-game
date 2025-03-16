export interface PlayerState {
  id: string;
  x: number;
  y: number;
  hp: number;
  action: "attack" | "move" | "idle" | "hurt" | "dead";
  moveTimer: number;
  attackTimer: number;
  hurtTimer: number;
}