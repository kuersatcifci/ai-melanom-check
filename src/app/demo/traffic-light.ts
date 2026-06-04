import type { Prediction } from "./useClassifier";

export type TrafficLight = "green" | "yellow" | "red";

export const CONFIDENCE_THRESHOLD = 0.6;

export function getTrafficLight(top: Prediction): TrafficLight {
  if (top.probability <= CONFIDENCE_THRESHOLD) return "yellow";
  return top.malignant ? "red" : "green";
}

/** Rahmenfarben für die eingezeichnete Läsions-Box (grün / orange / rot). */
export const TRAFFIC_COLORS: Record<TrafficLight, string> = {
  green: "#10b981",
  yellow: "#f59e0b",
  red: "#ef4444",
};
