import {
  domload,
  renderBoard,
  setStatus,
  onAttack,
  onRandomize,
} from "./domLoad.js";
import { Game } from "./game.js";

export function app() {
  let game = new Game();

  //function render(){render 2 boards, set status}

  onAttack((position) => {
    game.playTurn(position);
    //render();
  });
  onRandomize(() => {
    game.randomizePlayerFleet();
    //render();
  });
}
