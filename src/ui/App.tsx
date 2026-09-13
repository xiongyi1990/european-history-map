import { ChevronUp, LocateFixed, Search, Share2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { cities } from "../atlas-data/cities";
import { eras } from "../atlas-data/eras";
import { events } from "../atlas-data/events";
import { getNearestBoundarySnapshot, loadHistoricalBoundaries } from "../atlas-data/historical-boundaries";
import type { City, Era } from "../atlas-data/types";
import { formatYear } from "../lib/date";
import { resolveActiveEra } from "../lib/era";
import { searchAtlas, type SearchResult } from "../lib/search";
import { copyText } from "../lib/share";
import { sliderToYear, yearToSlider } from "../lib/timeline";
import { readUrlState, writeUrlState } from "../lib/url-state";
import { HistoryMap } from "./HistoryMap";

function activeName(city: City, year: number) {
  return city.names.find((name) => year >= name.from && year <= name.to) ?? city.names[0];
}

function activePolity(city: City, year: number) {
  return city.polities.find((rule) => year >= rule.from && year <= rule.to)?.polity ?? "资料待补";
}

function getInitialYear() {
  const state = readUrlState(window.location.search);
  if (state.year !== undefined) return state.year;
  if (state.eraId) return eras.find((era) => era.id === state.eraId)?.anchor_year ?? -450;
  return -450;
}

export function App() {
  const initialState = readUrlState(window.location.search);
  const [year, setYear] = useState(getInitialYear);
  const [activeEraId, setActiveEraId] = useState(initialState.eraId ?? "greek-classical");
  const [selectedCityId, setSelectedCityId] = useState(initialState.cityId);
  const [query, setQuery] = useState("");
  const [message, setMessage] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const [boundaryData, setBoundaryData] = useState<GeoJSON.FeatureCollection>({ type: "FeatureCollection", features: [] });
  const [boundaryError, setBoundaryError] = useState("");

  const boundarySnapshot = getNearestBoundarySnapshot(year);
  const selectedCity = cities.find((city) => city.id === selectedCityId);
  const activeEra = useMemo(
    () => resolveActiveEra(eras, activeEraId, year),
    [activeEraId, year],
  );

  useEffect(() => {
    const nextUrl = writeUrlState({ cityId: selectedCityId, year });
    window.history.replaceState(null, "", nextUrl || window.location.pathname);
  }, [selectedCityId, year]);

  useEffect(() => {
    let cancelled = false;
    setBoundaryError("");
    loadHistoricalBoundaries(year)
      .then((data) => {
        if (!cancelled) setBoundaryData(data);
      })
      .catch((error: unknown) => {
        if (!cancelled) {
          setBoundaryData({ type: "FeatureCollection", features: [] });
          setBoundaryError(error instanceof Error ? error.message : "历史边界加载失败");
        }
      });
    return () => {
      cancelled = true;
    };
  }, [boundarySnapshot?.filename]);

  function jumpToYear(nextYear: number) {
    const boundedYear = Math.min(2000, Math.max(-2000, nextYear));
    setYear(boundedYear);
    setMessage("");
  }

  function chooseEra(era: Era) {
    setActiveEraId(era.id);
    setSelectedCityId(undefined);
    jumpToYear(era.anchor_year);
  }

  function applySearch(result: SearchResult) {
    if (result.type === "none") {
      setMessage("没有找到这个年份、城市或事件");
      return;
    }

    jumpToYear(result.year);
    if (result.type === "city") setSelectedCityId(result.id);
    if (result.type === "era") setActiveEraId(result.id);
    if (result.type === "event") {
      const event = events.find((item) => item.id === result.id);
      setMessage(event ? `${event.name_zh}：${event.description}` : "");
    }
  }

  function submitSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    applySearch(searchAtlas(query));
  }

  async function copyShareLink() {
    const url = `${window.location.origin}${window.location.pathname}${writeUrlState({ cityId: selectedCityId, year })}`;
    const copied = await copyText(url);
    setMessage(copied ? "当前地图状态已复制为链接" : "无法复制链接，请检查浏览器剪贴板权限");
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <div className="brand">
          <span className="brand-mark">史</span>
          <div>
            <h1>读史地图</h1>
            <p>European History Map</p>
          </div>
        </div>
        <form className="search-box" onSubmit={submitSearch}>
          <Search size={18} />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="年份 / 事件 / 城市" />
          <button type="submit">定位</button>
        </form>
        <button className="icon-button" type="button" title="复制分享链接" onClick={copyShareLink}>
          <Share2 size={19} />
        </button>
      </header>

      <section className="map-stage">
        <HistoryMap
          year={year}
          activeEra={activeEra}
          boundaryData={boundaryData}
          selectedCityId={selectedCityId}
          onCitySelect={(cityId) => {
            setSelectedCityId(cityId);
            setPanelOpen(true);
          }}
        />

        <div className="era-badge">
          <strong>{formatYear(year)}</strong>
          <span>{activeEra?.name_zh ?? boundarySnapshot?.label}</span>
        </div>

        {message || boundaryError ? <div className="toast">{message || boundaryError}</div> : null}

        <div className="boundary-card">
          <p>历史边界快照</p>
          <strong>{boundarySnapshot?.label}</strong>
          <span>来源 historical-basemaps，线条越虚表示边界越近似</span>
        </div>

        {selectedCity ? (
          <aside className="city-popover">
            <button className="close-button" type="button" onClick={() => setSelectedCityId(undefined)}>
              x
            </button>
            <p className="eyebrow">{activePolity(selectedCity, year)}</p>
            <h2>{activeName(selectedCity, year).zh}</h2>
            <p className="latin">{[activeName(selectedCity, year).lat, activeName(selectedCity, year).native].filter(Boolean).join(" / ")}</p>
            <p>{selectedCity.description}</p>
          </aside>
        ) : null}
      </section>

      <footer className={`control-dock ${panelOpen ? "is-open" : ""}`}>
        <button className="mobile-grip" type="button" onClick={() => setPanelOpen((value) => !value)}>
          <ChevronUp size={18} />
          <span>{activeEra?.name_zh ?? boundarySnapshot?.label}</span>
        </button>
        <div className="era-strip" aria-label="时代标签">
          {eras.map((era) => (
            <button
              key={era.id}
              className={era.id === activeEra?.id ? "active" : ""}
              type="button"
              onClick={() => chooseEra(era)}
            >
              <span>{era.name_zh}</span>
              <small>{formatYear(era.anchor_year)}</small>
            </button>
          ))}
        </div>
        <div className="timeline-row">
          <button className="icon-button" type="button" title="回到当前时代视角" onClick={() => activeEra && chooseEra(activeEra)}>
            <LocateFixed size={18} />
          </button>
          <input
            aria-label="年份滑块"
            type="range"
            min="0"
            max="100"
            step="0.1"
            value={yearToSlider(year)}
            onChange={(event) => {
              setSelectedCityId(undefined);
              jumpToYear(sliderToYear(Number(event.target.value)));
            }}
          />
          <output>{formatYear(year)}</output>
        </div>
      </footer>
    </main>
  );
}
