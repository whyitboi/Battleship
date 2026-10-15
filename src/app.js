import { renderBoard, setStatus, onAttack, onRandomize } from "./domLoad.js";
import { Game } from "./game.js";

export function app() {
  let game = new Game();
  const playerBoard = document.getElementById("playerBoard");
  const computeBoard = document.getElementById("computerBoard");

  function render() {
    renderBoard(
      game.humanP1.gameboard,
      playerBoard,
      game.humanP1.gameboard.shipPositions,
    );
    //set status
  }

  onAttack((position) => {
    game.playTurn(position);
    //render();
  });
  onRandomize(() => {
    game.randomizePlayerFleet();
    //render();
  });
}
