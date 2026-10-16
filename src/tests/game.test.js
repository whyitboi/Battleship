import { describe, expect, test, beforeEach } from "@jest/globals";
import { Game } from "../game";
import { Player, ComputerPlayer } from "../player";
import { Ship } from "../ship";
import { Gameboard } from "../gameboard";

describe("Game", () => {
  let game;

  beforeEach(() => {
    game = new Game();
    game.computer.gameboard = new Gameboard();
  });
  test("computer gets random fleet when new game is created", () => {
    const newGame = new Game();
    expect(newGame.computer.gameboard.shipPositions.size).toBe(17);
  });
  test("randomizePlayerFleet", () => {
    game.randomizePlayerFleet();
    expect(game.humanP1.gameboard.shipPositions.size).toBe(17);
  });
  test("random player fleet places ships once", () => {
    game.randomizePlayerFleet();
    game.randomizePlayerFleet();
    expect(game.humanP1.gameboard.shipPositions.size).toBe(17);
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
  test("computer keeps firing while its a hit and can win", () => {
    game.computer.gameboard.placeShip(new Ship(1), [5, 5], "horizontal");
    for (let y = 0; y < 10; y++)
      game.humanP1.gameboard.placeShip(new Ship(10), [0, y], "horizontal");
    expect(game.playTurn([0, 0])).toBe("miss");
    expect(game.winner).toBe(game.computer.name);
  });
  test("human hit means computer doesn't fire", () => {
    game.computer.gameboard.placeShip(new Ship(3), [3, 4], "horizontal");
    expect(game.playTurn([3, 4])).toBe("hit");
    expect(game.humanP1.gameboard.getMissedShots()).toHaveLength(0);
  });
  test("repeated miss returns undefined and records 1 miss", () => {
    game.playTurn([0, 0]);
    expect(game.playTurn([0, 0])).toBeUndefined();
    expect(game.humanP1.gameboard.getMissedShots()).toHaveLength(1);
  });
  test("human sinking last ship sets winner", () => {
    game.computer.gameboard.placeShip(new Ship(1), [2, 3], "vertical");
    expect(game.playTurn([2, 3])).toBe("hit");
    expect(game.winner).toBe(game.humanP1.name);
  });
  test("playTurn returns undefined if game is over", () => {
    game.computer.gameboard.placeShip(new Ship(1), [2, 3], "vertical");
    game.playTurn([2, 3]);
    expect(game.playTurn([9, 9])).toBeUndefined();
  });
  describe("hasStarted", () => {
    test("false on new game, true after", () => {
      game.randomizePlayerFleet();
      expect(game.hasStarted()).toBe(false);
      game.playTurn([0, 0]);
      expect(game.hasStarted()).toBe(true);
    });
    test("randomize after game start", () => {
      game.randomizePlayerFleet();
      const before = game.humanP1.gameboard;
      game.playTurn([0, 0]);
      expect(() => game.randomizePlayerFleet()).toThrow(
        "Game has already started",
      );
      expect(game.humanP1.gameboard).toBe(before);
    });
  });
});
