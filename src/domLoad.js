import "./style.css";

export function domLoad() {
  const content = document.getElementById("content");
  const playerBoardHeader = document.createElement("h2");
  const computerBoardHeader = document.createElement("h2");
  const boardsWrapper = document.createElement("div");
  const playerBoard = document.createElement("div");
  const computerBoard = document.createElement("div");
  const status = document.createElement("p");
  const randomShipsButton = document.createElement("button");

  //Set attributes
  playerBoardHeader.textContent = "Player 1";
  computerBoardHeader.textContent = "Computron";
  status.setAttribute("id", "status");
  boardsWrapper.classList.add("boardWrapper");
  Object.assign(randomShipsButton, {
    id: "random-ships",
    textContent: "Randomize My Ships",
  });
  Object.assign(playerBoard, {
    id: "player-board",
    className: "gameboard",
  });
  Object.assign(computerBoard, {
    id: "computer-board",
    className: "gameboard",
  });

  boardsWrapper.append(
    playerBoardHeader,
    computerBoardHeader,
    playerBoard,
    computerBoard,
  );
  content.append(boardsWrapper, status, randomShipsButton);
}
export function renderBoard(gameboard, container, showShips) {
  container.replaceChildren();
  for (let y = 0; y < gameboard.size; y++) {
    for (let x = 0; x < gameboard.size; x++) {
      let square = document.createElement("button");
      square.classList.add("cell");
      Object.assign(square.dataset, { x: x, y: y });
      if (showShips && gameboard.getShipAt([x, y]) !== undefined)
        square.classList.add("ship");
      if (gameboard.hits.has(gameboard.key([x, y])))
        square.classList.add("hit");
      if (gameboard.missedShots.has(gameboard.key([x, y])))
        square.classList.add("miss");

      container.append(square);
    }
  }
}
export function setStatus(text) {
  document.getElementById("status").textContent = text;
}
export function onAttack(callback) {
  document
    .getElementById("computer-board")
    .addEventListener("click", (event) => {
      const button = event.target.closest("button");
      if (button === null) return;
      callback([Number(button.dataset.x), Number(button.dataset.y)]);
    });
}
export function onRandomize(callback) {
  document.getElementById("random-ships").addEventListener("click", callback);
}
