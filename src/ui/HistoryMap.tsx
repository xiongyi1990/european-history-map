import maplibregl, { type GeoJSONSource, type Map as MapLibreMap } from "maplibre-gl";
import { useEffect, useMemo, useRef, useState } from "react";
import { historicalBasemap } from "../atlas-data/basemap";
import { cities } from "../atlas-data/cities";
import type { Era } from "../atlas-data/types";

interface HistoryMapProps {
  year: number;
  activeEra?: Era;
  boundaryData: GeoJSON.FeatureCollection;
  selectedCityId?: string;
  onCitySelect: (cityId: string) => void;
}

const baseStyle: maplibregl.StyleSpecification = {
  version: 8,
  glyphs: "https://demotiles.maplibre.org/font/{fontstack}/{range}.pbf",
  sources: {},
  layers: [
    {
      id: "sea-paper",
      type: "background",
      paint: { "background-color": "#cdbb86" },
    },
  ],
};

const graticule = (): GeoJSON.FeatureCollection<GeoJSON.LineString> => {
  const features: GeoJSON.Feature<GeoJSON.LineString>[] = [];
  for (let lng = -20; lng <= 70; lng += 10) {
    features.push({
      type: "Feature",
      properties: {},
      geometry: { type: "LineString", coordinates: Array.from({ length: 55 }, (_, index) => [lng, 18 + index]) },
    });
  }
  for (let lat = 20; lat <= 70; lat += 10) {
    features.push({
      type: "Feature",
      properties: {},
      geometry: { type: "LineString", coordinates: Array.from({ length: 96 }, (_, index) => [-25 + index, lat]) },
    });
  }
  return { type: "FeatureCollection", features };
};

const waterLabels: GeoJSON.FeatureCollection<GeoJSON.Point> = {
  type: "FeatureCollection",
  features: [
    { type: "Feature", properties: { name: "地中海" }, geometry: { type: "Point", coordinates: [17, 36] } },
    { type: "Feature", properties: { name: "黑海" }, geometry: { type: "Point", coordinates: [34, 43] } },
    { type: "Feature", properties: { name: "大西洋" }, geometry: { type: "Point", coordinates: [-14, 43] } },
    { type: "Feature", properties: { name: "北海" }, geometry: { type: "Point", coordinates: [2, 56] } },
    { type: "Feature", properties: { name: "红海" }, geometry: { type: "Point", coordinates: [37, 24] } },
  ],
};

function citiesAsGeoJson(year: number): GeoJSON.FeatureCollection {
  return {
    type: "FeatureCollection",
    features: cities
      .filter((city) => year >= city.active.from && year <= city.active.to)
      .map((city) => ({
        type: "Feature",
        properties: {
          id: city.id,
          label: city.names.find((name) => year >= name.from && year <= name.to)?.zh ?? city.names[0].zh,
          tier: city.tier,
        },
        geometry: { type: "Point", coordinates: city.coords },
      })),
  };
}

function labelPoints(boundaries: GeoJSON.FeatureCollection): GeoJSON.FeatureCollection<GeoJSON.Point> {
  const points = boundaries.features
    .filter(
      (feature) =>
        feature.properties?.name && (feature.geometry.type === "Polygon" || feature.geometry.type === "MultiPolygon"),
    )
    .slice(0, 36)
    .map((feature) => {
      const bounds = new maplibregl.LngLatBounds();
      const visit = (coordinates: GeoJSON.Position | GeoJSON.Position[] | GeoJSON.Position[][] | GeoJSON.Position[][][]) => {
        if (typeof coordinates[0] === "number") {
          bounds.extend(coordinates as GeoJSON.Position as [number, number]);
          return;
        }
        for (const item of coordinates as GeoJSON.Position[]) visit(item);
      };
      if (feature.geometry.type === "Polygon" || feature.geometry.type === "MultiPolygon") {
        visit(feature.geometry.coordinates as GeoJSON.Position[][][]);
      }
      const center = bounds.getCenter();
      return {
        type: "Feature" as const,
        properties: { name: feature.properties?.name },
        geometry: { type: "Point" as const, coordinates: [center.lng, center.lat] },
      };
    });
  return { type: "FeatureCollection", features: points };
}

export function HistoryMap({ year, activeEra, boundaryData, selectedCityId, onCitySelect }: HistoryMapProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<MapLibreMap | null>(null);
  const markersRef = useRef<maplibregl.Marker[]>([]);
  const [mapLoaded, setMapLoaded] = useState(false);

  const politicalData = useMemo(() => boundaryData, [boundaryData]);
  const polityLabels = useMemo(() => labelPoints(boundaryData), [boundaryData]);
  const cityData = useMemo(() => citiesAsGeoJson(year), [year]);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = new maplibregl.Map({
      container: containerRef.current,
      style: baseStyle,
      center: activeEra?.focus ?? [18, 43],
      zoom: activeEra?.zoom ?? 2.65,
      minZoom: 1.8,
      maxZoom: 8,
      maxBounds: [
        [-25, 18],
        [75, 72],
      ],
    });

    map.addControl(new maplibregl.NavigationControl({ showCompass: false }), "top-right");

    map.on("load", () => {
      map.addSource("land", { type: "geojson", data: historicalBasemap });
      map.addLayer({
        id: "land-fill",
        type: "fill",
        source: "land",
        paint: { "fill-color": "#e2cf9a", "fill-opacity": 0.96 },
      });
      map.addLayer({
        id: "coastline",
        type: "line",
        source: "land",
        paint: {
          "line-color": "#6b563c",
          "line-width": ["interpolate", ["linear"], ["zoom"], 2, 0.7, 6, 1.45],
          "line-opacity": 0.72,
        },
      });

      map.addSource("graticule", { type: "geojson", data: graticule() });
      map.addLayer({
        id: "graticule",
        type: "line",
        source: "graticule",
        paint: { "line-color": "#7a6546", "line-opacity": 0.16, "line-width": 0.7 },
      });

      map.addSource("water-labels", { type: "geojson", data: waterLabels });
      map.addLayer({
        id: "water-labels",
        type: "symbol",
        source: "water-labels",
        layout: {
          "text-field": ["get", "name"],
          "text-size": ["interpolate", ["linear"], ["zoom"], 2, 11, 5, 15],
          "text-letter-spacing": 0.08,
          "text-font": ["Noto Sans Regular"],
        },
        paint: { "text-color": "#6d795f", "text-opacity": 0.72, "text-halo-color": "#dac58f", "text-halo-width": 1.2 },
      });

      map.addSource("polities", { type: "geojson", data: politicalData });
      map.addLayer({
        id: "polity-fill",
        type: "fill",
        source: "polities",
        paint: {
          "fill-color": ["coalesce", ["get", "color"], "#9b7f58"],
          "fill-opacity": ["interpolate", ["linear"], ["coalesce", ["get", "borderPrecision"], 1], 1, 0.28, 2, 0.36, 3, 0.44],
        },
      });
      map.addLayer({
        id: "polity-line",
        type: "line",
        source: "polities",
        paint: {
          "line-color": "#5a4332",
          "line-width": ["interpolate", ["linear"], ["coalesce", ["get", "borderPrecision"], 1], 1, 0.8, 2, 1.1, 3, 1.55],
          "line-dasharray": ["match", ["coalesce", ["get", "borderPrecision"], 1], 1, ["literal", [3, 2]], 2, ["literal", [6, 2]], ["literal", [1, 0]]],
          "line-opacity": 0.72,
        },
      });
      map.addSource("polity-labels", { type: "geojson", data: polityLabels });
      map.addLayer({
        id: "polity-labels",
        type: "symbol",
        source: "polity-labels",
        minzoom: 2.4,
        layout: {
          "text-field": ["get", "name"],
          "text-font": ["Noto Sans Regular"],
          "text-size": ["interpolate", ["linear"], ["zoom"], 2, 10, 5, 14],
          "text-allow-overlap": false,
        },
        paint: {
          "text-color": "#3f3528",
          "text-halo-color": "#efe2bd",
          "text-halo-width": 1.4,
          "text-opacity": 0.82,
        },
      });
      map.addSource("cities", { type: "geojson", data: cityData });
      map.addLayer({
        id: "city-points",
        type: "circle",
        source: "cities",
        paint: {
          "circle-color": ["case", ["==", ["get", "id"], selectedCityId ?? ""], "#f4b247", "#2d4f5a"],
          "circle-radius": ["match", ["get", "tier"], 1, 5.5, 2, 4.5, 3.5],
          "circle-stroke-color": "#fff7df",
          "circle-stroke-width": 1.5,
        },
      });
      map.on("click", "city-points", (event) => {
        const feature = event.features?.[0];
        const id = feature?.properties?.id;
        if (typeof id === "string") onCitySelect(id);
      });
      map.on("mouseenter", "city-points", () => {
        map.getCanvas().style.cursor = "pointer";
      });
      map.on("mouseleave", "city-points", () => {
        map.getCanvas().style.cursor = "";
      });
      setMapLoaded(true);
    });

    mapRef.current = map;
    return () => {
      markersRef.current.forEach((marker) => marker.remove());
      markersRef.current = [];
      map.remove();
      mapRef.current = null;
      setMapLoaded(false);
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!mapLoaded || !map) return;
    (map.getSource("polities") as GeoJSONSource | undefined)?.setData(politicalData);
    (map.getSource("polity-labels") as GeoJSONSource | undefined)?.setData(polityLabels);
    (map.getSource("cities") as GeoJSONSource | undefined)?.setData(cityData);
    if (map.getLayer("city-points")) {
      map.setPaintProperty("city-points", "circle-color", ["case", ["==", ["get", "id"], selectedCityId ?? ""], "#f4b247", "#2d4f5a"]);
    }
  }, [cityData, mapLoaded, politicalData, polityLabels, selectedCityId]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = cities
      .filter((city) => year >= city.active.from && year <= city.active.to)
      .map((city) => {
        const label = city.names.find((name) => year >= name.from && year <= name.to)?.zh ?? city.names[0].zh;
        const markerElement = document.createElement("button");
        markerElement.type = "button";
        markerElement.className = `city-marker tier-${city.tier}${city.id === selectedCityId ? " selected" : ""}`;
        markerElement.textContent = label;
        markerElement.addEventListener("click", () => onCitySelect(city.id));
        return new maplibregl.Marker({ element: markerElement, anchor: "bottom", offset: [0, -8] }).setLngLat(city.coords).addTo(map);
      });

    return () => {
      markersRef.current.forEach((marker) => marker.remove());
      markersRef.current = [];
    };
  }, [onCitySelect, selectedCityId, year]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !activeEra) return;
    map.easeTo({ center: activeEra.focus, zoom: activeEra.zoom, duration: 700 });
  }, [activeEra?.id]);

  useEffect(() => {
    const city = cities.find((item) => item.id === selectedCityId);
    if (!city || !mapRef.current) return;
    mapRef.current.easeTo({ center: city.coords, zoom: Math.max(mapRef.current.getZoom(), 5), duration: 550 });
  }, [selectedCityId]);

  return <div className="history-map" ref={containerRef} />;
}
