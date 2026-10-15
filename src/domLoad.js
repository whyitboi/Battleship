import "./style.css";

const content = document.getElementById("content");

export function domLoad() {
  const playerBoardHeader = document.createElement("h2");
  const computerBoardHeader = document.createElement("h2");
  const boardsWrapper = document.createElement("div");
  const playerBoard = document.createElement("div");
  const computerBoard = document.createElement("div");
  const status = document.createElement("p");
  const randomShipsButton = document.createElement("button");

  //Set attributes
  status.setAttribute("id", "status");
  randomShipsButton.textContent = "Randomize My Ships";
  playerBoard.setAttribute("id", "player-board");
  computerBoard.setAttribute("id", "computer-board");

  boardsWrapper.append(
    playerBoardHeader,
    playerBoard,
    computerBoardHeader,
    computerBoard,
  );
  content.append(boardsWrapper, status, randomShipsButton);
}
export function renderBoard(gameboard, container, showShips) {
  //....
  container = container.replaceChildren();
}
export function setStatus(text) {
  //.....
}
export function onAttack(callback) {
  //...
}
export function onRandomize(callback) {
  //...
}
