import { describe, expect, test } from "@jest/globals";
import { Gameboard } from "../gameboard";
import { Ship } from "../ship";

describe("Gameboard tests", () => {
  describe("placeShip()", () => {
    test("a horizontal ship occupies each square it covers", () => {
      const board = new Gameboard();
      const ship = new Ship(3);
      board.placeShip(ship, [2, 3], "horizontal");

      expect(board.getShipAt([2, 3])).toBe(ship);
      expect(board.getShipAt([3, 3])).toBe(ship);
      expect(board.getShipAt([4, 3])).toBe(ship);
    });
  });
});
