import { beforeEach, describe, expect, it, vi } from "vitest";
import { clearHistoricalBoundaryCache, getNearestBoundarySnapshot, loadHistoricalBoundaries } from "./historical-boundaries";

beforeEach(() => {
  clearHistoricalBoundaryCache();
  vi.unstubAllGlobals();
});

describe("historical boundary snapshots", () => {
  it("maps BCE reading years to the nearest historical-basemaps file", () => {
    expect(getNearestBoundarySnapshot(-450)?.filename).toBe("world_bc400.geojson");
    expect(getNearestBoundarySnapshot(-431)?.filename).toBe("world_bc400.geojson");
  });

  it("maps CE years to the nearest historical-basemaps file", () => {
    expect(getNearestBoundarySnapshot(1453)?.filename).toBe("world_1492.geojson");
    expect(getNearestBoundarySnapshot(1914)?.filename).toBe("world_1914.geojson");
  });

  it("reuses one request while the year stays on the same snapshot", async () => {
    const data: GeoJSON.FeatureCollection = { type: "FeatureCollection", features: [] };
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, json: vi.fn().mockResolvedValue(data) });
    vi.stubGlobal("fetch", fetchMock);

    await Promise.all([loadHistoricalBoundaries(-450), loadHistoricalBoundaries(-431)]);

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith("/historical-boundaries/world_bc400.geojson");
  });

  it("evicts failed requests so a later retry can succeed", async () => {
    const data: GeoJSON.FeatureCollection = { type: "FeatureCollection", features: [] };
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce({ ok: false, json: vi.fn() })
      .mockResolvedValueOnce({ ok: true, json: vi.fn().mockResolvedValue(data) });
    vi.stubGlobal("fetch", fetchMock);

    await expect(loadHistoricalBoundaries(-450)).rejects.toThrow("Could not load historical boundaries");
    await expect(loadHistoricalBoundaries(-450)).resolves.toEqual(data);
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });
});
