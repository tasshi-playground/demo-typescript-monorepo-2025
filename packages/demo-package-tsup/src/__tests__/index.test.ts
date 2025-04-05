import { describe, it, expect } from "vitest";
import fn from "../index.js";

describe("fn", () => {
  it("should return true", () => {
    expect(fn()).toBe(true);
  });
});
