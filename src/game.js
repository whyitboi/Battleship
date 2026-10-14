import { Player, ComputerPlayer } from "./player";

export class Game {
  constructor(player2 = null) {
    this.humanP1 = new Player("player1");
    this.computron = new ComputerPlayer();
    this.winner = null;
    if (player2 !== null) this.humanP2 = new Player(player2);
    //this.turn = this.playTurn()
  }
  playTurn(position) {
    //human fires

    if (this.humanP1.attack(position) === "miss") {
      //this.computron.attack()
    }
  }
}
