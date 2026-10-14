import { describe, expect, test, beforeEach } from "@jest/globals";
import { Player } from "../player";
import { Gameboard } from "../gameboard";
import { Ship } from "../ship";

describe("Player Tests", () => {
  let player1;
  let player2;
  let ship;

  beforeEach(() => {
    player1 = new Player("Anne");
    player2 = new Player("Bob");
    ship = new Ship(3);
  });
  test("has its won gameboard", () => {
    expect(player1.gameboard).toBeInstanceOf(Gameboard);
    expect(player1.gameboard).not.toBe(player2.gameboard);
  });
  test("attack() hits enemy's board not player's", () => {
    player2.gameboard.placeShips(ship, [2, 3], "vertical");
    expect(player1.attack(player2, [2, 4])).toBe("hit");
    expect(player1.gameboard.getMissedShots()).toHaveLength(0);
  });
});
