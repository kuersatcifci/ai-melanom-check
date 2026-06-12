// Zentrale Inferenz-Tuning-Parameter (False-Positive-Reduktion, siehe
// docs/notes/2026-06-11-false-positive-plan.md).
//
// Notfall-Rollback: die "legacy"-Werte aus den Kommentaren eintragen —
// damit verhält sich die Pipeline wieder exakt wie vor dem Tuning.
//
// TODO: Alle Werte sind geschätzt und müssen mit Testbildern kalibriert
// werden (glatte Haut, Schatten, Haare, Sommersprossen, echte Muttermale).
export const TUNING = {
  // --- Läsions-Detektor (src/lib/lesion-detect.ts) ---
  /** Otsu-Trennschärfe: darunter kein klares Vordergrund/Hintergrund. legacy: 0.4 */
  separabilityMin: 0.55,
  /** Mittlere Abdunklung der Stelle ggü. Haut (Luminanz 0..255). legacy: 16 */
  darkMin: 28,
  /** Kleinste plausible Läsionsfläche (Anteil am Bild). legacy: 0.002 */
  minAreaFrac: 0.005,
  /** Größte plausible Läsionsfläche. legacy: 0.7 */
  maxAreaFrac: 0.7,
  /** Fläche / Bounding-Box-Fläche: rund ≈ 0.78, Haare/Striche deutlich kleiner. legacy: 0.25 */
  compactMin: 0.5,
  /** Mindest-Standardabweichung der Luminanz in der Box — homogene Schatten haben kaum Binnenkontrast. legacy: kein Check */
  lumStdMin: 8,
  /** Seitenverhältnis der Box (B/H) — gegen Haare und lange Schatten. legacy: kein Check */
  aspectMin: 0.25,
  aspectMax: 4,

  // --- Klassifikation (src/lib/inference.ts) ---
  /** Temperature Scaling: Logits / T vor Softmax. ViTs sind overconfident. legacy: 1 (kein Scaling) */
  temperature: 2.0,

  // --- Ampel (src/app/demo/traffic-light.ts) ---
  // Schwellen gelten für T-skalierte Wahrscheinlichkeiten; T und diese Werte
  // müssen gemeinsam kalibriert werden. Max-Entropie bei 7 Klassen ≈ 1.95.
  // legacy: symmetrisches top1 > 0.6, kein Entropie-Gate
  /** Ab dieser Entropie immer "gelb" (unsicher). */
  entropyYellowMin: 1.4,
  /** Rot nur wenn maligne UND top1 ≥ … UND Entropie ≤ … */
  redConfidenceMin: 0.65,
  redEntropyMax: 1.15,
  /** Grün nur wenn benigne UND top1 ≥ … */
  greenConfidenceMin: 0.6,
} as const;
