import Link from "next/link";
import {
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

export const metadata = {
  title: "Vaskuläre Läsion (VASC) – Melanom.Check",
  description:
    "Vaskuläre Läsionen — Hämangiome, Kirschangiome, Angiokeratome und pyogene Granulome: typische Merkmale, Glasspateltest, Häufigkeit und regulatorische Einordnung für KI-Klassifikation. Stand Mai 2026, Quellen AWMF, RKI, DKFZ.",
  alternates: { canonical: "/klassen/vasc" },
};

const KEY_POINTS = [
  "Vaskuläre Läsionen sind gutartige Veränderungen der Blutgefäße — Kirschangiome („Rubinflecken“) haben über die Hälfte der über 60-Jährigen, oft multipel.",
  "Der Glasspateltest hilft beim Selbstcheck: Unter Druck mit einem durchsichtigen Gegenstand entleert sich das Blutgefäß und die rote Farbe blasst sichtbar ab — Pigment lässt sich nicht wegdrücken.",
  "Thrombosierte Hämangiome können dunkelblau bis schwarz werden und einem Melanom ähneln — im Zweifelsfall immer ärztlich abklären lassen.",
] as const;

const TYPICAL_FEATURES = [
  {
    label: "Farbe",
    text: "Hellrot, kirschrot, dunkelrot oder violett — bei Thrombosierung schwarz-blau und damit melanomähnlich.",
  },
  {
    label: "Form und Begrenzung",
    text: "Scharf begrenzte, runde oder ovale Papeln oder Flecken.",
  },
  {
    label: "Wegdrückbarkeit (Glasspateltest)",
    text: "Bei Druck mit einem durchsichtigen Gegenstand entleert sich das Blutgefäß und die rote Farbe blasst sichtbar ab — ein klassisches Unterscheidungsmerkmal zu pigmentierten Läsionen. Bei thrombosierten Läsionen funktioniert der Test allerdings nicht.",
  },
  {
    label: "Dermatoskopisch",
    text: "Scharf abgegrenzte rote oder dunkle „Lakunen“ (Blutgefäßräume).",
  },
  {
    label: "Pyogenes Granulom",
    text: "Schnell wachsender, leicht blutender roter Knoten, oft nach kleinen Verletzungen oder in der Schwangerschaft („Schwangerschaftstumor“).",
  },
] as const;

const RISK_FACTORS = [
  "Höheres Alter (Kirschangiome ab 30. Lebensjahr, im Alter nahezu universell)",
  "Genetische Disposition für multiple Kirschangiome",
  "Frühgeburtlichkeit (infantile Hämangiome bei unter 1.000 g deutlich häufiger)",
  "Schwangerschaft (gehäuftes Auftreten pyogener Granulome)",
  "Mechanische Reizung oder kleine Hautverletzungen (Pyogenes Granulom)",
  "Hohes Lebensalter (Angiokeratome an Skrotum oder Vulva)",
] as const;

const SOURCES = [
  {
    text: "Deutsche Gesellschaft für Kinderchirurgie & beteiligte Fachgesellschaften. (2020). S2k-Leitlinie Infantile Hämangiome im Säuglings- und Kindesalter (AWMF-Registernummer 006-100).",
    url: "https://register.awmf.org/de/leitlinien/detail/006-100",
  },
  {
    text: "Institut für Qualität und Wirtschaftlichkeit im Gesundheitswesen (IQWiG). (o. D.). Hämangiom (Blutschwamm). gesundheitsinformation.de.",
    url: "https://www.gesundheitsinformation.de/haemangiom-blutschwamm.html",
  },
  {
    text: "Altmeyer, P. (o. D.). Angiom seniles (Kirschangiom). Enzyklopädie Dermatologie.",
    url: "https://www.altmeyers.org/de/dermatologie/angiom-seniles-1310",
  },
  {
    text: "DocCheck Medical Services. (o. D.). Rubinfleck. DocCheck Flexikon.",
    url: "https://flexikon.doccheck.com/de/Rubinfleck",
  },
] as const;

export default function VaskulaereLaesionClassPage() {
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
          <li className="text-foreground">Vaskuläre Läsion</li>
        </ol>
      </nav>

      <header className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <code className="text-muted-foreground font-mono text-xs uppercase tracking-[0.22em]">
            VASC
          </code>
          <span className="bg-emerald-500/10 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300 rounded-full px-2.5 py-0.5 text-[11px] uppercase tracking-wider">
            benigne
          </span>
        </div>
        <h1 className="font-heading text-balance text-4xl font-medium leading-tight tracking-tight sm:text-5xl">
          Vaskuläre Läsion
        </h1>
        <p className="text-foreground text-lg leading-relaxed">
          Vaskuläre Läsionen sind gutartige Veränderungen der Blutgefäße in
          der Haut — dazu zählen Hämangiome („Blutschwämmchen“), Kirschangiome
          („Rubinflecken“), Angiokeratome und pyogene Granulome.
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
              plötzlich neu auftretenden, schnell wachsenden
            </strong>{" "}
            oder dunkel werdenden Läsionen, bei wiederholten Blutungen und bei
            Unsicherheit zur Abgrenzung von einem Melanom sollte eine
            ärztliche Abklärung erfolgen.
          </p>
          <p className="text-sm leading-relaxed">
            Bei Säuglingen sind komplizierte Hämangiome an Auge, Nase, Lippe,
            Anogenitalbereich oder Atemwegen umgehend kinderärztlich oder
            dermatologisch zu beurteilen (siehe AWMF-Leitlinie 006-100).
          </p>
        </aside>
      </section>

      {/* Block 3 — Was ist das? */}
      <section aria-labelledby="was-ist" className="flex flex-col gap-5">
        <h2
          id="was-ist"
          className="font-heading text-2xl font-medium leading-tight tracking-tight sm:text-3xl"
        >
          Was ist eine vaskuläre Läsion?
        </h2>
        <p className="leading-relaxed">
          Vaskuläre Läsionen sind{" "}
          <strong className="font-semibold">
            gutartige Veränderungen der Blutgefäße
          </strong>{" "}
          in der Haut. Dazu zählen Hämangiome („Blutschwämmchen“),
          Kirschangiome („Rubinflecken“, auch „senile Hämangiome“),
          Angiokeratome und pyogene Granulome. In der Regel sind sie harmlos.
          Optisch fallen sie durch ihre rote bis violette Färbung auf — bei
          einer Verstopfung des Gefäßes (Thrombosierung) können sie jedoch
          dunkelblau bis schwarz werden und einem Melanom ähneln.
        </p>

        <h3 className="font-heading text-lg font-medium leading-tight">
          Häufigkeit in Deutschland
        </h3>
        <p className="leading-relaxed">
          Kirschangiome treten ab dem 30. Lebensjahr auf und sind im höheren
          Alter nahezu universell —{" "}
          <strong className="font-semibold">
            über die Hälfte der über 60-Jährigen
          </strong>{" "}
          hat mindestens ein Kirschangiom, bei sehr alten Menschen finden sie
          sich praktisch immer. Infantile Hämangiome kommen bei etwa 4 %
          aller Neugeborenen vor (bei Frühgeborenen unter 1.000 g deutlich
          häufiger) und bilden sich in 85 % der Fälle bis zur Pubertät spontan
          zurück. Pyogene Granulome entstehen am häufigsten zwischen dem
          20. und 50. Lebensjahr und auch in der Schwangerschaft
          („Schwangerschaftstumor“).
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
      <section aria-labelledby="merkmale" className="flex flex-col gap-5">
        <h2
          id="merkmale"
          className="font-heading text-2xl font-medium leading-tight tracking-tight sm:text-3xl"
        >
          Woran erkennt man eine vaskuläre Läsion?
        </h2>

        <ul className="flex flex-col gap-3" role="list">
          {TYPICAL_FEATURES.map((feature) => (
            <li key={feature.label} className="leading-relaxed">
              <strong className="font-semibold">{feature.label}:</strong>{" "}
              <span>{feature.text}</span>
            </li>
          ))}
        </ul>

        <figure className="mt-4 flex flex-col gap-3">
          <div className="border-border/60 bg-card flex justify-center rounded-md border p-6">
            <svg
              viewBox="0 0 320 180"
              role="img"
              aria-label="Schematische Darstellung einer vaskulären Läsion: eine kleine scharf begrenzte rote bis violette runde Papel mit dermatoskopisch sichtbaren dunkelroten Lakunen, die mit Blut gefüllte Gefäßräume andeuten — typisch für ein Kirschangiom oder Hämangiom."
              className="w-full max-w-md"
            >
              <g aria-hidden="true">
                {/* äußerer Körper */}
                <circle cx="160" cy="92" r="40" fill="#9c1530" />
                {/* innere hellere Zone */}
                <circle cx="158" cy="88" r="34" fill="#c52844" />
                {/* Lakunen (Blutgefäßräume) */}
                <ellipse cx="146" cy="80" rx="6" ry="4" fill="#5a061a" />
                <ellipse cx="172" cy="78" rx="5" ry="3.5" fill="#5a061a" />
                <ellipse cx="154" cy="100" rx="6" ry="4" fill="#5a061a" />
                <ellipse cx="174" cy="102" rx="5" ry="3.5" fill="#5a061a" />
                <ellipse cx="160" cy="90" rx="3" ry="2" fill="#4a0214" />
                {/* feine Außenlinie */}
                <circle
                  cx="160"
                  cy="92"
                  r="40"
                  fill="none"
                  stroke="#5a061a"
                  strokeWidth="0.6"
                  opacity="0.5"
                />
                {/* Glanzpunkt (Reflex) */}
                <ellipse
                  cx="148"
                  cy="74"
                  rx="6"
                  ry="3"
                  fill="#ffffff"
                  opacity="0.2"
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
                rot bis violett · scharf begrenzt · wegdrückbar
              </text>
            </svg>
          </div>
          <figcaption className="text-muted-foreground text-xs italic">
            Schematische Darstellung — kein echtes Patientenbild. Der
            Glasspateltest ist in keinem Bild prüfbar.
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
          VASC ist mit 142 Bildern (1,4 %) eine unterrepräsentierte Klasse —
          die für DF beschriebenen Imbalance-Probleme gelten analog (Art. 10
          und Art. 15 EU AI Act). Klinisch entscheidend ist die Subgruppe
          thrombosierter Hämangiome: Diese erscheinen dunkel bis schwarz,
          asymmetrisch und scharf begrenzt — also mit Merkmalen, die einem
          nodulären Melanom sehr ähneln; in der dermatologischen Literatur
          sind Fallberichte dokumentiert, in denen solche Läsionen unter
          Melanomverdacht exzidiert wurden. Eine klinische Validierung muss
          thrombosierte VASC explizit als Subgruppe abdecken, sonst entsteht
          ein Out-of-Distribution-Risiko, das nach Art. 9 EU AI Act im
          Risikomanagement zu adressieren ist.
        </p>

        <h3 className="font-heading text-base font-medium leading-tight">
          Regulatorische Einordnung
        </h3>
        <p className="text-muted-foreground leading-relaxed">
          Wie beim Dermatofibrom ist auch hier ein zentrales
          Differenzialmerkmal — der Glasspateltest — bildbasiert nicht
          prüfbar; die Modellkarte muss diese Limitation transparent
          ausweisen und Nutzer auf die manuelle Prüfung verweisen. Eine
          Triage-KI für VASC fällt unter MDR-Klasse IIa (Information für
          Triage); im EU AI Act gelten die Hochrisiko-Pflichten nach
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
          geringen Klassengröße sind VASC-Vorhersagen mit weiten
          Konfidenzintervallen behaftet. Besonders kritisch ist die Subgruppe
          thrombosierter Hämangiome — bei jeder dunklen, schwarz oder
          blau-violett erscheinenden Läsion gilt: Glasspateltest manuell
          durchführen oder dermatologisch abklären lassen, bevor das
          KI-Ergebnis als „gutartig“ interpretiert wird.
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
