import { ClassPageLayout } from "@/components/ClassPageLayout";

export const metadata = {
  title: "Benigne Keratose (BKL) – KI-Demo (kein Medizinprodukt)",
  description:
    "Benigne Keratose, seborrhoische Keratose und Lentigo solaris (Altersfleck): Merkmale, Häufigkeit und regulatorische KI-Einordnung. Stand Mai 2026.",
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

const FACH_SECTIONS = [
  {
    heading: "Bedeutung für KI-Klassifikationssysteme",
    body: "BKL ist die klinisch und algorithmisch tückischste benigne Klasse im HAM10000-Datensatz: Pigmentierte seborrhoische Keratosen können mehrfarbige, asymmetrische und unscharf begrenzte Muster aufweisen, die einem Melanom ähneln — die ABCDE-Regel erzeugt hier systematisch False Positives. Studien an HAM10000 (u. a. mit ResNet-, Xception- und YOLO-Architekturen) zeigen für BKL durchgehend die niedrigsten Recall-Werte und eine hohe Confusion-Rate BKL ↔ MEL in beide Richtungen. Spezifität für BKL und Sensitivität für MEL stehen damit in direkter Konkurrenz — die Kalibrierung der Entscheidungsschwelle entscheidet, welche Fehlerart das System bevorzugt.",
  },
  {
    heading: "Regulatorische Einordnung",
    body: "Im Gesicht ist zudem die Differenzialdiagnose Lentigo solaris vs. Lentigo maligna (Frühform des LMM) klinisch schwierig — eine regulatorisch besonders sensible Verwechslung, weil ein Lentigo-maligna-Melanom als invasive Melanomvorstufe gilt. Diese Confounder gehören als Limitation in die Gebrauchsanweisung nach Art. 13 EU AI Act und in den Performance-Nachweis nach Annex XIV MDR. Im MDR-Kontext ist eine Klasse-IIa-Einstufung typisch (Information für Triage); im EU AI Act gelten die Hochrisiko-Pflichten nach Art. 6 Abs. 1 in Verbindung mit Anhang I (Geltung für Medizinprodukte ab 02.08.2027).",
  },
  {
    heading: "Limitationen dieses Demonstrators",
    body: "Diese Anwendung ist ein Compliance-Demonstrator ohne medizinische Zweckbestimmung und kein Medizinprodukt im Sinne der MDR. Wegen der hohen Verwechslungsrate BKL ↔ MEL sollte das Ergebnis auch bei Hinweis auf „benigne Keratose“ niemals als Entwarnung missverstanden werden — pigmentierte Läsionen mit asymmetrischer oder mehrfarbiger Erscheinung gehören in jedem Fall dermatoskopisch abgeklärt. Mit 11 % Anteil ist BKL im Trainingsdatensatz zwar nicht unterrepräsentiert, die hohe morphologische Variabilität (von klassischer Alterswarze bis zur Lichen-planus-like Keratose) erschwert dennoch eine zuverlässige Klassifikation auf einzelnen Subgruppen.",
  },
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
    <ClassPageLayout
      code="BKL"
      malignant={false}
      title="Benigne Keratose"
      lead={
        <>
          Unter benigner Keratose werden mehrere harmlose Hautwucherungen
          zusammengefasst — vor allem die seborrhoische Keratose
          („Alterswarze“) und die Lentigo solaris („Altersfleck“). Beides sind
          gutartige Veränderungen ohne Bezug zu Hautkrebs.
        </>
      }
      keyPoints={KEY_POINTS}
      wannZumArzt={
        <>
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
        </>
      }
      wasIstHeading="Was ist eine benigne Keratose?"
      wasIstBody={
        <>
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
        </>
      }
      riskFactors={RISK_FACTORS}
      merkmaleHeading="Woran erkennt man eine benigne Keratose?"
      features={TYPICAL_FEATURES}
      figure={
        <svg
          viewBox="0 0 320 180"
          role="img"
          aria-label="Schematische Darstellung einer seborrhoischen Keratose: eine scharf begrenzte, deutlich erhabene und wie aufgeklebt wirkende dunkelbraune Läsion mit wachsartig glänzender, leicht zerklüfteter Oberfläche und mottenfraßartigen Rändern."
          className="w-full max-w-md"
        >
          <g aria-hidden="true">
            {/* Schatten unter Läsion — „aufgeklebt“-Eindruck */}
            <ellipse cx="160" cy="138" rx="58" ry="5" fill="#000" opacity="0.1" />
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
      }
      figureCaption="Schematische Darstellung — kein echtes Patientenbild."
      fachSections={FACH_SECTIONS}
      sources={SOURCES}
    />
  );
}
