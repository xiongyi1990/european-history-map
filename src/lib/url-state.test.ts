import { describe, expect, it } from "vitest";
import { readUrlState, writeUrlState } from "./url-state";

describe("URL state", () => {
  it("reads year, era, and city from a query string", () => {
    expect(readUrlState("?city=athens&y=-431")).toEqual({ cityId: "athens", year: -431 });
    expect(readUrlState("?era=greek-classical")).toEqual({ eraId: "greek-classical" });
  });

  it("writes shareable compact state", () => {
    expect(writeUrlState({ year: -431 })).toBe("?y=-431");
    expect(writeUrlState({ cityId: "athens", year: -431 })).toBe("?city=athens&y=-431");
  });
});
