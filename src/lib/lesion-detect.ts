// Heuristischer Läsions-Detektor (klassische Bildverarbeitung, kein ML).
//
// Ziel: Bevor das Klassifikationsmodell läuft, prüfen wir, ob im Bild
// überhaupt eine abgegrenzte, pigmentierte/dunklere Stelle gegenüber der
// umgebenden Haut existiert. Ist das nicht der Fall (z. B. glatter Arm ohne
// Muttermal), geben wir KEINE Krankheit aus. Wird eine Stelle gefunden,
// liefern wir deren Bounding-Box (in Quellbild-Pixeln) zurück, damit wir
// darauf zuschneiden und einen Rahmen einzeichnen können.
//
// Bewusst konservativ ausgelegt: im Zweifel lieber "nichts gefunden" als ein
// falscher Befund. Die Schwellwerte liegen zentral in lib/tuning.ts.

import { TUNING } from "./tuning";

const WORK_SIZE = 256; // Arbeitsauflösung (längere Kante) für die Analyse
const PAD_FRAC = 0.25; // Rand um die Box beim Zuschneiden (Anteil der Boxgröße)

export type LesionBox = { x: number; y: number; w: number; h: number };

export type LesionDetection = {
  found: boolean;
  /** Box in Quellbild-Pixelkoordinaten (null wenn nichts gefunden). */
  box: LesionBox | null;
  /** Grobe Vertrauens-/Trennschärfe 0..1 (Otsu-Separability). */
  score: number;
};

function median(values: Float32Array): number {
  const copy = Float32Array.from(values);
  copy.sort();
  const mid = copy.length >> 1;
  return copy.length % 2 ? copy[mid] : (copy[mid - 1] + copy[mid]) / 2;
}

/**
 * Otsu-Schwellwert auf einer Abdunklungskarte (Werte 0..maxVal).
 * Liefert zusätzlich die Separability η = σ²_zwischen / σ²_gesamt (0..1),
 * die angibt, wie bimodal die Verteilung ist (hoch = klare Stelle).
 */
function otsu(
  values: Float32Array,
  maxVal: number,
): { threshold: number; separability: number } {
  const BINS = 64;
  const hist = new Float64Array(BINS);
  const scale = (BINS - 1) / maxVal;
  for (let i = 0; i < values.length; i++) {
    hist[Math.round(values[i] * scale)]++;
  }
  const total = values.length;
  let sumAll = 0;
  for (let b = 0; b < BINS; b++) sumAll += b * hist[b];

  let wB = 0;
  let sumB = 0;
  let maxBetween = -1;
  let bestBin = 0;
  for (let b = 0; b < BINS; b++) {
    wB += hist[b];
    if (wB === 0) continue;
    const wF = total - wB;
    if (wF === 0) break;
    sumB += b * hist[b];
    const mB = sumB / wB;
    const mF = (sumAll - sumB) / wF;
    const between = (wB * wF * (mB - mF) * (mB - mF)) / (total * total);
    if (between > maxBetween) {
      maxBetween = between;
      bestBin = b;
    }
  }

  // Gesamtvarianz für die Normierung
  const mean = sumAll / total;
  let varTotal = 0;
  for (let b = 0; b < BINS; b++) varTotal += hist[b] * (b - mean) * (b - mean);
  varTotal /= total;

  const separability = varTotal > 0 ? maxBetween / varTotal : 0;
  return { threshold: (bestBin + 0.5) / scale, separability };
}

type Component = {
  area: number;
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
  sumDark: number;
  touchesBorder: boolean;
};

/** Zusammenhangskomponenten (4er-Nachbarschaft) per iterativem Flood-Fill. */
function largestInteriorComponent(
  mask: Uint8Array,
  dark: Float32Array,
  w: number,
  h: number,
): Component | null {
  const labels = new Int32Array(w * h).fill(0);
  const stack: number[] = [];
  let best: Component | null = null;
  let label = 0;

  for (let start = 0; start < w * h; start++) {
    if (mask[start] === 0 || labels[start] !== 0) continue;
    label++;
    stack.length = 0;
    stack.push(start);
    labels[start] = label;

    const comp: Component = {
      area: 0,
      minX: w,
      minY: h,
      maxX: 0,
      maxY: 0,
      sumDark: 0,
      touchesBorder: false,
    };

    while (stack.length) {
      const idx = stack.pop()!;
      const x = idx % w;
      const y = (idx / w) | 0;
      comp.area++;
      comp.sumDark += dark[idx];
      if (x < comp.minX) comp.minX = x;
      if (y < comp.minY) comp.minY = y;
      if (x > comp.maxX) comp.maxX = x;
      if (y > comp.maxY) comp.maxY = y;
      if (x === 0 || y === 0 || x === w - 1 || y === h - 1)
        comp.touchesBorder = true;

      if (x > 0 && mask[idx - 1] && !labels[idx - 1]) {
        labels[idx - 1] = label;
        stack.push(idx - 1);
      }
      if (x < w - 1 && mask[idx + 1] && !labels[idx + 1]) {
        labels[idx + 1] = label;
        stack.push(idx + 1);
      }
      if (y > 0 && mask[idx - w] && !labels[idx - w]) {
        labels[idx - w] = label;
        stack.push(idx - w);
      }
      if (y < h - 1 && mask[idx + w] && !labels[idx + w]) {
        labels[idx + w] = label;
        stack.push(idx + w);
      }
    }

    // randberührende Komponenten ignorieren (Vignette, Schatten, Bildkanten)
    if (comp.touchesBorder) continue;
    if (!best || comp.area > best.area) best = comp;
  }

  return best;
}

/**
 * Reine Analyse auf RGBA-Pixeln (ohne DOM) – damit gut testbar.
 * Koordinaten der Box beziehen sich auf die übergebene Arbeitsauflösung (w×h).
 */
export function detectFromImageData(
  data: Uint8ClampedArray,
  w: number,
  h: number,
): LesionDetection {
  const n = w * h;
  const lum = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    lum[i] = 0.299 * data[i * 4] + 0.587 * data[i * 4 + 1] + 0.114 * data[i * 4 + 2];
  }

  const skinLum = median(lum);
  const dark = new Float32Array(n);
  let maxDark = 0;
  for (let i = 0; i < n; i++) {
    const d = skinLum - lum[i] > 0 ? skinLum - lum[i] : 0;
    dark[i] = d;
    if (d > maxDark) maxDark = d;
  }
  if (maxDark < 1) return { found: false, box: null, score: 0 };

  const { threshold, separability } = otsu(dark, maxDark);

  const mask = new Uint8Array(n);
  for (let i = 0; i < n; i++) mask[i] = dark[i] >= threshold ? 1 : 0;

  const comp = largestInteriorComponent(mask, dark, w, h);
  if (!comp) return { found: false, box: null, score: separability };

  const areaFrac = comp.area / n;
  const boxW = comp.maxX - comp.minX + 1;
  const boxH = comp.maxY - comp.minY + 1;
  const compactness = comp.area / (boxW * boxH);
  const meanDark = comp.sumDark / comp.area;
  const aspect = boxW / boxH;

  // Binnenkontrast der Box: echte Läsionen haben Struktur (Pigmentränder),
  // homogene Schatten und gleichmäßige Verfärbungen kaum.
  let lumSum = 0;
  let lumSumSq = 0;
  const boxN = boxW * boxH;
  for (let y = comp.minY; y <= comp.maxY; y++) {
    for (let x = comp.minX; x <= comp.maxX; x++) {
      const v = lum[y * w + x];
      lumSum += v;
      lumSumSq += v * v;
    }
  }
  const lumMean = lumSum / boxN;
  const lumStd = Math.sqrt(Math.max(0, lumSumSq / boxN - lumMean * lumMean));

  const found =
    separability >= TUNING.separabilityMin &&
    meanDark >= TUNING.darkMin &&
    areaFrac >= TUNING.minAreaFrac &&
    areaFrac <= TUNING.maxAreaFrac &&
    compactness >= TUNING.compactMin &&
    lumStd >= TUNING.lumStdMin &&
    aspect >= TUNING.aspectMin &&
    aspect <= TUNING.aspectMax;

  if (!found) return { found: false, box: null, score: separability };

  return {
    found: true,
    box: { x: comp.minX, y: comp.minY, w: boxW, h: boxH },
    score: separability,
  };
}

/** Läsion im Bild suchen. Box-Koordinaten beziehen sich aufs Quellbild. */
export function detectLesion(img: HTMLImageElement): LesionDetection {
  const sw = img.naturalWidth || img.width;
  const sh = img.naturalHeight || img.height;
  const scale = WORK_SIZE / Math.max(sw, sh);
  const w = Math.max(1, Math.round(sw * scale));
  const h = Math.max(1, Math.round(sh * scale));

  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) return { found: false, box: null, score: 0 };
  ctx.drawImage(img, 0, 0, w, h);
  const { data } = ctx.getImageData(0, 0, w, h);

  const det = detectFromImageData(data, w, h);
  if (!det.found || !det.box) return { found: false, box: null, score: det.score };

  // Box in Quellbild-Koordinaten zurückrechnen
  const box: LesionBox = {
    x: det.box.x / scale,
    y: det.box.y / scale,
    w: det.box.w / scale,
    h: det.box.h / scale,
  };
  return { found: true, box, score: det.score };
}

/** Liefert eine quadratische, gepolsterte Ausschnitt-Canvas um die Box. */
export function cropToCanvas(
  img: HTMLImageElement,
  box: LesionBox,
): HTMLCanvasElement {
  const sw = img.naturalWidth || img.width;
  const sh = img.naturalHeight || img.height;

  const cx = box.x + box.w / 2;
  const cy = box.y + box.h / 2;
  const side = Math.max(box.w, box.h) * (1 + 2 * PAD_FRAC);
  const half = side / 2;

  const sx = Math.max(0, Math.min(sw - 1, cx - half));
  const sy = Math.max(0, Math.min(sh - 1, cy - half));
  const sWidth = Math.min(sw - sx, side);
  const sHeight = Math.min(sh - sy, side);

  const out = 224;
  const canvas = document.createElement("canvas");
  canvas.width = out;
  canvas.height = out;
  const ctx = canvas.getContext("2d");
  if (ctx) ctx.drawImage(img, sx, sy, sWidth, sHeight, 0, 0, out, out);
  return canvas;
}

/**
 * Zeichnet das Bild plus farbigen Rahmen um die gefundene Box und gibt eine
 * Data-URL zurück (für die Anzeige). Längere Kante wird auf maxSize begrenzt.
 */
export function drawAnnotated(
  img: HTMLImageElement,
  box: LesionBox,
  color: string,
  maxSize = 768,
): string {
  const sw = img.naturalWidth || img.width;
  const sh = img.naturalHeight || img.height;
  const scale = Math.min(1, maxSize / Math.max(sw, sh));
  const w = Math.round(sw * scale);
  const h = Math.round(sh * scale);

  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) return "";
  ctx.drawImage(img, 0, 0, w, h);

  const lineWidth = Math.max(3, Math.round(Math.max(w, h) * 0.01));
  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = color;
  ctx.lineJoin = "round";
  const rx = box.x * scale;
  const ry = box.y * scale;
  const rw = box.w * scale;
  const rh = box.h * scale;
  // leichte Aufweitung, damit die Linie nicht in die Läsion schneidet
  const pad = lineWidth;
  ctx.strokeRect(rx - pad, ry - pad, rw + 2 * pad, rh + 2 * pad);

  return canvas.toDataURL("image/jpeg", 0.9);
}
