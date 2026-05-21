import Link from "next/link";
import {
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

export const metadata = {
  title: "Dermatofibrom (DF) – AI Melanom Check",
  description:
    "Dermatofibrom (Histiozytom): Merkmale, Dimple Sign (Fitzpatrick-Zeichen), Häufigkeit, Risikofaktoren und regulatorische KI-Einordnung. Stand Mai 2026.",
  alternates: { canonical: "/klassen/df" },
};

const KEY_POINTS = [
  "Dermatofibrome sind gutartige, auffallend derbe Knoten im Bindegewebe der Haut — sie entstehen oft als reaktive Narbenbildung nach kleinen Verletzungen wie Insektenstichen.",
  "Das „Dimple Sign“ (Fitzpatrick-Zeichen) — beim seitlichen Zusammendrücken der Haut sinkt das Dermatofibrom grübchenartig ein — ist sehr typisch, lässt sich aber nur durch Tasten prüfen.",
  "Frauen sind deutlich häufiger betroffen als Männer, der Häufigkeitsgipfel liegt zwischen dem 20. und 45. Lebensjahr — bevorzugt an den unteren Extremitäten, vor allem am Schienbein.",
] as const;

const TYPICAL_FEATURES = [
  {
    label: "Auffallend derbe Konsistenz",
    text: "Wie eine kleine Pastille im Hautniveau tastbar — dieses Merkmal ist der wichtigste Hinweis und nur durch Berührung prüfbar.",
  },
  {
    label: "Größe und Form",
    text: "Meist 0,3 bis 1,5 cm, scharf begrenzt, rund-oval.",
  },
  {
    label: "Farbe",
    text: "Hellbraun, rötlich-braun bis dunkelbraun; durch eingelagertes Eisen (Hämosiderin) gelegentlich fast schwarz.",
  },
  {
    label: "„Dimple Sign“ (Fitzpatrick-Zeichen)",
    text: "Beim seitlichen Zusammendrücken der Haut sinkt das Dermatofibrom grübchenartig ein, während Muttermale sich vorwölben — sehr typisch, lässt sich aber in einem Foto nicht prüfen.",
  },
  {
    label: "Dermatoskopisch",
    text: "Zentrale weiße, narbenartige Zone mit feinem peripherem Pigmentnetz.",
  },
] as const;

const RISK_FACTORS = [
  "Weibliches Geschlecht (deutlich häufiger betroffen als Männer)",
  "Junges bis mittleres Erwachsenenalter (Gipfel zwischen 20 und 45 Jahren)",
  "Reaktive Entstehung nach kleinen Hautverletzungen (Insektenstiche, Dornenstiche)",
  "Lokalisation an unteren Extremitäten (vor allem Schienbein)",
  "Bei multiplen Dermatofibromen (> 15) mögliche Assoziation mit Autoimmunerkrankungen wie systemischem Lupus erythematodes",
  "Immunsuppression",
] as const;

const SOURCES = [
  {
    text: "Robins, P. (o. D.). Dermatofibrom. MSD Manual Profi-Ausgabe.",
    url: "https://www.msdmanuals.com/de/profi/erkrankungen-der-haut/gutartige-hauttumoren-wucherungen-und-malformationen/dermatofibrom",
  },
  {
    text: "Altmeyer, P. (o. D.). Dermatofibrom. Enzyklopädie Dermatologie.",
    url: "https://www.altmeyers.org/de/dermatologie/dermatofibrom-1893",
  },
  {
    text: "Zaballos, P., Puig, S., Llambrich, A., & Malvehy, J. (2008). Dermoscopy of dermatofibromas: A prospective morphological study of 412 cases. Archives of Dermatology, 144(1), 75–83.",
    url: "https://doi.org/10.1001/archderm.144.1.75",
  },
] as const;

export default function DermatofibromClassPage() {
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
          <li className="text-foreground">Dermatofibrom</li>
        </ol>
      </nav>

      <header className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <code className="text-muted-foreground font-mono text-xs uppercase tracking-[0.22em]">
            DF
          </code>
          <span className="bg-emerald-500/10 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300 rounded-full px-2.5 py-0.5 text-[11px] uppercase tracking-wider">
            benigne
          </span>
        </div>
        <h1 className="font-heading text-balance text-4xl font-medium leading-tight tracking-tight sm:text-5xl">
          Dermatofibrom
        </h1>
        <p className="text-foreground text-lg leading-relaxed">
          Das Dermatofibrom — auch Histiozytom oder „Fibroma durum“ — ist ein
          gutartiger, auffallend derber Knoten im Bindegewebe der Haut, der
          häufig als reaktive Narbenbildung nach kleinen Verletzungen
          entsteht.
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
            <strong className="font-semibold">raschem Wachstum</strong>,
            Größen über 1 bis 2 cm, Schmerzen, Blutung oder Ulzeration sollte
            eine dermatologische Abklärung erfolgen — insbesondere zur
            Abgrenzung vom seltenen, aber bösartigen Dermatofibrosarcoma
            protuberans (DFSP).
          </p>
          <p className="text-sm leading-relaxed">
            Auch ungewöhnliche Lokalisationen (z. B. im Gesicht) und
            Unsicherheit bei der Abgrenzung zu pigmentierten Läsionen
            rechtfertigen eine ärztliche Kontrolle.
          </p>
        </aside>
      </section>

      {/* Block 3 — Was ist das? */}
      <section aria-labelledby="was-ist" className="flex flex-col gap-5">
        <h2
          id="was-ist"
          className="font-heading text-2xl font-medium leading-tight tracking-tight sm:text-3xl"
        >
          Was ist ein Dermatofibrom?
        </h2>
        <p className="leading-relaxed">
          Das Dermatofibrom — auch Histiozytom oder „Fibroma durum“ — ist ein{" "}
          <strong className="font-semibold">
            gutartiger Knoten im Bindegewebe der Haut
          </strong>
          . Es entsteht häufig als reaktive Narbenbildung nach kleinen
          Verletzungen wie Insektenstichen oder Dornenstichen und ist
          medizinisch harmlos. Wegen seiner manchmal dunklen Pigmentierung
          kann es jedoch optisch mit einem Muttermal oder einem Melanom
          verwechselt werden — der entscheidende Tastbefund ist daher zentral.
        </p>

        <h3 className="font-heading text-lg font-medium leading-tight">
          Häufigkeit in Deutschland
        </h3>
        <p className="leading-relaxed">
          Dermatofibrome sind in der dermatologischen Praxis sehr häufig;{" "}
          <strong className="font-semibold">
            Frauen sind deutlich häufiger betroffen als Männer
          </strong>
          , der Häufigkeitsgipfel liegt zwischen dem 20. und 45. Lebensjahr.
          Die bevorzugte Lokalisation sind die unteren Extremitäten, vor allem
          das Schienbein. Multiple Dermatofibrome (mehr als 15) können mit
          Autoimmunerkrankungen wie systemischem Lupus erythematodes oder
          einer Immunsuppression einhergehen.
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
          Woran erkennt man ein Dermatofibrom?
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
              aria-label="Schematische Darstellung eines Dermatofibroms: ein kleiner scharf begrenzter, rund-ovaler dunkelbrauner Knoten mit zentraler heller narbenartiger Zone und einem feinen peripheren Pigmentnetz. Die charakteristische derbe Konsistenz lässt sich nur durch Tasten prüfen."
              className="w-full max-w-md"
            >
              <g aria-hidden="true">
                {/* leicht aufgeworfener Knoten */}
                <circle cx="160" cy="92" r="42" fill="#7c4f2a" />
                <circle cx="160" cy="90" r="38" fill="#8e5e34" />
                {/* zentrale weiße Narbenzone */}
                <ellipse
                  cx="160"
                  cy="88"
                  rx="16"
                  ry="12"
                  fill="#e0caaa"
                  opacity="0.9"
                />
                {/* feines peripheres Pigmentnetz */}
                <g fill="#4f3219" opacity="0.65">
                  <circle cx="138" cy="78" r="1.5" />
                  <circle cx="182" cy="78" r="1.5" />
                  <circle cx="146" cy="108" r="1.5" />
                  <circle cx="176" cy="108" r="1.5" />
                  <circle cx="132" cy="95" r="1.5" />
                  <circle cx="188" cy="95" r="1.5" />
                  <circle cx="152" cy="74" r="1.2" />
                  <circle cx="168" cy="74" r="1.2" />
                  <circle cx="140" cy="116" r="1.2" />
                  <circle cx="180" cy="116" r="1.2" />
                </g>
                {/* feine Außenlinie für scharfe Begrenzung */}
                <circle
                  cx="160"
                  cy="92"
                  r="42"
                  fill="none"
                  stroke="#3a1f10"
                  strokeWidth="0.6"
                  opacity="0.4"
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
                derb (tastbar) · scharf begrenzt · zentrale Narbenzone
              </text>
            </svg>
          </div>
          <figcaption className="text-muted-foreground text-xs italic">
            Schematische Darstellung — kein echtes Patientenbild. Das
            entscheidende „Dimple Sign“ ist haptisch und in keinem Bild
            erkennbar.
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
          DF stellt mit nur 115 Bildern (1,1 %) im HAM10000-Datensatz die
          kleinste Klasse dar; daraus resultieren breite Konfidenzintervalle
          der DF-spezifischen Performance-Metriken, die nach
          Art. 15 EU AI Act (Robustness) explizit per Bootstrap oder
          Kreuzvalidierung zu quantifizieren sind. Eine ausschließliche
          Modellierung auf HAM10000 erfüllt die Anforderungen an
          Repräsentativität und Datenqualität nach Art. 10 EU AI Act für DF
          kaum — externe Datasets (z. B. BCN20000, MSK-Dermoscopy) oder eine
          explizite Einschränkung der Zweckbestimmung sind regulatorisch
          nahezu zwingend.
        </p>

        <h3 className="font-heading text-base font-medium leading-tight">
          Regulatorische Einordnung
        </h3>
        <p className="text-muted-foreground leading-relaxed">
          Hinzu kommt eine strukturelle Modell-Limitation: Das diagnostisch
          entscheidende „Dimple Sign“ ist haptisch, nicht visuell, und
          prinzipiell nicht aus einem Standbild ableitbar; diese Einschränkung
          gehört in die Gebrauchsanweisung nach Art. 13 EU AI Act und sollte
          einen verpflichtenden Hinweis „bei knotigen, derben Läsionen den
          Tasttest selbst durchführen oder ärztlich prüfen lassen“ auslösen.
          Eine Triage-KI für DF fällt unter MDR-Klasse IIa
          (Triage-Information); im EU AI Act gelten die Hochrisiko-Pflichten
          nach Art. 6 Abs. 1 in Verbindung mit Anhang I (Geltung für
          Medizinprodukte ab 02.08.2027).
        </p>

        <h3 className="font-heading text-base font-medium leading-tight">
          Limitationen dieses Demonstrators
        </h3>
        <p className="text-muted-foreground leading-relaxed">
          Diese Anwendung ist ein Compliance-Demonstrator ohne medizinische
          Zweckbestimmung und kein Medizinprodukt im Sinne der MDR. Die DF-
          Erkennung ist aufgrund der sehr kleinen Trainingsdatenmenge
          systematisch unsicher; bei knotigen, derben Läsionen — insbesondere
          an den unteren Extremitäten — sollte der einfache Tasttest („Dimple
          Sign“) immer manuell durchgeführt werden. Bei raschem Wachstum
          gehört eine Läsion zur Ausschlussdiagnose eines Dermatofibrosarcoma
          protuberans (DFSP) ärztlich begutachtet.
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
