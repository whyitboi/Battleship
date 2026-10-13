export class Ship {
  constructor(length = 1) {
    this.length = length;
    this.hits = 0;
  }
  length() {
    return this.length;
  }
  hit() {
    return (this.hits += 1);
  }
  isSunk() {
    return this.hits >= this.length;
  }
}
