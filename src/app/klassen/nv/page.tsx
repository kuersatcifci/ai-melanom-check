import Link from "next/link";
import {
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

export const metadata = {
  title: "Melanozytärer Nävus (NV) – Melanom.Check",
  description:
    "Melanozytärer Nävus (Muttermal, Leberfleck): typische Merkmale, ABCDE-Regel zur Selbstbeobachtung, Häufigkeit, Risikofaktoren und regulatorische Einordnung für KI-Klassifikation. Stand Mai 2026, Quellen AWMF, RKI, DKFZ.",
  alternates: { canonical: "/klassen/nv" },
};

const KEY_POINTS = [
  "Muttermale sind extrem häufig, in der Regel harmlos und bedürfen keiner Behandlung — fast jeder hellhäutige Erwachsene hat zwischen 20 und 40 Muttermalen.",
  "Regelmäßige Selbstbeobachtung nach der ABCDE-Regel und dem Ugly-Duckling-Zeichen ist wichtig — in seltenen Fällen kann ein Melanom aus einem bestehenden Nävus entstehen.",
  "Bei mehr als 50 Muttermalen oder mehreren atypischen Nävi ist das Melanomrisiko erhöht — dann sind engmaschigere dermatologische Kontrollen sinnvoll.",
] as const;

const TYPICAL_FEATURES = [
  {
    label: "Form und Begrenzung",
    text: "Symmetrische, rund-ovale Form mit scharfer, gleichmäßiger Begrenzung.",
  },
  {
    label: "Färbung",
    text: "Gleichmäßige Farbe, von hautfarben über hell- bis dunkelbraun, in der gesamten Läsion einheitlich.",
  },
  {
    label: "Durchmesser",
    text: "Meist unter 6 mm, stabil über Monate bis Jahre.",
  },
  {
    label: "Erhabenheit",
    text: "Flach (Junktionsnävus) oder leicht erhaben (Compound- oder dermaler Nävus).",
  },
  {
    label: "Atypische / dysplastische Nävi",
    text: "Sonderform mit unregelmäßiger Pigmentierung oder Form — gutartig, aber Risikomarker für ein Melanom.",
  },
] as const;

const RISK_FACTORS = [
  "Heller Hauttyp (Fitzpatrick I–II)",
  "Intensive UV-Exposition in Kindheit und Jugend",
  "Genetische Veranlagung (familiäre Häufung)",
  "Mehr als 50 Muttermale oder ≥ 5 atypische Nävi",
  "FAMMM-Syndrom (familiäre atypische multiple Muttermale und Melanome)",
  "Immunsuppression",
] as const;

const ABCDE = [
  {
    letter: "A",
    name: "Asymmetrie",
    text: "Ungleichmäßige Form, keine kreisrunde oder ovale Symmetrie.",
  },
  {
    letter: "B",
    name: "Begrenzung",
    text: "Unscharfe, gezackte oder ausgefranste Ränder.",
  },
  {
    letter: "C",
    name: "Colorit",
    text: "Mehrere Farbtöne oder ungleichmäßige Pigmentierung.",
  },
  {
    letter: "D",
    name: "Durchmesser",
    text: "Über 6 mm gilt als verdächtig — kleinere Melanome sind jedoch möglich.",
  },
  {
    letter: "E",
    name: "Entwicklung",
    text: "Jede Veränderung in Größe, Form, Farbe oder Symptomen über Wochen und Monate hinweg.",
  },
] as const;

const SOURCES = [
  {
    text: "Leitlinienprogramm Onkologie (Deutsche Krebsgesellschaft, Deutsche Krebshilfe, AWMF). (2020). S3-Leitlinie Diagnostik, Therapie und Nachsorge des Melanoms (Version 3.3, AWMF-Registernummer 032/024OL).",
    url: "https://www.leitlinienprogramm-onkologie.de/leitlinien/melanom/",
  },
  {
    text: "Frischhut, N., Zelger, B., Nguyen, V. A., Tappeiner, G., Schmuth, M., & Zelger, B. (2022). Das Spektrum melanozytärer Nävi. Journal der Deutschen Dermatologischen Gesellschaft, 20(4), 433–451.",
    url: "https://doi.org/10.1111/ddg.14709_g",
  },
  {
    text: "Deutsches Krebsforschungszentrum, Krebsinformationsdienst. (o. D.). Hautkrebs vorbeugen.",
    url: "https://www.krebsinformationsdienst.de/vorbeugung/risiken/hautkrebs.php",
  },
  {
    text: "The Skin Cancer Foundation. (o. D.). Atypical moles.",
    url: "https://www.skincancer.org/skin-cancer-information/atypical-moles/",
  },
] as const;

export default function NaevusClassPage() {
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
          <li className="text-foreground">Melanozytärer Nävus</li>
        </ol>
      </nav>

      <header className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <code className="text-muted-foreground font-mono text-xs uppercase tracking-[0.22em]">
            NV
          </code>
          <span className="bg-emerald-500/10 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300 rounded-full px-2.5 py-0.5 text-[11px] uppercase tracking-wider">
            benigne
          </span>
        </div>
        <h1 className="font-heading text-balance text-4xl font-medium leading-tight tracking-tight sm:text-5xl">
          Melanozytärer Nävus
        </h1>
        <p className="text-foreground text-lg leading-relaxed">
          Ein melanozytärer Nävus — umgangssprachlich „Muttermal“ oder
          „Leberfleck“ — ist eine gutartige Ansammlung pigmentbildender Zellen
          (Melanozyten) in der Haut.
        </p>
        <p className="text-muted-foreground text-xs">
          Stand: Mai 2026 · Quellen: AWMF, RKI, DKFZ
        </p>
      </header>

      {/* Block 2 — Das müssen Sie wissen */}
      <section
        aria-labelledby="kernpunkte"
        className="bg-muted/60 border-emerald-500/50 dark:border-emerald-600/50 -mx-2 flex flex-col gap-6 rounded-lg border-l-4 px-6 py-7 sm:-mx-4 sm:px-8"
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
                className="text-emerald-600 dark:text-emerald-400 mt-0.5 h-5 w-5 shrink-0"
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
            Bei{" "}
            <strong className="font-semibold">
              neu auftretenden Muttermalen nach dem 30. Lebensjahr
            </strong>
            , bei Veränderungen nach der ABCDE-Regel, beim Ugly-Duckling-Zeichen
            oder bei Symptomen wie Juckreiz, Blutung oder Krustenbildung sollte
            eine dermatologische Kontrolle erfolgen.
          </p>
          <p className="text-sm leading-relaxed">
            Personen mit vielen oder atypischen Muttermalen sollten zusätzlich
            zum gesetzlichen Hautkrebs-Screening (ab 35 Jahren, alle zwei Jahre)
            regelmäßig kontrolliert werden.
          </p>
        </aside>
      </section>

      {/* Block 3 — Was ist das? */}
      <section aria-labelledby="was-ist" className="flex flex-col gap-5">
        <h2
          id="was-ist"
          className="font-heading text-2xl font-medium leading-tight tracking-tight sm:text-3xl"
        >
          Was ist ein melanozytärer Nävus?
        </h2>
        <p className="leading-relaxed">
          Ein melanozytärer Nävus ist eine{" "}
          <strong className="font-semibold">
            gutartige Ansammlung pigmentbildender Zellen
          </strong>{" "}
          (Melanozyten) in der Haut. Muttermale sind extrem häufig, in der
          Regel harmlos und bedürfen keiner Behandlung. Wichtig ist jedoch die
          regelmäßige Selbstbeobachtung auf Veränderungen, da das Melanom in
          seltenen Fällen aus einem bestehenden Nävus entstehen kann.
        </p>

        <h3 className="font-heading text-lg font-medium leading-tight">
          Häufigkeit in Deutschland
        </h3>
        <p className="leading-relaxed">
          Praktisch jeder hellhäutige Erwachsene hat Muttermale; die
          durchschnittliche Anzahl liegt bei{" "}
          <strong className="font-semibold">20 bis 40</strong>, das Maximum wird
          zwischen dem 20. und 30. Lebensjahr erreicht. Anzahl und Verteilung
          hängen von Hauttyp, genetischer Veranlagung und UV-Exposition in
          Kindheit und Jugend ab. Bei mehr als 50 Muttermalen oder mehreren
          atypischen Nävi ist das Melanomrisiko erhöht — bei ≥ 5 atypischen
          Nävi etwa 6-fach.
        </p>

        <h3 className="font-heading text-lg font-medium leading-tight">
          Risikofaktoren (für viele oder atypische Nävi)
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
      <section aria-labelledby="merkmale" className="flex flex-col gap-5">
        <h2
          id="merkmale"
          className="font-heading text-2xl font-medium leading-tight tracking-tight sm:text-3xl"
        >
          Woran erkennt man einen gutartigen Nävus?
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
          Die ABCDE-Regel ist das wichtigste Instrument zur Selbstbeobachtung
          von Muttermalen — sie ersetzt jedoch keine ärztliche Untersuchung.
          Die Regel deckt vor allem das oberflächlich spreitende Melanom ab
          und versagt typischerweise bei schnell wachsenden, knotigen oder
          amelanotischen Melanomen — ergänzend ist das Ugly-Duckling-Zeichen
          sinnvoll.
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
              aria-label="Schematische Darstellung eines gutartigen melanozytären Nävus: eine symmetrische, rund-ovale Form mit scharfer gleichmäßiger Begrenzung und einheitlich hellbrauner Pigmentierung — typisch für ein harmloses Muttermal."
              className="w-full max-w-md"
            >
              <g aria-hidden="true">
                {/* benigner Nävus: symmetrisch, scharfe Begrenzung */}
                <circle cx="160" cy="90" r="46" fill="#9a6948" />
                {/* sanfte einheitliche Innenstruktur */}
                <circle
                  cx="158"
                  cy="88"
                  r="38"
                  fill="#a87657"
                  opacity="0.7"
                />
                {/* Hauchsaum (Andeutung gleichmäßiger Begrenzung) */}
                <circle
                  cx="160"
                  cy="90"
                  r="46"
                  fill="none"
                  stroke="#5a3a22"
                  strokeWidth="0.7"
                  opacity="0.35"
                />
              </g>
              <text
                x="160"
                y="160"
                textAnchor="middle"
                fontSize="11"
                fill="currentColor"
                opacity="0.6"
              >
                symmetrisch · scharfe Begrenzung · einheitliche Farbe
              </text>
            </svg>
          </div>
          <figcaption className="text-muted-foreground text-xs italic">
            Schematische Darstellung — kein echtes Patientenbild.
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

        <h3 className="font-heading text-base font-medium leading-tight">
          Bedeutung für KI-Klassifikationssysteme
        </h3>
        <p className="text-muted-foreground leading-relaxed">
          NV ist mit 67 % Anteil im HAM10000-Datensatz die mit Abstand
          häufigste Klasse — die resultierende Imbalance (Ratio NV:DF ≈ 58:1)
          bewirkt, dass Accuracy als alleinige Metrik die Modellgüte
          systematisch überschätzt. Nach Art. 15 EU AI Act ist daher Balanced
          Accuracy oder Macro-F1 verpflichtend zu berichten. Die Verwechslung
          MEL → NV ist die regulatorisch gravierendste False-Negative-
          Konstellation (Mortalitätsrisiko), während die Verwechslung NV → MEL
          als False-Positive zu unnötigen Exzisionen und psychischer Belastung
          führt (Number Needed to Excise als ökonomischer Endpunkt).
        </p>

        <h3 className="font-heading text-base font-medium leading-tight">
          Regulatorische Einordnung
        </h3>
        <p className="text-muted-foreground leading-relaxed">
          Für ein Triage-Tool wird das Decision-Threshold typischerweise
          zugunsten der MEL-Sensitivität verschoben, mit dokumentiertem
          Verlust an NV-Spezifität — diese Trade-off-Begründung gehört in die
          technische Dokumentation nach Anhang IV AI Act und in die klinische
          Bewertung nach Art. 61 in Verbindung mit Annex XIV MDR. Im
          MDR-Kontext bleibt eine Klasse-IIa-Einstufung typisch (Information
          für Triage); im EU AI Act gelten dieselben Hochrisiko-Pflichten nach
          Art. 6 Abs. 1 in Verbindung mit Anhang I (Geltung für
          Medizinprodukte ab 02.08.2027): Risikomanagement (Art. 9),
          Daten-Governance (Art. 10), Transparenz (Art. 13) und Genauigkeit/
          Robustheit (Art. 15).
        </p>

        <h3 className="font-heading text-base font-medium leading-tight">
          Limitationen dieses Demonstrators
        </h3>
        <p className="text-muted-foreground leading-relaxed">
          Diese Anwendung ist ein Compliance-Demonstrator ohne medizinische
          Zweckbestimmung und kein Medizinprodukt im Sinne der MDR. Wegen der
          NV-Dominanz im Trainingsdatensatz neigt das Modell zu einer
          systematischen Über-Klassifikation als NV — eine Eigenschaft, die
          insbesondere bei der Differenzialdiagnose zu frühen Melanomen
          gefährlich werden kann. Die ABCDE-Regel deckt zudem schnell
          wachsende, knotige oder amelanotische Melanome systematisch nicht
          ab; das Ugly-Duckling-Zeichen ist hier ergänzend wichtig und sollte
          in jedem Patienten-Workflow als zweite Heuristik berücksichtigt
          werden.
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
