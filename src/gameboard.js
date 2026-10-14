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
    const dir = direction.toLowerCase();

    if (dir !== "horizontal" && dir !== "vertical") {
      throw new Error("Invalid direction");
    }

    const dx = dir === "horizontal" ? 1 : 0;
    const dy = dir === "vertical" ? 1 : 0;
    const endX = start[0] + dx * (ship.length - 1);
    const endY = start[1] + dy * (ship.length - 1);

    if (
      start[0] < 0 ||
      start[1] < 0 ||
      endX >= this.size ||
      endY >= this.size
    ) {
      throw new Error("Out of bounds");
    }

    for (let i = 0; i < ship.length; i++) {
      if (
        this.shipPositions.has(this.key([start[0] + dx * i, start[1] + dy * i]))
      )
        throw new Error("Position occupied");
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
