import {Application, Container, Graphics} from 'pixi.js';
import Cell from "./Cell";
import {cellHeight, cellWidth, columns, Grid, rows} from "./Grid";

/**
 * Initialize PIXI application
 */
const app = new Application({
  width: 800,
  height: 600,
});
app.renderer.backgroundColor = 0xffffff;
document.querySelector(".canvas-container").appendChild(app.view);

/**
 * Initialize grid
 */
const grid = new Grid();
app.stage.addChild(grid.cellContainer);
app.stage.addChild(grid.leftHeaderContainer);
app.stage.addChild(grid.topHeaderContainer);

// cache to hide headers in top left corner
const cache = new Graphics();
cache.beginFill(0xFFFFFF);
cache.drawRect(0, 0, 102, 20);
cache.endFill();
app.stage.addChild(cache);


/**
 * Handle scroll
 */
const scrollContainer = document.querySelector(".scroll-container");
const scrollWrapper = document.querySelector(".scroll-wrapper");
scrollContainer.style.width = columns * cellWidth + "px";
scrollContainer.style.height = rows * cellHeight + "px";

scrollWrapper.addEventListener('scroll', (e) => {
  grid.update(e.target.scrollLeft, e.target.scrollTop);
});


/**
 * Handle double click
 */
const cellInput = document.querySelector(".cell-input");
let clickedCell = null;

scrollContainer.addEventListener('dblclick', (e) => {
  const rect = e.target.getBoundingClientRect(),
      offsetX = e.clientX - rect.left,
      offsetY = e.clientY - rect.top;

  const cell = grid.getCell(offsetX, offsetY);

  if (!cell || !cell.editable) {
    return;
  }

  clickedCell = cell;

  cellInput.value = clickedCell.getValue();
  cellInput.style.left = clickedCell.getContainer().x + "px";
  cellInput.style.top = clickedCell.getContainer().y + "px";
  cellInput.style.display = "block";


  cellInput.focus();
  cellInput.select();
});

cellInput.addEventListener("keypress", (e) => {
  if (!clickedCell) {
    return;
  }

  clickedCell.setText(e.target.value);

  if (e.keyCode === 13) { // on Enter
    e.target.style.display = "none";
    clickedCell = null;
  }
});

cellInput.addEventListener("blur", (e) => {
  if (!clickedCell) {
    return;
  }

  e.target.style.display = "none";
  clickedCell = null;
});
