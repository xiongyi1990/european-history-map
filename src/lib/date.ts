export function parseYearQuery(input: string): number | null {
  const normalized = input.trim().toLowerCase().replace(/\s+/g, "");
  if (!normalized) return null;

  const match = normalized.match(/-?\d+/);
  if (!match) return null;

  const value = Math.abs(Number(match[0]));
  if (!Number.isFinite(value)) return null;

  const isBce =
    normalized.includes("bc") ||
    normalized.includes("bce") ||
    normalized.includes("公元前") ||
    normalized.startsWith("前") ||
    normalized.startsWith("-");

  return isBce ? -value : value;
}

export function formatYear(year: number): string {
  if (year < 0) return `公元前 ${Math.abs(year)}`;
  return `公元 ${year}`;
}
