import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const metadata = {
  title: "Risiken – AI Melanom Check",
  description:
    "Risikoregister: bekannte Fehler- und Missbrauchsszenarien der Demo mit zugeordneten Gegenmaßnahmen in der App. Schwerebewertung und konkrete Schutzmaßnahmen.",
  alternates: { canonical: "/risk" },
};

type Severity = "Hoch" | "Mittel" | "Niedrig";

type RiskRow = {
  risk: string;
  consequence: string;
  severity: Severity;
  mitigation: string;
};

const RISKS: RiskRow[] = [
  {
    risk: "Falsch-negatives Ergebnis bei Melanom",
    consequence:
      "Patient sucht keinen Arzt auf, Melanom wird zu spät erkannt",
    severity: "Hoch",
    mitigation:
      "Ampel-System zeigt bei Unsicherheit immer Gelb, Disclaimer empfiehlt Arztbesuch",
  },
  {
    risk: "Falsch-positives Ergebnis bei harmloser Läsion",
    consequence: "Unnötige Angst, überlastete Arztpraxen",
    severity: "Mittel",
    mitigation:
      "Sprache vermeidet Diagnose-Formulierungen, Details erst nach Klick sichtbar",
  },
  {
    risk: "Nutzung ungeeigneter Fotos (Smartphone statt Dermatoskop)",
    consequence: "Stark verzerrte Ergebnisse",
    severity: "Hoch",
    mitigation: "Hinweis vor Upload, Empfehlung für Bildqualität",
  },
  {
    risk: "Übervertrauen in Prozentwerte",
    consequence: "Fehlinterpretation als klinische Wahrscheinlichkeit",
    severity: "Hoch",
    mitigation: "Prozentwerte nur in Detailansicht, Erklärungstext",
  },
  {
    risk: "Nutzung bei dunklen Hauttypen (Fitzpatrick V–VI)",
    consequence: "Deutlich schlechtere Modellgenauigkeit",
    severity: "Hoch",
    mitigation: "Expliziter Hinweis in Modellkarte und Disclaimer",
  },
  {
    risk: "Nutzung durch Kinder oder vulnerable Gruppen",
    consequence: "Fehlinterpretation ohne medizinisches Grundwissen",
    severity: "Mittel",
    mitigation: "Zweckbestimmung schließt diese Gruppen explizit aus",
  },
  {
    risk: "App wird als Ersatz für Vorsorgeuntersuchung genutzt",
    consequence: "Versäumte Früherkennung",
    severity: "Hoch",
    mitigation: "Prominenter Disclaimer, kein Screening-Versprechen",
  },
];

function SeverityBadge({ level }: { level: Severity }) {
  const styles: Record<Severity, string> = {
    Hoch: "bg-destructive/10 text-destructive",
    Mittel:
      "bg-amber-500/15 text-amber-900 dark:bg-amber-400/15 dark:text-amber-200",
    Niedrig: "bg-muted text-muted-foreground",
  };
  return (
    <span
      className={
        "inline-block rounded px-1.5 py-0.5 text-[11px] font-medium " +
        styles[level]
      }
    >
      {level}
    </span>
  );
}

export default function RiskPage() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-6 py-16">
      <header className="flex flex-col gap-3">
        <div className="text-primary flex items-center gap-3 text-xs uppercase tracking-[0.22em]">
          <span aria-hidden="true" className="bg-primary h-px w-8" />
          Sicherheit
        </div>
        <h1 className="font-heading text-3xl font-medium leading-tight tracking-tight sm:text-4xl">
          Risikoregister
        </h1>
        <p className="text-muted-foreground text-base leading-relaxed">
          Bekannte Fehler- und Missbrauchsszenarien dieser Demo und die in der
          App umgesetzten Gegenmaßnahmen. Diese Übersicht ersetzt keine
          medizinische oder regulatorische Risikoanalyse.
        </p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Risiken und Gegenmaßnahmen</CardTitle>
          <CardDescription>
            Jedes Risiko ist einer konkreten Schutzmaßnahme in der Anwendung
            zugeordnet.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[26%]">Risiko</TableHead>
                <TableHead className="w-[24%]">Mögliche Folge</TableHead>
                <TableHead className="w-[10%]">Schwere</TableHead>
                <TableHead className="w-[40%]">
                  Gegenmaßnahme in der App
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {RISKS.map((row) => (
                <TableRow key={row.risk}>
                  <TableCell className="font-medium">{row.risk}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {row.consequence}
                  </TableCell>
                  <TableCell>
                    <SeverityBadge level={row.severity} />
                  </TableCell>
                  <TableCell>{row.mitigation}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </main>
  );
}
