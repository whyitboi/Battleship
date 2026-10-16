import {
  renderBoard,
  setStatus,
  onAttack,
  onRandomize,
  onNewGame,
} from "./domLoad.js";
import { Game } from "./game.js";

export function app() {
  let game = new Game();
  const playerBoard = document.getElementById("player-board");
  const computerBoard = document.getElementById("computer-board");

  function render() {
    if (game.winner !== null) computerBoard.className("game-over");
    renderBoard(game.humanP1.gameboard, playerBoard, true);
    renderBoard(game.computer.gameboard, computerBoard, false);
    //set status
  }

  onAttack((position) => {
    const result = game.playTurn(position);
    render();
    if (game.winner !== null) setStatus(`The Winner is ${game.winner}`);
    else if (result === undefined)
      setStatus("Already Fired there. Pick another square");
    else if (result === "hit") setStatus("Hit! Fire Again");
    else setStatus(`Miss`);
  });

  onNewGame(() => {
    game = new Game();
    game.randomizePlayerFleet();
    document.getElementById("status").textContent =
      "Your move: Pick a square to fire on Computon's fleet";
    // setStatus("Your move: Pick a square to fire on Computon's fleet");
    render();
  });
  onRandomize(() => {
    game.randomizePlayerFleet();
    render();
  });

  game.randomizePlayerFleet();
  render();
  setStatus("Your move: Pick a square to fire on Computon's fleet");
}
