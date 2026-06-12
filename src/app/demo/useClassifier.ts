"use client";

import { useRef, useState } from "react";
import { track } from "@vercel/analytics";
import type { Backend, ClassificationResult } from "@/lib/inference";
import {
  cropToCanvas,
  detectLesion,
  drawAnnotated,
} from "@/lib/lesion-detect";
import { getTrafficLight, TRAFFIC_COLORS } from "./traffic-light";

export type Prediction = ClassificationResult["probs"][number];

export type LoadingPhase = "idle" | "downloading" | "initializing" | "analyzing";

type SessionRef = {
  session: import("onnxruntime-web/webgpu").InferenceSession;
  backend: Backend;
};

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Bild konnte nicht geladen werden."));
    img.src = src;
  });
}

/**
 * Kapselt das Laden des ONNX-Modells und die clientseitige Inferenz inklusive
 * Phasen-/Fortschritts-State. Sendet anonyme Nutzungs-Events (ohne Bild- oder
 * Ergebnisdaten).
 */
export function useClassifier() {
  const sessionRef = useRef<SessionRef | null>(null);
  const [phase, setPhase] = useState<LoadingPhase>("idle");
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [backend, setBackend] = useState<Backend | null>(null);
  const [predictions, setPredictions] = useState<Prediction[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  // null = noch nicht analysiert, false = keine Läsion gefunden, true = gefunden
  const [lesionFound, setLesionFound] = useState<boolean | null>(null);
  // Quellbild mit eingezeichneter farbiger Box (nur wenn eine Läsion gefunden wurde)
  const [annotatedUrl, setAnnotatedUrl] = useState<string | null>(null);

  const ensureSession = async (): Promise<SessionRef> => {
    if (sessionRef.current) return sessionRef.current;

    const [{ loadModel }, { createSession }] = await Promise.all([
      import("@/lib/model-loader"),
      import("@/lib/inference"),
    ]);

    setPhase("downloading");
    setDownloadProgress(0);
    const modelData = await loadModel((p) => setDownloadProgress(p));

    setPhase("initializing");
    const created = await createSession(modelData);
    sessionRef.current = created;
    setBackend(created.backend);
    track("modell_geladen", { backend: created.backend });
    return created;
  };

  const analyze = async (previewUrl: string | null) => {
    if (!previewUrl) return;
    setError(null);
    setPredictions(null);
    setAnnotatedUrl(null);
    setLesionFound(null);
    track("analyse_gestartet");

    try {
      const img = await loadImage(previewUrl);

      // Schritt 1: Läsion im Bild lokalisieren (klassische Bildanalyse, kein Modell).
      const detection = detectLesion(img);
      if (!detection.found || !detection.box) {
        setLesionFound(false);
        track("keine_laesion");
        return;
      }
      setLesionFound(true);

      // Schritt 2: Nur den Ausschnitt um die Läsion klassifizieren.
      const { session } = await ensureSession();
      setPhase("analyzing");
      const crop = cropToCanvas(img, detection.box);
      const { classify } = await import("@/lib/inference");
      const result = await classify(session, crop);
      setPredictions(result.probs);

      // Schritt 3: Box farbig (grün/orange/rot) ins Bild zeichnen.
      const light = getTrafficLight(result.probs);
      setAnnotatedUrl(drawAnnotated(img, detection.box, TRAFFIC_COLORS[light]));

      track("analyse_fertig");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unbekannter Fehler.");
    } finally {
      setPhase("idle");
    }
  };

  const reset = () => {
    setPredictions(null);
    setError(null);
    setLesionFound(null);
    setAnnotatedUrl(null);
  };

  return {
    phase,
    downloadProgress,
    backend,
    predictions,
    error,
    setError,
    lesionFound,
    annotatedUrl,
    analyze,
    reset,
  };
}
