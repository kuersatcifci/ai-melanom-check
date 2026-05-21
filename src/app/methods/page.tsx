import { AlertTriangle, ShieldCheck, XCircle } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const metadata = {
  title: "Methoden & Modell – AI Melanom Check",
  description:
    "Wie funktioniert die KI hinter AI Melanom Check? Trainingsdaten, Modellarchitektur, Limitationen und regulatorische Einordnung – verständlich erklärt.",
  alternates: { canonical: "/methods" },
};

const CLASS_DISTRIBUTION = [
  { label: "Melanozytärer Nävus (Muttermal)", count: "6.705", share: "66,9 %" },
  { label: "Malignes Melanom", count: "1.113", share: "11,1 %" },
  { label: "Benigne Keratose", count: "1.099", share: "11,0 %" },
  { label: "Basalzellkarzinom", count: "514", share: "5,1 %" },
  { label: "Aktinische Keratose / M. Bowen", count: "327", share: "3,3 %" },
  { label: "Vaskuläre Läsion", count: "142", share: "1,4 %" },
  { label: "Dermatofibrom", count: "115", share: "1,1 %" },
] as const;

const CANNOT_DO = [
  "Die KI erkennt nicht, ob ein Muttermal gesund und unauffällig ist. Sie ordnet jedes Bild immer einer der 7 Kategorien zu.",
  "Die KI stellt keine Diagnose. Sie erkennt Bildmuster, keine Krankheiten.",
  "Die KI kennt Ihre Krankengeschichte, Ihren Hauttyp oder Ihre persönlichen Risikofaktoren nicht.",
  "Die KI sieht nur das Foto. Kein Arzt würde nur anhand eines Fotos eine Diagnose stellen.",
  "Die KI wurde hauptsächlich mit Bildern von heller Haut trainiert (Fitzpatrick I bis III). Bei dunklen Hauttönen (Fitzpatrick V bis VI) ist sie deutlich weniger zuverlässig.",
  "Die Prozentzahlen sind keine medizinischen Wahrscheinlichkeiten. Sie zeigen, wie ähnlich das Bild den Trainingsbildern dieser Kategorie ist.",
] as const;

const MODEL_DETAILS = [
  {
    label: "Basismodell",
    value: "google/vit-base-patch16-224-in21k",
  },
  {
    label: "Fine-Tuning",
    value: "Anwarkh1/Skin_Cancer-Image_Classification (Apache-2.0)",
  },
  {
    label: "Quantisierung",
    value: "dynamic INT8 via onnxruntime.quantization",
  },
  {
    label: "Inferenz",
    value: "ONNX Runtime Web 1.26.0, WebGPU mit WASM-Fallback",
  },
  {
    label: "Eingabeformat",
    value: "RGB 224x224 Pixel, normalisiert (mean = 0,5, std = 0,5)",
  },
  {
    label: "Ausgabe",
    value: "Softmax über 7 Klassen",
  },
] as const;

const LIMITATIONS = [
  "Hautton-Bias: Daneshjou et al. (2022) zeigten ROC-AUC-Drop von 27 bis 36 Prozent bei Fitzpatrick V und VI.",
  "Klassenimbalanz: NV mit 67 Prozent dominant, Accuracy als alleinige Metrik daher nicht aussagekräftig.",
  "Nicht klinisch validiert.",
  "INT8-Quantisierung kann Genauigkeit gegenüber FP32 reduzieren.",
  "Softmax-Outputs sind keine kalibrierten Wahrscheinlichkeiten.",
] as const;

const SOURCES = [
  {
    text: "Tschandl, P., Rosendahl, C., & Kittler, H. (2018). The HAM10000 dataset, a large collection of multi-source dermatoscopic images of common pigmented skin lesions. Scientific Data, 5, Article 180161.",
    url: "https://doi.org/10.1038/sdata.2018.161",
  },
  {
    text: "Daneshjou, R., Smith, M. P., Sun, M. D., Rotemberg, V., & Zou, J. (2022). Disparities in dermatology AI performance on a diverse, curated clinical image set. Science Advances, 8(32), Article eabq6147.",
    url: "https://doi.org/10.1126/sciadv.abq6147",
  },
] as const;

export default function MethodsPage() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-12 px-6 py-16">
      <header className="flex flex-col gap-3">
        <div className="text-primary flex items-center gap-3 text-xs uppercase tracking-[0.22em]">
          <span aria-hidden="true" className="bg-primary h-px w-8" />
          Transparenz
        </div>
        <h1 className="font-heading text-balance text-4xl font-medium leading-tight tracking-tight sm:text-5xl">
          Methoden &amp; Modell
        </h1>
        <p className="text-muted-foreground text-base leading-relaxed">
          Hier erklären wir transparent, wie die KI funktioniert, womit sie
          trainiert wurde und was sie nicht kann.
        </p>
      </header>

      {/* Sektion 1 ·Was macht die KI? */}
      <section
        aria-labelledby="was-macht"
        className="flex flex-col gap-5"
      >
        <h2
          id="was-macht"
          className="font-heading text-2xl font-medium leading-tight tracking-tight sm:text-3xl"
        >
          Was macht die KI genau?
        </h2>
        <p className="leading-relaxed">
          Das Programm hat über{" "}
          <strong className="font-semibold">10.000 Bilder</strong> von
          Hautveränderungen angeschaut, die von Hautärzten beschriftet wurden.
          Es hat dabei gelernt, welche Bildmuster zu welcher Kategorie
          gehören.
        </p>
        <p className="leading-relaxed">
          Wenn Sie ein Bild hochladen, vergleicht das Programm es mit allem,
          was es gelernt hat, und ordnet es der ähnlichsten Kategorie zu.
        </p>

        <aside
          aria-label="Wichtige Einschränkung"
          className="border-amber-400 bg-amber-50 text-amber-950 dark:border-amber-700 dark:bg-amber-950/40 dark:text-amber-100 flex flex-col gap-3 rounded-md border-l-4 px-5 py-4"
        >
          <h3 className="font-heading flex items-center gap-2 text-base font-medium leading-tight">
            <AlertTriangle aria-hidden="true" className="h-5 w-5 shrink-0" />
            Wichtige Einschränkung
          </h3>
          <p className="text-sm leading-relaxed">
            Das Modell kennt nur diese 7 Kategorien. Es kann nicht erkennen,
            ob etwas vollständig unauffällig oder gesund ist. Jedes
            hochgeladene Bild wird einer dieser 7 Kategorien zugeordnet, auch
            wenn es ein völlig normales Muttermal ist.
          </p>
        </aside>
      </section>

      {/* Sektion 2 ·Womit wurde die KI trainiert? */}
      <section
        aria-labelledby="trainiert"
        className="flex flex-col gap-5"
      >
        <h2
          id="trainiert"
          className="font-heading text-2xl font-medium leading-tight tracking-tight sm:text-3xl"
        >
          Womit wurde die KI trainiert?
        </h2>
        <p className="leading-relaxed">
          Die KI wurde mit dem{" "}
          <strong className="font-semibold">HAM10000-Datensatz</strong>{" "}
          trainiert, einer Sammlung von 10.015 dermatoskopischen Aufnahmen aus
          Hautkliniken in Wien (Österreich) und Queensland (Australien). Die
          Bilder wurden von erfahrenen Hautärzten klassifiziert.
        </p>

        <div className="border-border/60 -mx-2 overflow-x-auto rounded-md border sm:-mx-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[60%]">Kategorie</TableHead>
                <TableHead className="w-[20%] text-right">
                  Anzahl Bilder
                </TableHead>
                <TableHead className="w-[20%] text-right">Anteil</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {CLASS_DISTRIBUTION.map((row) => (
                <TableRow key={row.label}>
                  <TableCell className="font-medium">{row.label}</TableCell>
                  <TableCell className="text-muted-foreground text-right tabular-nums">
                    {row.count}
                  </TableCell>
                  <TableCell className="text-muted-foreground text-right tabular-nums">
                    {row.share}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <p className="text-muted-foreground text-sm leading-relaxed">
          Fast zwei Drittel aller Trainingsbilder zeigen Muttermale. Das
          bedeutet: Das Modell ist besonders gut darin, Muttermale zu
          erkennen, aber weniger geübt bei seltenen Kategorien wie
          Dermatofibromen oder vaskulären Läsionen.
        </p>
      </section>

      {/* Sektion 3 ·Was die KI nicht kann */}
      <section
        aria-labelledby="kann-nicht"
        className="flex flex-col gap-5"
      >
        <h2
          id="kann-nicht"
          className="font-heading text-2xl font-medium leading-tight tracking-tight sm:text-3xl"
        >
          Was die KI nicht kann
        </h2>
        <ul className="flex flex-col gap-3" role="list">
          {CANNOT_DO.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <XCircle
                aria-hidden="true"
                className="text-destructive mt-0.5 h-5 w-5 shrink-0"
              />
              <span className="text-base leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Sektion 4 ·Wie wurde das Modell entwickelt? */}
      <section
        aria-labelledby="entwickelt"
        className="flex flex-col gap-4"
      >
        <h2
          id="entwickelt"
          className="font-heading text-2xl font-medium leading-tight tracking-tight sm:text-3xl"
        >
          Wie wurde das Modell entwickelt?
        </h2>
        <p className="leading-relaxed">
          Als Basis dient ein{" "}
          <strong className="font-semibold">Vision Transformer (ViT-Base)</strong>
          , ein modernes KI-Modell, das ursprünglich auf Millionen von
          Alltagsbildern vortrainiert wurde (Transfer Learning von
          ImageNet-21k). Es wurde anschließend speziell auf den
          HAM10000-Datensatz angepasst (Fine-Tuning).
        </p>
        <p className="leading-relaxed">
          Für die Browser-Nutzung wurde das Modell mit{" "}
          <strong className="font-semibold">INT8-Quantisierung</strong> von
          343 MB auf 83 MB komprimiert und läuft vollständig lokal in Ihrem
          Browser über ONNX Runtime Web. Kein Bild wird an einen Server
          übertragen.
        </p>
      </section>

      {/* Sektion 5 ·Für Fachpublikum */}
      <section
        aria-labelledby="fachpublikum"
        className="bg-muted/30 border-border/60 -mx-2 flex flex-col gap-6 rounded-lg border p-6 text-sm sm:-mx-4 sm:p-8"
      >
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 text-primary px-2.5 py-0.5 text-[11px] uppercase tracking-wider">
            <ShieldCheck aria-hidden="true" className="h-3 w-3" />
            Compliance und Wissenschaft
          </span>
        </div>
        <h2
          id="fachpublikum"
          className="font-heading text-xl font-medium leading-tight tracking-tight sm:text-2xl"
        >
          Für Fachpublikum: Technische Details
        </h2>

        <div className="flex flex-col gap-3">
          <h3 className="font-heading text-base font-medium leading-tight">
            Modelldetails
          </h3>
          <dl className="grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-[max-content_1fr]">
            {MODEL_DETAILS.map((item) => (
              <div key={item.label} className="contents">
                <dt className="text-foreground font-medium">{item.label}:</dt>
                <dd className="text-muted-foreground font-mono text-[13px] leading-relaxed">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="font-heading text-base font-medium leading-tight">
            Bekannte Limitationen
          </h3>
          <ul className="flex flex-col gap-2" role="list">
            {LIMITATIONS.map((item) => (
              <li key={item} className="flex gap-2 leading-relaxed">
                <span aria-hidden="true" className="text-muted-foreground">
                  •
                </span>
                <span className="text-muted-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="font-heading text-base font-medium leading-tight">
            Regulatorische Einordnung
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            Wäre diese App ein Medizinprodukt, würde sie als{" "}
            <strong className="text-foreground font-semibold">
              Hochrisiko-KI
            </strong>{" "}
            nach EU AI Act Art. 6 Abs. 1 in Verbindung mit Anhang I gelten.
            Als nicht-kommerzieller Compliance-Demonstrator ohne medizinische
            Zweckbestimmung fällt sie nicht darunter. Relevante Artikel bei
            echter Nutzung: Art. 9 Risikomanagement, Art. 10 Datenqualität,
            Art. 13 Transparenz, Art. 14 menschliche Aufsicht, Art. 15
            Robustheit.
          </p>
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
          Stand: Mai 2026. Diese Seite dient der transparenten Dokumentation
          des verwendeten KI-Modells.
        </p>
      </footer>
    </main>
  );
}
