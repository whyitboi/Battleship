import { Player, ComputerPlayer } from "./player";

export class Game {
  constructor(player2 = null) {
    this.humanP1 = new Player("player1");
    this.computer = new ComputerPlayer();
    this.winner = null;
    this.notFirstTurn = false;
    if (player2 !== null) this.humanP2 = new Player(player2);
    //this.turn = this.playTurn()
  }
  playTurn(position) {
    //human fires
    const fired = this.humanP1.attack(this.computer, position);
    if (fired === "miss") this.computer.attack(this.humanP1);
    if (fired === "hit") this.humanP1.attack(this.computer);
    return fired;
  }
  winner() {
    if (
      this.computer.gameboard.allSunk() &&
      this.computer.gameboard.shipPositions.size !== 0
    )
      this.winner = this.humanP1;
    if (
      this.humanP1.gameboard.allSunk() &&
      this.humanP1.gameboard.shipPositions.size !== 0
    )
      this.winner = this.computer; //can be opponent computer or human
  }
}
