import { ClassPageLayout } from "@/components/ClassPageLayout";

export const metadata = {
  title: "Basalzellkarzinom (BCC) – KI-Demo (kein Medizinprodukt)",
  description:
    "Basalzellkarzinom (heller Hautkrebs): Merkmale, Häufigkeit, Risikofaktoren und regulatorische KI-Einordnung. AWMF- und RKI-Quellen. Stand Mai 2026.",
  alternates: { canonical: "/klassen/bcc" },
};

const KEY_POINTS = [
  "Das Basalzellkarzinom ist die häufigste Krebserkrankung des Menschen in Mitteleuropa — pro Jahr 150.000 bis 200.000 Neuerkrankungen in Deutschland.",
  "Es wächst meist langsam und bildet äußerst selten Metastasen (unter 0,1 %), kann aber unbehandelt lokal Knorpel und Knochen infiltrieren.",
  "Die Letalität liegt unter 1 % — bei früher Erkennung ist eine vollständige Heilung der Regelfall.",
] as const;

const TYPICAL_FEATURES = [
  {
    label: "Perlmuttartig glänzendes Knötchen",
    text: "Hautfarbenes oder rötlich-bräunliches Knötchen mit wallartigem, leicht aufgeworfenem Randsaum.",
  },
  {
    label: "Teleangiektasien",
    text: "Feine, von außen sichtbare Blutgefäße verlaufen baumartig verzweigt auf der Oberfläche der Läsion.",
  },
  {
    label: "Zentrale Eindellung oder Ulkus",
    text: "Ein kleines Geschwür in der Mitte, das immer wieder blutet, verkrustet und über Wochen nicht abheilt.",
  },
  {
    label: "Lokalisation",
    text: "Überwiegend an „Sonnenterrassen“ — Nase, Stirn, Wangen, Ohren, Lippen, unbehaarte Kopfhaut und Nacken.",
  },
  {
    label: "Pigmentierte Variante",
    text: "Dunkelbraun bis schwarz pigmentierte Form, die optisch einem Melanom ähneln kann.",
  },
] as const;

const RISK_FACTORS = [
  "Chronische und intermittierende UV-Exposition (Sonne, Solarium)",
  "Heller Hauttyp (Fitzpatrick I–II)",
  "Solariennutzung",
  "Immunsuppression (z. B. nach Organtransplantation)",
  "Höheres Alter (mittleres Erkrankungsalter 71–73 Jahre)",
  "Berufliche UV-Exposition (Outdoor-Tätigkeiten)",
] as const;

const FACH_SECTIONS = [
  {
    heading: "Bedeutung für KI-Klassifikationssysteme",
    body: "Das BCC weist eine deutlich geringere Mortalität als das Melanom auf (Letalität < 1 %, Metastasierung < 0,1 %), wird aber wegen der enormen Krankheitslast — 150.000 bis 200.000 Neuerkrankungen jährlich in Deutschland — und der entstellenden Spätfolgen weiterhin mit hoher Sensitivität klassifiziert. Im Multi-Class-Modell ist eine abgestufte Klassengewichtung zwischen MEL und den benignen Klassen gerechtfertigt — eine asymmetrische Cost-Matrix bildet hier den klinischen Realnutzen ab. Häufige Confusion-Matrix-Verwechslungen bestehen zu AKIEC (gemeinsame Lokalisation auf Sonnenterrassen) und bei pigmentierten BCC zu MEL und NV.",
  },
  {
    heading: "Regulatorische Einordnung",
    body: "Für die regulatorische Einordnung ist die MDR-Klasse IIa typisch (Information für Triage). Die FDA-zugelassene Referenz DermaSensor (De-Novo-Pfad, Januar 2024) umfasst BCC explizit in ihrer Indikation für Primary-Care-Triage — was die Plausibilität einer KI-basierten BCC-Klassifikation als Triage-Komponente regulatorisch absichert. Im EU AI Act gelten dieselben Hochrisiko-Pflichten wie für MEL nach Art. 6 Abs. 1 in Verbindung mit Anhang I (Geltung für Medizinprodukte ab 02.08.2027): Risikomanagement (Art. 9), Daten-Governance (Art. 10), Transparenz (Art. 13) und Genauigkeit/Robustheit (Art. 15).",
  },
  {
    heading: "Limitationen dieses Demonstrators",
    body: "Diese Anwendung ist ein Compliance-Demonstrator ohne medizinische Zweckbestimmung und kein Medizinprodukt im Sinne der MDR. Eine bildbasierte Klassifikation kann den klinischen Tasteindruck — speziell den wallartigen, verschieblichen Randsaum — systembedingt nicht ersetzen. Pigmentierte BCC können dermatoskopisch einem Melanom oder einem dunklen Nävus ähneln; im Trainingsdatensatz HAM10000 entfallen lediglich 5 % der Bilder auf BCC, was eine externe Validierung mit zusätzlichen Datasets (z. B. BCN20000) und eine ausschließliche Nutzung als Entscheidungsunterstützung für qualifiziertes medizinisches Personal nahelegt.",
  },
] as const;

const SOURCES = [
  {
    text: "Leitlinienprogramm Onkologie (Deutsche Krebsgesellschaft, Deutsche Krebshilfe, AWMF). (2024). S2k-Leitlinie Basalzellkarzinom der Haut (Version 9.0, AWMF-Registernummer 032-021).",
    url: "https://www.leitlinienprogramm-onkologie.de/leitlinien/basalzellkarzinom/",
  },
  {
    text: "Deutsche Krebsgesellschaft. (o. D.). Basalzellkarzinom.",
    url: "https://www.krebsgesellschaft.de/basalzellkarzinom.html",
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

export default function BasalzellkarzinomClassPage() {
  return (
    <ClassPageLayout
      code="BCC"
      malignant
      title="Basalzellkarzinom"
      lead={
        <>
          Das Basalzellkarzinom entsteht aus den Basalzellen der untersten
          Schicht der Oberhaut — umgangssprachlich auch „heller Hautkrebs“
          genannt. Es ist die häufigste Krebserkrankung des Menschen in
          Mitteleuropa.
        </>
      }
      keyPoints={KEY_POINTS}
      wannZumArzt={
        <>
          <p className="text-sm leading-relaxed">
            Bei nicht heilenden Hautstellen, die{" "}
            <strong className="font-semibold">
              länger als vier Wochen bestehen
            </strong>
            , bei glasig glänzenden Knötchen im Gesicht und bei wiederholt
            blutenden oder krustenden Stellen sollte eine dermatologische
            Abklärung erfolgen.
          </p>
          <p className="text-sm leading-relaxed">
            Das gesetzliche Hautkrebs-Screening ab 35 Jahren (alle zwei Jahre,
            Kassenleistung) deckt BCC-verdächtige Läsionen mit ab.
          </p>
        </>
      }
      wasIstHeading="Was ist ein Basalzellkarzinom?"
      wasIstBody={
        <>
          <p className="leading-relaxed">
            Das Basalzellkarzinom entsteht aus den{" "}
            <strong className="font-semibold">Basalzellen</strong> der untersten
            Schicht der Oberhaut. Es wächst meist langsam und zerstört das
            umliegende Gewebe lokal — Mediziner sprechen von „semimaligne“,
            bildet aber äußerst selten Metastasen (unter 0,1 %). Unbehandelt kann
            es jedoch Knorpel und Knochen infiltrieren und im Gesicht zu
            entstellenden Defekten führen.
          </p>

          <h3 className="font-heading text-lg font-medium leading-tight">
            Häufigkeit in Deutschland
          </h3>
          <p className="leading-relaxed">
            Mit etwa{" "}
            <strong className="font-semibold">
              150.000 bis 200.000 Neuerkrankungen jährlich
            </strong>{" "}
            ist das BCC die häufigste Krebsart in Deutschland überhaupt. Die
            altersstandardisierte Inzidenz liegt bei mindestens 200 Fällen pro
            100.000 Einwohner und Jahr; die Lebenszeitprävalenz übersteigt in
            Zentral- und Nordeuropa 10 %. Das mittlere Erkrankungsalter beträgt
            71–73 Jahre, Männer sind etwas häufiger betroffen als Frauen. Die
            Letalität liegt unter 1 %.
          </p>
        </>
      }
      riskFactors={RISK_FACTORS}
      merkmaleHeading="Woran erkennt man ein Basalzellkarzinom?"
      features={TYPICAL_FEATURES}
      figure={
        <svg
          viewBox="0 0 320 180"
          role="img"
          aria-label="Schematische Darstellung eines Basalzellkarzinoms: ein perlmuttartig glänzendes hautfarbenes Knötchen mit wallartigem, leicht aufgeworfenem Randsaum. Auf der Oberfläche verlaufen feine baumartig verzweigte Blutgefäße (Teleangiektasien), in der Mitte zeigt sich eine kleine Eindellung."
          className="w-full max-w-md"
        >
          <defs>
            <radialGradient id="bcc-pearl" cx="38%" cy="34%" r="68%">
              <stop offset="0%" stopColor="#f5cdb6" />
              <stop offset="55%" stopColor="#d99d82" />
              <stop offset="100%" stopColor="#a06a55" />
            </radialGradient>
          </defs>

          {/* wallartiger Randsaum */}
          <g aria-hidden="true">
            <ellipse cx="160" cy="92" rx="82" ry="60" fill="#9a6450" />
            {/* perlmuttartiger Körper */}
            <ellipse cx="160" cy="92" rx="72" ry="52" fill="url(#bcc-pearl)" />
            {/* zentrale Eindellung */}
            <ellipse
              cx="155"
              cy="90"
              rx="14"
              ry="9"
              fill="#7a4a35"
              opacity="0.45"
            />

            {/* Teleangiektasien */}
            <path
              d="M 108,76 Q 130,72 145,82 Q 158,88 168,84"
              stroke="#a02818"
              strokeWidth="0.8"
              fill="none"
              opacity="0.85"
            />
            <path
              d="M 145,82 Q 152,76 158,68"
              stroke="#a02818"
              strokeWidth="0.6"
              fill="none"
              opacity="0.75"
            />
            <path
              d="M 205,98 Q 188,104 175,112 Q 168,116 158,114"
              stroke="#a02818"
              strokeWidth="0.7"
              fill="none"
              opacity="0.85"
            />
            <path
              d="M 175,112 Q 180,120 186,128"
              stroke="#a02818"
              strokeWidth="0.5"
              fill="none"
              opacity="0.7"
            />
            <path
              d="M 128,108 Q 140,112 150,106"
              stroke="#a02818"
              strokeWidth="0.5"
              fill="none"
              opacity="0.65"
            />
            <path
              d="M 172,72 Q 180,68 188,72"
              stroke="#a02818"
              strokeWidth="0.5"
              fill="none"
              opacity="0.7"
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
            glänzendes Knötchen · Teleangiektasien · wallartiger Rand
          </text>
        </svg>
      }
      figureCaption="Schematische Darstellung — kein echtes Patientenbild."
      fachSections={FACH_SECTIONS}
      sources={SOURCES}
    />
  );
}
