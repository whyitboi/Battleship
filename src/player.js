import { Gameboard } from "./gameboard";
export class Player {
  constructor(name = "Player") {
    this.name = name;
    this.gameboard = new Gameboard();
  }
  attack(enemy, position) {
    return enemy.gameboard.receiveAttack(position);
  }
}
export class ComputerPlayer extends Player {
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
        if (this.notFired.length === o)
          throw new Error("No suares left to attack");
      }
    }

    const x = Math.floor(Math.random()) * enemy.gameboard.size;
    const y = Math.floor(Math.random()) * enemy.gameboard.size;
    //const enemnyBoard = [...this.enemyBoard];
    const position = [x, y];

    return position;
  }
  attack(enemy) {}
}
