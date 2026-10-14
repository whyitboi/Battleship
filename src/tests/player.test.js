import { describe, expect, test, beforeEach } from "@jest/globals";
import { Player, ComputerPlayer } from "../player";
import { Gameboard } from "../gameboard";
import { Ship } from "../ship";

describe("Player Tests", () => {
  let player1;
  let player2;
  let ship;
  let computron;

  beforeEach(() => {
    player1 = new Player("Anne");
    player2 = new Player("Bob");
    ship = new Ship(3);
  });
  describe("Human Player", () => {
    test("has its own gameboard", () => {
      expect(player1.gameboard).toBeInstanceOf(Gameboard);
      expect(player1.gameboard).not.toBe(player2.gameboard);
    });
    test("attack() hits enemy's board not player's", () => {
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
    test("one move and miss", () => {
      expect(computron.attack(player1)).toBe("miss");
      expect(computron.gameboard.getMissedShots()).toHaveLength(1);
    });
  });
});
