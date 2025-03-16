import { TextField } from "../entities/TextField";

export class StartScene extends Phaser.Scene {

    private txt: TextField;

    constructor() {
        super("StartScene");
    }

    create() {
        const x = this.game.canvas.width / 2;
        const y = this.game.canvas.height / 2;
        this.txt = new TextField(this, x, y);
        this.txt.onKeyEnter = () => {
            const name = this.txt.getText();
            this.scene.start("GameScene", {
                name
            });
        }
    }
}