import type { Scene } from "phaser";
import { MAX_HP } from "../../core/utils/Constants";

export class HpBar extends Phaser.GameObjects.Container {
    
    private value: number = MAX_HP;
    private borderRectangle: Phaser.GameObjects.Rectangle;
    private bgRectangle: Phaser.GameObjects.Rectangle;
    private valueRectangle: Phaser.GameObjects.Rectangle;

    constructor(scene:Scene, x:number, y:number) {
        super(scene, x, y);
        this.scene.add.existing(this);
        this.createBorderBar();
        this.createBackgroundBar();
        this.createValueBar();
    }

    public setValue(value:number) {
        this.value = value;
        this.updateValueBar();
    }

    private updateValueBar() {
        this.valueRectangle.setDisplaySize(this.value / MAX_HP * 46, 4);
    }

    private createBorderBar() {
        this.borderRectangle = this.scene.add.rectangle(0, 0, 50, 8, 0xffffff).setOrigin(0);
        this.add(this.borderRectangle);
    }

    private createBackgroundBar() {
        this.bgRectangle = this.scene.add.rectangle(2, 2, 46, 4, 0x000000).setOrigin(0);
        this.add(this.bgRectangle);
    }

    private createValueBar() {
        this.valueRectangle = this.scene.add.rectangle(2, 2, 46, 4, 0x00ff00).setOrigin(0);
        this.add(this.valueRectangle);
    }

}