import { describe, expect, test, beforeEach } from "@jest/globals";
import { Player, ComputerPlayer } from "../player";
import { Gameboard } from "../gameboard";
import { Ship } from "../ship";

describe("Player Tests", () => {
  let player1;
  let player2;
  let computron;

  beforeEach(() => {
    player1 = new Player("Anne");
    player2 = new Player("Bob");
  });
  describe("Human Player", () => {
    test("has its own gameboard", () => {
      expect(player1.gameboard).toBeInstanceOf(Gameboard);
      expect(player1.gameboard).not.toBe(player2.gameboard);
    });
    test("attack() hits enemy's board not player's", () => {
      const ship = new Ship(3);
      player2.gameboard.placeShip(ship, [2, 3], "vertical");
      expect(player1.attack(player2, [2, 4])).toBe("hit");
      expect(player1.gameboard.getMissedShots()).toHaveLength(0);
    });
  });

  describe("Computer player", () => {
    beforeEach(() => {
      computron = new ComputerPlayer();
    });
    test("has its own gameboard", () => {
      expect(computron.gameboard).toBeInstanceOf(Gameboard);
      expect(computron).toBeInstanceOf(Player);
      expect(computron.gameboard).not.toBe(player1.gameboard);
    });
    test("one move is a miss on the gameboard", () => {
      expect(computron.attack(player1)).toBe("miss");
      expect(player1.gameboard.getMissedShots()).toHaveLength(1);
      const [x, y] = player1.gameboard.getMissedShots()[0];
      expect(x).toBeGreaterThanOrEqual(0);
      expect(x).toBeLessThan(10);
      expect(y).toBeGreaterThanOrEqual(0);
      expect(y).toBeLessThan(10);
    });
    test("100 moves never repeat a square", () => {
      for (let i = 0; i < 100; i++) {
        computron.attack(player1);
      }
      expect(player1.gameboard.getMissedShots()).toHaveLength(100);
    });
    test("throws when all squares have been fired at", () => {
      for (let i = 0; i < 100; i++) computron.attack(player1);
      expect(() => computron.attack(player1)).toThrow(
        "No squares left to attack",
      );
    });
  });
});
