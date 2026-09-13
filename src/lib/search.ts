import { cities } from "../atlas-data/cities";
import { eras } from "../atlas-data/eras";
import { events } from "../atlas-data/events";
import { parseYearQuery } from "./date";

export type SearchResult =
  | { type: "year"; year: number }
  | { type: "era"; id: string; year: number }
  | { type: "city"; id: string; year: number }
  | { type: "event"; id: string; year: number }
  | { type: "none" };

const norm = (value: string) => value.trim().toLowerCase();

export function searchAtlas(query: string): SearchResult {
  const normalized = norm(query);
  if (!normalized) return { type: "none" };

  const year = parseYearQuery(query);
  if (year !== null) return { type: "year", year };

  const era = eras.find(
    (item) => norm(item.name_zh).includes(normalized) || norm(item.name_en).includes(normalized) || item.id === normalized,
  );
  if (era) return { type: "era", id: era.id, year: era.anchor_year };

  const city = cities.find((item) =>
    [
      item.id,
      ...(item.aliases ?? []),
      ...item.names.flatMap((name) => [name.zh, name.lat, name.native].filter(Boolean) as string[]),
    ].some((candidate) => norm(candidate).includes(normalized)),
  );
  if (city) return { type: "city", id: city.id, year: Math.max(city.active.from, Math.min(1453, city.active.to)) };

  const event = events.find((item) => norm(item.name_zh).includes(normalized) || item.id === normalized);
  if (event) return { type: "event", id: event.id, year: event.year };

  return { type: "none" };
}
