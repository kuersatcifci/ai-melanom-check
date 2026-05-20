import Link from "next/link";
import { ArrowRight, LockKeyhole, BrainCircuit, Gauge } from "lucide-react";
import { CLASSES } from "@/lib/classes";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const FACTS = [
  {
    icon: LockKeyhole,
    label: "100 % lokal",
    text: "Inferenz im Browser, kein Bild verlässt das Gerät.",
  },
  {
    icon: BrainCircuit,
    label: "ViT-Modell",
    text: "Vision-Transformer, INT8-quantisiert via ONNX Runtime.",
  },
  {
    icon: Gauge,
    label: "Ampel-Lesart",
    text: "Grün, Gelb, Rot – verständlich statt rohe Prozente.",
  },
];

const STEPS = [
  {
    n: "01",
    title: "Bild hochladen",
    text: "Foto einer Hautveränderung wird in den Browser geladen – ohne Server-Übertragung.",
  },
  {
    n: "02",
    title: "KI analysiert",
    text: "Ein vortrainierter Vision-Transformer ordnet das Bild einer von sieben Klassen zu.",
  },
  {
    n: "03",
    title: "Ergebnis lesen",
    text: "Farbige Einschätzung plus optionale technische Details mit Konfidenzwerten.",
  },
];

export default function Home() {
  return (
    <>
      <section className="relative isolate overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10"
        >
          <div className="bg-primary/[0.04] absolute -top-32 -right-32 h-[28rem] w-[28rem] rounded-full blur-3xl" />
          <div className="bg-primary/[0.03] absolute -bottom-40 -left-32 h-[26rem] w-[26rem] rounded-full blur-3xl" />
          <svg
            className="text-foreground/[0.04] absolute inset-0 h-full w-full"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern
                id="grid"
                width="56"
                height="56"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 56 0 L 0 0 0 56"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.5"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="mx-auto flex min-h-[calc(100svh-65px)] w-full max-w-6xl flex-col justify-between gap-12 px-6 py-12 lg:py-16">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.15fr_1fr]">
            <div className="flex flex-col gap-7 animate-in fade-in slide-in-from-bottom-2 duration-700">
              <div className="text-primary flex items-center gap-3 text-xs uppercase tracking-[0.22em]">
                <span aria-hidden="true" className="bg-primary h-px w-8" />
                Hautläsions-Klassifikator · Demo
              </div>

              <h1 className="text-balance font-heading text-4xl font-medium leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
                AI Melanom Check — KI trifft auf{" "}
                <span className="text-primary italic">Compliance</span>, live im
                Browser.
              </h1>

              <p className="text-muted-foreground max-w-xl text-base leading-relaxed sm:text-lg">
                Browser-basierte KI-Demo zur Hautläsionsklassifikation als
                Compliance-Demonstrator für den EU AI Act. Kein Medizinprodukt.
                Kein Upload. Keine Diagnose.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <Link
                  href="/demo"
                  className={
                    buttonVariants({ variant: "default", size: "lg" }) +
                    " group h-12 px-6 text-sm"
                  }
                >
                  Demo jetzt starten
                  <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
                <a
                  href="https://kuersatcifci.de"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={
                    buttonVariants({ variant: "outline", size: "lg" }) +
                    " group h-12 px-6 text-sm"
                  }
                >
                  Mehr über mich
                  <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </a>
              </div>
            </div>

            <figure
              aria-hidden="true"
              className="relative hidden aspect-square w-full max-w-md justify-self-end lg:block"
            >
              <div className="absolute inset-0 animate-in fade-in duration-1000">
                <svg
                  viewBox="0 0 400 400"
                  className="h-full w-full"
                  fill="none"
                  stroke="currentColor"
                >
                  <g
                    className="text-primary/30"
                    strokeWidth="0.75"
                  >
                    {Array.from({ length: 12 }).map((_, i) => (
                      <circle
                        key={i}
                        cx="200"
                        cy="200"
                        r={20 + i * 14}
                      />
                    ))}
                  </g>
                  <g className="text-primary" strokeWidth="1.5">
                    <circle cx="200" cy="200" r="84" />
                    <circle cx="200" cy="200" r="36" />
                    <circle
                      cx="200"
                      cy="200"
                      r="6"
                      fill="currentColor"
                      stroke="none"
                    />
                  </g>
                  <g
                    className="text-foreground/40"
                    strokeWidth="0.5"
                    strokeDasharray="2 4"
                  >
                    <line x1="0" y1="200" x2="400" y2="200" />
                    <line x1="200" y1="0" x2="200" y2="400" />
                  </g>
                </svg>
              </div>
              <figcaption className="text-muted-foreground absolute right-0 bottom-0 font-mono text-[10px] uppercase tracking-wider">
                Fig. 01 — Dermatoskop-Ansicht (schematisch)
              </figcaption>
            </figure>
          </div>

          <div className="border-border/60 grid grid-cols-1 gap-px overflow-hidden rounded-lg border bg-border/60 sm:grid-cols-3">
            {FACTS.map((fact, i) => {
              const Icon = fact.icon;
              return (
                <div
                  key={fact.label}
                  className="bg-background/95 flex flex-col gap-3 p-6 animate-in fade-in slide-in-from-bottom-2"
                  style={{
                    animationDelay: `${300 + i * 120}ms`,
                    animationFillMode: "backwards",
                  }}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      className="text-primary h-5 w-5"
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                    <span className="text-xs uppercase tracking-[0.18em]">
                      {fact.label}
                    </span>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {fact.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto flex w-full max-w-3xl flex-col gap-5 px-6 py-20">
        <span className="text-primary text-xs uppercase tracking-[0.22em]">
          Einführung
        </span>
        <h2 className="font-heading text-3xl font-medium tracking-tight sm:text-4xl">
          Was ist das hier?
        </h2>
        <p className="text-foreground/85 text-base leading-relaxed sm:text-lg">
          AI Melanom Check ist eine Demonstration künstlicher Intelligenz für
          die Hautbild-Analyse. Sie laden ein Foto einer Hautstelle hoch. Ein
          trainiertes Computerprogramm vergleicht das Bild mit über 10.000
          dermatoskopischen Aufnahmen, die Hautärztinnen und -ärzte beschriftet
          haben. Das Programm ordnet Ihr Bild einer von sieben Kategorien zu
          und zeigt, wie ähnlich Ihr Bild den gelernten Beispielen ist.
        </p>
        <p className="text-muted-foreground text-base leading-relaxed">
          <span className="text-foreground font-medium">Wichtig:</span> Diese
          App ist ein Lernwerkzeug, kein Medizinprodukt. Sie liefert keine
          Diagnose, ersetzt keinen Arztbesuch und sollte nicht für
          gesundheitliche Entscheidungen verwendet werden.
        </p>
      </section>

      <section className="border-border/60 bg-muted/30 border-y">
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-5 px-6 py-20">
          <span className="text-primary text-xs uppercase tracking-[0.22em]">
            Über den Entwickler
          </span>
          <blockquote className="font-heading text-balance text-2xl font-medium leading-[1.25] tracking-tight sm:text-3xl">
            Der EU AI Act ist kein Tech-Thema. Er ist ein{" "}
            <span className="text-primary italic">Kommunikationsthema</span>.
          </blockquote>
          <p className="text-foreground/85 text-base leading-relaxed">
            Ich habe Information Science studiert (wie Wissen strukturiert
            wird), Onlinekommunikation (wie Botschaften wirken) und
            Gesundheitskommunikation (wie Menschen befähigt werden, gute
            Gesundheitsentscheidungen zu treffen). Diese drei Perspektiven sind
            genau das, was Pharma-Compliance braucht, um KI auditfähig
            einzusetzen: Daten verstehen, Risiken kommunizieren, Menschen
            befähigen.
          </p>
          <footer className="text-muted-foreground flex flex-wrap items-center gap-2 text-sm">
            — Kürsat Cifci,{" "}
            <a
              href="https://kuersatcifci.de"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:text-primary underline-offset-4 hover:underline"
            >
              kuersatcifci.de
            </a>
          </footer>
        </div>
      </section>

      <section className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-20">
        <div className="flex flex-col gap-3">
          <span className="text-primary text-xs uppercase tracking-[0.22em]">
            Ablauf
          </span>
          <h2 className="font-heading max-w-2xl text-3xl font-medium tracking-tight sm:text-4xl">
            Drei Schritte. Kein Server. Kein Versprechen.
          </h2>
        </div>
        <ol className="grid grid-cols-1 gap-x-10 gap-y-8 md:grid-cols-3">
          {STEPS.map((step) => (
            <li
              key={step.n}
              className="border-border/60 flex flex-col gap-3 border-t pt-5"
            >
              <span className="text-primary font-mono text-xs tracking-widest">
                {step.n}
              </span>
              <h3 className="font-heading text-xl font-medium">{step.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {step.text}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 pb-24">
        <Card>
          <CardHeader>
            <CardTitle className="font-heading text-2xl">
              Erkannte Klassen
            </CardTitle>
            <CardDescription>
              Sieben dermatoskopische Kategorien gemäß HAM10000-Datensatz.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {CLASSES.map((c) => (
                <li key={c.code}>
                  <Link
                    href={`/klassen/${c.code}`}
                    className="border-border/60 hover:border-primary/60 hover:bg-accent/30 group flex h-full flex-col gap-1.5 rounded-md border bg-card p-4 transition-colors focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-heading group-hover:text-primary text-base font-medium transition-colors">
                        {c.label}
                      </span>
                      <span
                        className={
                          "shrink-0 rounded-full px-2 py-0.5 text-[10px] uppercase tracking-wider " +
                          (c.malignant
                            ? "bg-destructive/10 text-destructive"
                            : "bg-muted text-muted-foreground")
                        }
                      >
                        {c.malignant ? "maligne" : "benigne"}
                      </span>
                    </div>
                    <span className="text-muted-foreground text-xs leading-relaxed">
                      {c.description}
                    </span>
                    <code className="text-muted-foreground/70 mt-1 font-mono text-[10px] uppercase tracking-[0.18em]">
                      {c.code}
                    </code>
                  </Link>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </section>
    </>
  );
}
