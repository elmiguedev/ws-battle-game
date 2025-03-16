import { TouchControls } from "../entities/TouchControls";

export class GameSceneHud extends Phaser.Scene {

    private touchControls: TouchControls;
    public onAttack: () => void;
    public onMove: (direction: "up" | "down" | "left" | "right") => void;

    constructor() {
        super("GameSceneHud");
    }

    init(data: any) {
        this.onAttack = data.onAttack;
        this.onMove = data.onMove;
    }

    create() {
        this.touchControls = new TouchControls(this);
        this.touchControls.onAttack = this.onAttack;
        this.touchControls.onMove = this.onMove;
    }

    update() {
        this.touchControls.update();
    }
}