import { ClassPageLayout } from "@/components/ClassPageLayout";

export const metadata = {
  title: "Malignes Melanom (MEL) – KI-Demo (kein Medizinprodukt)",
  description:
    "Malignes Melanom (schwarzer Hautkrebs): Merkmale, ABCDE-Regel, Häufigkeit in Deutschland, Risikofaktoren und regulatorische KI-Einordnung. Stand Mai 2026.",
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

const FACH_SECTIONS = [
  {
    heading: "Bedeutung für KI-Klassifikationssysteme",
    body: "Das Melanom stellt die regulatorisch kritischste Klasse eines dermatoskopischen Klassifikators dar. Ein falsch-negatives Ergebnis (MEL → NV oder MEL → BKL) führt potenziell zum Tod, weshalb die Sensitivität (Recall) Vorrang vor der Spezifität hat. Publizierte Referenzwerte zugelassener Produkte liegen bei ≥ 90 % Sensitivität — DermaSensor erreicht 96 %, SkinVision 95 %. In einem Multi-Class-Setting begründet dies eine asymmetrische Kostenfunktion (Class Weighting, Focal Loss) und ein klassenspezifisches Threshold-Tuning zu Lasten der Spezifität für NV und BKL.",
  },
  {
    heading: "Regulatorische Einordnung",
    body: "Im MDR-Kontext ist nach Anhang VIII Regel 11 eine Einstufung als Klasse IIa typisch (Triage-Information); bei Outputs, die direkt zu Therapieentscheidungen führen, ist Klasse IIb argumentierbar („schwerwiegende Verschlechterung des Gesundheitszustands“). Im EU AI Act gilt eine solche KI als Hochrisikosystem nach Art. 6 Abs. 1 in Verbindung mit Anhang I — die Geltung für Medizinprodukte beginnt am 02.08.2027. Daraus folgen Pflichten zu Risikomanagement (Art. 9), Daten-Governance (Art. 10), Transparenz (Art. 13) und Genauigkeit/Robustheit (Art. 15). Im FDA-Kontext entspricht die Indikation einer IMDRF-SaMD-Kategorie III („drives clinical management / critical condition“).",
  },
  {
    heading: "Limitationen dieses Demonstrators",
    body: "Diese Anwendung ist ein Compliance-Demonstrator ohne medizinische Zweckbestimmung und kein Medizinprodukt im Sinne der MDR. Sie ist weder CE-zertifiziert noch klinisch validiert. Das zugrundeliegende Modell wurde auf HAM10000 trainiert — einem Datensatz mit Überrepräsentation heller Hauttypen (Fitzpatrick I–III) und einer NV-Klasse von 67 %. Für reale Triage-Anwendungen wäre nach Art. 15 AI Act Balanced Accuracy bzw. Macro-F1 statt reiner Accuracy zu berichten, eine externe Validierung auf repräsentativen Real-World-Daten erforderlich und der Output ausschließlich als Entscheidungsunterstützung für qualifiziertes medizinisches Personal zulässig.",
  },
] as const;

const SOURCES = [
  {
    text: "Leitlinienprogramm Onkologie (Deutsche Krebsgesellschaft, Deutsche Krebshilfe, AWMF). (2020). S3-Leitlinie Diagnostik, Therapie und Nachsorge des Melanoms (Version 3.3, AWMF-Registernummer 032/024OL).",
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
    <ClassPageLayout
      code="MEL"
      malignant
      title="Malignes Melanom"
      lead={
        <>
          Das maligne Melanom ist eine bösartige Wucherung der Melanozyten — der
          pigmentbildenden Zellen der Haut. Umgangssprachlich auch „schwarzer
          Hautkrebs“ genannt.
        </>
      }
      keyPoints={KEY_POINTS}
      wannZumArzt={
        <>
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
        </>
      }
      wasIstHeading="Was ist ein malignes Melanom?"
      wasIstBody={
        <>
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
        </>
      }
      riskFactors={RISK_FACTORS}
      merkmaleHeading="Woran erkennt man ein malignes Melanom?"
      features={TYPICAL_FEATURES}
      abcde={{
        intro:
          "Diese Faustregel hilft Laien bei der Selbstbeobachtung — sie ersetzt jedoch keine ärztliche Untersuchung. Ab zwei zutreffenden Kriterien wird eine ärztliche Abklärung empfohlen.",
        rules: ABCDE,
      }}
      figure={
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
      }
      figureCaption="Schematische Darstellung — kein echtes Patientenbild."
      fachSections={FACH_SECTIONS}
      sources={SOURCES}
    />
  );
}
