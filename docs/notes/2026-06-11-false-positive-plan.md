# False-Positive-Reduktion — Plan vom 2026-06-11

## Problem

ViT meldet auf normalen Hautfotos (kein Muttermal) "99% Melanom". Diagnose: Out-of-Distribution-Problem — Modell kennt keine "nichts gefunden"-Klasse, Läsions-Detektor lässt zu viel durch, ViT ist overconfident.

## Constraint

**Kein Retraining.** App ist Compliance-/Referenz-Demo, kein klinisches Produkt. Optimierungen müssen inference-time stattfinden.

Für dieses Tool gilt: lieber "gelb/unsicher" als falsch "rot". False Positives sind schlimmer als False Negatives (umgekehrt zur klinischen Logik).

## Drei geplante Änderungen (~30 min Code + Tuning)

### 1. `src/lib/lesion-detect.ts` (Zeilen 16-19) — Schwellen anziehen

- `SEPARABILITY_MIN`: 0.4 → **0.55**
- `DARK_MIN`: 16 → **28**
- `MIN_AREA_FRAC`: 0.002 → **0.005**
- **Neu:** Kontrast-Varianz-Check innerhalb der Box (`std(lum) > 8`) — gegen homogene Schatten/Sommersprossen
- **Neu:** Aspect-Ratio-Sanity (boxW/boxH zwischen 0.25 und 4) — gegen Haare/lange Schatten

### 2. `src/lib/inference.ts` — Temperature Scaling vor Softmax

Logits durch `T = 2.5` teilen bevor `softmax()` läuft (Zeile ~107).
Grund: ViTs sind overconfident, T~2.5 macht "99%" zu ehrlichen ~70%.

### 3. `src/app/demo/traffic-light.ts` — Drei-Wege-Logik mit Entropie-Gate

Statt aktuellem symmetrischen 0.6-Threshold:

```
if entropy(probs) > 1.4:                              → gelb (unsicher)
elif top.malignant && top1 > 0.75 && entropy < 1.0:   → rot
elif !top.malignant && top1 > 0.70:                   → grün
else:                                                  → gelb
```

(Max-Entropie bei 7 Klassen ≈ 1.95)

## Tuning braucht Testbilder

3–5 Fotos: glatte Haut (sollte "kein Befund") + echte Muttermale. Ohne diese Bilder bleiben die Werte oben geschätzt.

## Fallback-Pfade

Falls die drei Änderungen nicht reichen:

- **Energy-Score** statt Entropie (Liu et al. 2020) — übertrifft Max-Softmax als OOD-Score
- **Mahalanobis-Distanz** im Feature-Raum — aufwendiger, aber stärker
- **Modell als FP16 re-exportieren** statt INT8 — bessere Kalibrierung, ~doppelt so groß

## Verworfene Pfade (mit Begründung)

- Focal Loss / Klassen-Gewichtung → braucht Retraining
- ISIC 2019/2020 Daten dazu → braucht Retraining
- Ensemble von Modellen → zu schwer für In-Browser
- Stage-1-binär + Stage-2-Klassifikation → architektonische Änderung, später denkbar

## Hintergrund: warum False Positives entstehen

1. **HAM10000-Bias** (~67% nv, ~11% mel) — Modell hat schwache `mel`-Repräsentation
2. **Modell muss sich für eine der 7 Klassen entscheiden** — kein "weiß nicht"-Output
3. **ViTs sind notorisch overconfident** — auch auf Rauschen kommt oft 99%
4. **Stretch-Resize** in `inference.ts:58` verzerrt das Bild (Asymmetrie ist A-B-C-D-Kriterium!)
5. **Läsions-Detektor findet nur dunkle Stellen** — Schatten, Haare, Sommersprossen lösen falschen Crop aus
