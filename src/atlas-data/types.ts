export type LngLat = [number, number];

export interface CityName {
  from: number;
  to: number;
  zh: string;
  lat?: string;
  native?: string;
}

export interface CityRule {
  from: number;
  to: number;
  polity: string;
}

export interface City {
  id: string;
  aliases?: string[];
  coords: LngLat;
  tier: 1 | 2 | 3;
  names: CityName[];
  active: { from: number; to: number };
  polities: CityRule[];
  description: string;
}

export interface Era {
  id: string;
  name_zh: string;
  name_en: string;
  anchor_year: number;
  range: [number, number];
  chapter_ref: string;
  focus: LngLat;
  zoom: number;
}

export interface Event {
  id: string;
  name_zh: string;
  year: number;
  coords: LngLat;
  description: string;
}

export interface PoliticalSnapshot {
  year: number;
  label: string;
  features: GeoJSON.Feature<GeoJSON.Polygon | GeoJSON.MultiPolygon>[];
}
