const BREAKS = [
  { pos: 0, year: -2000 },
  { pos: 30, year: -500 },
  { pos: 80, year: 1500 },
  { pos: 100, year: 2000 },
] as const;

function interpolate(input: number, aInput: number, bInput: number, aOutput: number, bOutput: number): number {
  const progress = (input - aInput) / (bInput - aInput);
  return aOutput + progress * (bOutput - aOutput);
}

export function sliderToYear(value: number): number {
  const clamped = Math.min(100, Math.max(0, value));
  for (let index = 0; index < BREAKS.length - 1; index += 1) {
    const current = BREAKS[index];
    const next = BREAKS[index + 1];
    if (clamped >= current.pos && clamped <= next.pos) {
      return Math.round(interpolate(clamped, current.pos, next.pos, current.year, next.year));
    }
  }
  return 2000;
}

export function yearToSlider(year: number): number {
  const clamped = Math.min(2000, Math.max(-2000, year));
  for (let index = 0; index < BREAKS.length - 1; index += 1) {
    const current = BREAKS[index];
    const next = BREAKS[index + 1];
    if (clamped >= current.year && clamped <= next.year) {
      return Number(interpolate(clamped, current.year, next.year, current.pos, next.pos).toFixed(2));
    }
  }
  return 100;
}

export function getNearestSnapshotYear(year: number, snapshotYears: number[]): number {
  return snapshotYears.reduce((nearest, candidate) => {
    const currentDistance = Math.abs(year - nearest);
    const candidateDistance = Math.abs(year - candidate);
    if (candidateDistance < currentDistance) return candidate;
    if (candidateDistance === currentDistance) return Math.max(nearest, candidate);
    return nearest;
  }, snapshotYears[0]);
}
