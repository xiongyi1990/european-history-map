import { describe, expect, it } from "vitest";
import { eras } from "../atlas-data/eras";
import { resolveActiveEra } from "./era";

describe("active era resolution", () => {
  it("keeps an explicitly selected era when ranges overlap", () => {
    expect(resolveActiveEra(eras, "alexander", -323)?.id).toBe("alexander");
    expect(resolveActiveEra(eras, "roman-republic", -146)?.id).toBe("roman-republic");
  });

  it("falls back to the era containing the current year", () => {
    expect(resolveActiveEra(eras, "greek-classical", 117)?.id).toBe("roman-empire");
  });
});
