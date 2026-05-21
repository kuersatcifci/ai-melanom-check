import Link from "next/link";
import { AlertTriangle, ArrowRight, CheckCircle2, Info } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const metadata = {
  title: "Muttermale verstehen – AI Melanom Check",
  description:
    "Wann ist ein Muttermal gefährlich? ABCDE-Regel, Selbstuntersuchung und wann zum Hautarzt. Stand Mai 2026.",
  alternates: { canonical: "/muttermal" },
};

const NORMAL_SIGNS = [
  "Gleichmäßige, runde oder ovale Form",
  "Einheitliche Farbe von hellbraun bis dunkelbraun",
  "Klare, scharfe Begrenzung zur normalen Haut",
  "Stabil über Monate und Jahre",
  "Kleiner als 6 mm Durchmesser",
  "Keine Beschwerden wie Juckreiz oder Blutung",
] as const;

type AbcdeRule = {
  letter: "A" | "B" | "C" | "D" | "E";
  name: string;
  text: string;
  svg: React.ReactNode;
  ariaLabel: string;
};

const ABCDE: AbcdeRule[] = [
  {
    letter: "A",
    name: "Asymmetrie",
    text: "Eine gedachte Mittellinie ergibt zwei ungleiche Hälften.",
    ariaLabel:
      "Schematische Darstellung der Asymmetrie: ein unregelmäßig geformtes Mal mit einer gestrichelten Mittellinie, die zwei ungleiche Hälften erzeugt.",
    svg: (
      <svg viewBox="0 0 100 100" aria-hidden="true" className="h-full w-full">
        <path
          d="M 30,30 Q 22,40 28,55 Q 30,72 50,72 Q 70,75 76,58 Q 80,42 68,32 Q 55,22 42,28 Z"
          fill="#7a4828"
        />
        <line
          x1="50"
          y1="15"
          x2="50"
          y2="85"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="3 3"
          opacity="0.55"
        />
      </svg>
    ),
  },
  {
    letter: "B",
    name: "Begrenzung",
    text: "Ränder sind unscharf, gezackt oder verwaschen.",
    ariaLabel:
      "Schematische Darstellung der unscharfen Begrenzung: ein Mal mit ausgefransten, zackigen Rändern statt einer glatten Kontur.",
    svg: (
      <svg viewBox="0 0 100 100" aria-hidden="true" className="h-full w-full">
        <path
          d="M 50,20 L 56,24 L 62,22 L 66,28 L 74,30 L 72,38 L 78,42 L 74,50 L 80,55 L 74,62 L 78,70 L 70,72 L 66,80 L 58,76 L 50,82 L 42,76 L 34,80 L 30,72 L 22,70 L 26,62 L 20,55 L 26,50 L 22,42 L 28,38 L 26,30 L 34,28 L 38,22 L 44,24 Z"
          fill="#7a4828"
        />
      </svg>
    ),
  },
  {
    letter: "C",
    name: "Colorit",
    text: "Mehrere Farbtöne in einem Mal: schwarz, braun, rot, weiß oder grau-blau.",
    ariaLabel:
      "Schematische Darstellung mehrfarbiger Pigmentierung: ein Mal mit unterschiedlich gefärbten Bereichen in schwarz, braun und rötlich.",
    svg: (
      <svg viewBox="0 0 100 100" aria-hidden="true" className="h-full w-full">
        <circle cx="50" cy="50" r="32" fill="#5a3520" />
        <ellipse cx="42" cy="44" rx="10" ry="8" fill="#1a0e08" />
        <ellipse cx="60" cy="55" rx="11" ry="7" fill="#9a6240" />
        <ellipse cx="46" cy="62" rx="6" ry="4" fill="#b03020" opacity="0.85" />
      </svg>
    ),
  },
  {
    letter: "D",
    name: "Durchmesser",
    text: "Größer als 6 mm, etwa die Größe eines Radiergummis.",
    ariaLabel:
      "Schematische Größendarstellung: zwei Kreise im Vergleich, der kleinere zeigt unter sechs Millimeter, der größere darüber.",
    svg: (
      <svg viewBox="0 0 100 100" aria-hidden="true" className="h-full w-full">
        <circle cx="32" cy="62" r="12" fill="#9a6240" />
        <circle cx="68" cy="50" r="22" fill="#5a3520" />
        <text
          x="32"
          y="86"
          textAnchor="middle"
          fontSize="7"
          fill="currentColor"
          opacity="0.6"
        >
          &lt; 6 mm
        </text>
        <text
          x="68"
          y="86"
          textAnchor="middle"
          fontSize="7"
          fill="currentColor"
          opacity="0.6"
        >
          &gt; 6 mm
        </text>
      </svg>
    ),
  },
  {
    letter: "E",
    name: "Entwicklung",
    text: "Das Mal verändert sich in Größe, Form oder Farbe über Wochen oder Monate.",
    ariaLabel:
      "Schematische Zeitdarstellung: drei aufeinander folgende Mole-Symbole, die in Größe und Unregelmäßigkeit zunehmen, verbunden durch Pfeile.",
    svg: (
      <svg viewBox="0 0 120 100" aria-hidden="true" className="h-full w-full">
        <circle cx="22" cy="50" r="9" fill="#9a6240" />
        <circle cx="60" cy="50" r="13" fill="#7a4828" />
        <path
          d="M 88,38 Q 96,40 102,48 Q 108,58 100,66 Q 90,70 82,62 Q 78,52 82,44 Z"
          fill="#5a3520"
        />
        <path
          d="M 32,50 L 44,50 M 42,46 L 46,50 L 42,54"
          stroke="currentColor"
          strokeWidth="0.8"
          fill="none"
          opacity="0.6"
        />
        <path
          d="M 74,50 L 84,50 M 82,46 L 86,50 L 82,54"
          stroke="currentColor"
          strokeWidth="0.8"
          fill="none"
          opacity="0.6"
        />
        <text
          x="60"
          y="90"
          textAnchor="middle"
          fontSize="7"
          fill="currentColor"
          opacity="0.6"
        >
          Wochen bis Monate
        </text>
      </svg>
    ),
  },
];

const URGENT_SIGNS = [
  "Ein Muttermal verändert sich in Größe, Form oder Farbe",
  "Ein Muttermal blutet, näst oder bildet Krusten",
  "Ein Muttermal juckt oder schmerzt",
  "Ein neues Muttermal erscheint nach dem 30. Lebensjahr",
  "Ein Muttermal sieht deutlich anders aus als Ihre anderen Muttermale",
  "Sie sind unsicher oder haben ein ungutes Gefühl",
] as const;

const COMPARISON = [
  {
    label: "Form",
    normal: "Rund oder oval",
    suspect: "Asymmetrisch, unregelmäßig",
  },
  {
    label: "Begrenzung",
    normal: "Scharf, klar",
    suspect: "Unscharf, ausgefranst",
  },
  { label: "Farbe", normal: "Einheitlich", suspect: "Mehrfarbig" },
  {
    label: "Größe",
    normal: "Unter 6 mm",
    suspect: "Über 6 mm oder wachsend",
  },
  {
    label: "Veränderung",
    normal: "Stabil",
    suspect: "Verändert sich",
  },
] as const;

const SOURCES = [
  {
    text: "AWMF Leitlinienprogramm Onkologie. (2020). S3-Leitlinie Diagnostik, Therapie und Nachsorge des Melanoms (Version 3.3, AWMF-Registernummer 032/024OL).",
    url: "https://www.leitlinienprogramm-onkologie.de/leitlinien/melanom/",
  },
  {
    text: "Deutsches Krebsforschungszentrum, Krebsinformationsdienst. (2026). Hautkrebs: Melanom.",
    url: "https://www.krebsinformationsdienst.de/tumorarten/hautkrebs/",
  },
  {
    text: "Deutsche Krebsgesellschaft. (2026). Hautkrebs.",
    url: "https://www.krebsgesellschaft.de/hautkrebs.html",
  },
] as const;

export default function MuttermalPage() {
  return (
    <main className="mx-auto flex w-full max-w-4xl flex-col gap-12 px-6 py-16">
      {/* Block 1: Kopfbereich */}
      <header className="flex flex-col gap-4">
        <div className="text-primary flex items-center gap-3 text-xs uppercase tracking-[0.22em]">
          <span aria-hidden="true" className="bg-primary h-px w-8" />
          Hautgesundheit
        </div>
        <h1 className="font-heading text-balance text-4xl font-medium leading-tight tracking-tight sm:text-5xl">
          Muttermale verstehen
        </h1>
        <p className="text-foreground text-lg leading-relaxed">
          Die meisten Muttermale sind völlig harmlos. Aber wann sollte man
          einen Arzt aufsuchen? Diese Seite erklärt alles Wichtige,
          verständlich und medizinisch fundiert.
        </p>
        <p className="text-muted-foreground text-xs">
          Stand: Mai 2026 · Quellen: AWMF, DKFZ, Deutsche Krebsgesellschaft
        </p>
      </header>

      {/* Was ist ein Muttermal? */}
      <section
        aria-labelledby="was-ist"
        className="flex flex-col gap-4"
      >
        <h2
          id="was-ist"
          className="font-heading text-2xl font-medium leading-tight tracking-tight sm:text-3xl"
        >
          Was ist ein Muttermal?
        </h2>
        <p className="leading-relaxed">
          Ein Muttermal (medizinisch: melanozytärer Nävus) ist eine{" "}
          <strong className="font-semibold">
            gutartige Ansammlung von pigmentbildenden Zellen
          </strong>{" "}
          in der Haut. Muttermale sind extrem häufig: Jeder hellhäutige
          Erwachsene hat durchschnittlich 20 bis 40 Muttermale.
        </p>
        <p className="leading-relaxed">
          Sie sind in der Regel völlig harmlos und entstehen durch eine
          Anhäufung von Melanozyten, den Zellen, die der Haut ihre Farbe
          geben.
        </p>
      </section>

      {/* Normale Muttermale erkennen */}
      <section
        aria-labelledby="normal"
        className="flex flex-col gap-5"
      >
        <h2
          id="normal"
          className="font-heading text-2xl font-medium leading-tight tracking-tight sm:text-3xl"
        >
          Normale Muttermale erkennen
        </h2>
        <p className="leading-relaxed">
          Ein unauffälliges Muttermal hat typischerweise diese Merkmale:
        </p>
        <ul className="flex flex-col gap-3" role="list">
          {NORMAL_SIGNS.map((sign) => (
            <li key={sign} className="flex items-start gap-3">
              <CheckCircle2
                aria-hidden="true"
                className="text-emerald-600 dark:text-emerald-400 mt-0.5 h-5 w-5 shrink-0"
              />
              <span className="text-base leading-relaxed">{sign}</span>
            </li>
          ))}
        </ul>

        <figure className="mt-2 flex flex-col gap-3">
          <div className="border-border/60 bg-card flex justify-center rounded-md border p-6">
            <svg
              viewBox="0 0 200 100"
              role="img"
              aria-label="Schematische Darstellung eines normalen Muttermals: eine kleine, runde, einheitlich braun gefärbte Form mit scharfer Begrenzung."
              className="w-full max-w-xs"
            >
              <g aria-hidden="true">
                <circle cx="100" cy="48" r="28" fill="#9a6948" />
                <circle
                  cx="100"
                  cy="48"
                  r="28"
                  fill="none"
                  stroke="#3a2010"
                  strokeWidth="0.6"
                  opacity="0.45"
                />
              </g>
              <text
                x="100"
                y="92"
                textAnchor="middle"
                fontSize="9"
                fill="currentColor"
                opacity="0.6"
              >
                rund · einheitlich · scharf begrenzt
              </text>
            </svg>
          </div>
          <figcaption className="text-muted-foreground text-xs italic">
            Schematische Darstellung, kein echtes Patientenbild.
          </figcaption>
        </figure>
      </section>

      {/* ABCDE-Regel */}
      <section
        aria-labelledby="abcde"
        className="flex flex-col gap-5"
      >
        <h2
          id="abcde"
          className="font-heading text-2xl font-medium leading-tight tracking-tight sm:text-3xl"
        >
          Wann wird ein Muttermal verdächtig? Die ABCDE-Regel
        </h2>
        <p className="leading-relaxed">
          Die ABCDE-Regel ist das wichtigste Instrument zur Selbstbeobachtung.
          Wenn zwei oder mehr dieser Punkte zutreffen, sollten Sie einen
          Hautarzt aufsuchen.
        </p>

        <ol
          role="list"
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5"
        >
          {ABCDE.map((rule) => (
            <li
              key={rule.letter}
              className="border-border/60 bg-card flex flex-col gap-3 rounded-lg border p-4"
            >
              <div className="text-primary font-heading text-3xl font-medium leading-none">
                <span aria-hidden="true">{rule.letter}</span>
                <span className="sr-only">Buchstabe {rule.letter}:</span>
              </div>
              <div className="font-heading text-base font-medium leading-tight">
                {rule.name}
              </div>
              <figure className="flex flex-col">
                <div
                  role="img"
                  aria-label={rule.ariaLabel}
                  className="text-muted-foreground bg-muted/40 flex aspect-square w-full items-center justify-center rounded-md p-3"
                >
                  {rule.svg}
                </div>
                <figcaption className="sr-only">
                  Illustration zur ABCDE-Regel, Buchstabe {rule.letter}:{" "}
                  {rule.name}.
                </figcaption>
              </figure>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {rule.text}
              </p>
            </li>
          ))}
        </ol>

        <aside
          aria-label="Zusatzhinweis"
          className="border-primary/40 bg-primary/5 flex flex-col gap-2 rounded-md border-l-4 px-5 py-4"
        >
          <h3 className="font-heading flex items-center gap-2 text-base font-medium leading-tight">
            <Info aria-hidden="true" className="text-primary h-5 w-5 shrink-0" />
            Das Ugly-Duckling-Zeichen
          </h3>
          <p className="text-sm leading-relaxed">
            Ein Muttermal, das sich deutlich von allen anderen unterscheidet,
            ist verdächtig, auch wenn die ABCDE-Regel nicht erfüllt ist.
            Vertrauen Sie Ihrem Gefühl.
          </p>
        </aside>
      </section>

      {/* Wann unbedingt zum Hautarzt? */}
      <section
        aria-labelledby="zum-arzt"
        className="flex flex-col gap-5"
      >
        <h2
          id="zum-arzt"
          className="font-heading text-2xl font-medium leading-tight tracking-tight sm:text-3xl"
        >
          Wann unbedingt zum Hautarzt?
        </h2>

        <aside
          aria-label="Warnsignale"
          className="border-amber-400 bg-amber-50 text-amber-950 dark:border-amber-700 dark:bg-amber-950/40 dark:text-amber-100 flex flex-col gap-3 rounded-md border-l-4 px-5 py-4"
        >
          <h3 className="font-heading flex items-center gap-2 text-base font-medium leading-tight">
            <AlertTriangle aria-hidden="true" className="h-5 w-5 shrink-0" />
            Diese Anzeichen sollten Sie ernst nehmen
          </h3>
          <ul className="flex flex-col gap-2" role="list">
            {URGENT_SIGNS.map((sign) => (
              <li key={sign} className="flex items-start gap-2.5">
                <AlertTriangle
                  aria-hidden="true"
                  className="text-destructive mt-0.5 h-4 w-4 shrink-0"
                />
                <span className="text-sm leading-relaxed">{sign}</span>
              </li>
            ))}
          </ul>
        </aside>

        <div className="border-primary/40 bg-primary/5 rounded-md border-l-4 px-5 py-4">
          <h3 className="font-heading text-base font-medium leading-tight">
            Das gesetzliche Hautkrebs-Screening
          </h3>
          <p className="mt-2 text-sm leading-relaxed">
            Ab 35 Jahren haben gesetzlich Versicherte alle zwei Jahre Anspruch
            auf eine kostenlose Hautkrebsvorsorge beim Dermatologen oder beim
            qualifizierten Hausarzt.
          </p>
        </div>
      </section>

      {/* Wie viele Muttermale sind normal? */}
      <section
        aria-labelledby="wie-viele"
        className="flex flex-col gap-4"
      >
        <h2
          id="wie-viele"
          className="font-heading text-2xl font-medium leading-tight tracking-tight sm:text-3xl"
        >
          Wie viele Muttermale sind normal?
        </h2>
        <p className="leading-relaxed">
          Hellhäutige Erwachsene haben durchschnittlich{" "}
          <strong className="font-semibold">20 bis 40 Muttermale</strong>. Die
          Anzahl ist genetisch bedingt und hängt von UV-Exposition in Kindheit
          und Jugend ab. Als erhöhtes Risiko gilt: mehr als 50 Muttermale,
          mehrere atypische (unregelmäßige) Muttermale oder eine familiäre
          Häufung von Hautkrebs.
        </p>
      </section>

      {/* Unterschied Muttermal vs. Hautkrebs */}
      <section
        aria-labelledby="unterschied"
        className="flex flex-col gap-5"
      >
        <h2
          id="unterschied"
          className="font-heading text-2xl font-medium leading-tight tracking-tight sm:text-3xl"
        >
          Was ist der Unterschied zwischen einem Muttermal und Hautkrebs?
        </h2>
        <p className="leading-relaxed">
          Ein Muttermal ist eine gutartige Ansammlung von Pigmentzellen.
          Hautkrebs entsteht, wenn diese Zellen beginnen, unkontrolliert zu
          wachsen. Das passiert nicht plötzlich, sondern entwickelt sich meist
          über Monate bis Jahre. Deshalb ist regelmäßige Selbstbeobachtung so
          wichtig: Veränderungen früh zu erkennen kann Leben retten.
        </p>

        <div className="border-border/60 -mx-2 overflow-x-auto rounded-md border sm:-mx-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[28%]">Merkmal</TableHead>
                <TableHead className="w-[36%]">Normales Muttermal</TableHead>
                <TableHead className="w-[36%]">
                  Verdächtige Veränderung
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {COMPARISON.map((row) => (
                <TableRow key={row.label}>
                  <TableCell className="font-medium">{row.label}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {row.normal}
                  </TableCell>
                  <TableCell className="text-foreground">
                    {row.suspect}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>

      {/* Was kann die KI? */}
      <section
        aria-labelledby="ki"
        className="bg-muted/40 border-border/60 -mx-2 flex flex-col gap-5 rounded-lg border p-6 sm:-mx-4 sm:p-8"
      >
        <h2
          id="ki"
          className="font-heading text-2xl font-medium leading-tight tracking-tight sm:text-3xl"
        >
          Was kann die KI auf dieser Website?
        </h2>
        <p className="leading-relaxed">
          Die KI auf dieser Website wurde mit Bildern von Hautveränderungen
          trainiert, darunter auch viele Bilder von normalen Muttermalen. Sie
          kann helfen, Bildmuster zu erkennen, die bestimmten Kategorien
          ähneln.
        </p>
        <p className="leading-relaxed">
          <strong className="font-semibold">Aber:</strong> Die KI kann nicht
          beurteilen, ob ein Muttermal wirklich unauffällig ist. Sie ordnet
          jedes Bild einer von 7 Kategorien zu, auch wenn es ein völlig
          normales Muttermal ist. Nutzen Sie die KI-Demo als Lernwerkzeug,
          nicht als medizinisches Instrument.
        </p>
        <div>
          <Link
            href="/demo"
            className={
              buttonVariants({ variant: "default", size: "lg" }) +
              " group h-12 px-6 text-sm"
            }
          >
            Zur KI-Demo
            <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0" />
          </Link>
        </div>
      </section>

      {/* Quellen */}
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

      {/* Footer */}
      <footer>
        <p className="bg-muted text-muted-foreground rounded-md p-5 text-xs leading-relaxed">
          Stand: Mai 2026. Diese Informationen ersetzen keine ärztliche
          Untersuchung. Bei Unsicherheiten wenden Sie sich an eine
          dermatologische Praxis.
        </p>
      </footer>
    </main>
  );
}
