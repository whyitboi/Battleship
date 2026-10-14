import { Gameboard } from "./gameboard";
class Player {
  constructor(name = "Player") {
    this.name = name;
    this.gameboard = new Gameboard();
  }
  attack(enemy, position) {
    return enemy.gameboard.receiveAttack(position);
  }
}
class ComputerPlayer extends Player {
  constructor() {
    super("Computron");
    this.notFired = null;
  }
  draw(enemy) {
    if (this.notFired === null) {
      this.notFired = [];
      const size = enemy.gameboard.size;
      //get all the possible squares
      for (let x = 0; x < size; x++) {
        for (let y = 0; y < size; y++) {
          this.notFired.push([x, y]);
        }
      }
    }
    if (this.notFired.length === 0)
      throw new Error("No squares left to attack");
    const i = Math.floor(Math.random() * this.notFired.length);
    const [position] = this.notFired.splice(i, 1);
    return position;
  }
  attack(enemy) {
    return super.attack(enemy, this.draw(enemy));
  }
}
export { Player, ComputerPlayer };
