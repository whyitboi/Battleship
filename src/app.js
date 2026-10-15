import { renderBoard, setStatus, onAttack, onRandomize } from "./domLoad.js";
import { Game } from "./game.js";

export function app() {
  let game = new Game();
  const playerBoard = document.getElementById("player-board");
  const computerBoard = document.getElementById("computer-board");

  function render() {
    renderBoard(game.humanP1.gameboard, playerBoard, true);
    renderBoard(game.computer.gameboard, computerBoard, false);
    //set status
  }

  onAttack((position) => {
    game.playTurn(position);
    render();
  });
  onRandomize(() => {
    game.randomizePlayerFleet();
    render();
  });

  game.randomizePlayerFleet();
  render();
}
