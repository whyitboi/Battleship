import { describe, expect, test } from "@jest/globals";
import { Ship } from "../ship";

describe("Ship tests", () => {
  test("stores length", () => {
    expect(new Ship(3).length).toBe(3);
  });
  test.skip("hit() adds one hit", () => {
    const ship = new Ship(3);
    expect(ship.hit()).toBe(1);
  });
  test.skip("isSunk() true when hits reach length", () => {
    const ship = new Ship(1);
    expect(ship.isSunk()).toBe(false);
    ship.hit();
    expect(ship.isSunk()).toBe(true);
  });
});
