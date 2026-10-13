import { Ship } from "./ship";
export class Gameboard {
  constructor(capacity = 10) {
    this.capacity = capacity;
    this.buckets = Array.from({ length: this.capacity }, () => []);
  }
  hash(key) {
    let hashCode = 0;
    const seed = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = seed * hashCode + key.charCodeAt(i);
      hashCode = hashCode % this.capacity;
    }
  }
  bucket(key) {
    const index = this.hash(key);
    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access out of bound index");
    }
    return this.buckets[index];
  }
  checkEntry(bucket, key) {
    for (const entry of bucket) {
      if (entry.key === key) {
        return entry;
      }
    }
    return null;
  }
  placeShip(ship, start, direction) {
    ship.length;
    if (direction.toLowerCas() === "vertical") {
      //Use bucket helper
    }
    if (direction.toLowerCas() === "horizontal") {
      //I need to enter the bucket and find the particular entry
    }
  }
  getShipAt(position) {}
}
