import Link from "next/link";
import {
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

export const metadata = {
  title: "Malignes Melanom (MEL) – Melanom.Check",
  description:
    "Malignes Melanom (schwarzer Hautkrebs): typische Merkmale, ABCDE-Regel, Häufigkeit in Deutschland, Risikofaktoren und regulatorische Einordnung für KI-Klassifikation. Stand Mai 2026, Quellen AWMF, RKI, DKFZ.",
  alternates: { canonical: "/klassen/mel" },
};

const KEY_POINTS = [
  "Das Melanom ist die gefährlichste Form von Hautkrebs, weil es schon früh über Lymph- und Blutbahnen streuen kann.",
  "Bei früher Erkennung sind die Heilungschancen sehr gut — das 5-Jahres-Überleben liegt im Frühstadium bei nahezu 99 %.",
  "Die ABCDE-Regel und das Ugly-Duckling-Zeichen helfen beim Selbstcheck, ersetzen aber keine ärztliche Untersuchung.",
] as const;

const TYPICAL_FEATURES = [
  {
    label: "Farbe",
    text: "Mehrfarbig (Polychromasie) — schwarz, dunkel- und hellbraun, rot, weiß oder grau-blau in einem einzigen Fleck.",
  },
  {
    label: "Form und Begrenzung",
    text: "Asymmetrisch, mit unscharfen, ausgefransten oder gezackten Rändern; verwaschener Übergang zur normalen Haut.",
  },
  {
    label: "Größe",
    text: "Häufig über 6 mm Durchmesser; frühe Melanome können jedoch auch kleiner sein.",
  },
  {
    label: "Oberfläche",
    text: "Zunächst flach, später uneben, knotig, manchmal nässend, blutend oder krustig.",
  },
  {
    label: "Sonderform",
    text: "Das amelanotische Melanom ist pigmentarm oder rötlich und besonders schwer zu erkennen.",
  },
] as const;

const RISK_FACTORS = [
  "Heller Hauttyp (Fitzpatrick I–II)",
  "Wiederholte Sonnenbrände in Kindheit und Jugend",
  "Mehr als 50 Muttermale",
  "Familiäre Häufung von Melanomen",
  "Immunsuppression (z. B. nach Organtransplantation)",
  "Solariennutzung",
] as const;

const ABCDE = [
  {
    letter: "A",
    name: "Asymmetrie",
    text: "Das Mal ist nicht rund oder oval; eine gedachte Mittellinie ergibt zwei ungleiche Hälften.",
  },
  {
    letter: "B",
    name: "Begrenzung",
    text: "Ränder wirken unscharf, ausgefranst, gezackt oder verwaschen.",
  },
  {
    letter: "C",
    name: "Colorit (Farbe)",
    text: "Mehrfarbigkeit, ungleichmäßige Pigmentierung, schwarze, weiße oder rote Anteile.",
  },
  {
    letter: "D",
    name: "Durchmesser",
    text: "Klassisch ab etwa 6 mm verdächtig; frühe Melanome können kleiner sein.",
  },
  {
    letter: "E",
    name: "Entwicklung",
    text: "Veränderung in Größe, Form, Farbe, Erhabenheit oder neue Symptome (Juckreiz, Blutung) über Wochen bis Monate.",
  },
] as const;

const SOURCES = [
  {
    text: 'Leitlinienprogramm Onkologie (Deutsche Krebsgesellschaft, Deutsche Krebshilfe, AWMF). (2020). S3-Leitlinie Diagnostik, Therapie und Nachsorge des Melanoms (Version 3.3, AWMF-Registernummer 032/024OL).',
    url: "https://www.leitlinienprogramm-onkologie.de/leitlinien/melanom/",
  },
  {
    text: "Robert Koch-Institut & Zentrum für Krebsregisterdaten. (2026). Krebs in Deutschland 2021/2022, Berichtsjahr 2023 (Stand 04.03.2026).",
    url: "https://www.krebsdaten.de/",
  },
  {
    text: "Deutsches Krebsforschungszentrum, Krebsinformationsdienst. (o. D.). Hautkrebs.",
    url: "https://www.krebsinformationsdienst.de/tumorarten/hautkrebs/",
  },
  {
    text: "Leitlinienprogramm Onkologie (Deutsche Krebsgesellschaft, Deutsche Krebshilfe, AWMF). (2021). S3-Leitlinie Prävention von Hautkrebs (Version 2.1, AWMF-Registernummer 032-052OL).",
    url: "https://www.leitlinienprogramm-onkologie.de/leitlinien/hautkrebspraevention/",
  },
] as const;

export default function MelanomaClassPage() {
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
          <li className="text-foreground">Malignes Melanom</li>
        </ol>
      </nav>

      <header className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <code className="text-muted-foreground font-mono text-xs uppercase tracking-[0.22em]">
            MEL
          </code>
          <span className="bg-destructive/10 text-destructive rounded-full px-2.5 py-0.5 text-[11px] uppercase tracking-wider">
            maligne
          </span>
        </div>
        <h1 className="font-heading text-balance text-4xl font-medium leading-tight tracking-tight sm:text-5xl">
          Malignes Melanom
        </h1>
        <p className="text-foreground text-lg leading-relaxed">
          Das maligne Melanom ist eine bösartige Wucherung der Melanozyten — der
          pigmentbildenden Zellen der Haut. Umgangssprachlich auch „schwarzer
          Hautkrebs“ genannt.
        </p>
        <p className="text-muted-foreground text-xs">
          Stand: Mai 2026 · Quellen: AWMF, RKI, DKFZ
        </p>
      </header>

      {/* Block 2 — Das müssen Sie wissen (stärkste Gewichtung) */}
      <section
        aria-labelledby="kernpunkte"
        className="bg-destructive/5 border-destructive/70 -mx-2 flex flex-col gap-6 rounded-lg border-l-4 px-6 py-7 sm:-mx-4 sm:px-8"
      >
        <h2
          id="kernpunkte"
          className="font-heading text-2xl font-medium leading-tight tracking-tight sm:text-3xl"
        >
          Das müssen Sie wissen
        </h2>
        <ul className="flex flex-col gap-3" role="list">
          {KEY_POINTS.map((point) => (
            <li key={point} className="flex items-start gap-3">
              <CheckCircle2
                aria-hidden="true"
                className="text-destructive mt-0.5 h-5 w-5 shrink-0"
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
          <p className="text-sm leading-relaxed">
            Bei jeder neuen pigmentierten Hautstelle nach dem 30. Lebensjahr,
            bei Veränderungen eines bestehenden Muttermals (Größe, Farbe, Form,
            Erhabenheit), bei Blutung, Nässen, Juckreiz oder beim{" "}
            <strong className="font-semibold">Ugly-Duckling-Zeichen</strong>{" "}
            sollte zeitnah eine dermatologische Abklärung erfolgen.
          </p>
          <p className="text-sm leading-relaxed">
            Das gesetzliche Hautkrebs-Screening ab 35 Jahren ist alle zwei Jahre
            eine Kassenleistung der gesetzlichen Krankenversicherung.
          </p>
        </aside>
      </section>

      {/* Block 3 — Was ist das? */}
      <section
        aria-labelledby="was-ist"
        className="flex flex-col gap-5"
      >
        <h2
          id="was-ist"
          className="font-heading text-2xl font-medium leading-tight tracking-tight sm:text-3xl"
        >
          Was ist ein malignes Melanom?
        </h2>
        <p className="leading-relaxed">
          Das maligne Melanom ist eine bösartige Wucherung der{" "}
          <strong className="font-semibold">Melanozyten</strong> — das sind die
          pigmentbildenden Zellen der Haut. Es gilt als die gefährlichste Form
          von Hautkrebs, weil es bereits bei geringer Tumordicke über Lymph-
          und Blutbahnen in andere Organe streuen kann. Bei früher Erkennung
          sind die Heilungschancen jedoch sehr gut.
        </p>

        <h3 className="font-heading text-lg font-medium leading-tight">
          Häufigkeit in Deutschland
        </h3>
        <p className="leading-relaxed">
          In Deutschland erkranken jährlich rund{" "}
          <strong className="font-semibold">27.400 Menschen</strong> neu an
          einem Melanom (Berichtsjahr 2023, RKI). Es ist die vierthäufigste
          Krebserkrankung und verursacht jährlich etwa 3.170 Todesfälle. Das
          mediane Erkrankungsalter liegt bei 64 Jahren (Frauen) bzw. 69 Jahren
          (Männer).
        </p>
        <p className="leading-relaxed">
          Das relative 5-Jahres-Überleben beträgt insgesamt 94–96 %, ist aber
          stark stadienabhängig: im Stadium I nahezu 99 %, im Stadium IV unter
          35 %.
        </p>

        <h3 className="font-heading text-lg font-medium leading-tight">
          Risikofaktoren
        </h3>
        <ul className="flex flex-col gap-2" role="list">
          {RISK_FACTORS.map((factor) => (
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
      <section
        aria-labelledby="merkmale"
        className="flex flex-col gap-5"
      >
        <h2
          id="merkmale"
          className="font-heading text-2xl font-medium leading-tight tracking-tight sm:text-3xl"
        >
          Woran erkennt man ein malignes Melanom?
        </h2>

        <ul className="flex flex-col gap-3" role="list">
          {TYPICAL_FEATURES.map((feature) => (
            <li key={feature.label} className="leading-relaxed">
              <strong className="font-semibold">{feature.label}:</strong>{" "}
              <span>{feature.text}</span>
            </li>
          ))}
        </ul>

        <h3 className="font-heading mt-2 text-lg font-medium leading-tight">
          ABCDE-Regel für die Selbstbeobachtung
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Diese Faustregel hilft Laien bei der Selbstbeobachtung — sie ersetzt
          jedoch keine ärztliche Untersuchung. Ab zwei zutreffenden Kriterien
          wird eine ärztliche Abklärung empfohlen.
        </p>
        <dl className="border-border/60 grid grid-cols-1 gap-x-6 gap-y-3 rounded-md border bg-card/50 p-5 sm:grid-cols-[max-content_max-content_1fr]">
          {ABCDE.map((rule) => (
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

        <figure className="mt-4 flex flex-col gap-3">
          <div className="border-border/60 bg-card flex justify-center rounded-md border p-6">
            <svg
              viewBox="0 0 320 180"
              role="img"
              aria-label="Schematische Gegenüberstellung: links ein symmetrisches, einfarbiges Muttermal mit scharfer runder Begrenzung; rechts eine asymmetrische, mehrfarbige Läsion mit ausgefransten Rändern und unregelmäßig verteilten dunklen Bereichen — typisches Muster eines malignen Melanoms."
              className="w-full max-w-md"
            >
              {/* benigner Nävus zur Referenz */}
              <g aria-hidden="true" transform="translate(70 90)">
                <circle r="40" fill="#a07a55" />
                <circle
                  r="40"
                  fill="none"
                  stroke="#3a2818"
                  strokeWidth="0.5"
                  strokeDasharray="2 3"
                  opacity="0.35"
                />
              </g>
              <text
                x="70"
                y="160"
                textAnchor="middle"
                fontSize="11"
                fill="currentColor"
                opacity="0.6"
              >
                symmetrisch · einfarbig
              </text>

              {/* Melanom-Muster: asymmetrisch, ausgefranst, mehrfarbig */}
              <g aria-hidden="true" transform="translate(230 90)">
                <path
                  d="M -42,-4 Q -48,-26 -24,-34 Q -2,-42 20,-32 Q 42,-22 40,-2 Q 46,20 30,32 Q 14,42 -10,34 Q -32,32 -40,14 Z"
                  fill="#150a05"
                />
                <ellipse cx="-16" cy="-12" rx="11" ry="9" fill="#5a3220" />
                <ellipse cx="16" cy="6" rx="12" ry="8" fill="#7a4628" />
                <ellipse
                  cx="-4"
                  cy="22"
                  rx="7"
                  ry="5"
                  fill="#a86a3c"
                  opacity="0.85"
                />
                <circle cx="-26" cy="14" r="3.5" fill="#2a1408" />
                <circle cx="6" cy="-22" r="2.5" fill="#3a1f10" />
              </g>
              <text
                x="230"
                y="160"
                textAnchor="middle"
                fontSize="11"
                fill="currentColor"
                opacity="0.6"
              >
                asymmetrisch · mehrfarbig · unscharf
              </text>
            </svg>
          </div>
          <figcaption className="text-muted-foreground text-xs italic">
            Schematische Darstellung — kein echtes Patientenbild.
          </figcaption>
        </figure>
      </section>

      {/* Block 5 — Fachpublikum (reduzierte visuelle Gewichtung) */}
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

        <h3 className="font-heading text-base font-medium leading-tight">
          Bedeutung für KI-Klassifikationssysteme
        </h3>
        <p className="text-muted-foreground leading-relaxed">
          Das Melanom stellt die regulatorisch kritischste Klasse eines
          dermatoskopischen Klassifikators dar. Ein falsch-negatives Ergebnis
          (MEL → NV oder MEL → BKL) führt potenziell zum Tod, weshalb die
          Sensitivität (Recall) Vorrang vor der Spezifität hat. Publizierte
          Referenzwerte zugelassener Produkte liegen bei ≥ 90 % Sensitivität —
          DermaSensor erreicht 96 %, SkinVision 95 %. In einem Multi-Class-
          Setting begründet dies eine asymmetrische Kostenfunktion (Class
          Weighting, Focal Loss) und ein klassenspezifisches Threshold-Tuning
          zu Lasten der Spezifität für NV und BKL.
        </p>

        <h3 className="font-heading text-base font-medium leading-tight">
          Regulatorische Einordnung
        </h3>
        <p className="text-muted-foreground leading-relaxed">
          Im MDR-Kontext ist nach Anhang VIII Regel 11 eine Einstufung als
          Klasse IIa typisch (Triage-Information); bei Outputs, die direkt zu
          Therapieentscheidungen führen, ist Klasse IIb argumentierbar
          („schwerwiegende Verschlechterung des Gesundheitszustands“). Im EU
          AI Act gilt eine solche KI als Hochrisikosystem nach Art. 6 Abs. 1 in
          Verbindung mit Anhang I — die Geltung für Medizinprodukte beginnt am
          02.08.2027. Daraus folgen Pflichten zu Risikomanagement (Art. 9),
          Daten-Governance (Art. 10), Transparenz (Art. 13) und Genauigkeit/
          Robustheit (Art. 15). Im FDA-Kontext entspricht die Indikation einer
          IMDRF-SaMD-Kategorie III („drives clinical management / critical
          condition“).
        </p>

        <h3 className="font-heading text-base font-medium leading-tight">
          Limitationen dieses Demonstrators
        </h3>
        <p className="text-muted-foreground leading-relaxed">
          Diese Anwendung ist ein Compliance-Demonstrator ohne medizinische
          Zweckbestimmung und kein Medizinprodukt im Sinne der MDR. Sie ist
          weder CE-zertifiziert noch klinisch validiert. Das zugrundeliegende
          Modell wurde auf HAM10000 trainiert — einem Datensatz mit Über-
          repräsentation heller Hauttypen (Fitzpatrick I–III) und einer
          NV-Klasse von 67 %. Für reale Triage-Anwendungen wäre nach Art. 15
          AI Act Balanced Accuracy bzw. Macro-F1 statt reiner Accuracy zu
          berichten, eine externe Validierung auf repräsentativen Real-World-
          Daten erforderlich und der Output ausschließlich als
          Entscheidungsunterstützung für qualifiziertes medizinisches Personal
          zulässig.
        </p>
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
          {SOURCES.map((source) => (
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
