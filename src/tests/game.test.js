import { describe, expect, test, beforeEach } from "@jest/globals";
import { Game } from "../game";
import { Player, ComputerPlayer } from "../player";
import { Ship } from "../ship";

describe("Game", () => {
  let game;

  beforeEach(() => {
    game = new Game();
  });

  test("starts with a human, then a computer and no winner", () => {
    expect(game.humanP1).toBeInstanceOf(Player);
    expect(game.computer).toBeInstanceOf(ComputerPlayer);
    expect(game.winner).toBeNull();
  });
  test("returns when player misses and computer fires back", () => {
    expect(game.playTurn([0, 0])).toBe("miss");
    expect(game.humanP1.gameboard.getMissedShots()).toHaveLength(1);
  });
  test("player hits and plays again", () => {
    game.computer.gameboard.placeShip(new Ship(3), [3, 3], "horizontal");
    expect(game.playTurn([3, 3])).toBe("hit");
  });
});
