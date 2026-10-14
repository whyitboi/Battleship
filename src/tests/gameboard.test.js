import { describe, expect, test, beforeEach } from "@jest/globals";
import { Gameboard } from "../gameboard";
import { Ship } from "../ship";

let board;
let ship;

beforeEach(() => {
  board = new Gameboard();
  ship = new Ship(3);
});

describe("Gameboard tests", () => {
  describe.skip("placeShip()", () => {
    test("a horizontal ship occupies each square it covers", () => {
      board.placeShip(ship, [2, 3], "horizontal");
      expect(board.getShipAt([2, 3])).toBe(ship);
      expect(board.getShipAt([3, 3])).toBe(ship);
      expect(board.getShipAt([4, 3])).toBe(ship);
      expect(board.ships).toHaveLength(1);
    });
    test("a vertical ship occupies each square it covers", () => {
      board.placeShip(ship, [2, 3], "vertical");
      expect(board.getShipAt([2, 3])).toBe(ship);
      expect(board.getShipAt([2, 4])).toBe(ship);
      expect(board.getShipAt([2, 5])).toBe(ship);
      expect(board.ships).toHaveLength(1);
    });
  });
  describe.skip("receiveAttack()", () => {
    test("hit() is called on a ship", () => {
      const ship = new Ship(2);
      board.placeShip(ship, [2, 3], "vertical");
      expect(board.receiveAttack([2, 4])).toBe("hit");
    });
    test("a miss is recorded", () => {
      const ship = new Ship(2);
      board.placeShip(ship, [2, 3], "vertical");
      expect(board.receiveAttack([2, 5])).toBe("miss");
      expect(board.getMissedShots()).toContainEqual([2, 5]);
    });
    test("attacking the same square twice", () => {
      board.placeShip(ship, [2, 3], "vertical");
      board.receiveAttack([2, 4]);
      expect(board.receiveAttack([2, 4])).toBeUndefined();
    });
    test("attacking an empty square twice", () => {
      board.placeShip(ship, [2, 3], "vertical");
      board.receiveAttack([5, 8]);
      expect(board.receiveAttack([5, 8])).toBeUndefined();
      expect(board.getMissedShots()).toContainEqual([5, 8]);
      expect(board.getMissedShots()).toHaveLength(1);
    });
  });
  describe("allSunk()", () => {
    test("no ships placed", () => {
      expect(board.allSunk()).toBe(true);
    });
    test("one ship placed", () => {
      board.placeShip(ship, [3, 3], "horizontal");
      expect(board.allSunk()).toBe(false);
    });
    test("two ships only one sunk", () => {
      const sunkShip = new Ship(2);
      board.placeShip(ship, [3, 3], "vertical");
      board.placeShip(sunkShip, [5, 7], "horizontal");
      board.receiveAttack([5, 7]);
      board.receiveAttack([6, 7]);
      expect(board.allSunk()).toBe(false);
    });
    test("two ships both sunk", () => {
      const sunkShip = new Ship(1);
      board.placeShip(ship, [3, 3], "vertical");
      board.placeShip(sunkShip, [5, 7], "horizontal");
      board.receiveAttack([5, 7]);
      board.receiveAttack([3, 3]);
      board.receiveAttack([3, 4]);
      board.receiveAttack([3, 5]);
      expect(board.allSunk()).toBe(true);
    });
  });
});
