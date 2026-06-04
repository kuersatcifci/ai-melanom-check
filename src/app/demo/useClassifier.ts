"use client";

import { useRef, useState } from "react";
import { track } from "@vercel/analytics";
import type { Backend, ClassificationResult } from "@/lib/inference";

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
    track("analyse_gestartet");

    try {
      const { session } = await ensureSession();

      setPhase("analyzing");
      const img = await loadImage(previewUrl);
      const { classify } = await import("@/lib/inference");
      const result = await classify(session, img);

      setPredictions(result.probs);
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
  };

  return {
    phase,
    downloadProgress,
    backend,
    predictions,
    error,
    setError,
    analyze,
    reset,
  };
}
