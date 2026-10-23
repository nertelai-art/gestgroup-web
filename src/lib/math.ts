export function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

/** Tram de 0 a 1 entre `start` i `end` del progrés (fora del tram, 0 o 1). */
export function segment(progress: number, start: number, end: number) {
  return end <= start ? (progress >= end ? 1 : 0) : clamp((progress - start) / (end - start));
}

export function easeOutCubic(t: number) {
  return 1 - (1 - clamp(t)) ** 3;
}

export function easeInOutCubic(t: number) {
  const x = clamp(t);
  return x < 0.5 ? 4 * x ** 3 : 1 - (-2 * x + 2) ** 3 / 2;
}
