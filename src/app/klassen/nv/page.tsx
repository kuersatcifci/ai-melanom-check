import { ClassPageLayout } from "@/components/ClassPageLayout";

export const metadata = {
  title: "Melanozytärer Nävus (NV) – KI-Demo (kein Medizinprodukt)",
  description:
    "Melanozytärer Nävus (Muttermal): Merkmale, ABCDE-Regel zur Selbstbeobachtung, Häufigkeit, Risikofaktoren und regulatorische KI-Einordnung. Stand Mai 2026.",
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

const FACH_SECTIONS = [
  {
    heading: "Bedeutung für KI-Klassifikationssysteme",
    body: "NV ist mit 67 % Anteil im HAM10000-Datensatz die mit Abstand häufigste Klasse — die resultierende Imbalance (Ratio NV:DF ≈ 58:1) bewirkt, dass Accuracy als alleinige Metrik die Modellgüte systematisch überschätzt. Nach Art. 15 EU AI Act ist daher Balanced Accuracy oder Macro-F1 verpflichtend zu berichten. Die Verwechslung MEL → NV ist die regulatorisch gravierendste False-Negative-Konstellation (Mortalitätsrisiko), während die Verwechslung NV → MEL als False-Positive zu unnötigen Exzisionen und psychischer Belastung führt (Number Needed to Excise als ökonomischer Endpunkt).",
  },
  {
    heading: "Regulatorische Einordnung",
    body: "Für ein Triage-Tool wird das Decision-Threshold typischerweise zugunsten der MEL-Sensitivität verschoben, mit dokumentiertem Verlust an NV-Spezifität — diese Trade-off-Begründung gehört in die technische Dokumentation nach Anhang IV AI Act und in die klinische Bewertung nach Art. 61 in Verbindung mit Annex XIV MDR. Im MDR-Kontext bleibt eine Klasse-IIa-Einstufung typisch (Information für Triage); im EU AI Act gelten dieselben Hochrisiko-Pflichten nach Art. 6 Abs. 1 in Verbindung mit Anhang I (Geltung für Medizinprodukte ab 02.08.2027): Risikomanagement (Art. 9), Daten-Governance (Art. 10), Transparenz (Art. 13) und Genauigkeit/Robustheit (Art. 15).",
  },
  {
    heading: "Limitationen dieses Demonstrators",
    body: "Diese Anwendung ist ein Compliance-Demonstrator ohne medizinische Zweckbestimmung und kein Medizinprodukt im Sinne der MDR. Wegen der NV-Dominanz im Trainingsdatensatz neigt das Modell zu einer systematischen Über-Klassifikation als NV — eine Eigenschaft, die insbesondere bei der Differenzialdiagnose zu frühen Melanomen gefährlich werden kann. Die ABCDE-Regel deckt zudem schnell wachsende, knotige oder amelanotische Melanome systematisch nicht ab; das Ugly-Duckling-Zeichen ist hier ergänzend wichtig und sollte in jedem Patienten-Workflow als zweite Heuristik berücksichtigt werden.",
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
    <ClassPageLayout
      code="NV"
      malignant={false}
      title="Melanozytärer Nävus"
      lead={
        <>
          Ein melanozytärer Nävus — umgangssprachlich „Muttermal“ oder
          „Leberfleck“ — ist eine gutartige Ansammlung pigmentbildender Zellen
          (Melanozyten) in der Haut.
        </>
      }
      keyPoints={KEY_POINTS}
      wannZumArzt={
        <>
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
        </>
      }
      wasIstHeading="Was ist ein melanozytärer Nävus?"
      wasIstBody={
        <>
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
        </>
      }
      riskFactorsHeading="Risikofaktoren (für viele oder atypische Nävi)"
      riskFactors={RISK_FACTORS}
      merkmaleHeading="Woran erkennt man einen gutartigen Nävus?"
      features={TYPICAL_FEATURES}
      abcde={{
        intro:
          "Die ABCDE-Regel ist das wichtigste Instrument zur Selbstbeobachtung von Muttermalen — sie ersetzt jedoch keine ärztliche Untersuchung. Die Regel deckt vor allem das oberflächlich spreitende Melanom ab und versagt typischerweise bei schnell wachsenden, knotigen oder amelanotischen Melanomen — ergänzend ist das Ugly-Duckling-Zeichen sinnvoll.",
        rules: ABCDE,
      }}
      figure={
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
            <circle cx="158" cy="88" r="38" fill="#a87657" opacity="0.7" />
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
      }
      figureCaption="Schematische Darstellung — kein echtes Patientenbild."
      fachSections={FACH_SECTIONS}
      sources={SOURCES}
    />
  );
}
