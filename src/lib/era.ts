import type { Era } from "../atlas-data/types";

export function resolveActiveEra(allEras: Era[], activeEraId: string, year: number): Era | undefined {
  const selectedEra = allEras.find((era) => era.id === activeEraId);
  if (selectedEra && year >= selectedEra.range[0] && year <= selectedEra.range[1]) {
    return selectedEra;
  }

  return allEras.find((era) => year >= era.range[0] && year <= era.range[1]) ?? selectedEra;
}
