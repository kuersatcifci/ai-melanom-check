import { ClassPageLayout } from "@/components/ClassPageLayout";

export const metadata = {
  title: "Vaskuläre Läsion (VASC) – KI-Demo (kein Medizinprodukt)",
  description:
    "Vaskuläre Läsionen — Hämangiome, Kirschangiome, Angiokeratome und pyogene Granulome: Merkmale, Glasspateltest, Häufigkeit und regulatorische KI-Einordnung.",
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

const FACH_SECTIONS = [
  {
    heading: "Bedeutung für KI-Klassifikationssysteme",
    body: "VASC ist mit 142 Bildern (1,4 %) eine unterrepräsentierte Klasse — die für DF beschriebenen Imbalance-Probleme gelten analog (Art. 10 und Art. 15 EU AI Act). Klinisch entscheidend ist die Subgruppe thrombosierter Hämangiome: Diese erscheinen dunkel bis schwarz, asymmetrisch und scharf begrenzt — also mit Merkmalen, die einem nodulären Melanom sehr ähneln; in der dermatologischen Literatur sind Fallberichte dokumentiert, in denen solche Läsionen unter Melanomverdacht exzidiert wurden. Eine klinische Validierung muss thrombosierte VASC explizit als Subgruppe abdecken, sonst entsteht ein Out-of-Distribution-Risiko, das nach Art. 9 EU AI Act im Risikomanagement zu adressieren ist.",
  },
  {
    heading: "Regulatorische Einordnung",
    body: "Wie beim Dermatofibrom ist auch hier ein zentrales Differenzialmerkmal — der Glasspateltest — bildbasiert nicht prüfbar; die Modellkarte muss diese Limitation transparent ausweisen und Nutzer auf die manuelle Prüfung verweisen. Eine Triage-KI für VASC fällt unter MDR-Klasse IIa (Information für Triage); im EU AI Act gelten die Hochrisiko-Pflichten nach Art. 6 Abs. 1 in Verbindung mit Anhang I (Geltung für Medizinprodukte ab 02.08.2027): Risikomanagement (Art. 9), Daten-Governance (Art. 10), Transparenz (Art. 13) und Genauigkeit/Robustheit (Art. 15).",
  },
  {
    heading: "Limitationen dieses Demonstrators",
    body: "Diese Anwendung ist ein Compliance-Demonstrator ohne medizinische Zweckbestimmung und kein Medizinprodukt im Sinne der MDR. Wegen der geringen Klassengröße sind VASC-Vorhersagen mit weiten Konfidenzintervallen behaftet. Besonders kritisch ist die Subgruppe thrombosierter Hämangiome — bei jeder dunklen, schwarz oder blau-violett erscheinenden Läsion gilt: Glasspateltest manuell durchführen oder dermatologisch abklären lassen, bevor das KI-Ergebnis als „gutartig“ interpretiert wird.",
  },
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
    <ClassPageLayout
      code="VASC"
      malignant={false}
      title="Vaskuläre Läsion"
      lead={
        <>
          Vaskuläre Läsionen sind gutartige Veränderungen der Blutgefäße in
          der Haut — dazu zählen Hämangiome („Blutschwämmchen“), Kirschangiome
          („Rubinflecken“), Angiokeratome und pyogene Granulome.
        </>
      }
      keyPoints={KEY_POINTS}
      wannZumArzt={
        <>
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
        </>
      }
      wasIstHeading="Was ist eine vaskuläre Läsion?"
      wasIstBody={
        <>
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
        </>
      }
      riskFactors={RISK_FACTORS}
      merkmaleHeading="Woran erkennt man eine vaskuläre Läsion?"
      features={TYPICAL_FEATURES}
      figure={
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
            <ellipse cx="148" cy="74" rx="6" ry="3" fill="#ffffff" opacity="0.2" />
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
      }
      figureCaption={
        <>
          Schematische Darstellung — kein echtes Patientenbild. Der
          Glasspateltest ist in keinem Bild prüfbar.
        </>
      }
      fachSections={FACH_SECTIONS}
      sources={SOURCES}
    />
  );
}
