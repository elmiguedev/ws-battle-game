import { Button } from "../entities/Button";
import type { Player } from "../entities/Player";
import { TouchControls } from "../entities/TouchControls";
import type { GameState } from "../sockets/states/GameState";

export class GameSceneHud extends Phaser.Scene {

  private touchControls: TouchControls;
  private isMobile: boolean = false;
  private txtScore: Phaser.GameObjects.Text;
  private restartButton: Button;
  private mainPlayer: Player;
  private onRestart: () => void;

  public onAttack: () => void;
  public onMove: (direction: "up" | "down" | "left" | "right") => void;

  constructor() {
    super("GameSceneHud");
  }

  init(data: any) {
    this.onAttack = data.onAttack;
    this.onMove = data.onMove;
    this.onRestart = data.onRestart;
  }

  create() {

    this.checkIsMobile();
    this.createTouchControls();
    this.createScore();
    this.createResetButton();
  }

  update() {
    this.checkTouchControls();
  }

  public setMainPlayer(player: Player) {
    this.mainPlayer = player;
  }

  public updateState(state: GameState) {
    const scores: any[] = [];
    Object.keys(state.players).forEach((playerId: string) => {
      const playerState = state.players[playerId];
      scores.push({
        name: playerState.name,
        score: playerState.score
      });
    });

    scores.sort((a, b) => b.score - a.score);
    this.txtScore.setText(`${scores.map((s) => `${s.name}: ${s.score}`).join("\n")}`);
  }

  public showRestartButton() {
    if (!this.restartButton.visible) {
      this.restartButton.setVisible(true);
    }
  }

  private createScore() {
    this.txtScore = this.add.text(
      10,
      10,
      "",
      {
        fontFamily: 'Tiny5',
        fontSize: '24px',
        color: '#ffffff',
        align: 'left'
      }
    )
  }

  private checkIsMobile() {
    this.isMobile = this.sys.game.device.os.android || this.sys.game.device.os.iOS;
  }

  private createTouchControls() {
    if (this.isMobile) {
      this.touchControls = new TouchControls(this);
      this.touchControls.onAttack = this.onAttack;
      this.touchControls.onMove = this.onMove;
    }
  }

  private checkTouchControls() {
    if (this.isMobile) {
      this.touchControls.update();
    }
  }

  private createResetButton() {
    this.restartButton = new Button({
      scene: this,
      x: this.game.canvas.width / 2,
      y: (this.game.canvas.height / 2) + 100,
      text: "Restart",
      onClick: () => {
        if (this.onRestart) {
          this.onRestart();
        }
      }
    }).setVisible(false);
  }

}