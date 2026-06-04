"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { Backend } from "@/lib/inference";
import type { Prediction } from "./useClassifier";

type TrafficLight = "green" | "yellow" | "red";

const CONFIDENCE_THRESHOLD = 0.6;

function getTrafficLight(top: Prediction): TrafficLight {
  if (top.probability <= CONFIDENCE_THRESHOLD) return "yellow";
  return top.malignant ? "red" : "green";
}

export function ResultPanel({
  predictions,
  backend,
  detailsOpen,
  onToggleDetails,
}: {
  predictions: Prediction[];
  backend: Backend | null;
  detailsOpen: boolean;
  onToggleDetails: () => void;
}) {
  const sorted = [...predictions].sort((a, b) => b.probability - a.probability);
  const trafficLight = getTrafficLight(sorted[0]);

  return (
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
            onClick={onToggleDetails}
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
