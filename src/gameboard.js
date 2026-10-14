import { Ship } from "./ship";
export class Gameboard {
  constructor(size = 10) {
    this.shipPositions = new Map();
    this.missedShots = new Map();
    this.hits = new Set();
    this.ships = [];
    this.size = size;
  }

  //Helper functions
  key([x, y]) {
    return `${x},${y}`;
  }
  canPlace(ship, start, direction) {
    let clash = false;
    if (
      direction.toLowerCase() !== "horizontal" &&
      direction.toLowerCase() !== "vertical"
    ) {
      throw new Error("Ivalid direction");
    }
    if (direction.toLowerCase() === "horizontal") {
      if (
        start[0] < 0 ||
        start[0] + ship.length - 1 > 9 ||
        start[1] < 0 ||
        start[1] + ship.length - 1 > 9
      ) {
        throw new Error("Out of bounds");
      }
    }
    if (direction.toLowerCase() === "vertical") {
      if (
        start[0] < 0 ||
        start[0] + ship.length - 1 > 9 ||
        start[1] < 0 ||
        start[1] + ship.length - 1 > 9
      ) {
        throw new Error("Out of bounds");
      }
    }

    for (let i = 0; i < ship.length; i++) {
      if (this.shipPositions.has(this.key(start))) {
        clash = true; //throw new Error("Position occupied");
      } else clash = false;

      if (clash) throw new Error("Position occupied");
    }
  }
  //Methods
  placeShip(ship, start, direction) {
    this.canPlace(ship, start, direction);
    if (direction.toLowerCase() === "vertical") {
      for (let i = 0; i < ship.length; i++) {
        this.shipPositions.set(this.key([start[0], start[1] + i]), ship);
      }
      this.ships.push(ship);
    }
    if (direction.toLowerCase() === "horizontal") {
      for (let i = 0; i < ship.length; i++) {
        this.shipPositions.set(this.key([start[0] + i, start[1]]), ship);
      }
      this.ships.push(ship);
    }
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
