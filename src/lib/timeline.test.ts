import { describe, expect, it } from "vitest";
import { getNearestSnapshotYear, sliderToYear, yearToSlider } from "./timeline";

describe("non-linear timeline", () => {
  it("maps slider anchors to historically useful periods", () => {
    expect(sliderToYear(0)).toBe(-2000);
    expect(sliderToYear(30)).toBe(-500);
    expect(sliderToYear(80)).toBe(1500);
    expect(sliderToYear(100)).toBe(2000);
  });

  it("round-trips important years within one year", () => {
    for (const year of [-2000, -431, 0, 800, 1453, 1914]) {
      expect(Math.abs(sliderToYear(yearToSlider(year)) - year)).toBeLessThanOrEqual(1);
    }
  });

  it("chooses the nearest available political snapshot", () => {
    expect(getNearestSnapshotYear(-431, [-500, -400, 0])).toBe(-400);
    expect(getNearestSnapshotYear(1453, [1200, 1400, 1500])).toBe(1500);
  });
});
