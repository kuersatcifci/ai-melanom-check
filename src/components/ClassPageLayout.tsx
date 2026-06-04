import { Fragment, type ReactNode } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

export type ClassSource = { text: string; url: string };
export type ClassFeature = { label: string; text: string };
export type AbcdeRule = { letter: string; name: string; text: string };
export type FachSection = { heading: string; body: ReactNode };

export type ClassPageLayoutProps = {
  /** Klassen-Kürzel, z. B. "MEL" (wird in Großbuchstaben dargestellt). */
  code: string;
  /** true → rote „maligne“-Stilistik, false → grüne „benigne“-Stilistik. */
  malignant: boolean;
  /** Titel der Klasse — wird in der H1 (und, falls kein breadcrumbLabel gesetzt ist, auch im Breadcrumb) verwendet. */
  title: string;
  /** Abweichender Breadcrumb-Text, falls er sich von der H1 unterscheidet (Default = title). */
  breadcrumbLabel?: string;
  /** Einleitender Absatz unter der H1. */
  lead: ReactNode;
  /** Kernaussagen im Block „Das müssen Sie wissen“. */
  keyPoints: readonly string[];
  /** Inhalt der „Wann zum Arzt?“-Box (ohne Überschrift). */
  wannZumArzt: ReactNode;
  /** H2 des Blocks „Was ist das?“. */
  wasIstHeading: string;
  /** Fließtext des Blocks „Was ist das?“ inkl. Häufigkeit (ohne Risikofaktoren). */
  wasIstBody: ReactNode;
  /** Überschrift der Risikofaktoren-Liste. */
  riskFactorsHeading?: string;
  riskFactors: readonly string[];
  /** H2 des Blocks „Typische Merkmale“. */
  merkmaleHeading: string;
  features: readonly ClassFeature[];
  /** Optionaler ABCDE-Block (nur bei pigmentierten Läsionen wie MEL/NV). */
  abcde?: { intro: ReactNode; rules: readonly AbcdeRule[] };
  /** Schematisches SVG der Läsion. */
  figure: ReactNode;
  /** Bildunterschrift unter dem SVG. */
  figureCaption: ReactNode;
  /** Unterabschnitte des Fachpublikum-Blocks (Überschrift + Fließtext). */
  fachSections: readonly FachSection[];
  sources: readonly ClassSource[];
};

export function ClassPageLayout({
  code,
  malignant,
  title,
  breadcrumbLabel,
  lead,
  keyPoints,
  wannZumArzt,
  wasIstHeading,
  wasIstBody,
  riskFactorsHeading = "Risikofaktoren",
  riskFactors,
  merkmaleHeading,
  features,
  abcde,
  figure,
  figureCaption,
  fachSections,
  sources,
}: ClassPageLayoutProps) {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-12 px-6 py-16">
      {/* Block 1 — Kopfbereich */}
      <nav aria-label="Breadcrumb" className="text-muted-foreground text-xs">
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link href="/" className="hover:text-foreground">
              Startseite
            </Link>
          </li>
          <li aria-hidden="true">→</li>
          <li>
            <Link href="/klassen" className="hover:text-foreground">
              Klassen
            </Link>
          </li>
          <li aria-hidden="true">→</li>
          <li className="text-foreground">{breadcrumbLabel ?? title}</li>
        </ol>
      </nav>

      <header className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <code className="text-muted-foreground font-mono text-xs uppercase tracking-[0.22em]">
            {code}
          </code>
          <span
            className={
              (malignant
                ? "bg-destructive/10 text-destructive"
                : "bg-emerald-500/10 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300") +
              " rounded-full px-2.5 py-0.5 text-[11px] uppercase tracking-wider"
            }
          >
            {malignant ? "maligne" : "benigne"}
          </span>
        </div>
        <h1 className="font-heading text-balance text-4xl font-medium leading-tight tracking-tight sm:text-5xl">
          {title}
        </h1>
        <p className="text-foreground text-lg leading-relaxed">{lead}</p>
        <p className="text-muted-foreground text-xs">
          Stand: Mai 2026 · Quellen: AWMF, RKI, DKFZ
        </p>
      </header>

      {/* Block 2 — Das müssen Sie wissen */}
      <section
        aria-labelledby="kernpunkte"
        className={
          (malignant
            ? "bg-destructive/5 border-destructive/70"
            : "bg-muted/60 border-emerald-500/50 dark:border-emerald-600/50") +
          " -mx-2 flex flex-col gap-6 rounded-lg border-l-4 px-6 py-7 sm:-mx-4 sm:px-8"
        }
      >
        <h2
          id="kernpunkte"
          className="font-heading text-2xl font-medium leading-tight tracking-tight sm:text-3xl"
        >
          Das müssen Sie wissen
        </h2>
        <ul className="flex flex-col gap-3" role="list">
          {keyPoints.map((point) => (
            <li key={point} className="flex items-start gap-3">
              <CheckCircle2
                aria-hidden="true"
                className={
                  (malignant
                    ? "text-destructive"
                    : "text-emerald-600 dark:text-emerald-400") +
                  " mt-0.5 h-5 w-5 shrink-0"
                }
              />
              <span className="text-base leading-relaxed">{point}</span>
            </li>
          ))}
        </ul>

        <aside
          aria-label="Wichtiger Hinweis"
          className="border-amber-400 bg-amber-50 text-amber-950 dark:border-amber-700 dark:bg-amber-950/40 dark:text-amber-100 mt-2 flex flex-col gap-3 rounded-md border-l-4 px-5 py-4"
        >
          <h3 className="font-heading flex items-center gap-2 text-lg font-medium leading-tight">
            <AlertTriangle aria-hidden="true" className="h-5 w-5 shrink-0" />
            Wann zum Arzt?
          </h3>
          {wannZumArzt}
        </aside>
      </section>

      {/* Block 3 — Was ist das? */}
      <section aria-labelledby="was-ist" className="flex flex-col gap-5">
        <h2
          id="was-ist"
          className="font-heading text-2xl font-medium leading-tight tracking-tight sm:text-3xl"
        >
          {wasIstHeading}
        </h2>
        {wasIstBody}

        <h3 className="font-heading text-lg font-medium leading-tight">
          {riskFactorsHeading}
        </h3>
        <ul className="flex flex-col gap-2" role="list">
          {riskFactors.map((factor) => (
            <li key={factor} className="flex gap-2 leading-relaxed">
              <span aria-hidden="true" className="text-muted-foreground">
                •
              </span>
              <span>{factor}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Block 4 — Typische Merkmale */}
      <section aria-labelledby="merkmale" className="flex flex-col gap-5">
        <h2
          id="merkmale"
          className="font-heading text-2xl font-medium leading-tight tracking-tight sm:text-3xl"
        >
          {merkmaleHeading}
        </h2>

        <ul className="flex flex-col gap-3" role="list">
          {features.map((feature) => (
            <li key={feature.label} className="leading-relaxed">
              <strong className="font-semibold">{feature.label}:</strong>{" "}
              <span>{feature.text}</span>
            </li>
          ))}
        </ul>

        {abcde && (
          <>
            <h3 className="font-heading mt-2 text-lg font-medium leading-tight">
              ABCDE-Regel für die Selbstbeobachtung
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {abcde.intro}
            </p>
            <dl className="border-border/60 grid grid-cols-1 gap-x-6 gap-y-3 rounded-md border bg-card/50 p-5 sm:grid-cols-[max-content_max-content_1fr]">
              {abcde.rules.map((rule) => (
                <div key={rule.letter} className="contents">
                  <dt className="text-primary font-heading text-2xl font-medium leading-none">
                    <span aria-hidden="true">{rule.letter}</span>
                    <span className="sr-only">Buchstabe {rule.letter}: </span>
                  </dt>
                  <dd className="text-foreground self-center text-sm font-medium">
                    {rule.name}
                  </dd>
                  <dd className="text-muted-foreground self-center text-sm leading-relaxed sm:col-start-3">
                    {rule.text}
                  </dd>
                </div>
              ))}
            </dl>
          </>
        )}

        <figure className="mt-4 flex flex-col gap-3">
          <div className="border-border/60 bg-card flex justify-center rounded-md border p-6">
            {figure}
          </div>
          <figcaption className="text-muted-foreground text-xs italic">
            {figureCaption}
          </figcaption>
        </figure>
      </section>

      {/* Block 5 — Fachpublikum */}
      <section
        aria-labelledby="fachpublikum"
        className="bg-muted/30 border-border/60 -mx-2 flex flex-col gap-5 rounded-lg border p-6 text-sm sm:-mx-4 sm:p-8"
      >
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 text-primary px-2.5 py-0.5 text-[11px] uppercase tracking-wider">
            <ShieldCheck aria-hidden="true" className="h-3 w-3" />
            Compliance &amp; Wissenschaft
          </span>
        </div>
        <h2
          id="fachpublikum"
          className="font-heading text-xl font-medium leading-tight tracking-tight"
        >
          Regulatorische und wissenschaftliche Einordnung
        </h2>

        {fachSections.map((section) => (
          <Fragment key={section.heading}>
            <h3 className="font-heading text-base font-medium leading-tight">
              {section.heading}
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              {section.body}
            </p>
          </Fragment>
        ))}
      </section>

      {/* Block 6 — Quellen */}
      <section aria-labelledby="quellen" className="flex flex-col gap-4">
        <h2
          id="quellen"
          className="font-heading text-2xl font-medium leading-tight tracking-tight"
        >
          Quellen
        </h2>
        <ol
          role="list"
          className="flex list-decimal flex-col gap-3 pl-5 text-sm leading-relaxed"
        >
          {sources.map((source) => (
            <li key={source.url} className="pl-1">
              <span>{source.text} </span>
              <a
                href={source.url}
                rel="noreferrer"
                className="text-primary break-all underline underline-offset-2 hover:text-foreground"
              >
                {source.url}
              </a>
            </li>
          ))}
        </ol>
      </section>

      {/* Block 7 — Footer */}
      <footer className="flex flex-col gap-5">
        <p className="bg-muted text-muted-foreground rounded-md p-5 text-xs leading-relaxed">
          Stand: Mai 2026. Diese Informationen dienen ausschließlich der
          allgemeinen Aufklärung und ersetzen keine ärztliche Untersuchung. Bei
          Hautveränderungen suchen Sie bitte eine dermatologische Praxis auf.
        </p>
        <Link
          href="/klassen"
          className={
            buttonVariants({ variant: "outline", size: "lg" }) +
            " group h-12 self-start px-6 text-sm"
          }
        >
          <ArrowLeft className="mr-1.5 h-4 w-4 transition-transform group-hover:-translate-x-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0" />
          Alle Klassen
        </Link>
      </footer>
    </main>
  );
}
