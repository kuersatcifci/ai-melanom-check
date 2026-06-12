import { TUNING } from "@/lib/tuning";
import type { Prediction } from "./useClassifier";

export type TrafficLight = "green" | "yellow" | "red";

/** Shannon-Entropie der Verteilung (natürlicher Log). Max bei 7 Klassen ≈ 1.95. */
export function entropy(probabilities: number[]): number {
  let h = 0;
  for (const p of probabilities) {
    if (p > 0) h -= p * Math.log(p);
  }
  return h;
}

/**
 * Drei-Wege-Logik mit Entropie-Gate: Rot und Grün verlangen eine sichere
 * (niedrig-entropische) Vorhersage, alles andere ist Gelb. Lieber "unsicher"
 * als ein falsches Rot — False Positives wiegen hier schwerer als False
 * Negatives (umgekehrt zur klinischen Logik, siehe Plan-Notiz).
 */
export function getTrafficLight(predictions: Prediction[]): TrafficLight {
  let top = predictions[0];
  for (const p of predictions) {
    if (p.probability > top.probability) top = p;
  }
  const h = entropy(predictions.map((p) => p.probability));

  if (h > TUNING.entropyYellowMin) return "yellow";
  if (top.malignant) {
    return top.probability >= TUNING.redConfidenceMin &&
      h <= TUNING.redEntropyMax
      ? "red"
      : "yellow";
  }
  return top.probability >= TUNING.greenConfidenceMin ? "green" : "yellow";
}

/** Rahmenfarben für die eingezeichnete Läsions-Box (grün / orange / rot). */
export const TRAFFIC_COLORS: Record<TrafficLight, string> = {
  green: "#10b981",
  yellow: "#f59e0b",
  red: "#ef4444",
};
