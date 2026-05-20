"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
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

type TrafficLight = "green" | "yellow" | "red";

const CONFIDENCE_THRESHOLD = 0.6;

function getTrafficLight(top: Prediction): TrafficLight {
  if (top.probability <= CONFIDENCE_THRESHOLD) return "yellow";
  return top.malignant ? "red" : "green";
}

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
  const [detailsOpen, setDetailsOpen] = useState(false);

  const handleFile = useCallback((file: File) => {
    setError(null);
    setPredictions(null);
    setDetailsOpen(false);

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
    setDetailsOpen(false);

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
    setDetailsOpen(false);
    if (inputRef.current) inputRef.current.value = "";
  };

  const sorted = predictions
    ? [...predictions].sort((a, b) => b.probability - a.probability)
    : null;

  const trafficLight = sorted ? getTrafficLight(sorted[0]) : null;

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
          <CardTitle>So funktioniert die Demo</CardTitle>
          <CardDescription>
            In drei Schritten zur Modell-Einschätzung.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <ol className="flex flex-col gap-4">
            <li className="flex gap-3">
              <span
                aria-hidden="true"
                className="bg-primary text-primary-foreground flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-semibold"
              >
                1
              </span>
              <div className="flex flex-col gap-1">
                <p className="font-medium">Bild vorbereiten</p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Fotografieren Sie die Hautveränderung möglichst nah und bei
                  guter Beleuchtung. Nur die Veränderung sollte im Bild sein,
                  keine störenden Objekte. Dermatoskopie-Aufnahmen liefern
                  bessere Ergebnisse als Smartphone-Fotos.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span
                aria-hidden="true"
                className="bg-primary text-primary-foreground flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-semibold"
              >
                2
              </span>
              <div className="flex flex-col gap-1">
                <p className="font-medium">Bild hochladen</p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Ziehen Sie das Bild in den Bereich unten oder klicken Sie
                  darauf. JPG oder PNG, maximal 10 MB.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span
                aria-hidden="true"
                className="bg-primary text-primary-foreground flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-semibold"
              >
                3
              </span>
              <div className="flex flex-col gap-1">
                <p className="font-medium">Ergebnis lesen</p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Das System zeigt eine farbige Einschätzung. Grün ={" "}
                  unauffällig, Gelb = unsicher, Rot = bitte ärztlich abklären.
                  Unter „Details“ sehen Sie alle sieben Klassen mit
                  technischen Konfidenzwerten.
                </p>
              </div>
            </li>
          </ol>

          <div className="border-border/60 flex flex-col gap-3 rounded-md border bg-muted/30 p-4">
            <h3 className="font-heading text-base font-medium">Datenschutz</h3>
            <ul className="flex flex-col gap-2.5">
              {[
                "Ihre Bilder werden nicht gespeichert",
                "Keine Übertragung an Server oder Dritte",
                "Nach Schließen des Tabs sind alle Daten weg – keine Datenbank, kein Account",
                "KI-Inferenz läuft lokal auf Ihrem Gerät via ONNX Runtime Web",
              ].map((item) => (
                <li key={item} className="flex gap-2.5 text-sm leading-relaxed">
                  <CheckCircle2
                    className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400"
                    aria-hidden="true"
                    strokeWidth={2}
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <p className="rounded-md border border-amber-600/30 bg-amber-50 p-3 text-sm leading-relaxed text-amber-900 dark:border-amber-400/30 dark:bg-amber-950/40 dark:text-amber-50">
            Diese Demo ist für Bildungszwecke entwickelt. Die Ergebnisse sind
            keine medizinischen Befunde. Bei echten Hautveränderungen immer
            einen Dermatologen aufsuchen.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Bild auswählen</CardTitle>
          <CardDescription>JPG oder PNG, maximal 10 MB.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <p className="bg-muted/50 text-muted-foreground rounded-md border p-3 text-xs leading-relaxed">
            <span className="text-foreground font-medium">Tipp:</span>{" "}
            Fotografieren Sie nur die Hautveränderung, möglichst nah und ohne
            störende Objekte im Bild. Nutzen Sie wenn möglich
            Dermatoskopie-Aufnahmen.
          </p>

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

      {sorted && trafficLight && (
        <section className="flex flex-col gap-4" aria-live="polite">
          <TrafficLightBlock light={trafficLight} />

          <ResultExplanation
            label={sorted[0].label}
            percent={Math.round(sorted[0].probability * 100)}
          />

          <p className="text-muted-foreground rounded-md border border-dashed p-3 text-xs leading-relaxed">
            Diese Ausgabe ist kein medizinischer Befund. Softmax-Werte sind
            keine klinischen Wahrscheinlichkeiten. Bei Unsicherheit immer
            Hautarzt aufsuchen.
          </p>

          <Card>
            <CardHeader className="flex flex-row items-start justify-between gap-3 space-y-0">
              <div className="flex flex-col gap-1">
                <CardTitle className="text-base">
                  Technische Details (alle Klassen)
                </CardTitle>
                {backend && (
                  <CardDescription>
                    Backend:{" "}
                    <span className="font-mono uppercase">{backend}</span>
                  </CardDescription>
                )}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setDetailsOpen((v) => !v)}
                aria-expanded={detailsOpen}
                aria-controls="technical-details"
              >
                {detailsOpen ? "Details ausblenden" : "Details anzeigen"}
              </Button>
            </CardHeader>
            {detailsOpen && (
              <CardContent
                id="technical-details"
                className="flex flex-col gap-3"
              >
                <p className="text-muted-foreground text-xs">
                  Die Prozentwerte sind Modell-Konfidenzwerte, keine
                  medizinischen Wahrscheinlichkeiten.
                </p>
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
            )}
          </Card>
        </section>
      )}
    </main>
  );
}

function TrafficLightBlock({ light }: { light: TrafficLight }) {
  const config = {
    green: {
      container:
        "border-emerald-600/30 bg-emerald-50 text-emerald-900 dark:border-emerald-400/30 dark:bg-emerald-950/40 dark:text-emerald-50",
      icon: "✓",
      iconBg:
        "bg-emerald-600 text-white dark:bg-emerald-500",
      title: "Kein auffälliger Befund",
      body: "Das Modell ordnet dieses Bild einer unauffälligen Kategorie zu.",
    },
    yellow: {
      container:
        "border-amber-600/30 bg-amber-50 text-amber-900 dark:border-amber-400/30 dark:bg-amber-950/40 dark:text-amber-50",
      icon: "⚠",
      iconBg: "bg-amber-500 text-white",
      title: "Ergebnis unsicher",
      body: "Das Modell kann keine eindeutige Zuordnung treffen.",
    },
    red: {
      container:
        "border-red-600/30 bg-red-50 text-red-900 dark:border-red-400/30 dark:bg-red-950/40 dark:text-red-50",
      icon: "⚠",
      iconBg: "bg-red-600 text-white",
      title: "Bitte ärztlich abklären",
      body: "Das Modell ordnet dieses Bild einer auffälligen Kategorie zu. Dies ist keine Diagnose.",
    },
  }[light];

  return (
    <div
      role="status"
      className={
        "flex items-start gap-4 rounded-lg border-2 p-5 " + config.container
      }
    >
      <div
        aria-hidden="true"
        className={
          "flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-2xl font-bold " +
          config.iconBg
        }
      >
        {config.icon}
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-lg font-semibold leading-tight">{config.title}</p>
        <p className="text-sm leading-relaxed opacity-90">{config.body}</p>
      </div>
    </div>
  );
}

function ResultExplanation({
  label,
  percent,
}: {
  label: string;
  percent: number;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">
          Was bedeutet dieses Ergebnis?
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3 text-sm leading-relaxed">
        <p>
          Das Programm findet auf Ihrem Bild Muster, die zu{" "}
          <span className="font-semibold tabular-nums">{percent} %</span> denen
          ähneln, die es in den Lernbildern für{" "}
          <span className="font-medium">{label}</span> gesehen hat.
        </p>
        <p>
          <span className="text-destructive font-semibold">
            Das heißt NICHT:
          </span>{" "}
          Sie haben mit{" "}
          <span className="font-semibold tabular-nums">{percent} %</span>{" "}
          Wahrscheinlichkeit diese Erkrankung.
        </p>
        <p>
          <span className="font-semibold">Das heißt:</span> Von 100
          vergleichbaren Bildern wären{" "}
          <span className="font-semibold tabular-nums">{percent}</span> als{" "}
          <span className="font-medium">{label}</span> beschriftet gewesen – die
          anderen als etwas anderes. Liegen mehrere Werte nah beieinander, ist
          das Programm unsicher.
        </p>
        <p className="border-primary/30 bg-primary/5 text-foreground mt-1 rounded-md border-l-2 p-3">
          <span className="text-primary mr-1" aria-hidden="true">
            ➜
          </span>
          Bei jedem auffälligen Hautfleck: zur Hautärztin oder zum Hautarzt.
        </p>
      </CardContent>
    </Card>
  );
}
