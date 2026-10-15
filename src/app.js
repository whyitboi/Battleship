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

  function onAttack(position) {
    document
      .getElementById("computer-board")
      .addEventListener("click", (event) => {
        if (event.target.closest("button") === null) return;
        //what am I getting the dataet.x and .y of?
      });
    game.playTurn(position);
    render();
  }
  function onRandomize(callback) {
    document.getElementById("random-ships").addEventListener("click", callback);
    game.randomizePlayerFleet();
    render();
  }

  game.randomizePlayerFleet();
  render();
}
