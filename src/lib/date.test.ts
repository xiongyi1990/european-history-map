import { describe, expect, it } from "vitest";
import { formatYear, parseYearQuery } from "./date";

describe("history year parsing", () => {
  it("parses common Chinese and English BCE year inputs", () => {
    expect(parseYearQuery("431 BC")).toBe(-431);
    expect(parseYearQuery("前 431")).toBe(-431);
    expect(parseYearQuery("公元前490年")).toBe(-490);
  });

  it("parses common CE year inputs", () => {
    expect(parseYearQuery("公元 800")).toBe(800);
    expect(parseYearQuery("1453")).toBe(1453);
    expect(parseYearQuery("AD 1066")).toBe(1066);
  });

  it("formats BCE and CE years for Chinese readers", () => {
    expect(formatYear(-431)).toBe("公元前 431");
    expect(formatYear(1453)).toBe("公元 1453");
  });
});
