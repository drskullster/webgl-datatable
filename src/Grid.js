import {Container} from "pixi.js";
import Cell from "./Cell";

export const columns = 100;
export const rows = 35;
export const cellWidth = 102;
export const cellHeight = 20;

export class Grid {
  constructor() {
    this.cellContainer = new Container();
    this.topHeaderContainer = new Container();
    this.leftHeaderContainer = new Container();
    this.cells = [];

    // Top Header
    this.topHeaderContainer.x = cellWidth;
    for(let i = 0; i < columns; i++) {
      const cell = new Cell("Header " + (i+1), true);
      cell.getContainer().position.set(cellWidth * i, 0);
      this.topHeaderContainer.addChild(cell.getContainer());
    }

    // Left Header
    this.leftHeaderContainer.y = cellHeight;
    for(let i = 0; i < rows; i++) {
      const cell = new Cell("Header " + (i+1), true);
      cell.getContainer().position.set(0, cellHeight * i);
      this.leftHeaderContainer.addChild(cell.getContainer());
    }

    // Cells
    this.cellContainer.position.set(cellWidth, cellHeight);
    for(let i = 0; i < rows; i++) {
      const cellRow = [];
      for(let j = 0; j < columns; j++) {
        const cell = new Cell(Math.round(Math.random() * 1000));
        cell.getContainer().position.set(cellWidth * j, cellHeight * i);
        this.cellContainer.addChild(cell.getContainer());
        cellRow.push(cell);
      }
      this.cells.push(cellRow);
    }
  }

  update(scrollLeft, scrollTop) {
    this.cellContainer.position.set(cellWidth - scrollLeft, cellHeight - scrollTop);
    this.topHeaderContainer.x = cellWidth - scrollLeft;
    this.leftHeaderContainer.y = cellHeight - scrollTop;
  }

  getCell(posX, posY) {
    const clickedColumn = Math.floor(posX / cellWidth);
    const clickedRow = Math.floor(posY / cellHeight);

    // We found a cell
    if(this.cells[clickedRow] && this.cells[clickedRow][clickedColumn]) {
      return this.cells[clickedRow][clickedColumn];
    }
  }
}
