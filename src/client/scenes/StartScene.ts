import Peer from "peerjs";
import { Button } from "../entities/Button";
import { TextField } from "../entities/TextField";

export class StartScene extends Phaser.Scene {

  private txt: TextField;
  private btn: Button;

  constructor() {
    super("StartScene");
  }

  create() {

    this.createText();
    this.createButton();
  }

  private createText() {
    const x = this.game.canvas.width / 2;
    const y = this.game.canvas.height / 2;
    this.txt = new TextField({
      scene: this,
      x: x - 4,
      y: y - 100,
      width: 200
    })
    this.txt.setSize(200, 50);
    this.txt.onKeyEnter = () => {
      this.startGame();
    }
  }

  private createButton() {
    const x = this.game.canvas.width / 2;
    const y = this.txt.y + 70;
    this.btn = new Button({
      scene: this,
      x: x,
      y,
      text: "Start",
      width: 214,
      onClick: () => this.startGame()
    })
  }

  private startGame() {
    const name = this.txt.getText();
    this.scene.start("GameScene", {
      name
    });
  }
}