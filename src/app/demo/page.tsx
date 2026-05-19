"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import { DisclaimerBanner } from "@/components/DisclaimerBanner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

type Prediction = {
  code: string;
  label: string;
  malignant: boolean;
  probability: number;
};

type LoadingPhase = "idle" | "downloading" | "initializing" | "analyzing";

type SessionRef = {
  session: import("onnxruntime-web/webgpu").InferenceSession;
  backend: "webgpu" | "wasm";
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

export default function DemoPage() {
  const inputRef = useRef<HTMLInputElement>(null);
  const sessionRef = useRef<SessionRef | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [phase, setPhase] = useState<LoadingPhase>("idle");
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [backend, setBackend] = useState<"webgpu" | "wasm" | null>(null);
  const [predictions, setPredictions] = useState<Prediction[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFile = useCallback((file: File) => {
    setError(null);
    setPredictions(null);

    if (!file.type.startsWith("image/")) {
      setError("Bitte eine Bilddatei auswählen (JPG oder PNG).");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError("Die Datei ist größer als 10 MB.");
      return;
    }

    setPreviewUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return URL.createObjectURL(file);
    });
    setFileName(file.name);
  }, []);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const onDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

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
    return created;
  };

  const onAnalyze = async () => {
    if (!previewUrl) return;
    setError(null);
    setPredictions(null);

    try {
      const { session } = await ensureSession();

      setPhase("analyzing");
      const img = await loadImage(previewUrl);
      const { classify } = await import("@/lib/inference");
      const result = await classify(session, img);

      setPredictions(result.probs);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unbekannter Fehler.");
    } finally {
      setPhase("idle");
    }
  };

  const onReset = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    setFileName(null);
    setPredictions(null);
    setError(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  const sorted = predictions
    ? [...predictions].sort((a, b) => b.probability - a.probability)
    : null;

  const isBusy = phase !== "idle";
  const analyzeLabel =
    phase === "downloading"
      ? `Modell wird geladen … ${Math.round(downloadProgress * 100)} %`
      : phase === "initializing"
      ? "Initialisiere Modell …"
      : phase === "analyzing"
      ? "Analysiere …"
      : "Analysieren";

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-6 py-12">
      <DisclaimerBanner />

      <header className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold tracking-tight">Demo</h1>
        <p className="text-muted-foreground text-sm">
          Laden Sie ein dermatoskopisches Bild hoch. Die Verarbeitung erfolgt
          ausschließlich lokal in Ihrem Browser.
        </p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Bild auswählen</CardTitle>
          <CardDescription>JPG oder PNG, maximal 10 MB.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <label
            htmlFor="file-input"
            onDragOver={(e) => e.preventDefault()}
            onDrop={onDrop}
            className="border-muted-foreground/25 hover:border-muted-foreground/50 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-md border border-dashed p-8 text-center transition-colors"
          >
            {previewUrl ? (
              <div className="relative h-64 w-full">
                <Image
                  src={previewUrl}
                  alt="Vorschau der hochgeladenen Läsion"
                  fill
                  className="rounded object-contain"
                  unoptimized
                />
              </div>
            ) : (
              <>
                <span className="font-medium">
                  Datei hierher ziehen oder klicken
                </span>
                <span className="text-muted-foreground text-xs">
                  Das Bild verlässt Ihren Browser nicht.
                </span>
              </>
            )}
            <input
              ref={inputRef}
              id="file-input"
              type="file"
              accept="image/jpeg,image/png"
              className="sr-only"
              onChange={onInputChange}
            />
          </label>

          {fileName && (
            <p className="text-muted-foreground text-xs">
              Ausgewählt: <span className="font-mono">{fileName}</span>
            </p>
          )}

          {phase === "downloading" && (
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">
                  Modell wird einmalig heruntergeladen …
                </span>
                <span className="tabular-nums">
                  {Math.round(downloadProgress * 100)} %
                </span>
              </div>
              <Progress value={downloadProgress * 100} />
            </div>
          )}

          {error && (
            <p className="text-destructive text-sm" role="alert">
              {error}
            </p>
          )}

          <div className="flex flex-wrap gap-2">
            <Button onClick={onAnalyze} disabled={!previewUrl || isBusy}>
              {analyzeLabel}
            </Button>
            <Button
              variant="outline"
              onClick={onReset}
              disabled={!previewUrl && !predictions && !error}
            >
              Zurücksetzen
            </Button>
          </div>
        </CardContent>
      </Card>

      {sorted && (
        <Card>
          <CardHeader>
            <CardTitle>Ergebnis</CardTitle>
            <CardDescription>
              Geschätzte Wahrscheinlichkeiten je Klasse. Keine medizinische
              Aussage.
              {backend && (
                <>
                  {" "}
                  Backend:{" "}
                  <span className="font-mono uppercase">{backend}</span>.
                </>
              )}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            {sorted.map((p) => (
              <div key={p.code} className="flex flex-col gap-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2">
                    <span className="font-medium">{p.label}</span>
                    <span
                      className={
                        "rounded px-1.5 py-0.5 text-[10px] font-medium " +
                        (p.malignant
                          ? "bg-destructive/10 text-destructive"
                          : "bg-muted text-muted-foreground")
                      }
                    >
                      {p.malignant ? "maligne" : "benigne"}
                    </span>
                  </span>
                  <span className="text-muted-foreground tabular-nums">
                    {(p.probability * 100).toFixed(1)} %
                  </span>
                </div>
                <Progress value={p.probability * 100} />
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </main>
  );
}
