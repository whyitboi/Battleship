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
  describe("placeShip()", () => {
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
  describe("receiveAttack()", () => {
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
  describe("validate placements of ships on the gameboard", () => {
    describe("canPlace()", () => {
      describe("vertical ship", () => {
        test("hanging off the board x-axis", () => {
          expect(() => board.placeShip(ship, [-1, 2], "vertical")).toThrow(
            "Out of bounds",
          );
          expect(board.ships).toHaveLength(0);
        });
        test("hanging off the board y-axis", () => {
          expect(() => board.placeShip(ship, [0, 8], "vertical")).toThrow(
            "Out of bounds",
          );
          expect(board.ships).toHaveLength(0);
        });
      });
      describe("horizontal ship", () => {
        test("hanging off the board x-axis", () => {
          expect(() => board.placeShip(ship, [2, -1], "horizontal")).toThrow(
            "Out of bounds",
          );
          expect(board.ships).toHaveLength(0);
        });

        test("hanging off the board y-axis", () => {
          expect(() => board.placeShip(ship, [8, 0], "horizontal")).toThrow(
            "Out of bounds",
          );
          expect(board.ships).toHaveLength(0);
        });
      });

      describe("occupied or invalid direction", () => {
        test("ship overlap: start square case", () => {
          const secondShip = new Ship(3);
          board.placeShip(ship, [2, 3], "vertical");
          expect(() =>
            board.placeShip(secondShip, [2, 3], "horizontal"),
          ).toThrow("Position occupied");
          expect(board.ships).toHaveLength(1);
        });
        test("ship overlap: crossing case", () => {
          const secondShip = new Ship(3);
          board.placeShip(ship, [2, 3], "vertical");
          expect(() =>
            board.placeShip(secondShip, [1, 4], "horizontal"),
          ).toThrow("Position occupied");
          expect(board.ships).toHaveLength(1);
        });
        test("direction not vertical or horizontal", () => {
          expect(() => board.placeShip(ship, [2, 3], "horizo")).toThrow(
            "Invalid direction",
          );
          expect(board.ships).toHaveLength(0);
        });
      });

      test("valid placement", () => {
        expect(() => board.placeShip(ship, [7, 0], "vertical")).not.toThrow();
        expect(board.ships).toHaveLength(1);
      });
    });
  });
  describe("placeRandomFleet", () => {
    test("5 ships of length [5,4,3,3,2] placed on gameboard", () => {
      board.placeRandomFleet();
      const lengths = board.ships
        .map((ship) => ship.length)
        .sort((a, b) => b - a);
      expect(lengths).toEqual([5, 4, 3, 3, 2]);
      expect(board.shipPositions.size).toBe(17);
    });
  });
});
