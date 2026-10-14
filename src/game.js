import { Player, ComputerPlayer } from "./player";

export class Game {
  constructor(player2 = null) {
    this.humanP1 = new Player("player1");
    this.computer = new ComputerPlayer();
    this.winner = null;
    if (player2 !== null) this.humanP2 = new Player(player2);
  }
  //Helper
  isDefeated(player) {
    return (
      player.gameboard.shipPositions.size !== 0 && player.gameboard.allSunk()
    );
  }
  playTurn(position) {
    if (this.winner !== null) return;
    //human fires
    const fired = this.humanP1.attack(this.computer, position);
    if (fired === undefined) return;
    if (this.isDefeated(this.computer)) {
      this.winner = this.humanP1;
      return fired;
    }
    if (fired === "miss") {
      this.computer.attack(this.humanP1);
      if (fired === this.isDefeated(this.humanP1)) this.winner = this.computer;
    }
    return fired;
  }
}
