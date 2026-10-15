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
  status.setAttribute("id", "status");
  randomShipsButton.setAttribute("text", "Randomize My Ships");
  Object.assign(playerBoard, {
    id: "player-board",
    name: "player-board",
  });
  Object.assign(computerBoard, {
    id: "computer-board",
    name: "computer-board",
  });
  boardsWrapper.append(
    playerBoardHeader,
    playerBoard,
    computerBoardHeader,
    computerBoard,
  );
  content.append(boardsWrapper, status, randomShipsButton);
}
