import { ClassPageLayout } from "@/components/ClassPageLayout";

export const metadata = {
  title: "Dermatofibrom (DF) – KI-Demo (kein Medizinprodukt)",
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

const FACH_SECTIONS = [
  {
    heading: "Bedeutung für KI-Klassifikationssysteme",
    body: "DF stellt mit nur 115 Bildern (1,1 %) im HAM10000-Datensatz die kleinste Klasse dar; daraus resultieren breite Konfidenzintervalle der DF-spezifischen Performance-Metriken, die nach Art. 15 EU AI Act (Robustness) explizit per Bootstrap oder Kreuzvalidierung zu quantifizieren sind. Eine ausschließliche Modellierung auf HAM10000 erfüllt die Anforderungen an Repräsentativität und Datenqualität nach Art. 10 EU AI Act für DF kaum — externe Datasets (z. B. BCN20000, MSK-Dermoscopy) oder eine explizite Einschränkung der Zweckbestimmung sind regulatorisch nahezu zwingend.",
  },
  {
    heading: "Regulatorische Einordnung",
    body: "Hinzu kommt eine strukturelle Modell-Limitation: Das diagnostisch entscheidende „Dimple Sign“ ist haptisch, nicht visuell, und prinzipiell nicht aus einem Standbild ableitbar; diese Einschränkung gehört in die Gebrauchsanweisung nach Art. 13 EU AI Act und sollte einen verpflichtenden Hinweis „bei knotigen, derben Läsionen den Tasttest selbst durchführen oder ärztlich prüfen lassen“ auslösen. Eine Triage-KI für DF fällt unter MDR-Klasse IIa (Triage-Information); im EU AI Act gelten die Hochrisiko-Pflichten nach Art. 6 Abs. 1 in Verbindung mit Anhang I (Geltung für Medizinprodukte ab 02.08.2027).",
  },
  {
    heading: "Limitationen dieses Demonstrators",
    body: "Diese Anwendung ist ein Compliance-Demonstrator ohne medizinische Zweckbestimmung und kein Medizinprodukt im Sinne der MDR. Die DF-Erkennung ist aufgrund der sehr kleinen Trainingsdatenmenge systematisch unsicher; bei knotigen, derben Läsionen — insbesondere an den unteren Extremitäten — sollte der einfache Tasttest („Dimple Sign“) immer manuell durchgeführt werden. Bei raschem Wachstum gehört eine Läsion zur Ausschlussdiagnose eines Dermatofibrosarcoma protuberans (DFSP) ärztlich begutachtet.",
  },
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
    <ClassPageLayout
      code="DF"
      malignant={false}
      title="Dermatofibrom"
      lead={
        <>
          Das Dermatofibrom — auch Histiozytom oder „Fibroma durum“ — ist ein
          gutartiger, auffallend derber Knoten im Bindegewebe der Haut, der
          häufig als reaktive Narbenbildung nach kleinen Verletzungen
          entsteht.
        </>
      }
      keyPoints={KEY_POINTS}
      wannZumArzt={
        <>
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
        </>
      }
      wasIstHeading="Was ist ein Dermatofibrom?"
      wasIstBody={
        <>
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
        </>
      }
      riskFactors={RISK_FACTORS}
      merkmaleHeading="Woran erkennt man ein Dermatofibrom?"
      features={TYPICAL_FEATURES}
      figure={
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
            <ellipse cx="160" cy="88" rx="16" ry="12" fill="#e0caaa" opacity="0.9" />
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
      }
      figureCaption={
        <>
          Schematische Darstellung — kein echtes Patientenbild. Das
          entscheidende „Dimple Sign“ ist haptisch und in keinem Bild
          erkennbar.
        </>
      }
      fachSections={FACH_SECTIONS}
      sources={SOURCES}
    />
  );
}
