import Link from "next/link";
import {
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

export const metadata = {
  title: "Benigne Keratose (BKL) – Melanom.Check",
  description:
    "Benigne Keratose, seborrhoische Keratose („Alterswarze“) und Lentigo solaris („Altersfleck“): typische Merkmale, Häufigkeit, Risikofaktoren und regulatorische Einordnung für KI-Klassifikation. Stand Mai 2026, Quellen AWMF, RKI, DKFZ.",
  alternates: { canonical: "/klassen/bkl" },
};

const KEY_POINTS = [
  "BKL ist der häufigste gutartige Hauttumor überhaupt — fast jeder Mensch entwickelt im Laufe des Lebens mindestens eine seborrhoische Keratose, meist ab dem 50. Lebensjahr.",
  "Gutartige Veränderungen ohne Bezug zu Hautkrebs — weder ansteckend noch Vorstufen einer bösartigen Erkrankung; sie können aber kosmetisch stören.",
  "Werden in der Bildklassifikation häufig mit einem Melanom verwechselt — bei plötzlicher Veränderung oder dunkler unregelmäßiger Pigmentierung lieber ärztlich abklären lassen.",
] as const;

const TYPICAL_FEATURES = [
  {
    label: "„Wie aufgeklebt“ wirkend",
    text: "Die Läsion sitzt deutlich erhaben auf der Hautoberfläche — Dermatologen sprechen vom „stuck-on appearance“.",
  },
  {
    label: "Oberfläche",
    text: "Wachsartig glänzend, warzenartig, leicht zerklüftet, manchmal samtartig.",
  },
  {
    label: "Farbe",
    text: "Hellbraun bis dunkelbraun, gelegentlich fast schwarz (pigmentierte seborrhoische Keratose).",
  },
  {
    label: "Begrenzung",
    text: "Scharf, häufig mit „mottenfraßartigen“ Rändern.",
  },
  {
    label: "Dermatoskopisch",
    text: "Pseudohornzysten (kleine eingeschlossene Hornkügelchen) und pseudofollikuläre Öffnungen sind typische Merkmale — ein Hautarzt erkennt sie mit dem Dermatoskop.",
  },
] as const;

const RISK_FACTORS = [
  "Höheres Alter (Häufung ab dem 50. Lebensjahr)",
  "Genetische Veranlagung (familiäre Häufung von seborrhoischen Keratosen)",
  "Chronische UV-Exposition (insbesondere für Lentigo solaris)",
  "Heller Hauttyp (Fitzpatrick I–II)",
  "Hellhäutige Personen über 40 Jahre auf sonnenexponierten Arealen — fast universell betroffen",
] as const;

const SOURCES = [
  {
    text: "Barthelmann, S., Mayer, A., Butsch, F., & Schopf, R. E. (2023). Seborrhoische Keratosen. Journal der Deutschen Dermatologischen Gesellschaft, 21(3), 265–278.",
    url: "https://doi.org/10.1111/ddg.15003_g",
  },
  {
    text: "Deutsches Krebsforschungszentrum, Krebsinformationsdienst. (o. D.). Hautkrebs.",
    url: "https://www.krebsinformationsdienst.de/tumorarten/hautkrebs/",
  },
  {
    text: "Altmeyer, P. (o. D.). Lentigo solaris. Enzyklopädie Dermatologie.",
    url: "https://www.altmeyers.org/de/dermatologie/lentigo-solaris-3625",
  },
  {
    text: "Tschandl, P., Rosendahl, C., & Kittler, H. (2018). The HAM10000 dataset, a large collection of multi-source dermatoscopic images of common pigmented skin lesions. Scientific Data, 5, 180161.",
    url: "https://doi.org/10.1038/sdata.2018.161",
  },
] as const;

export default function BenigneKeratoseClassPage() {
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
          <li className="text-foreground">Benigne Keratose</li>
        </ol>
      </nav>

      <header className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <code className="text-muted-foreground font-mono text-xs uppercase tracking-[0.22em]">
            BKL
          </code>
          <span className="bg-emerald-500/10 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300 rounded-full px-2.5 py-0.5 text-[11px] uppercase tracking-wider">
            benigne
          </span>
        </div>
        <h1 className="font-heading text-balance text-4xl font-medium leading-tight tracking-tight sm:text-5xl">
          Benigne Keratose
        </h1>
        <p className="text-foreground text-lg leading-relaxed">
          Unter benigner Keratose werden mehrere harmlose Hautwucherungen
          zusammengefasst — vor allem die seborrhoische Keratose
          („Alterswarze“) und die Lentigo solaris („Altersfleck“). Beides sind
          gutartige Veränderungen ohne Bezug zu Hautkrebs.
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
            Auch wenn es sich um harmlose Veränderungen handelt, sollte ein
            Arzt aufgesucht werden bei{" "}
            <strong className="font-semibold">plötzlicher Veränderung</strong>{" "}
            in Größe, Form oder Farbe, bei Juckreiz, Blutung oder
            Krustenbildung sowie bei sehr dunklen oder unregelmäßigen
            Läsionen — insbesondere zur Abgrenzung von einem Melanom oder
            einer Lentigo maligna.
          </p>
          <p className="text-sm leading-relaxed">
            Das eruptive Auftreten vieler juckender seborrhoischer Keratosen
            (Leser-Trélat-Zeichen) kann selten auf eine innere
            Tumorerkrankung hinweisen und gehört ärztlich abgeklärt.
          </p>
        </aside>
      </section>

      {/* Block 3 — Was ist das? */}
      <section aria-labelledby="was-ist" className="flex flex-col gap-5">
        <h2
          id="was-ist"
          className="font-heading text-2xl font-medium leading-tight tracking-tight sm:text-3xl"
        >
          Was ist eine benigne Keratose?
        </h2>
        <p className="leading-relaxed">
          Unter benigner Keratose werden im HAM10000-Datensatz mehrere
          harmlose Hautwucherungen zusammengefasst — vor allem die{" "}
          <strong className="font-semibold">seborrhoische Keratose</strong>{" "}
          („Alterswarze“) und die{" "}
          <strong className="font-semibold">Lentigo solaris</strong>{" "}
          („Altersfleck“). Beides sind gutartige Veränderungen ohne Bezug zu
          Hautkrebs — sie sind weder ansteckend noch Vorstufen einer
          bösartigen Erkrankung, können aber kosmetisch stören und werden in
          der Bildklassifikation häufig mit einem Melanom verwechselt.
        </p>

        <h3 className="font-heading text-lg font-medium leading-tight">
          Häufigkeit in Deutschland
        </h3>
        <p className="leading-relaxed">
          Seborrhoische Keratosen sind der{" "}
          <strong className="font-semibold">
            häufigste gutartige Hauttumor
          </strong>{" "}
          überhaupt. Fast jeder Mensch entwickelt im Laufe des Lebens
          mindestens eine, meist ab dem 50. Lebensjahr; bei vielen Älteren
          treten sie multipel bis hundertfach auf, bevorzugt am Rumpf, im
          Gesicht und am Hals. Lentigines solares betreffen praktisch alle
          hellhäutigen Menschen über 40 Jahre auf sonnenexponierten Arealen
          (Handrücken, Gesicht, Dekolleté). Beide Geschlechter sind gleich
          häufig betroffen.
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
          Woran erkennt man eine benigne Keratose?
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
              aria-label="Schematische Darstellung einer seborrhoischen Keratose: eine scharf begrenzte, deutlich erhabene und wie aufgeklebt wirkende dunkelbraune Läsion mit wachsartig glänzender, leicht zerklüfteter Oberfläche und mottenfraßartigen Rändern."
              className="w-full max-w-md"
            >
              <g aria-hidden="true">
                {/* Schatten unter Läsion — „aufgeklebt“-Eindruck */}
                <ellipse
                  cx="160"
                  cy="138"
                  rx="58"
                  ry="5"
                  fill="#000"
                  opacity="0.1"
                />
                {/* äußere Kontur (scharf, leicht mottenfraßartig) */}
                <path
                  d="M 108,58 Q 116,50 132,48 Q 146,42 162,46 Q 178,44 196,50 Q 214,54 216,72 Q 222,90 212,106 Q 200,124 180,130 Q 162,134 142,128 Q 122,126 112,108 Q 102,94 106,76 Z"
                  fill="#7a4c28"
                />
                {/* wachsartiger Körper */}
                <path
                  d="M 114,64 Q 122,56 134,54 Q 148,50 164,54 Q 180,52 192,57 Q 208,62 208,77 Q 214,90 204,103 Q 192,118 174,122 Q 156,127 142,120 Q 124,118 116,103 Q 108,92 112,80 Z"
                  fill="#a87648"
                />
                {/* Pseudohornzysten/Texturpunkte */}
                <g fill="#3a2208" opacity="0.75">
                  <circle cx="134" cy="74" r="2" />
                  <circle cx="150" cy="68" r="1.6" />
                  <circle cx="166" cy="80" r="2.2" />
                  <circle cx="182" cy="72" r="1.6" />
                  <circle cx="143" cy="92" r="2" />
                  <circle cx="172" cy="98" r="1.5" />
                  <circle cx="156" cy="100" r="1.8" />
                  <circle cx="188" cy="92" r="1.5" />
                  <circle cx="125" cy="88" r="1.5" />
                  <circle cx="200" cy="84" r="1.4" />
                </g>
                {/* Hauchsaum für scharfe Begrenzung */}
                <path
                  d="M 108,58 Q 116,50 132,48 Q 146,42 162,46 Q 178,44 196,50 Q 214,54 216,72 Q 222,90 212,106 Q 200,124 180,130 Q 162,134 142,128 Q 122,126 112,108 Q 102,94 106,76 Z"
                  fill="none"
                  stroke="#3a1f0a"
                  strokeWidth="0.7"
                  opacity="0.45"
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
                „wie aufgeklebt“ · wachsartig · scharf begrenzt
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
          BKL ist die klinisch und algorithmisch tückischste benigne Klasse im
          HAM10000-Datensatz: Pigmentierte seborrhoische Keratosen können
          mehrfarbige, asymmetrische und unscharf begrenzte Muster aufweisen,
          die einem Melanom ähneln — die ABCDE-Regel erzeugt hier systematisch
          False Positives. Studien an HAM10000 (u. a. mit ResNet-, Xception-
          und YOLO-Architekturen) zeigen für BKL durchgehend die niedrigsten
          Recall-Werte und eine hohe Confusion-Rate BKL ↔ MEL in beide
          Richtungen. Spezifität für BKL und Sensitivität für MEL stehen damit
          in direkter Konkurrenz — die Kalibrierung der Entscheidungsschwelle
          entscheidet, welche Fehlerart das System bevorzugt.
        </p>

        <h3 className="font-heading text-base font-medium leading-tight">
          Regulatorische Einordnung
        </h3>
        <p className="text-muted-foreground leading-relaxed">
          Im Gesicht ist zudem die Differenzialdiagnose Lentigo solaris vs.
          Lentigo maligna (Frühform des LMM) klinisch schwierig — eine
          regulatorisch besonders sensible Verwechslung, weil ein Lentigo-
          maligna-Melanom als invasive Melanomvorstufe gilt. Diese Confounder
          gehören als Limitation in die Gebrauchsanweisung nach Art. 13 EU AI
          Act und in den Performance-Nachweis nach Annex XIV MDR. Im
          MDR-Kontext ist eine Klasse-IIa-Einstufung typisch (Information für
          Triage); im EU AI Act gelten die Hochrisiko-Pflichten nach
          Art. 6 Abs. 1 in Verbindung mit Anhang I (Geltung für
          Medizinprodukte ab 02.08.2027).
        </p>

        <h3 className="font-heading text-base font-medium leading-tight">
          Limitationen dieses Demonstrators
        </h3>
        <p className="text-muted-foreground leading-relaxed">
          Diese Anwendung ist ein Compliance-Demonstrator ohne medizinische
          Zweckbestimmung und kein Medizinprodukt im Sinne der MDR. Wegen der
          hohen Verwechslungsrate BKL ↔ MEL sollte das Ergebnis auch bei
          Hinweis auf „benigne Keratose“ niemals als Entwarnung missverstanden
          werden — pigmentierte Läsionen mit asymmetrischer oder mehrfarbiger
          Erscheinung gehören in jedem Fall dermatoskopisch abgeklärt. Mit
          11 % Anteil ist BKL im Trainingsdatensatz zwar nicht
          unterrepräsentiert, die hohe morphologische Variabilität (von
          klassischer Alterswarze bis zur Lichen-planus-like Keratose)
          erschwert dennoch eine zuverlässige Klassifikation auf einzelnen
          Subgruppen.
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
