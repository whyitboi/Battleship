import { setSeconds } from "date-fns";
import { Ship } from "./ship";
export class Gameboard {
  constructor() {
    this.shipPositions = new Map();
    this.missedShots = new Map();
    this.hits = new Set();
    this.ships = [];
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
    this.ships.push(ship);
  }
  getShipAt(position) {
    return this.shipPositions.get(this.key(position));
  }
  getMissedShots() {
    return [...this.missedShots.values()];
  }
  receiveAttack(position) {
    if (
      this.hits.has(this.key(position)) ||
      this.missedShots.has(this.key(position))
    )
      return;
    if (this.shipPositions.has(this.key(position))) {
      const ship = this.getShipAt(position);
      ship.hit();
      this.hits.add(this.key(position));
      return "hit";
    } else {
      this.missedShots.set(this.key(position), position);
      return "miss";
    }
  }
  allSunk() {
    return this.ships.every((ship) => ship.isSunk());
  }
}
