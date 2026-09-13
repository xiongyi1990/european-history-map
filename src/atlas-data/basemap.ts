import { feature } from "topojson-client";
import landTopology from "world-atlas/land-110m.json";

const landObject = landTopology.objects.land;

export const historicalBasemap = feature(
  landTopology,
  landObject,
) as GeoJSON.FeatureCollection<GeoJSON.Polygon | GeoJSON.MultiPolygon>;
