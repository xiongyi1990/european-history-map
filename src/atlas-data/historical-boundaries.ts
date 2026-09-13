export interface BoundarySnapshotMeta {
  year: number;
  filename: string;
  label: string;
}

export const boundarySnapshots: BoundarySnapshotMeta[] = [
  { year: -2000, filename: "world_bc2000.geojson", label: "BC 2000" },
  { year: -1500, filename: "world_bc1500.geojson", label: "BC 1500" },
  { year: -1000, filename: "world_bc1000.geojson", label: "BC 1000" },
  { year: -700, filename: "world_bc700.geojson", label: "BC 700" },
  { year: -500, filename: "world_bc500.geojson", label: "BC 500" },
  { year: -400, filename: "world_bc400.geojson", label: "BC 400" },
  { year: -323, filename: "world_bc323.geojson", label: "BC 323" },
  { year: -300, filename: "world_bc300.geojson", label: "BC 300" },
  { year: -200, filename: "world_bc200.geojson", label: "BC 200" },
  { year: -100, filename: "world_bc100.geojson", label: "BC 100" },
  { year: -1, filename: "world_bc1.geojson", label: "BC 1" },
  { year: 100, filename: "world_100.geojson", label: "AD 100" },
  { year: 200, filename: "world_200.geojson", label: "AD 200" },
  { year: 300, filename: "world_300.geojson", label: "AD 300" },
  { year: 400, filename: "world_400.geojson", label: "AD 400" },
  { year: 500, filename: "world_500.geojson", label: "AD 500" },
  { year: 600, filename: "world_600.geojson", label: "AD 600" },
  { year: 700, filename: "world_700.geojson", label: "AD 700" },
  { year: 800, filename: "world_800.geojson", label: "AD 800" },
  { year: 900, filename: "world_900.geojson", label: "AD 900" },
  { year: 1000, filename: "world_1000.geojson", label: "AD 1000" },
  { year: 1100, filename: "world_1100.geojson", label: "AD 1100" },
  { year: 1200, filename: "world_1200.geojson", label: "AD 1200" },
  { year: 1279, filename: "world_1279.geojson", label: "AD 1279" },
  { year: 1300, filename: "world_1300.geojson", label: "AD 1300" },
  { year: 1400, filename: "world_1400.geojson", label: "AD 1400" },
  { year: 1492, filename: "world_1492.geojson", label: "AD 1492" },
  { year: 1500, filename: "world_1500.geojson", label: "AD 1500" },
  { year: 1530, filename: "world_1530.geojson", label: "AD 1530" },
  { year: 1600, filename: "world_1600.geojson", label: "AD 1600" },
  { year: 1650, filename: "world_1650.geojson", label: "AD 1650" },
  { year: 1700, filename: "world_1700.geojson", label: "AD 1700" },
  { year: 1715, filename: "world_1715.geojson", label: "AD 1715" },
  { year: 1783, filename: "world_1783.geojson", label: "AD 1783" },
  { year: 1800, filename: "world_1800.geojson", label: "AD 1800" },
  { year: 1815, filename: "world_1815.geojson", label: "AD 1815" },
  { year: 1880, filename: "world_1880.geojson", label: "AD 1880" },
  { year: 1900, filename: "world_1900.geojson", label: "AD 1900" },
  { year: 1914, filename: "world_1914.geojson", label: "AD 1914" },
  { year: 1920, filename: "world_1920.geojson", label: "AD 1920" },
  { year: 1938, filename: "world_1938.geojson", label: "AD 1938" },
  { year: 1945, filename: "world_1945.geojson", label: "AD 1945" },
  { year: 1960, filename: "world_1960.geojson", label: "AD 1960" },
  { year: 1994, filename: "world_1994.geojson", label: "AD 1994" },
  { year: 2000, filename: "world_2000.geojson", label: "AD 2000" },
];

const boundaryCache = new Map<string, Promise<GeoJSON.FeatureCollection>>();

export function getNearestBoundarySnapshot(year: number): BoundarySnapshotMeta | undefined {
  return boundarySnapshots.reduce<BoundarySnapshotMeta | undefined>((nearest, candidate) => {
    if (!nearest) return candidate;
    const nearestDistance = Math.abs(year - nearest.year);
    const candidateDistance = Math.abs(year - candidate.year);
    if (candidateDistance < nearestDistance) return candidate;
    if (candidateDistance === nearestDistance && candidate.year > nearest.year) return candidate;
    return nearest;
  }, undefined);
}

export async function loadHistoricalBoundaries(year: number): Promise<GeoJSON.FeatureCollection> {
  const snapshot = getNearestBoundarySnapshot(year);
  if (!snapshot) return { type: "FeatureCollection", features: [] };

  const cached = boundaryCache.get(snapshot.filename);
  if (cached) return cached;

  const request = fetch(`/historical-boundaries/${snapshot.filename}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Could not load historical boundaries for ${snapshot.label}`);
      }
      return response.json() as Promise<GeoJSON.FeatureCollection>;
    })
    .catch((error: unknown) => {
      boundaryCache.delete(snapshot.filename);
      throw error;
    });

  boundaryCache.set(snapshot.filename, request);
  return request;
}

export function clearHistoricalBoundaryCache() {
  boundaryCache.clear();
}
