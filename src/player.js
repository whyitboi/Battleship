import { Gameboard } from "./gameboard";
export class Player {
  constructor(name = "Player") {
    this.name = name;
    this.gameboard = new Gameboard();
  }
  attack(enemy, position) {
    enemy.gameboard.receiveAttack(position);
  }
}
export class ComputerPlayer extends Player {
  constructor() {
    super("Computron");
    this.attacks = new Set();
  }
}
