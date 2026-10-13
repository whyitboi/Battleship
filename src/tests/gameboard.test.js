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
  test("a vertical ship occupies each square it covers", () => {
    const board = new Gameboard();
    const ship = new Ship(3);
    board.placeShip(ship, [2, 3], "vertical");

    expect(board.getShipAt([2, 3])).toBe(ship);
    expect(board.getShipAt([2, 4])).toBe(ship);
    expect(board.getShipAt([2, 5])).toBe(ship);
  });
  test("receiving an attack", () => {
    const board = new Gameboard();
    const ship = new Ship(2);
    board.placeShip(ship, [2, 3], "vertical");
    expect(board.receiveAttack([2, 4])).toBe("hit");
    expect(board.receiveAttack([2, 5])).toBe("miss");
    expect(board.missedShots.has([2, 5])).toBe(false);
  });
});
