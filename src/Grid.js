import {Container, Graphics, Sprite} from "pixi.js";
import Cell from "./Cell";

export const columns = 21;
export const rows = 75;
export const cellWidth = 102;
export const cellHeight = 22;
export const leftPaneWidth = 290;

export class Grid extends Container {
  constructor({handleSetupEnd}) {
    super();

    // use local variables in loop for performance
    const cellContainer = new Container();
    const topHeaderContainer = new Container();
    const leftHeaderContainer = new Container();
    const cells = [];

    cellContainer.interactiveChildren = false;
    topHeaderContainer.interactiveChildren = false;
    leftHeaderContainer.interactiveChildren = false;

    // cache to hide headers in top left corner
    const cache = new Sprite(PIXI.Texture.WHITE);
    cache.tint = 0xfafafa;
    cache.width = leftPaneWidth;
    cache.height = cellHeight;

    // Top Header
    topHeaderContainer.x = leftPaneWidth;
    for(let i = 0; i < columns; i++) {
      const cell = new Cell({
        isHeader: true,
        width: cellWidth,
        height: cellHeight,
        textAlign: 'center',
      });
      cell.position.set(cellWidth * i, 0);
      topHeaderContainer.addChild(cell);
      cell.setText("Header " + (i+1));
    }

    // Left Header
    leftHeaderContainer.y = cellHeight;
    for(let i = 0; i < rows; i++) {
      const cell = new Cell({
        isHeader: true,
        width: leftPaneWidth,
        height: cellHeight,
        textAlign: 'left',
        isOdd: i % 2 === 0
      });
      cell.position.set(0, cellHeight * i);
      leftHeaderContainer.addChild(cell);
      cell.setText("Header " + (i+1));
    }


    // Cells
    cellContainer.position.set(leftPaneWidth, cellHeight);
    for(let i = 0; i < rows; i++) {
      const cellRow = [];
      for(let j = 0; j < columns; j++) {
        const cell = new Cell({
          width: cellWidth,
          height: cellHeight,
          isOdd: i % 2 === 0,
          textAlign: 'center',
        });
        cell.position.set(cellWidth * j, cellHeight * i);
        cellContainer.addChild(cell);
        cell.setText("" + Math.round(Math.random() * 1000));

        cellRow.push(cell);
      }
      cells.push(cellRow);
    }

    this.cellContainer = cellContainer;
    this.topHeaderContainer = topHeaderContainer;
    this.leftHeaderContainer = leftHeaderContainer;
    this.cells = cells;

    this.addChild(cellContainer);
    this.addChild(topHeaderContainer);
    this.addChild(leftHeaderContainer);
    this.addChild(cache);

    handleSetupEnd();
  }

  update(scrollLeft, scrollTop) {
    this.cellContainer.position.set(leftPaneWidth - scrollLeft, cellHeight - scrollTop);
    this.topHeaderContainer.x = leftPaneWidth - scrollLeft;
    this.leftHeaderContainer.y = cellHeight - scrollTop;
  }

  getCell(posX, posY) {
    const clickedColumn = Math.floor(posX / cellWidth);
    const clickedRow = Math.floor(posY / cellHeight);

    // console.log(posX, posY);

    // We found a cell
    if(this.cells[clickedRow] && this.cells[clickedRow][clickedColumn]) {
      return this.cells[clickedRow][clickedColumn];
    }
  }
}
