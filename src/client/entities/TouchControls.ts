import type { Scene } from "phaser";

export class TouchControls extends Phaser.GameObjects.Container {

    private joystick: any;
    private attackButton: Phaser.GameObjects.Arc;

    public onAttack: () => void;
    public onMove: (direction: "up" | "down" | "left" | "right") => void;

    constructor(scene: Scene) {
        super(scene, 0, 0);
        this.scene.add.existing(this);

        this.createAttackButton();
        this.createJoystick();
    }

    public update() {
        if (this.joystick.left) this.onMove("left");
        if (this.joystick.right) this.onMove("right");
        if (this.joystick.up) this.onMove("up");
        if (this.joystick.down) this.onMove("down");
    }

    private createAttackButton() {
        this.attackButton = this.scene.add.circle(
            this.scene.game.canvas.width - 70,
            this.scene.game.canvas.height - 200,
            50,
            0xff0000,
            0.5
        )
            .setInteractive()
            .setAlpha(0.8);

        this.attackButton.on("pointerdown", () => {
            this.onAttack();
            this.attackButton.setAlpha(1);
        });

        this.attackButton.on("pointerup", () => {
            this.attackButton.setAlpha(0.8);
        });

        this.attackButton.on("pointerout", () => {
            this.attackButton.setAlpha(0.8);
        });
    }

    private createJoystick() {
        const plugin: any = this.scene.plugins.get("rexVirtualJoystick");
        this.joystick = plugin.add(this, {
            x: 70,
            y: this.scene.game.canvas.height - 200,
            radius: 50,
            base: this.scene.add.circle(0, 0, 50, 0x888888, 0.5),
            thumb: this.scene.add.circle(0, 0, 25, 0xffffff, 0.8),
        });
    }
}