import { describe, expect, it } from "vitest";
import { historicalBasemap } from "./basemap";

describe("historical basemap", () => {
  it("ships local land geometry for the European history stage", () => {
    expect(historicalBasemap.type).toBe("FeatureCollection");
    expect(historicalBasemap.features.length).toBeGreaterThan(0);
    expect(historicalBasemap.features[0].geometry).toBeTruthy();
  });
});
