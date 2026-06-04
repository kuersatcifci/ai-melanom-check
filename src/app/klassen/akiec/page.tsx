import { ClassPageLayout } from "@/components/ClassPageLayout";

export const metadata = {
  title: "Aktinische Keratose & Morbus Bowen (AKIEC) – KI-Demo (kein Medizinprodukt)",
  description:
    "Aktinische Keratose und Morbus Bowen, Frühformen des Plattenepithelkarzinoms: Merkmale, Häufigkeit, Risikofaktoren und regulatorische KI-Einordnung.",
  alternates: { canonical: "/klassen/akiec" },
};

const KEY_POINTS = [
  "AKIEC umfasst die aktinische Keratose und den Morbus Bowen — beides Frühformen (In-situ-Karzinome) des Plattenepithelkarzinoms, bei denen die bösartigen Zellen noch in der Oberhaut liegen.",
  "Etwa 60 % aller invasiven Plattenepithelkarzinome entstehen aus aktinischen Keratosen — eine frühzeitige Behandlung verhindert die Progression in einen metastasierungsfähigen Hautkrebs.",
  "Seit 2015 sind multiple aktinische Keratosen als Berufskrankheit Nr. 5103 anerkannt — relevant insbesondere für Outdoor-Berufstätige.",
] as const;

const TYPICAL_FEATURES = [
  {
    label: "Raue, schuppige Hautstellen",
    text: "Rötliche bis bräunliche, schuppende Areale auf chronisch sonnenexponierter Haut.",
  },
  {
    label: "Sandpapierartige Oberfläche",
    text: "Frühe Läsionen sind oft besser fühl- als sichtbar (Olsen-Grad I–III).",
  },
  {
    label: "Morbus Bowen",
    text: "Scharf begrenzte, rötliche, schuppende Plaque, die einem Ekzem oder einer Schuppenflechte ähneln kann und auf Cortisoncremes nicht abheilt.",
  },
  {
    label: "Lokalisation",
    text: "Gesicht, unbehaarte Kopfhaut („Glatze“), Handrücken, Unterarme, Unterlippe und Dekolleté.",
  },
  {
    label: "Hauthorn (Cornu cutaneum)",
    text: "Ausgeprägte, stark verhornte Variante mit deutlich erhabener, harter Hornsäule.",
  },
] as const;

const RISK_FACTORS = [
  "Kumulative Lebenszeit-UV-Dosis (Sonne, Solarium)",
  "Heller Hauttyp (Fitzpatrick I–II)",
  "Höheres Alter (Prävalenz bei über 70-jährigen Männern über 50 %)",
  "Berufliche UV-Exposition — anerkannt als Berufskrankheit Nr. 5103",
  "Immunsuppression (besonders nach Organtransplantation stark erhöht)",
  "Männliches Geschlecht (etwa doppelt so häufig betroffen)",
] as const;

const FACH_SECTIONS = [
  {
    heading: "Bedeutung für KI-Klassifikationssysteme",
    body: "Eine Falschklassifikation als benigne — insbesondere AKIEC → BKL — ist die regulatorisch sensibelste Verwechslung in dieser Klasse, da sie eine Progression zum invasiven Plattenepithelkarzinom ermöglichen kann (etwa 60 % aller invasiven PEK gehen aus aktinischen Keratosen hervor). Pigmentierte aktinische Keratosen und seborrhoische Keratosen treten beide bei älteren Personen auf sonnenexponierten Arealen auf und sind selbst klinisch oft nur tastbar zu unterscheiden — ein Sinneskanal, der einem rein bildbasierten Modell systembedingt fehlt. Aus Public-Health-Sicht wird daher eine erhöhte Sensitivität für AKIEC zulasten der Spezifität gegenüber BKL kalibriert.",
  },
  {
    heading: "Regulatorische Einordnung",
    body: "Eine Triage-KI für AKIEC fällt unter MDR-Klasse IIa (Information für Triage). Die fehlende Tastbarkeit als zentrales diagnostisches Merkmal ist nach Art. 13 EU AI Act in der Modellkarte und Gebrauchsanweisung transparent zu dokumentieren — Nutzer müssen aktiv auf die Notwendigkeit eines manuellen Tasttests oder einer ärztlichen Begutachtung hingewiesen werden. Im EU AI Act gelten dieselben Hochrisiko-Pflichten nach Art. 6 Abs. 1 in Verbindung mit Anhang I (Geltung für Medizinprodukte ab 02.08.2027): Risikomanagement (Art. 9), Daten-Governance (Art. 10), Transparenz (Art. 13) und Genauigkeit/Robustheit (Art. 15).",
  },
  {
    heading: "Limitationen dieses Demonstrators",
    body: "Diese Anwendung ist ein Compliance-Demonstrator ohne medizinische Zweckbestimmung und kein Medizinprodukt im Sinne der MDR. Das bildbasierte Modell kann die für die Differenzialdiagnose entscheidende sandpapierartige Tastempfindung nicht erfassen — pigmentierte AK und seborrhoische Keratosen sind ohne diesen Sinneskanal oft nicht sicher zu trennen. Im Trainingsdatensatz HAM10000 entfallen nur 3 % der Bilder auf AKIEC, was die statistische Verlässlichkeit klassenspezifischer Metriken einschränkt und eine externe Validierung erforderlich macht. Outdoor-Berufstätige und Organtransplantierte benötigen ohnehin engmaschigere fachärztliche Kontrollen.",
  },
] as const;

const SOURCES = [
  {
    text: "Leitlinienprogramm Onkologie (Deutsche Krebsgesellschaft, Deutsche Krebshilfe, AWMF). (2022). S3-Leitlinie Aktinische Keratose und Plattenepithelkarzinom der Haut (Version 2.0, AWMF-Registernummer 032-022OL).",
    url: "https://www.leitlinienprogramm-onkologie.de/leitlinien/aktinische-keratosen-und-plattenepithelkarzinom-der-haut/",
  },
  {
    text: "Deutsches Krebsforschungszentrum, Krebsinformationsdienst. (o. D.). Hautkrebs.",
    url: "https://www.krebsinformationsdienst.de/tumorarten/hautkrebs/",
  },
  {
    text: "Deutsche Krebsgesellschaft. (o. D.). Plattenepithelkarzinom der Haut.",
    url: "https://www.krebsgesellschaft.de/plattenepithelkarzinom-der-haut.html",
  },
  {
    text: "Röwert-Huber, J., Patel, M. J., Forschner, T., Ulrich, C., Eberle, J., Kerl, H., Sterry, W., & Stockfleth, E. (2007). Actinic keratosis is an early in situ squamous cell carcinoma: A proposal for reclassification. British Journal of Dermatology, 156(s3), 8–12.",
    url: "https://doi.org/10.1111/j.1365-2133.2007.07860.x",
  },
] as const;

export default function AktinischeKeratoseClassPage() {
  return (
    <ClassPageLayout
      code="AKIEC"
      malignant
      title="Aktinische Keratose & Morbus Bowen"
      breadcrumbLabel="Aktinische Keratose / M. Bowen"
      lead={
        <>
          Aktinische Keratose und Morbus Bowen sind eng verwandte Frühformen
          (In-situ-Karzinome) des Plattenepithelkarzinoms — bösartige Zellen
          liegen noch ausschließlich in der Oberhaut und haben die
          Basalmembran nicht durchbrochen.
        </>
      }
      keyPoints={KEY_POINTS}
      wannZumArzt={
        <>
          <p className="text-sm leading-relaxed">
            Bei rauen, schuppigen Hautstellen, die{" "}
            <strong className="font-semibold">
              nicht von selbst abheilen
            </strong>
            , bei rötlichen Plaques, die auf Cortisoncreme nicht ansprechen, und
            bei Verhärtungen oder Wachstum bestehender Stellen ist eine
            dermatologische Abklärung sinnvoll.
          </p>
          <p className="text-sm leading-relaxed">
            Outdoor-Berufstätige und Organtransplantierte benötigen
            engmaschigere Kontrollen, da hier das Progressionsrisiko deutlich
            erhöht ist.
          </p>
        </>
      }
      wasIstHeading="Was ist eine aktinische Keratose?"
      wasIstBody={
        <>
          <p className="leading-relaxed">
            Unter <strong className="font-semibold">AKIEC</strong> fasst der
            HAM10000-Datensatz zwei eng verwandte Hautveränderungen zusammen: die
            aktinische Keratose und den Morbus Bowen. Beides sind{" "}
            <strong className="font-semibold">Frühformen (In-situ-Karzinome)</strong>{" "}
            des Plattenepithelkarzinoms — die bösartigen Zellen befinden sich
            noch in der Oberhaut und haben die Basalmembran nicht durchbrochen.
            Unbehandelt kann ein Teil dieser Läsionen in einen invasiven, dann
            auch metastasierungsfähigen Hautkrebs übergehen.
          </p>

          <h3 className="font-heading text-lg font-medium leading-tight">
            Häufigkeit in Deutschland
          </h3>
          <p className="leading-relaxed">
            In Deutschland sind nach Schätzungen rund{" "}
            <strong className="font-semibold">1,7 Millionen Menschen</strong> in
            dermatologischer Behandlung wegen aktinischer Keratosen. Die
            Prävalenz steigt steil mit dem Alter: bei 60- bis 70-Jährigen liegt
            sie bei etwa 11,5 %, bei über 70-jährigen Männern bei über 50 %.
            Männer sind etwa doppelt so häufig betroffen wie Frauen. Seit 2015
            sind multiple aktinische Keratosen als Berufskrankheit Nr. 5103
            anerkannt.
          </p>
        </>
      }
      riskFactors={RISK_FACTORS}
      merkmaleHeading="Woran erkennt man eine aktinische Keratose?"
      features={TYPICAL_FEATURES}
      figure={
        <svg
          viewBox="0 0 320 180"
          role="img"
          aria-label="Schematische Darstellung einer aktinischen Keratose: eine flächig ausgedehnte, unscharf begrenzte rötlich-bräunliche Hautstelle mit zahlreichen kleinen schuppenartigen Auflagerungen, die die sandpapierartige Oberfläche andeuten — auf chronisch sonnenexponiertem Hautareal."
          className="w-full max-w-md"
        >
          <g aria-hidden="true">
            {/* Hautareal-Hintergrund */}
            <rect
              x="40"
              y="40"
              width="240"
              height="100"
              fill="#e8c6a8"
              opacity="0.25"
            />

            {/* unscharfes rötliches Areal */}
            <ellipse
              cx="160"
              cy="90"
              rx="92"
              ry="44"
              fill="#c97755"
              opacity="0.45"
            />
            <ellipse
              cx="160"
              cy="90"
              rx="78"
              ry="36"
              fill="#b56644"
              opacity="0.5"
            />

            {/* gröbere Schuppen */}
            <g fill="#8a4220" opacity="0.85">
              <ellipse cx="118" cy="78" rx="6" ry="3" />
              <ellipse cx="143" cy="82" rx="5" ry="3" />
              <ellipse cx="132" cy="96" rx="7" ry="3" />
              <ellipse cx="166" cy="80" rx="6" ry="3" />
              <ellipse cx="182" cy="94" rx="6" ry="2.5" />
              <ellipse cx="155" cy="108" rx="5" ry="2.5" />
              <ellipse cx="198" cy="84" rx="4" ry="2" />
              <ellipse cx="124" cy="106" rx="4" ry="2" />
              <ellipse cx="175" cy="68" rx="4" ry="2" />
              <ellipse cx="212" cy="98" rx="4" ry="2" />
            </g>

            {/* feinere helle Schuppen */}
            <g fill="#e8b896" opacity="0.85">
              <ellipse cx="138" cy="70" rx="3" ry="1.5" />
              <ellipse cx="156" cy="92" rx="3" ry="1.5" />
              <ellipse cx="172" cy="102" rx="3" ry="1.5" />
              <ellipse cx="188" cy="76" rx="2.5" ry="1.3" />
              <ellipse cx="202" cy="90" rx="2.5" ry="1.3" />
              <ellipse cx="116" cy="92" rx="3" ry="1.5" />
              <ellipse cx="148" cy="100" rx="2.5" ry="1.3" />
              <ellipse cx="192" cy="106" rx="2.5" ry="1.3" />
            </g>
          </g>

          <text
            x="160"
            y="160"
            textAnchor="middle"
            fontSize="11"
            fill="currentColor"
            opacity="0.6"
          >
            rau · schuppig · sandpapierartig · unscharf begrenzt
          </text>
        </svg>
      }
      figureCaption="Schematische Darstellung — kein echtes Patientenbild."
      fachSections={FACH_SECTIONS}
      sources={SOURCES}
    />
  );
}
