import { describe, expect, it, vi } from "vitest";
import { copyText } from "./share";

describe("share link copying", () => {
  it("reports success only after the clipboard write completes", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    await expect(copyText("https://example.test", { writeText })).resolves.toBe(true);
    expect(writeText).toHaveBeenCalledWith("https://example.test");
  });

  it("reports failure when the clipboard rejects", async () => {
    const writeText = vi.fn().mockRejectedValue(new Error("denied"));
    await expect(copyText("https://example.test", { writeText })).resolves.toBe(false);
  });
});
