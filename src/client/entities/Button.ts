interface ButtonProps {
  scene: Phaser.Scene;
  x: number;
  y: number;
  text: string;
  width?: number;
  height?: number;
  onClick?: Function;
}

export class Button extends Phaser.GameObjects.Container {
  private button: Phaser.GameObjects.Rectangle;
  private text: Phaser.GameObjects.Text;
  private props: ButtonProps;

  constructor(props: ButtonProps) {
    super(props.scene, props.x, props.y);
    this.props = props;
    this.scene.add.existing(this);
    this.createButton();
    this.createText();
  }

  public setOrigin(x: number, y?: number) {
    this.button.setOrigin(x, y);
    return this;
  }

  private createButton() {
    this.button = this.scene.add.rectangle(
      0,
      0,
      this.props.width || this.props.text.length * 20,
      this.props.height || 50,
      0xffffff).setOrigin(0.5, 0.5);
    this.button.setInteractive({ cursor: "pointer" });
    this.button.on("pointerdown", () => this.props.onClick && this.props.onClick());
    this.add(this.button);
  }

  private createText() {
    this.text = this.scene.add.text(0, 0, this.props.text, {
      fontFamily: 'Tiny5',
      fontSize: '24px',
      color: '#000000',
      align: 'center'
    }).setOrigin(0.5, 0.5).setDepth(this.button.depth + 1);
    this.text.setInteractive({ cursor: "pointer" });
    this.text.on("pointerdown", () => this.props.onClick && this.props.onClick());
    this.add(this.text);
  }
}