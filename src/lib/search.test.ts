import { describe, expect, it } from "vitest";
import { searchAtlas } from "./search";

describe("atlas search", () => {
  it("finds eras, cities, events, and years", () => {
    expect(searchAtlas("古希腊古典期").type).toBe("era");
    expect(searchAtlas("Constantinople")).toMatchObject({ type: "city", id: "constantinople" });
    expect(searchAtlas("伯罗奔尼撒战争")).toMatchObject({ type: "event", year: -431 });
    expect(searchAtlas("431 BC")).toMatchObject({ type: "year", year: -431 });
  });

  it("returns a miss for unknown queries", () => {
    expect(searchAtlas("不存在的地点")).toMatchObject({ type: "none" });
  });

  it("returns a miss for blank queries", () => {
    expect(searchAtlas("   ")).toEqual({ type: "none" });
  });
});
