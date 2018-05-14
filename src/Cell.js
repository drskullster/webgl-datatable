import {Container, Graphics, Text} from "pixi.js";

const textStyle = {
  fontFamily: "Arial",
  fontSize: 12,
  fill: "#222222",
  antialias: true,
  resolution: 1
};

export default class Cell {
  constructor(value, isHeader) {
    this.value = value;

    this.container = new Container();

    this.editable = !isHeader;

    this.rectangle = new Graphics();

    if(isHeader) {
      this.rectangle.lineStyle(1, 0xCCCCCC, 1);
      this.rectangle.beginFill(0xEEEEEE);
    } else {
      this.rectangle.lineStyle(1, 0xCCCCCC, 1);
      this.rectangle.beginFill(0xFAFAFA);
    }

    this.rectangle.drawRect(0, 0, 102, 20);
    this.rectangle.endFill();

    this.container.addChild(this.rectangle);

    this.setText(value);

    this.container.addChild(this.text);
  }

  getValue() {
    return this.value;
  }

  setText(value) {
    this.value = value;

    if(!this.text) {
      this.text = new Text(value, textStyle);
    } else {
      this.text.text = value;
    }

    this.text.position.x = this.rectangle.width / 2 - this.text.width / 2;
    this.text.position.y = this.rectangle.height / 2 - this.text.height / 2;
  }

  getContainer() {
    return this.container;
  }
}
