import React from "react";
import ReactDOM from "react-dom/client";
import "maplibre-gl/dist/maplibre-gl.css";
import "./styles.css";
import { App } from "./ui/App";
import { GreekApp } from "./greek/GreekApp";
import { RomanApp } from "./roman/RomanApp";
import { EuropeApp } from "./europe/EuropeApp";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    {window.location.pathname === '/legacy' || new URLSearchParams(window.location.search).get('atlas') === 'legacy' ? <App /> : window.location.pathname === '/rome' || new URLSearchParams(window.location.search).get('atlas') === 'rome' ? <RomanApp /> : new URLSearchParams(window.location.search).get('atlas') === 'greece' ? <GreekApp /> : <EuropeApp />}
  </React.StrictMode>,
);
