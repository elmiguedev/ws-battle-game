interface TextFieldProps {
    scene: Phaser.Scene;
    x: number;
    y: number;
    width?: number;
    height?: number;
}
export class TextField extends Phaser.GameObjects.Container {
    private txt: HTMLInputElement;
    private dom: Phaser.GameObjects.DOMElement;
    private props: TextFieldProps;

    public onKeyEnter?: Function;

    constructor(props: TextFieldProps) {
        super(props.scene, props.x, props.y);
        this.scene.add.existing(this);
        this.props = props;
        this.createInputText();
    }

    private createInputText() {
        this.txt = document.createElement("input");
        this.txt.type = "text";
        this.txt.style.borderRadius = "0";
        this.txt.style.backgroundColor = "transparent";
        this.txt.style.color = "white";
        this.txt.style.border = "4px solid white";
        this.txt.style.outline = "none";
        this.txt.style.padding = "3px";
        this.txt.style.height = "32px";
        this.txt.style.fontFamily = "Tiny5";
        this.txt.style.fontSize = "24px";
        this.txt.style.textAlign = "center";
        this.txt.style.margin = 'none';
        this.txt.style.width = `${this.props.width}px` || "200px";
        this.txt.style.height = `${this.props.height}px` || "50px";
        this.txt.maxLength = 24;
        this.txt.onkeydown = (event) => {
            if (event.key === "Enter") {
                if (this.onKeyEnter) {
                    this.onKeyEnter();
                }
            }
        }

        this.dom = this.scene.add.dom(0, 0, this.txt).setOrigin(0.5, 0.5);
        this.add(this.dom);
    }

    public getText() {
        return this.txt.value;
    }

    public setText(value: string) {
        this.txt.value = value;
    }

    public setOrigin(x: number, y?: number) {
        this.dom.setOrigin(x, y);
        return this;
    }
}