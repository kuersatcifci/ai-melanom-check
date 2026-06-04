"use client";

import { useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import { CheckCircle2, Download, Lock, Shield } from "lucide-react";
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
import {
  getUnlockServerSnapshot,
  getUnlockSnapshot,
  subscribeUnlock,
} from "./demo-unlock";
import { PasswordGate } from "./PasswordGate";
import { PhotoGuide } from "./PhotoGuide";
import { ResultPanel } from "./ResultPanel";
import { useClassifier } from "./useClassifier";

export default function DemoClient() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [gateOpen, setGateOpen] = useState(false);

  const {
    phase,
    downloadProgress,
    backend,
    predictions,
    error,
    setError,
    analyze,
    reset,
  } = useClassifier();

  const unlocked =
    useSyncExternalStore(
      subscribeUnlock,
      getUnlockSnapshot,
      getUnlockServerSnapshot,
    ) === "1";

  const requestImageSelect = () => {
    if (!unlocked) {
      setGateOpen(true);
      return;
    }
    inputRef.current?.click();
  };

  const handleFile = (file: File) => {
    reset();
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
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!unlocked) {
      setGateOpen(true);
      return;
    }
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const onAnalyze = () => {
    setDetailsOpen(false);
    analyze(previewUrl);
  };

  const onReset = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    setFileName(null);
    setDetailsOpen(false);
    reset();
    if (inputRef.current) inputRef.current.value = "";
  };

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
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-6 py-16">
      <DisclaimerBanner />

      <header className="flex flex-col gap-3">
        <div className="text-primary flex items-center gap-3 text-xs uppercase tracking-[0.22em]">
          <span aria-hidden="true" className="bg-primary h-px w-8" />
          Inferenz
        </div>
        <h1 className="font-heading text-3xl font-medium leading-tight tracking-tight sm:text-4xl">
          Live-Demo
        </h1>
        <p className="text-muted-foreground text-base leading-relaxed">
          Wählen Sie ein dermatoskopisches Bild aus. Es wird nicht hochgeladen –
          die Verarbeitung erfolgt ausschließlich lokal in Ihrem Browser.
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
                <p className="font-medium">Bild auswählen</p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Ziehen Sie das Bild in den Bereich unten oder klicken Sie
                  darauf. JPG oder PNG, maximal 10 MB. Das Bild bleibt auf Ihrem
                  Gerät – es wird nicht hochgeladen.
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

      <Card className="border-l-primary border-l-4">
        <CardHeader>
          <CardTitle>Wie funktioniert die Analyse?</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-5">
          <ul className="flex flex-col gap-4">
            <li className="flex gap-3">
              <Shield
                aria-hidden="true"
                strokeWidth={1.75}
                className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400"
              />
              <span className="text-sm leading-relaxed">
                <strong className="text-foreground font-semibold">
                  Ihre Bilder verlassen Ihren Browser nicht.
                </strong>{" "}
                Die KI-Analyse läuft vollständig auf Ihrem Gerät – kein
                Upload, kein Server, keine Datenweitergabe.
              </span>
            </li>
            <li className="flex gap-3">
              <Download
                aria-hidden="true"
                strokeWidth={1.75}
                className="text-primary mt-0.5 h-5 w-5 shrink-0"
              />
              <span className="text-sm leading-relaxed">
                <strong className="text-foreground font-semibold">
                  Beim ersten Start wird das KI-Modell heruntergeladen
                  (83 MB).
                </strong>{" "}
                Das Modell wird einmalig von Hugging Face geladen und dann
                dauerhaft in Ihrem Browser gespeichert. Ab dem zweiten Besuch
                startet die Analyse sofort – ohne erneuten Download.
              </span>
            </li>
            <li className="flex gap-3">
              <Lock
                aria-hidden="true"
                strokeWidth={1.75}
                className="text-muted-foreground mt-0.5 h-5 w-5 shrink-0"
              />
              <span className="text-sm leading-relaxed">
                <strong className="text-foreground font-semibold">
                  Technischer Hintergrund:
                </strong>{" "}
                Die Inferenz läuft via ONNX Runtime Web direkt in Ihrem
                Browser. Weder Bilder noch Ergebnisse werden an externe
                Server übertragen. Das ist technisch garantiert – nicht nur
                versprochen.
              </span>
            </li>
          </ul>

          <div className="bg-muted/50 text-muted-foreground rounded-md p-3 text-xs leading-relaxed">
            <span className="text-foreground font-medium">
              Datenschutz-Nachweis:
            </span>{" "}
            Öffnen Sie die Browser-Entwicklertools (F12 → Network) während
            der Analyse. Sie werden keine Bild-Uploads sehen – nur den
            einmaligen Modell-Download.
          </div>
        </CardContent>
      </Card>

      <PhotoGuide />

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

          <div
            role="button"
            tabIndex={0}
            aria-label={
              unlocked
                ? "Bild auswählen"
                : "Gesperrt – Passwort erforderlich"
            }
            onClick={requestImageSelect}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                requestImageSelect();
              }
            }}
            onDragOver={(e) => e.preventDefault()}
            onDrop={onDrop}
            className="border-muted-foreground/25 hover:border-muted-foreground/50 focus-visible:border-ring focus-visible:ring-ring/50 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-md border border-dashed p-8 text-center transition-colors outline-none focus-visible:ring-3"
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
            ) : unlocked ? (
              <>
                <span className="font-medium">
                  Datei hierher ziehen oder klicken
                </span>
                <span className="text-muted-foreground text-xs">
                  Das Bild verlässt Ihren Browser nicht.
                </span>
              </>
            ) : (
              <>
                <Lock
                  className="text-muted-foreground h-6 w-6"
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
                <span className="font-medium">Gesperrt</span>
                <span className="text-muted-foreground text-xs">
                  Zum Auswählen eines Bildes ist ein Passwort erforderlich –
                  klicken zum Freischalten.
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
          </div>

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
            <Button
              size="lg"
              className="h-12 px-6 text-sm"
              onClick={onAnalyze}
              disabled={!previewUrl || isBusy}
            >
              {analyzeLabel}
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-12 px-6 text-sm"
              onClick={onReset}
              disabled={!previewUrl && !predictions && !error}
            >
              Zurücksetzen
            </Button>
          </div>
        </CardContent>
      </Card>

      {predictions && (
        <ResultPanel
          predictions={predictions}
          backend={backend}
          detailsOpen={detailsOpen}
          onToggleDetails={() => setDetailsOpen((v) => !v)}
        />
      )}

      <PasswordGate open={gateOpen} onOpenChange={setGateOpen} />
    </main>
  );
}
