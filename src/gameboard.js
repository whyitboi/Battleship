import { Ship } from "./ship";
export class Gameboard {
  constructor() {
    this.shipPositions = new Map();
    this.missedShots = new Set();
  }

  key([x, y]) {
    return `${x},${y}`;
  }

  placeShip(ship, start, direction) {
    if (direction.toLowerCase() === "vertical") {
      for (let i = 0; i < ship.length; i++) {
        this.shipPositions.set(this.key([start[0], start[1] + i]), ship);
      }
    }
    if (direction.toLowerCase() === "horizontal") {
      for (let i = 0; i < ship.length; i++) {
        this.shipPositions.set(this.key([start[0] + i, start[1]]), ship);
      }
    }
  }
  getShipAt(position) {
    return this.shipPositions.get(this.key(position));
  }
  getMissedShots() {
    return this.missedShots;
  }
  receiveAttack(position) {
    if (this.missedShots.has(this.key(position))) return undefined;
    if (this.shipPositions.has(this.key(position))) {
      const ship = this.getShipAt(position);
      ship.hit();
      return "hit";
    } else {
      this.missedShots.add(this.key(position));
      return "miss";
    }
  }
}
