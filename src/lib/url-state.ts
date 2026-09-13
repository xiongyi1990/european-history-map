export interface UrlState {
  year?: number;
  eraId?: string;
  cityId?: string;
}

export function readUrlState(search: string): UrlState {
  const params = new URLSearchParams(search);
  const state: UrlState = {};
  const city = params.get("city");
  const era = params.get("era");
  const year = params.get("y");

  if (city) state.cityId = city;
  if (era) state.eraId = era;
  if (year !== null && Number.isFinite(Number(year))) state.year = Number(year);
  return state;
}

export function writeUrlState(state: UrlState): string {
  const params = new URLSearchParams();
  if (state.eraId) params.set("era", state.eraId);
  if (state.cityId) params.set("city", state.cityId);
  if (state.year !== undefined) params.set("y", String(state.year));
  const serialized = params.toString();
  return serialized ? `?${serialized}` : "";
}
