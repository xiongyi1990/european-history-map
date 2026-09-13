import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");
const workspaceRoot = path.resolve(projectRoot, "..");
const sourceDir = path.join(workspaceRoot, "artifacts", "historical-basemaps", "geojson");
const outputDir = path.join(projectRoot, "public", "historical-boundaries");

const filenames = [
  "world_bc2000.geojson",
  "world_bc1500.geojson",
  "world_bc1000.geojson",
  "world_bc700.geojson",
  "world_bc500.geojson",
  "world_bc400.geojson",
  "world_bc323.geojson",
  "world_bc300.geojson",
  "world_bc200.geojson",
  "world_bc100.geojson",
  "world_bc1.geojson",
  "world_100.geojson",
  "world_200.geojson",
  "world_300.geojson",
  "world_400.geojson",
  "world_500.geojson",
  "world_600.geojson",
  "world_700.geojson",
  "world_800.geojson",
  "world_900.geojson",
  "world_1000.geojson",
  "world_1100.geojson",
  "world_1200.geojson",
  "world_1279.geojson",
  "world_1300.geojson",
  "world_1400.geojson",
  "world_1492.geojson",
  "world_1500.geojson",
  "world_1530.geojson",
  "world_1600.geojson",
  "world_1650.geojson",
  "world_1700.geojson",
  "world_1715.geojson",
  "world_1783.geojson",
  "world_1800.geojson",
  "world_1815.geojson",
  "world_1880.geojson",
  "world_1900.geojson",
  "world_1914.geojson",
  "world_1920.geojson",
  "world_1938.geojson",
  "world_1945.geojson",
  "world_1960.geojson",
  "world_1994.geojson",
  "world_2000.geojson",
];

const viewport = { west: -25, south: 18, east: 75, north: 72 };

function walkCoordinates(coordinates, visit) {
  if (typeof coordinates[0] === "number") {
    visit(coordinates);
    return;
  }
  for (const item of coordinates) walkCoordinates(item, visit);
}

function geometryBounds(geometry) {
  const bounds = { west: Infinity, south: Infinity, east: -Infinity, north: -Infinity };
  walkCoordinates(geometry.coordinates, ([lng, lat]) => {
    bounds.west = Math.min(bounds.west, lng);
    bounds.south = Math.min(bounds.south, lat);
    bounds.east = Math.max(bounds.east, lng);
    bounds.north = Math.max(bounds.north, lat);
  });
  return bounds;
}

function intersects(a, b) {
  return a.west <= b.east && a.east >= b.west && a.south <= b.north && a.north >= b.south;
}

function hashColor(value) {
  let hash = 0;
  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 31 + value.charCodeAt(index)) >>> 0;
  }
  const palette = ["#8aa0a8", "#b69578", "#8f9a74", "#b47c6f", "#8b7fa6", "#b3a46e", "#739b91", "#a88992"];
  return palette[hash % palette.length];
}

fs.mkdirSync(outputDir, { recursive: true });

for (const filename of filenames) {
  const sourcePath = path.join(sourceDir, filename);
  const raw = JSON.parse(fs.readFileSync(sourcePath, "utf8"));
  const features = raw.features
    .filter((feature) => feature.geometry && feature.properties?.NAME && intersects(geometryBounds(feature.geometry), viewport))
    .map((feature) => {
      const subject = feature.properties.SUBJECTO || feature.properties.NAME;
      return {
        type: "Feature",
        properties: {
          name: feature.properties.NAME,
          subject,
          partOf: feature.properties.PARTOF || null,
          borderPrecision: feature.properties.BORDERPRECISION || 1,
          color: hashColor(subject),
        },
        geometry: feature.geometry,
      };
    });

  fs.writeFileSync(path.join(outputDir, filename), JSON.stringify({ type: "FeatureCollection", features }));
  console.log(`${filename}: ${features.length} features`);
}
