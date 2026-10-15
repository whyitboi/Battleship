import { Player, ComputerPlayer } from "./player";

export class Game {
  constructor(player2 = null) {
    this.humanP1 = new Player("player1");
    this.computer = new ComputerPlayer();
    this.computer.gameboard.placeRandomFleet();
    this.winner = null;
    this.humanP2 = player2 !== null ? new Player(player2) : null;
  }
  //Helper
  isDefeated(player) {
    return (
      player.gameboard.shipPositions.size !== 0 && player.gameboard.allSunk()
    );
  }
  playTurn(position) {
    if (this.winner !== null) return;
    //human fires first
    const fired = this.humanP1.attack(this.computer, position);
    if (fired === undefined) return;
    if (this.isDefeated(this.computer)) {
      this.winner = this.humanP1.name;
      return fired;
    }
    if (fired === "miss") {
      let reply;
      do {
        reply = this.computer.attack(this.humanP1);
        if (this.isDefeated(this.humanP1)) {
          this.winner = this.computer.name;
          break;
        }
      } while (reply === "hit");
    }
    return fired;
  }
}
