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
    this.attacks = new Set();
    this.enemyBoard = new Set();
  }
  draw(enemy) {
    //get all the possible squares
    for (let x = 0; x < size; x++) {
      for (let y = 0; y < size; y++) {
        this.enemyBoard.add(enemy.gameboard.key([x, y]));
      }
    }

    const x = Math.floor(Math.random()) * enemy.gameboard.size;
    const y = Math.floor(Math.random()) * enemy.gameboard.size;
    const enemnyBoard = [...this.enemyBoard];
    const position = [x, y];

    return position;
  }
  attack(enemy) {
    const position = this.draw(enemy);
    const size = enemy.gameboard.size;

    if (this.attacks.has(position)) this.draw(enemy);

    //get all the possible squares... I want to move this to the helper draw()
    for (let x = 0; x < size; x++) {
      for (let y = 0; y < size; y++) {
        this.enemyBoard.add(enemy.gameboard.key([x, y]));
      }
    }
  }
}
